namespace CommunityCar.Domain.Entities.Gamification
{
    public class Badge : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string IconUrl { get; set; } = string.Empty;
        public string Criteria { get; set; } = string.Empty;

        public Badge() { }

        public Badge(string name, string description, string iconUrl, string criteria)
        {
            Name = name;
            Description = description;
            IconUrl = iconUrl;
            Criteria = criteria;
        }
    }
}