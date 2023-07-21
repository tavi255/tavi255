using FitnessTracker.Models;
using FitnessTracker.Tools;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Security.Claims;

namespace FitnessTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class UserController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

  

        public UserController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [Authorize(Roles = "trainer")]
        [HttpGet("getTrainees")]
        public IActionResult getTrainees()
        {

            int id = GetUserInfo.getUserId(HttpContext);
       

            if (id == -1)
                return BadRequest("Session expired!" +
                    "Login again!");

            string query = "select uid,name from profiles where uid in (select traineeid from TrainerTrainee where trainerid=" + id+")";
            DataTable tbl = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("FitnessTracker");

            SqlDataReader r;

            List<UserPhoto> ls = new List<UserPhoto>();


            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand cmd = new SqlCommand(query, myCon))
                    {

                        r = cmd.ExecuteReader();
                        if (!r.HasRows)
                            return Ok(ls);

                        else
                        {
                            while(r.Read())
                            {
                                ls.Add(new UserPhoto(r.GetInt32(0), "", r.GetString(1)));
                            }


                        }

                    }

                    myCon.Close();
                    r.Close();
                }
            }

            catch (Exception ex)
            {
                return BadRequest("An error occured!");
            }

            

            for(int i=0;i<ls.Count;i++)
            {
                int idd = ls[i].id;
                string filepath = "";
                String filename = idd + "." + "jpg";
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                if (System.IO.File.Exists(physicalPath))
                {
                    filepath = "https://localhost:8080/Photos/" + filename;
                    ls[i].link = filepath;
                }
            }

            return Ok(ls);

           
        }
        [Authorize(Roles = "trainer")]
        [HttpGet("getName/{id}")]
        public IActionResult getName(int id)
        {


            string query = "select name from profiles where uid=@uid";
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

                        cmd.Parameters.Add(uidP);

                        cmd.Prepare();
                        r = cmd.ExecuteReader();
                        if (!r.HasRows)
                            return Ok("");

                        else
                        {
                            r.Read();
                            name=r.GetString(0);


                        }

                    }

                    myCon.Close();
                    r.Close();
                }
            }

            catch (Exception ex)
            {
                return BadRequest("An error occured!");
            }
 

            return Ok(name);


        }

        [Authorize(Roles = "trainer")]
        [HttpGet("getAll")]
        public IActionResult getAll()
        {

            int id = GetUserInfo.getUserId(HttpContext);
            string query = "select uid,name from Profiles where uid in (select uid from users where type='trainee') and uid not in (select traineeid from TrainerTrainee)";
            DataTable tbl = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("FitnessTracker");

            SqlDataReader r;

            List<UserPhoto> ls = new List<UserPhoto>();
            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand cmd = new SqlCommand(query, myCon))
                    {
                      
                        r = cmd.ExecuteReader();
                        if (!r.HasRows)
                            return Ok(ls);

                        else
                        {
                            while (r.Read())
                                ls.Add(new UserPhoto(r.GetInt32(0), "", r.GetString(1)));


                        }

                    }

                    myCon.Close();
                    r.Close();
                }
            }

            catch (Exception ex)
            {
                return BadRequest("An error occured!");
            }

            for (int i = 0; i < ls.Count; i++)
            {
                int idd = ls[i].id;
                string filepath = "";
                String filename = idd + "." + "jpg";
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                if (System.IO.File.Exists(physicalPath))
                {
                    filepath = "https://localhost:8080/Photos/" + filename;
                    ls[i].link = filepath;
                }
            }


            return Ok(ls);


        }


        [Authorize(Roles = "trainer")]
        [HttpPost("addTrainee/{id}")]
        public IActionResult addTrainee(int id)
        {

            int idd = GetUserInfo.getUserId(HttpContext);

            if(idd==-1)
               return BadRequest("Session expired!" +
                    "Login again!");

            string query = "insert into TrainerTrainee values ("+idd+", @uid)";
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


            return Ok("Trainee succesfully added!");


        }

        [Authorize(Roles = "trainer")]
        [HttpPost("deleteTrainee/{id}")]
        public IActionResult deleteTrainee(int id)
        {

            int idd = GetUserInfo.getUserId(HttpContext);

            if (idd == -1)
                return BadRequest("Session expired!" +
                     "Login again!");

            string query = "delete from TrainerTrainee where trainerid="+idd +" and traineeid=@uid";
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

                        cmd.Parameters.Add(uidP);

                        cmd.Prepare();
                        int rows = cmd.ExecuteNonQuery();
                        if (rows==0)
                            return BadRequest("An error occured!");

                      

                    }

                    myCon.Close();
                
                }
            }

            catch (Exception ex)
            {
                return BadRequest("An error occured!");
            }


            return Ok("Trainee succesfully deleted!");


        }




        [HttpGet]
        public IActionResult getData()
        {

            int id = GetUserInfo.getUserId(HttpContext);
            string type=GetUserInfo.getUserType(HttpContext);

            if (id == -1 || type=="")
                return BadRequest("Session expired!" +
                    "Login again!");

            string query = "select * from Profiles where uid=" + id;
            DataTable tbl = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("FitnessTracker");

            SqlDataReader r;

            int age = -1;
            double height = -1;
            double weight = -1;
            int calorie_goal = -1;
            string name = "";

            

            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand cmd = new SqlCommand(query, myCon))
                    {

                        r = cmd.ExecuteReader();
                        if (!r.HasRows)
                            return BadRequest("Session expired!" +
                                     "Login again!");

                        else
                        {
                            tbl.Load(r);


                            foreach (DataRow dr in tbl.Rows)
                            {
                                name = dr["name"].ToString();

                                Console.WriteLine(dr["age"]);
                                if (dr["age"]!= DBNull.Value)
                                    age = Convert.ToInt32(dr["age"]);

                                if (dr["height"] != DBNull.Value)
                                    height = Convert.ToDouble(dr["height"]);

                                if (dr["weight"] != DBNull.Value)
                                    weight = Convert.ToDouble(dr["weight"]);

                                if (dr["calorie_goal"] != DBNull.Value)
                                    calorie_goal = Convert.ToInt32(dr["calorie_goal"]);


                            }



                        }

                    }

                    myCon.Close();
                    r.Close();
                }
            }

            catch (Exception ex)
            {
                return BadRequest("An error occured!");
            }

            string filepath = "";
            String filename = id + "." + "jpg";
            var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

            if (System.IO.File.Exists(physicalPath))
            {
                filepath = "https://localhost:8080/Photos/" + filename;
            }

            int no_workouts = 0;
            int no_workouts_week = 0;

            string q2 = "select count(*) from History where uid=" + id;
            string q3 = "SELECT COUNT(*) FROM history WHERE DATEPART(WEEK, hDate) = DATEPART(WEEK, GETDATE()) and uid="+id;

            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand cmd = new SqlCommand(q2, myCon))
                    {

                        r = cmd.ExecuteReader();
                        if (!r.HasRows)
                            return BadRequest("Session expired!" +
                                     "Login again!");

                        r.Read();
                        no_workouts = r.GetInt32(0);

                        

                    }
                    r.Close();

                    using (SqlCommand cmd = new SqlCommand(q3, myCon))
                    {

                        r = cmd.ExecuteReader();
                        if (!r.HasRows)
                            return BadRequest("Session expired!" +
                                     "Login again!");

                        r.Read();
                        no_workouts_week = r.GetInt32(0);


                    }

                    myCon.Close();
                    
                }
            }

            catch (Exception ex)
            {
                return BadRequest("An error occured!");
            }

  


            var obj = new
            {
                name = name,
                age = age,
                height = height,
                weight = weight,
                calorieGoal = calorie_goal,
                image = filepath,
                no_workouts = no_workouts,
                no_workouts_week=no_workouts_week,
                type=type

            };

            

            

            return Ok(obj);

        }

        [HttpGet("gender")]
        public IActionResult get_gender()
        {
            int id = GetUserInfo.getUserId(HttpContext);


            if (id == -1)
                return BadRequest("Session expired!" +
                    "Login again!");

            string query = "select gender from users where uid=" + id;


            string sqlDataSource = _configuration.GetConnectionString("FitnessTracker");

            SqlDataReader r;



            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand cmd = new SqlCommand(query, myCon))
                    {



                        r = cmd.ExecuteReader();
                        if (!r.HasRows)
                            return BadRequest("Session expired!" +
                                     "Login again!");

                        r.Read();

                        return Ok(r.GetString(0));



                    }

                    myCon.Close();
                    r.Close();

                }
            }

            catch (Exception ex)
            {
                return BadRequest("An error occured!");
            }

            return BadRequest("An error occured!");
        }



        [HttpPut("updateName/{name}")]
        public IActionResult update_age(string name)
        {
            int id = GetUserInfo.getUserId(HttpContext);



            if (id == -1)
                return BadRequest("Session expired!" +
                    "Login again!");

            string query = "update profiles set name=@name where uid=" + id;
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

                        SqlParameter nameP = new SqlParameter("@name", SqlDbType.VarChar,50);

                        nameP.Value = name;

                        cmd.Parameters.Add(nameP);

                        cmd.Prepare();

                        int rows = cmd.ExecuteNonQuery();
                        if (rows == 0)
                            return BadRequest("Session expired!" +
                                     "Login again!");


                    }

                    myCon.Close();

                }
            }

            catch (Exception ex)
            {
                return BadRequest("An error occured!");
            }

            return Ok("Name succesfully updated");
        }

        [HttpPut("updateAge/{age}")]
        public IActionResult update_age(int age)
        {
            int id = GetUserInfo.getUserId(HttpContext);

          

            if (id == -1)
                return BadRequest("Session expired!" +
                    "Login again!");

            string query = "update profiles set age=@age where uid=" + id;
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

                        SqlParameter ageP = new SqlParameter("@age", SqlDbType.Int);

                        ageP.Value = age;

                        cmd.Parameters.Add(ageP);

                        cmd.Prepare();

                        int rows = cmd.ExecuteNonQuery();
                        if (rows==0)
                            return BadRequest("Session expired!" +
                                     "Login again!");

                       
                    }

                    myCon.Close();
                 
                }
            }

            catch (Exception ex)
            {
                return BadRequest("An error occured!");
            }

            return Ok("Age succesfully updated");
        }

        [HttpPut("updateHeight/{height}")]
        public IActionResult update_height(double height)
        {
            int id = GetUserInfo.getUserId(HttpContext);



            if (id == -1)
                return BadRequest("Session expired!" +
                    "Login again!");

            string query = "update profiles set height=@height where uid=" + id;
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

                        SqlParameter heightP = new SqlParameter("@height", SqlDbType.Decimal);

                        heightP.Value = height;
                        heightP.Precision = 8;
                        heightP.Scale = 2;


                        cmd.Parameters.Add(heightP);

                        cmd.Prepare();

                        int rows = cmd.ExecuteNonQuery();
                        if (rows == 0)
                            return BadRequest("Session expired!" +
                                     "Login again!");


                    }

                    myCon.Close();

                }
            }

            catch (Exception ex)
            {
                return BadRequest("An error occured!");
            }

            return Ok("Height succesfully updated");
        }

        [HttpPut("updateWeight/{weight}")]
        public IActionResult update_weight(double weight)
        {
            int id = GetUserInfo.getUserId(HttpContext);



            if (id == -1)
                return BadRequest("Session expired!" +
                    "Login again!");

            string query = "update profiles set weight=@weight where uid=" + id;
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

                        SqlParameter weightP = new SqlParameter("@weight", SqlDbType.Decimal);

                        weightP.Value = weight;
                        weightP.Precision = 8;
                        weightP.Scale = 2;


                        cmd.Parameters.Add(weightP);

                        cmd.Prepare();

                        int rows = cmd.ExecuteNonQuery();
                        if (rows == 0)
                            return BadRequest("Session expired!" +
                                     "Login again!");


                    }

                    myCon.Close();

                }
            }

            catch (Exception ex)
            {
                return BadRequest("An error occured!");
            }

            return Ok("Weight succesfully updated");
        }

        [HttpPut("updateCalories/{calories}")]
        public IActionResult update_calories(int calories)
        {
            int id = GetUserInfo.getUserId(HttpContext);



            if (id == -1)
                return BadRequest("Session expired!" +
                    "Login again!");

            string query = "update profiles set calorie_goal=@calories where uid=" + id;
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

                        SqlParameter caloriesP = new SqlParameter("@calories", SqlDbType.Int);

                        caloriesP.Value = calories;

                        cmd.Parameters.Add(caloriesP);

                        cmd.Prepare();

                        int rows = cmd.ExecuteNonQuery();
                        if (rows == 0)
                            return BadRequest("Session expired!" +
                                     "Login again!");


                    }

                    myCon.Close();

                }
            }

            catch (Exception ex)
            {
                return BadRequest("An error occured!");
            }

            return Ok("Calorie goal succesfully updated");
        }

        [HttpPut("upload_Photo")]
        public IActionResult upload_Photo()
        {

            int id = GetUserInfo.getUserId(HttpContext);

            if (id == -1)
                return BadRequest("Session expired!" +
                    "Login again!");

            try
            {
                var req = Request.Form;
                var file = req.Files[0];
                String[] extension = file.FileName.Split('.');
                String filename = id + "." + "jpg";
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

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

    }

   
}
