const API_BASE = import.meta.env.VITE_API_URL || ""; // respeta lo que ya usas

export async function registerAttendee(payload) {
  // Si no asiste a iglesia, eliminamos el campo iglesiaNombre
  if (!payload.asisteIglesia) {
    delete payload.iglesiaNombre;
  }

  // Si el usuario no está en el equipo, eliminamos el campo 'equipos'
  if (!payload.esEquipoCasaDeElias) {
    delete payload.equipos;
  }

  // Si no se especifica un nombre para la iglesia, también eliminamos el campo 'churchName'
 if (payload.goesToChurch === 'no') {
  payload.goesToChurch = false;
} else {
  payload.goesToChurch = true;
}

if (payload.isTeam === 'no') {
  payload.isTeam = false;
} else {
  payload.isTeam = true;
}

  // Enviar la solicitud a la API
  const r = await fetch(`${API_BASE}/api/attendees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  let data = null;
  try {
    data = await r.json();  // Intentamos obtener la respuesta como JSON
  } catch (err) {
    console.error('Error al parsear la respuesta:', err);
  }

  if (!r.ok) {
    const errorMessage = data?.message || `HTTP ${r.status} - ${data?.error || 'Error desconocido'}`;
    throw new Error(errorMessage);
  }

  return data;
}


