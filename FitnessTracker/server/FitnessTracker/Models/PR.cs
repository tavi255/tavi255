namespace FitnessTracker.Models
{
    public class PR
    {

        public PR(string exerciseName,int rm,int weight,int volume)
        {
            this.RM = rm;
            this.weight = weight;
            this.volume = volume;
            this.exerciseName = exerciseName;
        }
        public int RM { get; set; }
        public int weight { get;set; }
        public int volume { get;set; }
        public string exerciseName { get; set; }   
    }
}
