using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController:BaseApiController
    {
       
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActvities(CancellationToken ct){
            //very important, handles cancellation by the user.
            return await Mediator.Send(new List.Query(),ct);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActvity(Guid id){
            
            return await Mediator.Send(new Details.Query{Id=id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity){
            await  Mediator.Send(new Create.Command{Activity = activity});
            return Ok();
        }

        [HttpPut("{id}")]
        public async  Task<IActionResult> EditActivity(Guid id, [FromBody] Activity activity){
            activity.Id = id;
            await Mediator.Send(new Edit.Command{Activity = activity});
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id){
            await Mediator.Send(new Delete.Command{Id = id});
            return Ok();
        }
    }
}