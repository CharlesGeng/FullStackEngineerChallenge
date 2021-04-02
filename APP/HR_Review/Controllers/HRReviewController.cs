using Microsoft.AspNetCore.Mvc;
using HR_Review.Models;
using System.Collections.Generic;

namespace HR_Review.Controllers
{
    public class HRReviewController : Controller
    {
        private HRDataAccessLayer accessor = new HRDataAccessLayer();

        // GET: HRReviewController
        [HttpGet]
        [Route("api/Users/Index")]
        public IEnumerable<Users> Index()
        {
            return accessor.GetAllUsers();
        }

        // GET: HRReviewController/Details/5
        [HttpGet]
        [Route("api/Users/Details/{id}")]
        public Users Details(int id)
        {
            return accessor.GetUserData(id);
        }

        // GET: HRReviewController/Create
        [HttpPost]
        [Route("api/Users/Create")]
        public int Create(Users user)
        {
            return accessor.AddUser(user);
        }


        // GET: HRReviewController/Edit
        [HttpPut]
        [Route("api/Users/Edit")]
        public int Edit(Users user)
        {
            return accessor.UpdateUser(user);
        }

        // GET: HRReviewController/Delete/5
        [HttpDelete]
        [Route("api/Users/Delete/{id}")]
        public int Delete(int id)
        {
            return accessor.DeleteUser(id);
        }
    }
}
