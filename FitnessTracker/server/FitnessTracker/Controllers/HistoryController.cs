using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using FitnessTracker.Tools;
using FitnessTracker.Models;

namespace FitnessTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class HistoryController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public HistoryController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public IActionResult getHistory()
        {
            int id = GetUserInfo.getUserId(HttpContext);
            string query = "select * from History where uid=@uid order by hDate DESC, hid DESC";
            DataTable tbl = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("FitnessTracker");

            SqlDataReader r;
            List<History> ls = new List<History>();

            
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
                        
                        r=cmd.ExecuteReader();

                        while (r.Read())
                        {
                            int hid = r.GetInt32(0);
                            string obs = "";
                            string date = r.GetDateTime(2).Date.ToString("dd/MM/yyyy");
                            string exerciseData=r.GetString(3);
                            if (!r.IsDBNull(r.GetOrdinal("observations")))
                            {
                                obs = r.GetString(4);
                            }
                            ls.Add(new History(hid,date, exerciseData, obs));
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

        [HttpGet("{id}")]
        [Authorize(Roles ="trainer")]
        public IActionResult getHistoryForTrainee(int id)
        {
     
            string query = "select * from History where uid=@uid order by hDate DESC, hid DESC";
            DataTable tbl = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("FitnessTracker");

            SqlDataReader r;
            List<History> ls = new List<History>();


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

                        while (r.Read())
                        {
                            int hid = r.GetInt32(0);
                            string obs = "";
                            string date = r.GetDateTime(2).Date.ToString("dd/MM/yyyy");
                            string exerciseData = r.GetString(3);
                            if (!r.IsDBNull(r.GetOrdinal("observations")))
                            {
                                obs = r.GetString(4);
                            }
                            ls.Add(new History(hid, date, exerciseData, obs));
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

        [HttpPut("writeObs/{uid}/{hid}")]
        [Authorize(Roles = "trainer")]
        public IActionResult writeObs(Observations obs,int uid,int hid)
        {

            string query = "update History set observations=@observations where uid=@uid and hid=@hid";
            DataTable tbl = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("FitnessTracker");

       


            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand cmd = new SqlCommand(query, myCon))
                    {
                        SqlParameter uidP = new SqlParameter("@uid", SqlDbType.Int);

                        uidP.Value = uid;

                        SqlParameter hidP = new SqlParameter("@hid", SqlDbType.Int);

                        hidP.Value = hid;

                        SqlParameter observationsP = new SqlParameter("@observations", SqlDbType.Text,-1);

                        observationsP.Value = obs.observations;

                        cmd.Parameters.Add(uidP);
                        cmd.Parameters.Add(hidP);
                        cmd.Parameters.Add(observationsP);

                        cmd.Prepare();

                        int rows=cmd.ExecuteNonQuery();

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


            return Ok("observations added succesfully");
        }

        [HttpGet("getObs/{uid}/{hid}")]
        [Authorize(Roles = "trainer")]
        public IActionResult getObs(int uid, int hid)
        {

            string query = "select observations from history where uid=@uid and hid=@hid";
            DataTable tbl = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("FitnessTracker");
            SqlDataReader r;
            string observations = "";




            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand cmd = new SqlCommand(query, myCon))
                    {
                        SqlParameter uidP = new SqlParameter("@uid", SqlDbType.Int);

                        uidP.Value = uid;

                        SqlParameter hidP = new SqlParameter("@hid", SqlDbType.Int);

                        hidP.Value = hid;


                        cmd.Parameters.Add(uidP);
                        cmd.Parameters.Add(hidP);
                      
                        cmd.Prepare();

                        r = cmd.ExecuteReader();

                        if (!r.HasRows)
                            return BadRequest("An error occured!");

                        while(r.Read())
                        {
                            if (!r.IsDBNull(0))
                                observations = r.GetString(0);
                        }





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
                observations = observations
            };


            return Ok(obj);
        }

        [HttpGet("repMaxes")]
        public IActionResult getRepMaxes()
        {
            int id = GetUserInfo.getUserId(HttpContext);
            string query = "select * from OneRepMaxes where uid=@uid order by hDate DESC, rid DESC";
            DataTable tbl = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("FitnessTracker");

            SqlDataReader r;
            List<RepMaxes> ls = new List<RepMaxes>();


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

                        while (r.Read())
                        {
                            string exercise=r.GetString(2);
                            string exerciseData = r.GetString(3);
                            int repMax = r.GetInt32(4);
                            string date = r.GetDateTime(5).Date.ToString("dd/MM/yyyy");


                            ls.Add(new RepMaxes(exercise, exerciseData, repMax, date));
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


        [HttpGet("pr")]
        public IActionResult getPR()
        {
            int id = GetUserInfo.getUserId(HttpContext);
            string query = "select * from PR where uid=@uid";
            DataTable tbl = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("FitnessTracker");

            SqlDataReader r;

            List<PR> ls = new List<PR>();

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

                        while (r.Read())
                        {
                            string name = r.GetString(2);
                            int rm = r.GetInt32(3);
                            int weight = r.GetInt32(4);
                            int volume = r.GetInt32(5);

                            ls.Add(new PR(name,rm,weight,volume));
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


        [HttpPost]
        public IActionResult addInHistory(History2 h)
        {
            int id = GetUserInfo.getUserId(HttpContext);
            string query = "insert into history (uid,hDate,exercisesData) values ("+id+",@hDate,@exercisesData)";
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
                        SqlParameter hDateP = new SqlParameter("@hDate", SqlDbType.Date);

                        hDateP.Value = h.hDate;

                        SqlParameter exercisesDataP = new SqlParameter("@exercisesData", SqlDbType.Text,-1);

                        exercisesDataP.Value = h.exercisesData;

                        cmd.Parameters.Add(hDateP);
                        cmd.Parameters.Add(exercisesDataP);

  

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


            return Ok("History succesfully updated");
        }

        [HttpPost("addRM")]
        public IActionResult addRM(RepMaxes rm)
        {
            int id = GetUserInfo.getUserId(HttpContext);
            string query = "insert into OneRepMaxes values (" + id + ",@exercise,@exerciseData,@one_rep_max,@hDate)";
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
                        SqlParameter hDateP = new SqlParameter("@hDate", SqlDbType.Date);

                        hDateP.Value = rm.hDate;

                        SqlParameter exerciseDataP = new SqlParameter("@exerciseData", SqlDbType.Text, -1);

                        exerciseDataP.Value = rm.exerciseData;

                        SqlParameter exerciseP = new SqlParameter("@exercise", SqlDbType.VarChar, 50);

                        exerciseP.Value = rm.exercise;

                        SqlParameter one_rep_maxP = new SqlParameter("@one_rep_max", SqlDbType.Int);

                        one_rep_maxP.Value = rm.one_rep_max;




                        cmd.Parameters.Add(hDateP);
                        cmd.Parameters.Add(exerciseDataP);
                        cmd.Parameters.Add(one_rep_maxP);
                        cmd.Parameters.Add(exerciseP);

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


            return Ok("OneRepMaxes succesfully updated");
        }


        [HttpPost("addPR")]
        public IActionResult addPR(PR pr)
        {
            int id = GetUserInfo.getUserId(HttpContext);
            string query = "insert into PR values (" + id + ",@exerciseName,@RM,@weight,@volume)";
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
    

                        SqlParameter exerciseNameP = new SqlParameter("@exerciseName", SqlDbType.VarChar, 50);

                        exerciseNameP.Value = pr.exerciseName;

                        SqlParameter RM = new SqlParameter("@RM", SqlDbType.Int);

                        RM.Value = pr.RM;

                        SqlParameter weightP = new SqlParameter("@weight", SqlDbType.Int);

                        weightP.Value = pr.weight;

                        SqlParameter volumeP = new SqlParameter("@volume", SqlDbType.Int);

                        volumeP.Value = pr.volume;




                        cmd.Parameters.Add(exerciseNameP);
                        cmd.Parameters.Add(RM);
                        cmd.Parameters.Add(weightP);
                        cmd.Parameters.Add(volumeP);

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


            return Ok("PR succesfully updated");
        }

        [HttpPut("updateRM")]
        public IActionResult updateRM(RepMaxes rm)
        {
            int id = GetUserInfo.getUserId(HttpContext);
            string query = "update OneRepMaxes set exerciseData=@exerciseData,one_rep_max=@one_rep_max,hDate=@hDate where uid=" + id + " and exercise=@exercise";

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
                        SqlParameter hDateP = new SqlParameter("@hDate", SqlDbType.Date);

                        hDateP.Value = rm.hDate;

                        SqlParameter exerciseDataP = new SqlParameter("@exerciseData", SqlDbType.Text, -1);

                        exerciseDataP.Value = rm.exerciseData;

                        SqlParameter exerciseP = new SqlParameter("@exercise", SqlDbType.VarChar, 50);

                        exerciseP.Value = rm.exercise;

                        SqlParameter one_rep_maxP = new SqlParameter("@one_rep_max", SqlDbType.Int);

                        one_rep_maxP.Value = rm.one_rep_max;




                        cmd.Parameters.Add(hDateP);
                        cmd.Parameters.Add(exerciseDataP);
                        cmd.Parameters.Add(one_rep_maxP);
                        cmd.Parameters.Add(exerciseP);

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


            return Ok("OneRepMaxes succesfully updated");
        }


        [HttpPut("updatePR")]
        public IActionResult updatePR(PR pr)
        {
            int id = GetUserInfo.getUserId(HttpContext);
            string query = "update PR set RM=@RM,weight=@weight,volume=@volume where uid=" + id + " and exerciseName=@exerciseName";
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


                        SqlParameter exerciseNameP = new SqlParameter("@exerciseName", SqlDbType.VarChar, 50);

                        exerciseNameP.Value = pr.exerciseName;

                        SqlParameter RM = new SqlParameter("@RM", SqlDbType.Int);

                        RM.Value = pr.RM;

                        SqlParameter weightP = new SqlParameter("@weight", SqlDbType.Int);

                        weightP.Value = pr.weight;

                        SqlParameter volumeP = new SqlParameter("@volume", SqlDbType.Int);

                        volumeP.Value = pr.volume;




                        cmd.Parameters.Add(exerciseNameP);
                        cmd.Parameters.Add(RM);
                        cmd.Parameters.Add(weightP);
                        cmd.Parameters.Add(volumeP);

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


            return Ok("PR succesfully updated");
        }



    }


}
