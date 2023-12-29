//using statements import namespaces that are used in this file
using API.Data;
using API.Entities;
//provides classes for creating controllers in ASP.NET Core
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

//namespace is the scope of this class
namespace API.Controllers
{

    public class ProductsController : BaseApiController
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
            //save found id product
            var product = await _context.Products.FindAsync(id);

            //return not found if product doesn't exist
            if (product == null) return NotFound();

            return product;
        }
    }
}