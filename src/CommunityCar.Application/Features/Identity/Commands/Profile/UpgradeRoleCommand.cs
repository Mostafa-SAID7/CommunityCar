using MediatR;

namespace CommunityCar.Application.Commands
{
    public class UpgradeRoleCommand : IRequest<bool>
    {
        public int UserId { get; set; }
        public string NewRole { get; set; }
    }
}