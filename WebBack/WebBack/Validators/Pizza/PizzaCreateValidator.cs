// using FluentValidation;
// using WebBack.Services.Interfaces;
// using WebBack.ViewModels.Ingredient;
// using WebBack.ViewModels.Pizza;
//
// namespace WebBack.Validators.Pizza;
//
// public class PizzaCreateValidator : AbstractValidator<PizzaCreateVm>
// {
//     public PizzaCreateValidator(IExistingEntityCheckerService existingEntityCheckerService, IImageValidator imageValidator)
//     {
//         RuleFor(c => c.Name)
//             .NotEmpty()
//                 .WithMessage("Name is empty or null")
//             .MinimumLength(3)
//                .WithMessage("Name min length is 3")
//             .MaximumLength(100)
//                 .WithMessage("Name is too long");
//
//         RuleFor(c => c.Description)
//            .NotEmpty()
//                .WithMessage("Description is empty or null")
//            .MinimumLength(3)
//               .WithMessage("Description min length is 10")
//            .MaximumLength(500)
//                .WithMessage("Description is too long");
//
//         RuleFor(c => c.CategoryId)
//            .MustAsync(existingEntityCheckerService.IsCorrectCategoryId)
//                .WithMessage("Category with this id is not exists");
//
//         RuleForEach(c => c.Photos)
//             .NotNull()
//                 .WithMessage("Image is not selected")
//             .MustAsync(imageValidator.IsValidImageAsync)
//                 .WithMessage("Image is not valid");
//
//         RuleFor(c => c.IngredientIds)
//             .Must(ids => ids == null || ids.Distinct().Count() == ids.Count())
//                 .WithMessage("Ingredient IDs must be unique")
//             .ForEach(id =>
//                 id.MustAsync(existingEntityCheckerService.IsCorrectIngredientId)
//                     .WithMessage("One or more ingredients do not exist"));
//
//         RuleFor(c => c.Sizes)
//             .NotEmpty()
//                 .WithMessage("Sizes cannot be empty")
//             .Must(sizes => sizes.Select(s => s.SizeId).Distinct().Count() == sizes.Count())
//                 .WithMessage("Sizes must be unique");
//
//     }
// }
