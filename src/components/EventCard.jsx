export default function EventCard({ event, onBuy }) {
  if (!event) return null;

  const open = () => onBuy?.(event);

  return (
    // Hacemos toda la card clicable en móvil
    <article
      onClick={open}
      role="button"
      tabIndex={0}
      onKeyDown={(e)=> (e.key === 'Enter' || e.key === ' ') && open()}
      className="group relative w-[680px] max-w-[92vw] rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-700 bg-slate-900 cursor-pointer"
    >
      <div className="aspect-[16/9] w-full bg-slate-900 grid place-items-center">
        <img
          src={event.poster}
          alt={event.title || 'Evento'}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Overlay: visible en móvil, aparece en hover en desktop */}
      <div
        className="
          absolute inset-0 flex flex-col items-center justify-end gap-3
          bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent
          opacity-100
          sm:opacity-0 sm:group-hover:opacity-100
          transition px-4 pb-4 text-center pointer-events-none sm:pointer-events-auto
        "
      >
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

        {/* Botón: en móvil también debe funcionar (quitamos pointer-events:none) */}
        <button
          type="button"
          onClick={(e)=>{ e.stopPropagation(); open(); }}
          className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/70 px-4 py-1.5 text-slate-50 hover:bg-white/10 pointer-events-auto"
        >
          🎟️ Comprar tickets
        </button>
      </div>
    </article>
  );
}
