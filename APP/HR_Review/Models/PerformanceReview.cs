using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace HR_Review.Models
{
    public partial class PerformanceReview
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ReviewerId { get; set; }
        public string Performance { get; set; }
        public bool IsReviewed { get; set; }
        public DateTime? AssignDate { get; set; }
        public DateTime? ReviewDate { get; set; }

        public virtual Users Reviewer { get; set; }
        public virtual Users User { get; set; }
    }
}
