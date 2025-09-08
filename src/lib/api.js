const API_BASE = import.meta.env.VITE_API_URL || ""; // respeta lo que ya usas

export async function registerAttendee(payload) {
  const r = await fetch(`${API_BASE}/api/attendees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  // Intentamos parsear JSON, pero tolera texto
  let data = null;
  try {
    data = await r.json();  // Intenta obtener la respuesta como JSON
  } catch (err) {
    console.error('Error al parsear la respuesta:', err);
  }

  // Manejo de errores en la respuesta de la API
  if (!r.ok) {
    // Si la respuesta no es 2xx, se maneja el error
    const errorMessage = data?.message || `HTTP ${r.status} - ${data?.error || 'Error desconocido'}`;
    throw new Error(errorMessage);  // Lanza un error con el mensaje de la API
  }

  return data;
}

