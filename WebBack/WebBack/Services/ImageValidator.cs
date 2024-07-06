using WebBack.Services.Interfaces;
using SixLabors.ImageSharp;

namespace WebBack.Services
{
    public class ImageValidator : IImageValidator
    {
        public async Task<bool> IsValidImageAsync(IFormFile image, CancellationToken cancellationToken)
        {
            using var stream = image.OpenReadStream();

            try
            {
                using var imageInstance = await Image.LoadAsync(stream, cancellationToken);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> IsValidNullPossibeImageAsync(IFormFile? image, CancellationToken cancellationToken)
        {
            if (image is null)
                return true;

            return await IsValidImageAsync(image, cancellationToken);
        }

        public async Task<bool> IsValidImagesAsync(IEnumerable<IFormFile> images, CancellationToken cancellationToken)
        {
            var tasts = images.Select(i => IsValidImageAsync(i, cancellationToken));

            var results = await Task.WhenAll(tasts);

            return results.All(r => r);
        }

        public async Task<bool> IsValidNullPossibeImagesAsync(IEnumerable<IFormFile>? images, CancellationToken cancellationToken)
        {
            if (images is null)
                return true;

            return await IsValidImagesAsync(images.Where(i => i is not null), cancellationToken);
        }
    }
}
