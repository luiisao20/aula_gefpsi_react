const opciones: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

export const getFormattedDate = (date: string): string | null =>
  new Date(date).toLocaleDateString("es-es", opciones) === "Invalid Date"
    ? null
    : new Date(date).toLocaleDateString("es-es", opciones);
