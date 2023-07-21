namespace FitnessTracker.Models
{
    public class Template
    {

        public Template(string name, List<ExerciseWithSets> exercises,int id)
        {
            this.name = name;
            this.exercises = exercises;
            this.id = id;
        }

        public int id { get; set; } = 0;

        public string name { get; set; }

        public List<ExerciseWithSets> exercises { get; set; }


    }
}
