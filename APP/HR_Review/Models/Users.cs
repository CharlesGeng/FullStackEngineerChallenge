using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace HR_Review.Models
{
    public partial class Users
    {
        public Users()
        {
            PerformanceReviewReviewer = new HashSet<PerformanceReview>();
            PerformanceReviewUser = new HashSet<PerformanceReview>();
        }

        public int Id { get; set; }
        public string UserName { get; set; }
        public string EmailAddress { get; set; }
        public string DepartmentName { get; set; }
        public bool IsAdmin { get; set; }

        public virtual ICollection<PerformanceReview> PerformanceReviewReviewer { get; set; }
        public virtual ICollection<PerformanceReview> PerformanceReviewUser { get; set; }
    }
}
