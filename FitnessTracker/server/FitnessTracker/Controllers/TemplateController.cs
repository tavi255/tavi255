using FitnessTracker.Tools;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using FitnessTracker.Models;
using Microsoft.Extensions.Primitives;
using System.Xml.Linq;

namespace FitnessTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TemplateController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public TemplateController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public IActionResult getTemplates()
        {
            int id = GetUserInfo.getUserId(HttpContext);

            if (id == -1)
                return BadRequest("Session expired!" +
                    "Login again!");


            string query = "select * from template where uid="+id;
            DataTable tbl = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("FitnessTracker");

            SqlDataReader r;

            string name = "";

            List<Template> templates=new List<Template>();
          

           
 

            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand cmd = new SqlCommand(query, myCon))
                    {
                        
                        r = cmd.ExecuteReader();
                        if (!r.HasRows)
                            return Ok(templates);

                        else
                        {
                           while(r.Read())
                            {
                                templates.Add(new Template(r.GetString(2),new List<ExerciseWithSets>(),r.GetInt32(0)));
            
          
                            }

                        }

                    }
                    r.Close();

                    string query2 = "select * from ExerciseTemplate where tid=";

                  

                   
                    for(int i=0;i<templates.Count;i++)
                    {
                        Template template=templates[i];
                        int idd = template.id;
                        string q2 = query2 + idd;

                        List<int> eid = new List<int>();
                        List<int> no_sets = new List<int>();
                        List<int> priority = new List<int>();

                        using (SqlCommand cmd = new SqlCommand(q2, myCon))
                        {

                            r = cmd.ExecuteReader();
                            
                            if(r.HasRows)
                            {
                                while (r.Read())
                                {
                                    eid.Add(r.GetInt32(0));
                                    no_sets.Add(r.GetInt32(2));
                                    priority.Add(r.GetInt32(3));

                                }

                            }

                            r.Close();

                        }

                        string query3 = "select * from exercise where eid=";

                        for(int j=0;j<eid.Count;j++)
                        {
                            string q3= query3 + eid[j];
                            using (SqlCommand cmd = new SqlCommand(q3, myCon))
                            {

                                r = cmd.ExecuteReader();
                                if (!r.HasRows)
                                    return BadRequest("Invalid exercise!");

                                else
                                {
                                    while (r.Read())
                                    {
                                        int eidd = eid[j];
                                        string name1 = r.GetString(2);
                                        string type = r.GetString(3);
                                        string muscle_group=r.GetString(4);
                                        string description=r.GetString(5);
                                        string link=r.GetString(6);
                                        string photo = "";

                                        int sets = no_sets[j];


                                   
                                        string filepath = "";
                                        String filename = eidd + "." + "jpg";
                                        var physicalPath = _env.ContentRootPath + "/Photos/Exercises/" + filename;

                                        if (System.IO.File.Exists(physicalPath))
                                        {
                                            filepath = "https://localhost:8080/Photos/Exercises/" + filename;
                                            photo = filepath;
                                        }

                                        ExerciseWithSets ex = new ExerciseWithSets(name1, type, muscle_group, description, link, sets, photo, eidd, priority[j]);
                                        templates[i].exercises.Add(ex);


                                    }

                                }

                                r.Close();

                            }



                        }



                    }

                    

                    myCon.Close();
                    
                }
            }

            catch (Exception ex)
            {
                return BadRequest("An error occured!");
            }


            return Ok(templates);

        }

        [HttpPost("deleteTemplate/{id}")]
        public IActionResult deleteTemplate(int id)
        {

            string query = "delete from ExerciseTemplate where tid=@tid;delete from Template where tid=@tid";
                DataTable tbl = new DataTable();

                string sqlDataSource = _configuration.GetConnectionString("FitnessTracker");

                SqlDataReader r;

                string name = "";
                try
                {
                    using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                    {
                        myCon.Open();
                        using (SqlCommand cmd = new SqlCommand(query, myCon))
                        {
                            SqlParameter uidP = new SqlParameter("@tid", SqlDbType.Int);

                            uidP.Value = id;

                            cmd.Parameters.Add(uidP);

                            cmd.Prepare();
                            int rows = cmd.ExecuteNonQuery();
                            if (rows == 0)
                                return BadRequest("An error occured!");



                        }

                        myCon.Close();

                    }
                }

                catch (Exception ex)
                {
                    return BadRequest("An error occured!");
                }


                return Ok("Template succesfully deleted!");

            }

        [HttpPost("addTemplate")]
        public IActionResult addTemplate(Template2 template)
        {

            int id = GetUserInfo.getUserId(HttpContext);
            string query = "insert into Template values (" + id + ",@name);" +
                "SELECT tid FROM Template WHERE tid = scope_identity()";
            DataTable tbl = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("FitnessTracker");

            SqlDataReader r;

            string name = "";

            int tid = -1;

            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand cmd = new SqlCommand(query, myCon))
                    {
                        SqlParameter nameP = new SqlParameter("@name", SqlDbType.VarChar,50);

                        nameP.Value = template.name;

                        cmd.Parameters.Add(nameP);

                        cmd.Prepare();
                        r = cmd.ExecuteReader();
                        if (!r.HasRows)
                            return BadRequest("An error occured!");

                        r.Read();

                       tid= r.GetInt32(0);



                    }

                    r.Close();

                    string query2 = "insert into ExerciseTemplate values(@eid,@tid,@no_sets,@priority)";
                    using (SqlCommand cmd = new SqlCommand(query2, myCon))
                    {
                        int i = 0;
                        foreach(Exercise2 exercise in template.exercises)
                        {
                            SqlParameter eidP = new SqlParameter("@eid", SqlDbType.Int);

                            eidP.Value = exercise.eid;

                            SqlParameter tidP = new SqlParameter("@tid", SqlDbType.Int);

                            tidP.Value = tid;

                            SqlParameter no_setsP = new SqlParameter("@no_sets", SqlDbType.Int);

                            no_setsP.Value = exercise.no_sets;


                            SqlParameter priorityP = new SqlParameter("@priority", SqlDbType.Int);

                            priorityP.Value = exercise.priority;

                            if (i==0)
                            {
                                cmd.Parameters.Add(eidP);
                                cmd.Parameters.Add(tidP);
                                cmd.Parameters.Add(no_setsP);
                                cmd.Parameters.Add(priorityP);
                            }

                            else
                            {
                                cmd.Parameters["@eid"]= eidP;
                                cmd.Parameters["@tid"] = tidP;
                                cmd.Parameters["@no_sets"] = no_setsP;
                                cmd.Parameters["@priority"]= priorityP;
                            }

                        

                            cmd.Prepare();

                            int rows = cmd.ExecuteNonQuery();

                            if (rows == 0)
                                return BadRequest("An error occured!");

                            i++;
                        }


                    }



                    myCon.Close();

                }
            }

            catch (Exception ex)
            {
                return BadRequest("An error occured!");
            }


            return Ok("Template succesfully added!");

        }

        [HttpPost("addTemplate/{id}")]
        [Authorize(Roles ="trainer")]
        public IActionResult addTemplateForTrainee(Template2 template,int id)
        {

            string query = "insert into Template values (" + "@id" + ",@name);" +
                "SELECT tid FROM Template WHERE tid = scope_identity()";
            DataTable tbl = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("FitnessTracker");

            SqlDataReader r;

            string name = "";

            int tid = -1;

            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand cmd = new SqlCommand(query, myCon))
                    {
                        SqlParameter nameP = new SqlParameter("@name", SqlDbType.VarChar, 50);
                        nameP.Value = template.name;

                        SqlParameter idP = new SqlParameter("@id", SqlDbType.Int);
                        idP.Value = id;

                      

                        cmd.Parameters.Add(nameP);
                        cmd.Parameters.Add(idP);

                        cmd.Prepare();
                        r = cmd.ExecuteReader();
                        if (!r.HasRows)
                            return BadRequest("An error occured!");

                        r.Read();

                        tid = r.GetInt32(0);



                    }

                    r.Close();

                    string query2 = "insert into ExerciseTemplate values(@eid,@tid,@no_sets,@priority)";
                    using (SqlCommand cmd = new SqlCommand(query2, myCon))
                    {
                        int i = 0;
                        foreach (Exercise2 exercise in template.exercises)
                        {
                            SqlParameter eidP = new SqlParameter("@eid", SqlDbType.Int);

                            eidP.Value = exercise.eid;

                            SqlParameter tidP = new SqlParameter("@tid", SqlDbType.Int);

                            tidP.Value = tid;

                            SqlParameter no_setsP = new SqlParameter("@no_sets", SqlDbType.Int);

                            no_setsP.Value = exercise.no_sets;


                            SqlParameter priorityP = new SqlParameter("@priority", SqlDbType.Int);

                            priorityP.Value = exercise.priority;

                            if (i == 0)
                            {
                                cmd.Parameters.Add(eidP);
                                cmd.Parameters.Add(tidP);
                                cmd.Parameters.Add(no_setsP);
                                cmd.Parameters.Add(priorityP);
                            }

                            else
                            {
                                cmd.Parameters["@eid"] = eidP;
                                cmd.Parameters["@tid"] = tidP;
                                cmd.Parameters["@no_sets"] = no_setsP;
                                cmd.Parameters["@priority"] = priorityP;
                            }



                            cmd.Prepare();

                            int rows = cmd.ExecuteNonQuery();

                            if (rows == 0)
                                return BadRequest("An error occured!");

                            i++;
                        }


                    }



                    myCon.Close();

                }
            }

            catch (Exception ex)
            {
                return BadRequest("An error occured!");
            }


            return Ok("Template succesfully added!");

        }

        [HttpPost("addExercise")]
        public IActionResult addExercise(Exercise exercise)
        {
            int id = GetUserInfo.getUserId(HttpContext);

            if (id == -1)
                return BadRequest("Session expired!" +
                    "Login again!");



            string query = "insert into Exercise values ( @uid,@name,@type,@m_group,@description,@link);" +
                "SELECT eid FROM Exercise WHERE eid = scope_identity()";
            DataTable tbl = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("FitnessTracker");

            SqlDataReader r;

            string name = "";
            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand cmd = new SqlCommand(query, myCon))
                    {
                        SqlParameter uidP = new SqlParameter("@uid", SqlDbType.Int);

                        uidP.Value = id;

                        SqlParameter nameP = new SqlParameter("@name", SqlDbType.VarChar,50);

                        nameP.Value = exercise.name;

                        SqlParameter typeP = new SqlParameter("@type", SqlDbType.VarChar,100);

                        typeP.Value = exercise.type;

                        SqlParameter m_groupP = new SqlParameter("@m_group", SqlDbType.VarChar,50);

                        m_groupP.Value = exercise.group;

                        SqlParameter descriptionP = new SqlParameter("@description", SqlDbType.Text,-1);

                        descriptionP.Value = exercise.description;

                        SqlParameter linkP = new SqlParameter("@link", SqlDbType.VarChar,500);

                        linkP.Value = exercise.link;

                        cmd.Parameters.Add(uidP);
                        cmd.Parameters.Add(nameP);
                        cmd.Parameters.Add(typeP);
                        cmd.Parameters.Add(m_groupP);
                        cmd.Parameters.Add(descriptionP);
                        cmd.Parameters.Add(linkP);

                        cmd.Prepare();
                        r=cmd.ExecuteReader();


                        if (!r.HasRows)
                            return BadRequest("An error occured!");

                        r.Read();
                        int eid = r.GetInt32(0);
                        return Ok(eid);





                    }

                    myCon.Close();

                }
            }

            catch (Exception ex)
            {
                return BadRequest("An error occured!");
            }


            return Ok("Exercise succesfully added!");

        }

        [HttpPost("deleteFromTemplate")]
        public IActionResult deleteFromTemplate(ExerciseTemplate et)
        {
           

            string query = "delete from ExerciseTemplate where eid=@eid and tid=@tid";
            DataTable tbl = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("FitnessTracker");

            SqlDataReader r;

            string name = "";
            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand cmd = new SqlCommand(query, myCon))
                    {
                        SqlParameter tidP = new SqlParameter("@tid", SqlDbType.Int);

                        tidP.Value = et.tid;


                        SqlParameter eidP = new SqlParameter("@eid", SqlDbType.Int);

                        eidP.Value = et.eid;


                        cmd.Parameters.Add(eidP);
                        cmd.Parameters.Add(tidP);

                        cmd.Prepare();
                        int rows = cmd.ExecuteNonQuery();
                        if (rows == 0)
                            return BadRequest("An error occured!");



                    }

                    myCon.Close();

                }
            }

            catch (Exception ex)
            {
                return BadRequest("An error occured!");
            }


            return Ok("Exercise succesfully deleted!");

        }

        [HttpPut("updateTemplate/{tid}/{name}")]
        public IActionResult updateTemplate(List<Exercise2>exercises,int tid,string name)
        {

            string q1 = "update Template set name=@name where tid=@tid";
            string query = "delete from ExerciseTemplate where tid=@tid";
            DataTable tbl = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("FitnessTracker");

            SqlDataReader r;

            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();

                     using (SqlCommand cmd = new SqlCommand(q1, myCon))
                    {
                        SqlParameter tidP = new SqlParameter("@tid", SqlDbType.Int);

                        tidP.Value = tid;

                        SqlParameter nameP = new SqlParameter("@name", SqlDbType.VarChar,50);

                        tidP.Value = tid;
                        cmd.Parameters.Add(tidP);

                        nameP.Value = name;
                        cmd.Parameters.Add(nameP);

                        cmd.Prepare();
                        int rows = cmd.ExecuteNonQuery();
                        if (rows == 0)
                            return BadRequest("An error occured!");



                    }

                    using (SqlCommand cmd = new SqlCommand(query, myCon))
                    {
                        SqlParameter tidP = new SqlParameter("@tid", SqlDbType.Int);

                        tidP.Value = tid;
                        cmd.Parameters.Add(tidP);

                        cmd.Prepare();
                        int rows = cmd.ExecuteNonQuery();
                        if (rows == 0)
                            return BadRequest("An error occured!");



                    }

                    string query2 = "insert into ExerciseTemplate values(@eid,@tid,@no_sets,@priority)";

                    using (SqlCommand cmd = new SqlCommand(query2, myCon))
                    {

                        SqlParameter tidP = new SqlParameter("@tid", SqlDbType.Int);
                        SqlParameter eidP = new SqlParameter("@eid", SqlDbType.Int);
                        SqlParameter no_setsP = new SqlParameter("@no_sets", SqlDbType.Int);
                        SqlParameter priorityP = new SqlParameter("@priority", SqlDbType.Int);

                        int i = 0;

                        foreach (Exercise2 exercise in exercises)
                        {
                            tidP.Value = tid;
                            eidP.Value = exercise.eid;
                            no_setsP.Value = exercise.no_sets;
                            priorityP.Value = exercise.priority;

                            if(i==0)
                            {
                                cmd.Parameters.Add(tidP);
                                cmd.Parameters.Add(eidP);
                                cmd.Parameters.Add(no_setsP);
                                cmd.Parameters.Add(priorityP);
                            }

                            else
                            {
                                cmd.Parameters["@tid"]=tidP;
                                cmd.Parameters["@eid"] = eidP;
                                cmd.Parameters["@no_sets"] = no_setsP;
                                cmd.Parameters["@priority"]=priorityP;
                            }


                            cmd.Prepare();
                            int rows = cmd.ExecuteNonQuery();
                            if (rows == 0)
                                return BadRequest("An error occured!");

                            i++;
                        }
                        

                    

                    }

                    myCon.Close();

                }
            }

            catch (Exception ex)
            {
                return BadRequest("An error occured!");
            }


            return Ok("Template updated succesfully!");

        }

        [HttpPut("updateExercise")]
        public IActionResult updateExercise(ExerciseTemplate et)
        {

            string query = "";

            if (et.no_sets == 0)
                query = "delete from ExerciseTemplate where eid=@eid and tid=@tid";

            else
            {
                query = "update ExerciseTemplate set no_sets=@no_sets where eid=@eid and tid=@tid";
            }
           
            DataTable tbl = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("FitnessTracker");

            SqlDataReader r;

            string name = "";
            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand cmd = new SqlCommand(query, myCon))
                    {
                        SqlParameter tidP = new SqlParameter("@tid", SqlDbType.Int);

                        tidP.Value = et.tid;


                        SqlParameter eidP = new SqlParameter("@eid", SqlDbType.Int);

                        eidP.Value = et.eid;


                        cmd.Parameters.Add(eidP);
                        cmd.Parameters.Add(tidP);

                        if (et.no_sets != 0)
                        {
                            SqlParameter no_setsP = new SqlParameter("@no_sets", SqlDbType.Int);

                            no_setsP.Value = et.no_sets;
                            cmd.Parameters.Add(no_setsP);
                        }

                            cmd.Prepare();
                        int rows = cmd.ExecuteNonQuery();
                        if (rows == 0)
                            return BadRequest("An error occured!");



                    }

                    myCon.Close();

                }
            }

            catch (Exception ex)
            {
                return BadRequest("An error occured!");
            }


            return Ok("Exercise succesfully updated!");

        }

        [HttpGet("getExercises")]
        public IActionResult getExercises()
        {

            int id = GetUserInfo.getUserId(HttpContext);
            string query = "select * from exercise where uid="+id+" or uid is null";

          

            DataTable tbl = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("FitnessTracker");

            SqlDataReader r;



            List<Exercise3> ls = new List<Exercise3>();

            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand cmd = new SqlCommand(query, myCon))
                    {
                      

                        r=cmd.ExecuteReader();
                        if (!r.HasRows)
                            return Ok(ls);
                        else
                        {
                            while(r.Read())
                            {
                                int eid = r.GetInt32(0);
                                string name = r.GetString(2);
                                string type = r.GetString(3);
                                string m_group = r.GetString(4);
                                string description = r.GetString(5);
                                string link = r.GetString(6);
                                string photo = "";



                                int idd = eid;
                                string filepath = "";
                                String filename = idd + "." + "jpg";
                                var physicalPath = _env.ContentRootPath + "/Photos/Exercises/" + filename;

                                if (System.IO.File.Exists(physicalPath))
                                {
                                    filepath = "https://localhost:8080/Photos/Exercises/" + filename;
                                    photo = filepath;
                                }

                                ls.Add(new Exercise3(eid, name, type, m_group, link, photo));
                                

                            }
                        }





                    }

                    myCon.Close();

                }
            }

            catch (Exception ex)
            {
                return BadRequest("An error occured!");
            }


            return Ok(ls);

        }


        [HttpPut("upload_Photo/{eid}")]
        public IActionResult upload_Photo(int eid)
        {

            Console.WriteLine(eid);

            try
            {
                var req = Request.Form;
                var file = req.Files[0];
                String[] extension = file.FileName.Split('.');
                String filename = eid + "." + "jpg";
                var physicalPath = _env.ContentRootPath + "/Photos/Exercises/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                return new JsonResult("File succesfully uploaded!");

            }

            catch (Exception ex)
            {
                return new JsonResult(ex.Message);
            }
        }


        [HttpPut("updatePriority")]
        public IActionResult updatePriority(List<Priority>exercises)
        {


            string query = "update ExerciseTemplate set priority=@priority where eid=@eid and tid=@tid";



            DataTable tbl = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("FitnessTracker");

            SqlDataReader r;



            

            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand cmd = new SqlCommand(query, myCon))
                    {

                        SqlParameter priorityP = new SqlParameter("@priority", SqlDbType.Int);
                        SqlParameter eidP = new SqlParameter("@eid", SqlDbType.Int);
                        SqlParameter tidP = new SqlParameter("@tid", SqlDbType.Int);


                        for (int i=0;i<exercises.Count; i++)
                        {
                            priorityP.Value = exercises[i].priority;
                            eidP.Value = exercises[i].eid;
                            tidP.Value = exercises[i].tid;


                            if(i==0)
                            {
                                cmd.Parameters.Add(priorityP);
                                cmd.Parameters.Add(eidP);
                                cmd.Parameters.Add(tidP);

                            }

                            else
                            {
                                cmd.Parameters["@eid"]=eidP;
                                cmd.Parameters["@priority"]=priorityP;
                                cmd.Parameters["@tid"] = priorityP;
                            }

                            cmd.Prepare();
                            int rows = cmd.ExecuteNonQuery();

                            if (rows == 0)
                                return BadRequest("An error occured!");
                        }


                    }

                    myCon.Close();

                }
            }

            catch (Exception ex)
            {
                return BadRequest("An error occured!");
            }


            return Ok("exercise priority succesfully updated!");

        }







    }
}
