using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeRegister.WebApi.Models
{
    public class EmployeeModel
    {
        [Key]
        public int EmployeeId { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string? EmployeeName { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string? Occupation { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string? ImageName { get; set; }
    }
}
