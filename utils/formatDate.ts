export function formatDate(date: string | Date) {
    return new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));
}