export const urlToFile = async (imageUrl: string): Promise<File> => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const fileName = imageUrl.split("/").pop() || "downloaded_image";
  return new File([blob], fileName, { type: blob.type });
};

export const convertUrlsToFiles = async (urls: string[]): Promise<File[]> => {
  return Promise.all(urls.map((url) => urlToFile(url)));
};
