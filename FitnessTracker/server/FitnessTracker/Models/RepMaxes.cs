namespace FitnessTracker.Models
{
    public class RepMaxes
    {

        public RepMaxes(string exercise, string exerciseData, int one_rep_max, string hDate)
        {
            this.exercise = exercise;
            this.exerciseData = exerciseData;
            this.one_rep_max = one_rep_max;
            this.hDate = hDate;
        }

        public string exercise { get; set; }    
        public string exerciseData { get; set; }    

        public int one_rep_max { get; set; }    

        public string hDate { get; set; }    


    }
}
