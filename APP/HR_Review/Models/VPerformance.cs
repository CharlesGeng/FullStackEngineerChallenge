using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace HR_Review.Models
{
    public partial class VPerformance
    {
        public int id{ get; }
        public int ReviewerId { get; }
        public string UserName{ get; }
        public string ReviewerName { get; }
        public virtual string Performance { get; }
        public DateTime? AssignDate{ get;  }
        public DateTime? ReviewDate{ get;  }
        public bool IsReviewed{ get;  }
    }
}
