namespace FitnessTracker.Models
{
    public class User
    {
      

        public User(int uid, string username, string password, string type,string gender)
        {
            this.uid = uid;
            this.username = username;
            this.password = password;
            this.type = type;
            this.gender = gender;
        }
        
        public int uid { get; set; }
        public string username { get; set; }
        public string password { get; set; }

        public string type { get; set; }

        public string gender { get; set; }
    }
}
