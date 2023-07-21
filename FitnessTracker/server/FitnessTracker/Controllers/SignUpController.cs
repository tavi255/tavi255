using FitnessTracker.Models;
using FitnessTracker.Tools;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace FitnessTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignUpController : ControllerBase
    {

        private readonly IConfiguration _config;
        public SignUpController(IConfiguration config)
        {
            _config = config;
        }
        [HttpPost]
        public IActionResult SignUp(UserSignUp up)
        {
            string query = "select * from users where username=@username";
           
            SqlDataReader r;

            string datasource = _config.GetConnectionString("FitnessTracker");

            try
            {
                using (SqlConnection con = new SqlConnection(datasource))
                {
                    con.Open();
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        SqlParameter userN = new SqlParameter("@username", System.Data.SqlDbType.VarChar, 50);
                        userN.Value = up.username;

                        cmd.Parameters.Add(userN);
                        cmd.Prepare();
                        r=cmd.ExecuteReader();

                        if (r.HasRows)
                            return BadRequest("Username was already taken!");
                    }

                    r.Close();

                    string q2 = "insert into users values (@username,@password,'trainee',@gender);" +
                        "SELECT uid FROM users WHERE uid = scope_identity()";

                    int id = -1;
                   

                    using (SqlCommand cmd = new SqlCommand(q2, con))
                    {
                        SqlParameter username = new SqlParameter("@username", System.Data.SqlDbType.VarChar, 50);
                        username.Value = up.username;

                        SqlParameter password = new SqlParameter("@password", System.Data.SqlDbType.VarChar, 50);
                        password.Value = Md5conversion.toMd5(up.password);

                        SqlParameter gender = new SqlParameter("@gender", System.Data.SqlDbType.VarChar, 10);
                        gender.Value=up.gender;

                        cmd.Parameters.Add(username);
                        cmd.Parameters.Add(password);
                        cmd.Parameters.Add(gender);
                        cmd.Prepare();

                        r = cmd.ExecuteReader();

                        r.Read();
                        id=r.GetInt32(0);
                        
                    }

                    string q3 = "insert into profiles (uid,name) values ( " + id + ","   + "@name)";

                    using (SqlCommand cmd = new SqlCommand(q3, con))
                    {
                        SqlParameter name = new SqlParameter("@name", System.Data.SqlDbType.VarChar, 50);
                        name.Value = up.name;

                        cmd.Parameters.Add(name);
                      
                        cmd.Prepare();

                        int nr_r = cmd.ExecuteNonQuery();

                        if (nr_r == 0)
                            return BadRequest("Something went wrong!");

                    }

                    con.Close();
                }
            }

            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

          
            return Ok("Account created succesfully");
        }
      
    }

    
}
