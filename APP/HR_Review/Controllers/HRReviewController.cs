using Microsoft.AspNetCore.Mvc;
using HR_Review.Models;
using System.Collections.Generic;

namespace HR_Review.Controllers
{
    public class HRReviewController : Controller
    {
        private HRDataAccessLayer accessor = new HRDataAccessLayer();

        [HttpGet]
        [Route("api/Users/Index")]
        public IEnumerable<Users> UserIndex()
        {
            return accessor.GetAllUsers();
        }

        [HttpGet]
        [Route("api/Users/Details/{id}")]
        public Users UserDetails(int id)
        {
            return accessor.GetUserData(id);
        }

        [HttpPost]
        [Route("api/Users/Create")]
        public int CreateUser(Users user)
        {
            return accessor.AddUser(user);
        }


        [HttpPut]
        [Route("api/Users/Edit")]
        public int EditUser(Users user)
        {
            return accessor.UpdateUser(user);
        }

        [HttpDelete]
        [Route("api/Users/Delete/{id}")]
        public int DeleteUser(int id)
        {
            return accessor.DeleteUser(id);
        }

        [HttpGet]
        [Route("api/Performance")]
        public IEnumerable<VPerformance> PerformancesIndex()
        {
            return accessor.GetPerformances();
        }

        [HttpGet]
        [Route("api/Performance/{reviewerId}")]
        public IEnumerable<VPerformance> Performances(int reviewerId)
        {
            return accessor.GetPerformances(reviewerId);
        }

        [HttpPost]
        [Route("api/Performance/Create")]
        public int CreatePerformance(PerformanceReview p)
        {
            return accessor.AddPerformance(p);
        }

        [HttpPut]
        [Route("api/Performance/Edit")]
        public int EditPerformance(PerformanceReview p)
        {
            return accessor.UpdatePerformance(p);
        }
    }
}
