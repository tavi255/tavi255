using FitnessTracker.Models;
using FitnessTracker.Tools;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.CodeDom.Compiler;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FitnessTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        private IConfiguration _config;

        public LoginController(IConfiguration config)
        {
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login(LoginModel u)
        {

            var user = Authenticate(u);

            if(user != null)
            {
                var token = Generate(user);
                return Ok(token);
            }


            return NotFound("Invalid user");
        }

        private string Generate(User u)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {

                new Claim(ClaimTypes.NameIdentifier,u.uid.ToString()),
                new Claim(ClaimTypes.Role,u.type),
                new Claim(ClaimTypes.Gender,u.gender)
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private User Authenticate(LoginModel u)
        {

            User u2 = null;
            string query = "select * from Users where username=@username and password=@password";
            DataTable tbl = new DataTable();

            string sqlDataSource = _config.GetConnectionString("FitnessTracker");

            SqlDataReader r;

            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                   myCon.Open();
                    using (SqlCommand cmd = new SqlCommand(query, myCon))
                    {
                        SqlParameter userN = new SqlParameter("@username", SqlDbType.VarChar, 50);
                        SqlParameter passwd = new SqlParameter("@password", SqlDbType.VarChar, 50);

                        userN.Value = u.username;
                        passwd.Value = Md5conversion.toMd5(u.password) ;

                        cmd.Parameters.Add(userN);
                        cmd.Parameters.Add(passwd);


                        cmd.Prepare();

                        r = cmd.ExecuteReader();

                        if(r.HasRows)
                        {
                
                            r.Read();
                            int id = Convert.ToInt32(r.GetValue(0));
                            string type = r.GetString(3);
                            string gender = r.GetString(4);
                            u2 = new User(id, u.username, u.password, type,gender);

                        }

                        r.Close();
                        myCon.Close();
                    }
                }
            }

            catch(Exception ex)
            {
                return null;
            }

            return u2;

         
        }
    }
}
