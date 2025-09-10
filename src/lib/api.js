const API_BASE = import.meta.env.VITE_API_URL || ""; 

export async function registerAttendee(payload) {

  if (!payload.asisteIglesia) {
    delete payload.iglesiaNombre;
  }


  if (!payload.esEquipoCasaDeElias) {
    delete payload.equipos;
  }

  
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

console.log("Payload antes de enviar:", payload); 
  const r = await fetch(`${API_BASE}/api/attendees`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  let data = null;
  try {
    data = await r.json();  
  } catch (err) {
    console.error('Error al parsear la respuesta:', err);
  }

  if (!r.ok) {
    const errorMessage = data?.message || `HTTP ${r.status} - ${data?.error || 'Error desconocido'}`;
    throw new Error(errorMessage);
  }

  return data;
}


