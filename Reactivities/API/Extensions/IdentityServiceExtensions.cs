using System.Text;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services,
            IConfiguration config){
                services.AddIdentityCore<AppUser>(opt =>{
                    opt.Password.RequireNonAlphanumeric = true;
                })
                .AddEntityFrameworkStores<DataContext>();
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super secret key test this length should be greater so the dot net app can register it, hopefully will work now"));
                services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(opt=>{
                        opt.TokenValidationParameters = new TokenValidationParameters{
                            ValidateIssuerSigningKey = true,
                            IssuerSigningKey = key,
                            ValidateIssuer = false,
                            ValidateAudience = false
                        };
                    });
                services.AddScoped<TokenService>();
                return services;
            }
        
    }
}