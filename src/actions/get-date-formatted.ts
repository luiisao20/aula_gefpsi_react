const opciones: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
};

export const getFormattedDate = (date: string): string | null => {
  const fecha = new Date(date);
  return isNaN(fecha.getTime())
    ? null
    : fecha.toLocaleString("es-ES", opciones);
};
