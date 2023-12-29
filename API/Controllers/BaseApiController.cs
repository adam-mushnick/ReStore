using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    //[ ] are attributes
    //attribute to denote a controller that's part of an API
    [ApiController]
    //defines route for the controller. [controller] is placeholder for the controller's name
    [Route("api/[controller]")]
    //defines a controller class that inherits from ControllerBase (base class for controllers)
    public class BaseApiController : ControllerBase
    {
        
    }
}