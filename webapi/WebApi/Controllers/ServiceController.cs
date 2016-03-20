using DataCore;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace WebApi.Controllers
{
    public class ServiceController : ApiController
    {
        [HttpPost]
        public JObject Hello(string name, [FromBody]JObject jsonbody)
        {
            return new JObject();
        }

        [HttpPost]
        public JObject Save(string serviceName, [FromBody]JObject jsonbody)
        {
            if (jsonbody == null)
            {
                throw new Exception("Body must be a JSON Object.");
            }

            if (jsonbody["Model"] == null)
            {
                throw new Exception("JSON Object must contain a 'Model' object.");
            }

            Dictionary<string, string> parameters = new Dictionary<string, string>();

            foreach (var obj in jsonbody["Model"])
            {
                JProperty prop = obj as JProperty;
                string name = prop.Name.ToString();
                string value = prop.Value.ToString();

                if (string.IsNullOrWhiteSpace(value))
                {
                    value = null;
                }

                parameters.Add(name, value);
            }

            JObject response = Sql.ExecuteStoredProcedure("API", serviceName, parameters, false) as JObject;

            return response;
        }

        [HttpPost]
        public JObject Single(string serviceName, [FromBody]JObject jsonbody)
        {
            if (jsonbody == null)
            {
                throw new Exception("Body must be a JSON Object.");
            }

            if (jsonbody["Model"] == null)
            {
                throw new Exception("JSON Object must contain a 'Model' object.");
            }

            Dictionary<string, string> parameters = new Dictionary<string, string>();
            
            foreach (var obj in jsonbody["Model"])
            {
                JProperty prop = obj as JProperty;
                string name = prop.Name.ToString();
                string value = prop.Value.ToString();

                if (string.IsNullOrWhiteSpace(value))
                {
                    value = null;
                }

                parameters.Add(name, value);
            }

            JObject response = Sql.ExecuteStoredProcedure("API", serviceName, parameters, false) as JObject;

            return response;
        }

        [HttpPost]
        public JObject List(string serviceName, [FromBody]JObject jsonbody)
        {
            if (jsonbody == null)
            {
                throw new Exception("Body must be a JSON Object.");
            }

            if (jsonbody["Model"] == null)
            {
                throw new Exception("JSON Object must contain a 'Model' object.");
            }

            Dictionary<string, string> parameters = new Dictionary<string, string>();

            foreach (var obj in jsonbody["Model"])
            {
                JProperty prop = obj as JProperty;
                string name = prop.Name.ToString();
                string value = prop.Value.ToString();

                if (string.IsNullOrWhiteSpace(value))
                {
                    value = null;
                }

                parameters.Add(name, value);
            }

            JObject response = Sql.ExecuteStoredProcedure("API", serviceName, parameters, true);

            return response;
        }
    }
}