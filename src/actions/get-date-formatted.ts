const opciones: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

export const getFormattedDate = (date: string): string =>
  new Date(date).toLocaleDateString("es-es", opciones);
