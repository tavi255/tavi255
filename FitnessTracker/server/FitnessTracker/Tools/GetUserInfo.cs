using System.Security.Claims;

namespace FitnessTracker.Tools
{
    public class GetUserInfo
    {
        public static int getUserId(HttpContext context)
        {

            var identity = context.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var userClaims = identity.Claims;
                int id = Convert.ToInt32(userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value);
                return id;
            }

            return -1;

        }

        public static string getUserType(HttpContext context)
        {
            var identity = context.User.Identity as ClaimsIdentity;
            string? type = null;
            if (identity != null)
            {
                var userClaims = identity.Claims;
                type = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Role)?.Value;
            }

            if (type != null)
                return type;

            return "";
        }

    }
}
