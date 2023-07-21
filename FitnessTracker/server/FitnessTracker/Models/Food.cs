namespace FitnessTracker.Models
{
    public class Food
    {

        public Food(int fid, string description, int protein, int fat, int carbohydrate, string unit, double servingSize,string hDate, int calories,string ingredients)
        {
            this.fid = fid;
            this.description = description;
            this.protein = protein;
            this.fat = fat;
            this.carbohydrate = carbohydrate;
            this.unit = unit;
            this.servingSize = servingSize;
            this.hDate = hDate;
            this.calories = calories;
            this.ingredients = ingredients;
            
        }

        public int fid { get; set; }
        public string description { get; set; }    
        public int protein { get; set; }
        public int fat { get; set; }
        public int carbohydrate { get; set; }
        public string unit { get; set; }   
        public double servingSize { get; set; }

        public string hDate { get; set; }

        public int calories { get; set; }

        public string ingredients { get; set; } 
        

    }
}
