namespace WebBack.SearchReauestClasses
{
    public class CarSearchRequest
    {
        public string? CarType { get; set; } // Напр. "Будь-який"
        public string? Price { get; set; } // Напр. "Всі"
        public string? Region { get; set; } // Напр. "Київ"
        public string? SearchType { get; set; } // Напр. "Вживані"
        public string? SelectedBrand { get; set; } // Напр. "Audi"
        public string? SelectedModel { get; set; } // Напр. "A3"
        public bool VinChecked { get; set; } // false
        public string? Year { get; set; } // Напр. "2024"
    }
}
