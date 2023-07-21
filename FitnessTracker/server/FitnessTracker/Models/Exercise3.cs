namespace FitnessTracker.Models
{
    public class Exercise3
    {

        public Exercise3(int eid,string name,string type,string m_group,string link,string photo)
        {
            this.eid = eid;
            this.name = name;
            this.type = type;
            this.m_group = m_group;
            this.link = link;
            this.photo = photo;
        }
        public int eid { get; set; }
        public string name { get; set; }

        public string type { get; set; }

        public string m_group { get; set; } 

        public string link { get; set; }

        public string photo { get; set; }   
    }
}
