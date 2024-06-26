using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService
    {
        public string CreateToken (AppUser user){
            
            var claims = new List<Claim>{
              new Claim(ClaimTypes.Name,user.UserName),  
              new Claim(ClaimTypes.NameIdentifier,user.Id),  
              new Claim(ClaimTypes.Email,user.Email)
            };
            
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super secret key test this length should be greater so the dot net app can register it, hopefully will work now"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = creds
            };
            
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            
            return tokenHandler.WriteToken(token);

        }
    }
}