using System.ComponentModel.DataAnnotations;

namespace Neura.Models
{
    public class Launch
    {
        public string Id { get; set; } // Or Guid if preferred
        public string SpaceXId { get; set; }
        public int Flight_Number { get; set; }
        public string Name { get; set; }
        public DateTime Date_Utc { get; set; }
        public string? Details { get; set; }

        public Links Links { get; set; }
    }

    public class Links
    {
        [Key]
        public int Id { get; set; }
        public Patch? Patch { get; set; }
    }

    public class Patch
    {
        [Key]
        public int Id { get; set; }

        public string Small { get; set; }
        public string Large { get; set; }
    }

}
