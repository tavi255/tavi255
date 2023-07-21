namespace FitnessTracker.Models
{
    public class ExerciseWithSets
    {

        public ExerciseWithSets(string name, string type, string group, string description, string link, int no_sets,string photo, int eid, int priority)
        {
            this.name = name;
            this.type = type;
            this.group = group;
            this.description = description;
            this.link = link;
            this.no_sets = no_sets;
            this.photo = photo;
            this.eid = eid;
            this.priority = priority;
        }


        public string name { get; set; } = "";

        public string type { get; set; } = "";

        public string group { get; set; } = "";

        public string description { get; set; } = "";

        public string link { get; set; } = "";

        public int no_sets { get; set; }

        public string photo { get; set; }

        public int eid { get; set; }   
        
        public int priority { get; set; }
    }
}
