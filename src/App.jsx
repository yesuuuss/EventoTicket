import { useState } from "react";
import EventCard from "./components/EventCard";
import TicketModal from "./components/TicketModal";
import { registerAttendee } from "./lib/api";


export default function App() {

  const event = {
    id: "congreso-leon-ruge-2025",
    title: "Congreso el León Ruge",
    poster: "/img/leon-ruge.jpg",   
    dateLabel: "18 OCT • 09:00 hrs.",
    venue: "Iglesia La casa de Elías internacional 1-83 5ta av. colonia cotio zona 2 mixco",
  };

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);

  const openBuy = (e) => {
    setSelected(e);
    setOpen(true);
  };

const submit = async (data) => {

  if (goesToChurch === 'si' && !data.churchName) return;
  if (sourceCode === 'otro' && !data.sourceCodeOther) return;
  if (isTeam === 'si' && (!data.teamAreas || data.teamAreas.length === 0)) return;

  const apiUrl = import.meta.env.VITE_API_URL; 

  
  const payload = { 
    ...data, 
    nombre: data.fullName,  
    sourceCode: data.sourceCode || "facebook",  
    eventId: event.id 
  };

  delete payload.fullName; 

  try {
    const response = await fetch(`${apiUrl}/api/attendees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const responseData = await response.json();
      alert("Registro exitoso!");
      onSubmitForm({ ...data, eventId: event.id });
    } else {
      alert("Hubo un problema al enviar los datos.");
    }
  } catch (error) {
    console.error("Error al enviar los datos:", error);
    alert("Ocurrió un error al intentar registrar los datos.");
  }
};




  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Contenido central */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-5xl w-full px-4 flex justify-center">
          <EventCard event={event} onBuy={openBuy} />
        </div>
      </div>

      {/* Modal */}
      <TicketModal
        open={open}
        event={selected}
        onClose={() => setOpen(false)}
        onSubmitForm={submit}
      />

      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 rounded-lg bg-slate-800 ring-1 ring-slate-700 px-4 py-2 text-sm">
          {toast}
        </div>
      )}

      {/* Footer con íconos */}
      <footer className="bg-slate-900 py-6 flex justify-center gap-6">
        <a
          href="https://www.facebook.com/share/1EwLzzVNmG/?mibextid=wwXIfr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/icons/fb.png"
            alt="Facebook"
            className="w-8 h-8 hover:opacity-80 transition"
          />
        </a>
        <a
          href="https://www.instagram.com/lacasadeeliasinternacional?igsh=Z3F6NnF3YXQ4MTht"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/icons/ig.png"
            alt="Instagram"
            className="w-8 h-8 hover:opacity-80 transition"
          />
        </a>
      </footer>
    </div>
  );
}
