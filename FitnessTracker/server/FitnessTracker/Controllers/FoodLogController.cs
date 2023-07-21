using FitnessTracker.Models;
using FitnessTracker.Tools;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace FitnessTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FoodLogController : ControllerBase
    {
        private readonly IConfiguration _configuration;
 
        public FoodLogController(IConfiguration configuration)
        {
            _configuration = configuration;
           
        }

        [HttpGet]
        public IActionResult getFood()
        {
            int id = GetUserInfo.getUserId(HttpContext);
            string query = "select * from FoodLog where hDate=Convert(date,GETDATE()) and uid=@uid";
            DataTable tbl = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("FitnessTracker");

            SqlDataReader r;
            List<Food> ls = new List<Food>();


            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand cmd = new SqlCommand(query, myCon))
                    {

                        SqlParameter uidT = new SqlParameter("@uid", SqlDbType.Int);
                        uidT.Value = id;

                        cmd.Parameters.Add(uidT);

                        cmd.Prepare();
                        r = cmd.ExecuteReader();

                        while (r.Read())
                        {
                            int fid = r.GetInt32(0);
                            string description=r.GetString(1);
                            int protein = r.GetInt32(2);
                            int fat=r.GetInt32(3);
                            int carbs = r.GetInt32(4);
                            string unit = r.GetString(5);
                            double servingSize = Convert.ToDouble(r.GetDecimal(6));
                            string ingredients=r.GetString(7);
                            string date = r.GetDateTime(8).Date.ToString("dd/MM/yyyy");
                            int calories=r.GetInt32(9);
                            ls.Add(new Food(fid,description,protein,fat,carbs,unit,servingSize,date,calories,ingredients));
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

        [HttpGet("calorie_goal")]
        public IActionResult getCalorieGoal()
        {
            int id = GetUserInfo.getUserId(HttpContext);
            string query = "select calorie_goal from Profiles where uid=@uid";
            DataTable tbl = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("FitnessTracker");

            SqlDataReader r;
            int calorie_goal = -1;


            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand cmd = new SqlCommand(query, myCon))
                    {

                        SqlParameter uidT = new SqlParameter("@uid", SqlDbType.Int);
                        uidT.Value = id;

                        cmd.Parameters.Add(uidT);

                        cmd.Prepare();
                        r = cmd.ExecuteReader();

                        if (!r.HasRows)
                            return BadRequest("An error occured!");

                        while (r.Read())
                        {
                            if (!r.IsDBNull(0))
                                calorie_goal = r.GetInt32(0);
                        }




                    }

                    myCon.Close();

                }
            }

            catch (Exception ex)
            {
                return BadRequest("An error occured!");
            }


            return Ok(calorie_goal);
        }

        [HttpGet("recommendations")]
        public IActionResult getFoodRecommendations()
        {
            int id = GetUserInfo.getUserId(HttpContext);
            string query = "select distinct top 5 convert(varchar(max), description) ,fid from FoodLog order by fid desc";
            DataTable tbl = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("FitnessTracker");

            SqlDataReader r;
            List<String> foods = new List<string>();
            List<Food3> recommended_foods = new List<Food3>();


            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand cmd = new SqlCommand(query, myCon))
                    {

                        SqlParameter uidT = new SqlParameter("@uid", SqlDbType.Int);
                        uidT.Value = id;

                        cmd.Parameters.Add(uidT);

                        cmd.Prepare();
                        r = cmd.ExecuteReader();

                        if (!r.HasRows)
                            return Ok(foods);

                        while (r.Read())
                        {
                            foods.Add(r.GetString(0));
                        }

                    }

                    myCon.Close();

                }
            }

            catch (Exception ex)
            {
                return BadRequest("An error occured!");
            }

            try
            {
                foreach (string food in foods)
                    recommended_foods.AddRange(FoodRecommendationService.GetFoodRecommendations(food));
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(recommended_foods);
            
        }

        [HttpPost]
        public IActionResult addFood(Food2 food)
        {
            int id = GetUserInfo.getUserId(HttpContext);
            string query = "insert into FoodLog values (@description,@protein,@fat,@carbohydrate,@unit,@servingSize,@ingredients,@hDate,@calories,@uid)";
            DataTable tbl = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("FitnessTracker");

          


            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand cmd = new SqlCommand(query, myCon))
                    {
                        SqlParameter uidT = new SqlParameter("@uid", SqlDbType.Int);
                        SqlParameter descriptionT = new SqlParameter("@description", SqlDbType.Text, -1);
                        SqlParameter proteinT = new SqlParameter("@protein", SqlDbType.Int);
                        SqlParameter fatT = new SqlParameter("@fat", SqlDbType.Int);
                        SqlParameter carbohydrateT = new SqlParameter("@carbohydrate", SqlDbType.Int);
                        SqlParameter unitT = new SqlParameter("@unit", SqlDbType.Text, -1);
                        SqlParameter servingSizeT = new SqlParameter("@servingSize", SqlDbType.Decimal);
                        servingSizeT.Precision = 10;
                        servingSizeT.Scale = 2;
                        SqlParameter ingredientsT = new SqlParameter("@ingredients", SqlDbType.Text,-1);
                        SqlParameter hDateT = new SqlParameter("@hDate", SqlDbType.Date);
                        SqlParameter caloriesT = new SqlParameter("@calories", SqlDbType.Int);

                        descriptionT.Value = food.description;
                        proteinT.Value = food.protein;
                        fatT.Value = food.fat;
                        carbohydrateT.Value = food.carbohydrate;
                        unitT.Value = food.unit;
                        servingSizeT.Value = food.servingSize;
                        ingredientsT.Value = food.ingredients;
                        caloriesT.Value = food.calories;
                        hDateT.Value = food.hDate;
                        uidT.Value = id;


                        cmd.Parameters.Add(uidT);
                        cmd.Parameters.Add(descriptionT);
                        cmd.Parameters.Add(proteinT);
                        cmd.Parameters.Add(fatT);
                        cmd.Parameters.Add(carbohydrateT);
                        cmd.Parameters.Add(unitT);
                        cmd.Parameters.Add(servingSizeT);
                        cmd.Parameters.Add(ingredientsT);
                        cmd.Parameters.Add(caloriesT);
                        cmd.Parameters.Add(hDateT);

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


            return Ok("Food succesfully added");
        }

        [HttpDelete("{fid}")]
        public IActionResult deleteFood(int fid)
        {
            int id = GetUserInfo.getUserId(HttpContext);
            string query = "delete from FoodLog where fid=@fid and uid=@uid";
            DataTable tbl = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("FitnessTracker");

            SqlDataReader r;
            List<Food> ls = new List<Food>();


            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand cmd = new SqlCommand(query, myCon))
                    {

                        SqlParameter uidT = new SqlParameter("@uid", SqlDbType.Int);
                        uidT.Value = id;

                        SqlParameter fidT = new SqlParameter("@fid", SqlDbType.Int);
                        fidT.Value = fid;

                        cmd.Parameters.Add(uidT);
                        cmd.Parameters.Add(fidT);

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


            return Ok("Food deleted succesfully!");
        }

        [HttpPut("{fid}")]
        public IActionResult updateFood(UpdateFood food,int fid)
        {
            int id = GetUserInfo.getUserId(HttpContext);
            string query = "update FoodLog set protein=@protein,fat=@fat,carbohydrate=@carbohydrate,servingSize=@servingSize,calories=@calories where fid=@fid and uid=@uid";
            DataTable tbl = new DataTable();

            string sqlDataSource = _configuration.GetConnectionString("FitnessTracker");




            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    myCon.Open();
                    using (SqlCommand cmd = new SqlCommand(query, myCon))
                    {
                        SqlParameter uidT = new SqlParameter("@uid", SqlDbType.Int);
                        SqlParameter fidT = new SqlParameter("@fid", SqlDbType.Int);
                        SqlParameter proteinT = new SqlParameter("@protein", SqlDbType.Int);
                        SqlParameter fatT = new SqlParameter("@fat", SqlDbType.Int);
                        SqlParameter carbohydrateT = new SqlParameter("@carbohydrate", SqlDbType.Int);
                        SqlParameter servingSizeT = new SqlParameter("@servingSize", SqlDbType.Decimal);
                        servingSizeT.Precision = 10;
                        servingSizeT.Scale = 2;
                        SqlParameter caloriesT = new SqlParameter("@calories", SqlDbType.Int);

                       
                        proteinT.Value = food.protein;
                        fatT.Value = food.fat;
                        carbohydrateT.Value = food.carbohydrate;
                        servingSizeT.Value = food.servingSize;
                        caloriesT.Value = food.calories;
                        uidT.Value = id;
                        fidT.Value = fid;


                        cmd.Parameters.Add(uidT);
                        cmd.Parameters.Add(fidT);
                        cmd.Parameters.Add(proteinT);
                        cmd.Parameters.Add(fatT);
                        cmd.Parameters.Add(carbohydrateT);
                        cmd.Parameters.Add(servingSizeT);
                        cmd.Parameters.Add(caloriesT);

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


            return Ok("Food succesfully updated!");
        }
    }


}
