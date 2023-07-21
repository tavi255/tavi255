namespace FitnessTracker.Models
{
    public class UpdateFood
    {
        public int fid { get; set; }
        public int protein { get; set; }
        public int fat { get; set; }

        public int carbohydrate { get; set; }

        public double servingSize { get; set; } 

        public int calories { get; set; }   
        

    }
}
