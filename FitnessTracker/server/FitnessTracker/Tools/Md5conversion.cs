using System.Security.Cryptography;
using System.Text;

namespace FitnessTracker.Tools
{
    public class Md5conversion
    {

        public static String toMd5(String password)
        {
            MD5 md5Hash = MD5.Create();
            // Byte array representation of source string
            var sourceBytes = Encoding.UTF8.GetBytes(password);

            // Generate hash value(Byte Array) for input data
            var hashBytes = md5Hash.ComputeHash(sourceBytes);

            // Convert hash byte array to string
            var hash = BitConverter.ToString(hashBytes).Replace("-", string.Empty);

            return hash;
        }
      
    }
}
