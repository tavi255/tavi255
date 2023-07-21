namespace FitnessTracker.Models
{
    public class History
    {

        public History(int hid,String hDate, string exercisesData, string observations)
        {
            this.hDate = hDate;
            this.exercisesData = exercisesData;
            this.observations = observations;
            this.hid = hid;
        }
    
        public string hDate { get; set; }
        public string exercisesData { get; set; }

        public string observations { get; set; } = "";

        public int hid { get; set; }

    }
}
