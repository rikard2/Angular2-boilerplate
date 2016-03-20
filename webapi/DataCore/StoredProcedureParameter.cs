namespace DataCore
{
    public class StoredProcedureParameter 
    {
        public string ParameterName { get; set; }
        public string TypeName { get; set; }
        public bool IsOutput { get; set; }
    }
}