using FitnessTracker.Models;
using Newtonsoft.Json;
using Python.Runtime;
using System.Reflection;
using System.Runtime.Remoting;

namespace FitnessTracker.Tools
{
    public class FoodRecommendationService
    {

      
       
        public static List<Food3> GetFoodRecommendations(string foodName)
        {
            List<Food3> recommendations=new List<Food3>();
      
           
         

                using (Py.GIL()) // Acquire the Python GIL (Global Interpreter Lock)
                {

                  
                        dynamic py = Py.Import("__main__");
                        py.Exec("import sys");
                        py.Exec("sys.path.append('D:\\licenta\\FitnessTracker\\FoodRecommandations')");
                        dynamic foodRec = Py.Import("food_recommendation");

                        dynamic result = foodRec.get_recommendations2(foodName);

                        foreach(var v in result)
                        {
                            recommendations.Add(JsonConvert.DeserializeObject<Food3>(v.ToString()));
                        }



                }



           
            return recommendations;
               
        }
    }
}
