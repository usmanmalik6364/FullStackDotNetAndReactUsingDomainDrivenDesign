using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController:BaseApiController
    {
       
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActvities(){

            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActvity(Guid id){
            
            return await Mediator.Send(new Details.Query{Id=id});
        }
    }
}