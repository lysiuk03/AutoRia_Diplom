using System.ComponentModel.DataAnnotations;
using WebBack.Enums;

namespace WebBack.Data.Entities
{

    

    public class PriceEntity : BaseEntity
    {
        [Required]
        public decimal Amount { get; set; }

        [Required]
        public CurrencyTypeEnum Currency { get; set; } = CurrencyTypeEnum.Dollars;

        public bool PriceIncludesVAT { get; set; } = false; // Whether the price includes VAT, default to false

        public bool CustomsCleared { get; set; } = false; // Whether the item is customs cleared, default to false

        public bool Negotiable { get; set; } = false; // Whether negotiation is possible, default to false

        public bool ExchangeForRealEstate { get; set; } = false; // Whether exchange for real estate is possible, default to false

        public bool ExchangeForCar { get; set; } = false; // Whether exchange for another car is possible, default to false
    }
}
