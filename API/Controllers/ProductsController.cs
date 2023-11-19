//using statements import namespaces that are used in this file
using API.Data;
using API.Entities;
//provides classes for creating controllers in ASP.NET Core
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

//namespace is the scope of this class
namespace API.Controllers
{
    //[ ] are attributes
    //attribute to denote a controller that's part of an API
    [ApiController]
    //defines route for the controller. [controller] is placeholder for the controller's name
    [Route("api/[controller]")]
    //defines a controller class that inherits from ControllerBase (base class for controllers)
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext _context;
        public ProductsController(StoreContext context)
        {
            _context = context;   
        }
        //Action Methods
        //attribute marks the following method (GetProducts) as handling Http GET requests
        //http requests to database should always be async, because there is no control over how long they will take
        [HttpGet]
        //a method that returns a list of products
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }
        //this attribute specifies that this method handles GET requests with an id parameter
        [HttpGet("{id}")]
        //GetProduct returns a single product
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            return await _context.Products.FindAsync(id);
        }
    }
}