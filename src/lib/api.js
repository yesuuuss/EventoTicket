const API_BASE = import.meta.env.VITE_API_URL || ""; // respeta lo que ya usas

export async function registerAttendee(payload){
  const r = await fetch(`${API_BASE}/api/tickets`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(payload),
  });
  // intenta parsear JSON, pero tolera texto
  let data = null;
  try { data = await r.json(); } catch { /* noop */ }
  if (!r.ok) throw new Error(data?.error || `HTTP ${r.status}`);
  return data;
}
