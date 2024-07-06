export const generatePagination = (currentPage: number, totalPages: number) => {
  // Якщо загальна кількість сторінок 7 або менше,
  // відобразити всі сторінки без будь-яких ...
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Якщо поточна сторінка серед перших 3 сторінок,
  // показати перші 3 сторінки, ... і останні 2 сторінки.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // Якщо поточна сторінка серед останніх 3 сторінок,
  // показати перші 2 сторінки, ... і останні 3 сторінки.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // Якщо поточна сторінка десь посередині,
  // показати першу сторінку, ... , поточну сторінку та її сусідів,
  // ще одну ... і останню сторінку.
  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
};
