namespace FitnessTracker.Models
{
    public class UserProfile
    {
        public string name { get; set; }  = string.Empty;
        public int age { get; set; } = -1;

        public double height { get; set; } = -1;

        public double weight { get; set; } = -1;

        public int calorie_goal { get; set; } = -1;

       


    }
}
