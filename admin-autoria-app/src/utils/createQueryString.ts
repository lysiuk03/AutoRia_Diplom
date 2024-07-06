export const createQueryString = (params: Record<string, any>, prefix: string = ""): string => {
  return Object.keys(params)
    .map((key) => {
      const value = params[key];
      if (value !== undefined && value !== null) {
        if (typeof value === "object" && !Array.isArray(value)) {
          // Рекурсивний виклик для вкладених об'єктів
          return createQueryString(value, prefix ? `${prefix}.${key}` : key);
        } else {
          // Додати параметр до рядка запиту
          const paramKey = prefix ? `${prefix}.${key}` : key;
          return `${encodeURIComponent(paramKey)}=${encodeURIComponent(value)}`;
        }
      }
      return null;
    })
    .filter((part) => part !== null)
    .join("&");
};
