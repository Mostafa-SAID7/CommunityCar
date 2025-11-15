using FluentValidation;
using CommunityCar.Application.Commands;

namespace CommunityCar.Application.Validators
{
    public class CreatePostValidator : AbstractValidator<CreatePostCommand>
    {
        public CreatePostValidator()
        {
            RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
            RuleFor(x => x.Content).NotEmpty().MaximumLength(5000);
            RuleFor(x => x.Tags).NotNull();
        }
    }
}