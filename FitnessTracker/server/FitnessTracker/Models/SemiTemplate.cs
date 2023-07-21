namespace FitnessTracker.Models
{
    public class SemiTemplate
    {

        public SemiTemplate(int tid,string name)
        {
            this.tid = tid;
            this.name = name;
        }
        public int tid { get; set; }
        public string name { get; set; }

    }
}
