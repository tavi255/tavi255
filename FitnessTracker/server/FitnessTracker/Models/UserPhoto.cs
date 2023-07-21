namespace FitnessTracker.Models
{
    public class UserPhoto
    {
        public UserPhoto(int id, string link, string name)
        {
            this.id = id;
            this.link = link;
            this.name = name;
        }

        public int id { get; set; }    
        public string link { get; set; }

        public string name { get; set; }
    }
}
