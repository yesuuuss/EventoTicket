// src/components/EventCard.jsx
export default function EventCard({ event, onBuy }) {
  if (!event) return null;

  return (
    <article
      className="group relative w-[680px] max-w-[92vw] rounded-2xl overflow-hidden shadow-xl shadow-slate-900/20
                 ring-1 ring-slate-700 bg-slate-900"   // fondo oscuro para barras laterales
    >
      {/* 16:9 para respetar el banner; usa 'object-contain' para NO recortar */}
      <div className="aspect-[16/9] w-full bg-slate-900 grid place-items-center">
        <img
          src={event.poster}
          alt={event.title || 'Evento'}
          className="w-full h-full object-contain"   // ← clave: no recorta
          loading="lazy"
        />
      </div>

      {/* Overlay opcional (sigue funcionando aunque haya barras) */}
      <div className="absolute inset-0 flex flex-col items-center justify-end gap-3
                      bg-gradient-to-t from-slate-900/80 via-transparent to-transparent
                      opacity-0 group-hover:opacity-100 transition px-4 pb-4 text-center">
        <h3 className="text-slate-50 font-extrabold text-base tracking-wide">
          {(event.title || '').toUpperCase()}
        </h3>
        <div className="text-xs text-slate-200/90">
          <div className="flex items-center justify-center gap-2">
            <span>📅</span><span className="font-semibold">{event.dateLabel}</span>
          </div>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span>📍</span><span className="font-medium">{event.venue}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onBuy?.(event)}
          className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/70 px-4 py-1.5 text-slate-50 hover:bg-white/10"
        >
          🎟️ Comprar tickets
        </button>
      </div>
    </article>
  );
}
