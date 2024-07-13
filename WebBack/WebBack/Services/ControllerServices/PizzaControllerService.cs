//using AutoMapper;
//using AutoMapper.QueryableExtensions;
//using Microsoft.EntityFrameworkCore;
//using WebBack.Data;
//using WebBack.Data.Entities;
//using WebBack.Services.ControllerServices.Interfaces;
//using WebBack.Services.Interfaces;
//using WebBack.ViewModels.Ingredient;
//using WebBack.ViewModels.Pizza;

//namespace WebBack.Services.ControllerServices
//{
//    public class PizzaControllerService(
//        PizzaDbContext pizzaContext,
//        IMapper mapper,
//        IImageService imageService
//    ) : IPizzaControllerService
//    {
//        public async Task CreateAsync(PizzaCreateVm vm)
//        {
//            var pizza = mapper.Map<PizzaEntity>(vm);

//            try
//            {
//                pizza.DateCreated = DateTime.UtcNow;
//                pizza.Rating = 0;
//                pizza.IsAvailable = true;

//                int priorityIndex = 1;

//                if (vm.Photos != null && vm.Photos.Any())
//                {
//                    foreach (var photo in vm.Photos)
//                    {
//                        pizza.Photos.Add(new PizzaPhotoEntity
//                        {
//                            Name = await imageService.SaveImageAsync(photo),
//                            Priority = priorityIndex
//                        });
//                        priorityIndex++;
//                    }
//                }

//                if (vm.IngredientIds != null && vm.IngredientIds.Any())
//                {
//                    foreach (var ingredientId in vm.IngredientIds)
//                    {
//                        pizza.Ingredients.Add(new PizzaIngredientEntity
//                        {
//                            IngredientId = ingredientId
//                        });
//                    }
//                }

//                if (vm.Sizes != null && vm.Sizes.Any())
//                {
//                    foreach (var size in vm.Sizes)
//                    {
//                        pizza.Sizes.Add(new PizzaSizePriceEntity
//                        {
//                            SizeId = size.SizeId,
//                            Price = size.Price
//                        });
//                    }
//                }

//                await pizzaContext.Pizzas.AddAsync(pizza);
//                await pizzaContext.SaveChangesAsync();
//            }
//            catch
//            {
//                throw new Exception("Error pizza created");
//            }
//        }

//        public async Task DeleteIfExistsAsync(int id)
//        {
//            var pizza = await pizzaContext.Pizzas
//                .Include(x => x.Photos)
//                .FirstOrDefaultAsync(c => c.Id == id);

//            try
//            {
//                if (pizza == null)
//                {
//                    throw new Exception("Pizza not found");
//                }


//                if (pizza.Photos != null && pizza.Photos.Any())
//                {
//                    foreach (var photo in pizza.Photos)
//                    {
//                        imageService.DeleteImageIfExists(photo.Name);
//                    }
//                }
//                pizzaContext.Pizzas.Remove(pizza);
//                await pizzaContext.SaveChangesAsync();
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//        }

//        public async Task UpdateAsync(PizzaEditVm vm)
//        {
//            var pizza = await pizzaContext.Pizzas
//                    .Include(x => x.Photos)
//                    .Include(x => x.Ingredients)
//                    .Include(x => x.Category)
//                    .Include(x => x.Sizes)
//                .FirstOrDefaultAsync(c => c.Id == vm.Id);

//            try
//            {
//                if (pizza == null)
//                {
//                    throw new Exception("Pizza not found");
//                }

//                if (vm.Name != null)
//                {
//                    pizza.Name = vm.Name;
//                }

//                if (vm.Description != null)
//                {
//                    pizza.Description = vm.Description;
//                }

//                if (vm.CategoryId != null)
//                {
//                    pizza.CategoryId = (int)vm.CategoryId;
//                }

//                if (vm.IngredientIds != null && vm.IngredientIds.Any())
//                {
//                    pizza.Ingredients.Clear();

//                    foreach (var ingredientId in vm.IngredientIds)
//                    {
//                        pizza.Ingredients.Add(new PizzaIngredientEntity
//                        {
//                            IngredientId = ingredientId
//                        });
//                    }
//                }

//                if (vm.Sizes != null && vm.Sizes.Any())
//                {
//                    pizza.Sizes.Clear();

//                    foreach (var size in vm.Sizes)
//                    {
//                        pizza.Sizes.Add(new PizzaSizePriceEntity
//                        {
//                            SizeId = size.SizeId,
//                            Price = size.Price
//                        });
//                    }
//                }

//                if (vm.Photos != null && vm.Photos.Any())
//                {
//                    foreach (var photo in pizza.Photos)
//                    {
//                        imageService.DeleteImageIfExists(photo.Name);
//                    }

//                    pizza.Photos.Clear();
//                }


//                if (vm.Photos != null && vm.Photos.Any())
//                {
//                    int priorityIndex = 1;

//                    foreach (var photo in vm.Photos)
//                    {
//                        pizza.Photos.Add(new PizzaPhotoEntity
//                        {
//                            Name = await imageService.SaveImageAsync(photo),
//                            Priority = priorityIndex
//                        });
//                        priorityIndex++;
//                    }
//                }

//                pizzaContext.Pizzas.Update(pizza);
//                await pizzaContext.SaveChangesAsync();

//            }
//            catch (Exception)
//            {
//                throw;
//            }

//        }
//    }
//}
