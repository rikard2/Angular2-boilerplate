using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace DataCore
{
    public class Sql
    {
        public static string GenerateSql(string sourceSql, Dictionary<string, string> parameters)
        {
            Regex re = new Regex("{([A-Za-z]+?)}");

            foreach (Match match in re.Matches(sourceSql))
            {
                string parameter = match.Groups[1].Value;

                if (!parameters.ContainsKey(parameter.ToLower()))
                {
                    throw new Exception("Parameter " + parameter + " not found.");
                }

                string value = parameters[parameter.ToLower()];

                sourceSql = sourceSql.Replace("{" + parameter + "}", "'" + value + "'");
            }

            return sourceSql;
        }

        public static JObject ExecuteSql(string generatedSql, Dictionary<string, string> parameters)
        {
            var ret = new JObject();
            var connectionString = System.Configuration.ConfigurationManager.AppSettings["ConnectionString"];

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand(generatedSql);
                cmd.Connection = conn;

                var dr = cmd.ExecuteReader();
                while(dr.Read())
                {
                    for (int i = 0; i < dr.FieldCount; i++)
                    {
                        string columnName = dr.GetName(i);
                        object value = dr.GetValue(i);
                        JValue val = new JValue(value);

                        ret.Add(columnName, val);
                    }
                    
                }
            }

            return ret;
        }

        public static List<StoredProcedureParameter> GetParameters(string schema, string procedureName)
        {
            List<StoredProcedureParameter> ret = new List<StoredProcedureParameter>();

            string query = $@"
            SELECT
	            P.name AS ParameterName,
	            T.name AS TypeName,
	            T.scale AS TypeScale,
	            T.max_length AS TypeLength,
	            P.is_output AS IsOutput
            FROM
	            sys.objects O
	            JOIN sys.parameters P ON
		            P.object_id = O.object_id
	            JOIN sys.types T ON
		            T.user_type_id = P.user_type_id
            WHERE
	            O.name = '{procedureName}'
	            AND O.type = 'P'";
            
            var connectionString = System.Configuration.ConfigurationManager.AppSettings["ConnectionString"];

            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();

                SqlCommand cmd = new SqlCommand(query);

                cmd.Connection = conn;

                var dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    StoredProcedureParameter parameter = new StoredProcedureParameter();
                    for (int i = 0; i < dr.FieldCount; i++)
                    {
                        string columnName = dr.GetName(i);
                        object value = dr.GetValue(i);

                        if (columnName == "ParameterName")
                        {
                            parameter.ParameterName = value.ToString();
                        }
                        else if (columnName == "IsOutput")
                        {
                            parameter.IsOutput = (bool)value;
                        }
                        else if (columnName == "TypeName")
                        {
                            parameter.TypeName = value.ToString();
                        }
                    }

                    ret.Add(parameter);
                }
            }

            return ret;
        }

        public static JObject ExecuteStoredProcedure(string schema, string procedureName, Dictionary<string, string> parameters, bool isArray)
        {
            var storedProcedureParameters = GetParameters(schema, procedureName);
            var ret = new JObject();

            try {
                var connectionString = System.Configuration.ConfigurationManager.AppSettings["ConnectionString"];

                JValue validationErrorMessage = new JValue((string)null);
                JValue exceptionErrorMessage = new JValue((string)null);

                using (SqlConnection conn = new SqlConnection(connectionString))
                {
                    JObject obj = new JObject();
                    conn.Open();

                    SqlCommand cmd = new SqlCommand(schema + "." + procedureName);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    cmd.Connection = conn;

                    SqlParameter errorMessageParameter = new SqlParameter("_ErrorMessage", (string)null);
                    errorMessageParameter.Direction = System.Data.ParameterDirection.Output;
                    errorMessageParameter.Size = -1;

                    if (storedProcedureParameters.Exists(x => x.ParameterName.ToLower() == "@_errormessage"))
                    {
                        cmd.Parameters.Add(errorMessageParameter);
                    }

                    foreach (var par in parameters)
                    {
                        if (storedProcedureParameters.Exists(x => x.ParameterName.ToLower() == "@" + par.Key.ToLower()))
                        {
                            cmd.Parameters.AddWithValue(par.Key, par.Value);
                        }
                    }

                    JArray resultArray = new JArray();
                    JObject row = new JObject();
                    var dr = cmd.ExecuteReader();
                    while (dr.Read())
                    {
                        row = new JObject();
                        for (int i = 0; i < dr.FieldCount; i++)
                        {
                            string columnName = dr.GetName(i);
                            object value = dr.GetValue(i);
                            JValue val = new JValue(value);

                            //ret.Add(columnName, val);
                            row.Add(columnName, val);
                        }


                        resultArray.Add(row);
                    }

                    if (errorMessageParameter.Value != DBNull.Value)
                    {
                        validationErrorMessage = new JValue((string)errorMessageParameter.Value);
                    }

                    ret.Add("ValidationErrorMessage", validationErrorMessage);
                    ret.Add("ExceptionMessage", exceptionErrorMessage);

                    if (isArray)
                    {
                        ret.Add("Result", resultArray);
                    } else
                    {
                        ret.Add("Result", row);
                    }
                }
            }
            catch (Exception ex)
            {
                ret.Add("ExceptionMessage", ex.Message);
            }

            return ret;
        }

        public static JObject ExecuteSqlService(string serviceName, Dictionary<string, string> parameters)
        {
            var ret = new JObject();

            var sqlPath = System.Configuration.ConfigurationManager.AppSettings["SqlPath"];
            var files = Directory.GetFiles(sqlPath);

            foreach(string file in files)
            {
                Regex re = new Regex("([A-Za-z]+)([.]sql)");
                var match = re.Match(file);
                var val = match.Groups[1].Value;
                if (val.ToLower() == serviceName.ToLower())
                {
                    StreamReader reader = new StreamReader(file);
                    string text = reader.ReadToEnd();

                    text = GenerateSql(text, parameters);
                    return ExecuteSql(text, parameters);
               } 
            }

            return ret;
        }
    }
}