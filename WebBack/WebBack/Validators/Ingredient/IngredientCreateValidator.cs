// using FluentValidation;
// using WebBack.Services.Interfaces;
// using WebBack.ViewModels.Ingredient;
//
// namespace WebBack.Validators.Ingredient;
//
// public class IngredientCreateValidator : AbstractValidator<IngredientCreateVm>
// {
//     public IngredientCreateValidator(IImageValidator imageValidator)
//     {
//         RuleFor(c => c.Name)
//             .NotEmpty()
//                 .WithMessage("Name is empty or null")
//             .MinimumLength(3)
//                .WithMessage("Name min length is 3")
//             .MaximumLength(100)
//                 .WithMessage("Name is too long");
//
//         RuleFor(c => c.Image)
//             .NotNull()
//                 .WithMessage("Image is not selected")
//             .DependentRules(() =>
//             {
//                 RuleFor(c => c.Image)
//                     .MustAsync(imageValidator.IsValidImageAsync)
//                     .WithMessage("Image is not valid");
//             });
//     }
// }
