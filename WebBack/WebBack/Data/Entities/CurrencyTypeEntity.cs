namespace WebBack.Data.Entities
{
    public class CurrencyTypeEntity:BaseEntity
    {

        public string Name { get; set; } = "Dollar";
        public string CurrencyCode { get; set; } = "USD";
        public string CurrencyName { get; set; } = "United States Dollar";
        public string CurrencySymbol { get; set; } = "$";
        public bool IsBaseCurrency { get; set; } = true;
    }
}
