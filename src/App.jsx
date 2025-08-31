import { useState } from "react";

export default function App() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje(null);
    try {
      // usa el proxy de Vite
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMensaje("✅ Ticket enviado a tu correo.");
        setNombre(""); setEmail("");
      } else {
        setMensaje("❌ " + (data?.error || "Error al enviar"));
      }
    } catch {
      setMensaje("❌ Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow rounded w-96 p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Registro de Tickets 🎟️</h1>

        <label className="block text-sm text-gray-700 mb-1">Nombre</label>
        <input
          className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring"
          value={nombre} onChange={(e)=>setNombre(e.target.value)} required
        />

        <label className="block text-sm text-gray-700 mb-1">Email</label>
        <input
          type="email"
          className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring"
          value={email} onChange={(e)=>setEmail(e.target.value)} required
        />

        <button
          disabled={loading}
          className="w-full py-2 rounded font-semibold text-white disabled:bg-gray-400 bg-blue-600 hover:bg-blue-700"
        >
          {loading ? "Enviando..." : "Obtener Ticket"}
        </button>

        {mensaje && <p className="text-center text-sm mt-3">{mensaje}</p>}
      </form>
    </div>
  );
}
