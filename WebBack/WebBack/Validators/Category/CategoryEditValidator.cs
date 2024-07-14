// using FluentValidation;
// using WebBack.Services.Interfaces;
// using WebBack.ViewModels.Category;
//
// namespace WebBack.Validators.Category;
//
// public class CategoryEditValidator : AbstractValidator<CategoryEditVm>
// {
//     public CategoryEditValidator(IExistingEntityCheckerService existingEntityCheckerService, IImageValidator imageValidator)
//     {
//         RuleFor(c => c.Id)
//             .MustAsync(existingEntityCheckerService.IsCorrectCategoryId)
//                 .WithMessage("Category with this id is not exists");
//
//         RuleFor(c => c.Name)
//            .NotEmpty()
//                .WithMessage("Name is empty or null")
//            .MinimumLength(3)
//                .WithMessage("Name min length is 3")
//            .MaximumLength(100)
//                .WithMessage("Name is too long")
//            .When(c => c.Name != null);
//
//         RuleFor(c => c.Image)
//             .NotNull()
//                 .WithMessage("Image is not selected")
//             .MustAsync(imageValidator.IsValidImageAsync)
//                 .WithMessage("Image is not valid")
//             .When(c => c.Image != null);
//     }
// }