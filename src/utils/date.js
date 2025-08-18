// DATA CON ORARIO
export function formatDate(datestring) {
  if (!datestring) return "-";

  try {
    const date = new Date(datestring);

    if (isNaN(date.getTime())) {
      return "-";
    }

    return date.toLocaleDateString("it-IT", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error("Errore formattazione data:", error);
    return "-";
  }
}

// SOLO DATA
export function formatDateOnly(datestring) {
  if (!datestring) return "-";

  try {
    const date = new Date(datestring);
    if (isNaN(date.getTime())) return "-";

    return date.toLocaleDateString("it-IT");
  } catch (error) {
    return "-";
  }
}
