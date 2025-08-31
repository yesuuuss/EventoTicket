import { useForm } from 'react-hook-form';

export default function TicketModal({ open, onClose, event, onSubmitForm }) {
  const { register, handleSubmit, watch, formState:{errors, isSubmitting} } =
    useForm({ defaultValues:{ goesToChurch:'no', isTeam:'no', teamAreas:[] }});

  const goesToChurch = watch('goesToChurch');
  const isTeam = watch('isTeam');
  const howHeard = watch('howHeard');

  const submit = async (data) => {
    // Validación mínima en front (el back valida en serio)
    if (goesToChurch === 'si' && !data.churchName) return;
    if (howHeard === 'otro' && !data.howHeardOther) return;
    if (isTeam === 'si' && (!data.teamAreas || data.teamAreas.length === 0)) return;

    await onSubmitForm({ ...data, eventId: event.id });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}/>
      <div className="relative w-full max-w-xl rounded-2xl bg-slate-900 ring-1 ring-slate-700 p-6">
        <h3 className="text-xl font-bold text-slate-50">
          {event.title} — Registro
        </h3>
        <p className="text-slate-400 text-sm mb-4">{event.dateLabel} • {event.venue}</p>

        <form className="grid gap-4" onSubmit={handleSubmit(submit)}>
          <div>
            <label className="label">Nombre completo</label>
            <input {...register('fullName', {required:true})} className="input" placeholder="Nombre y apellidos"/>
            {errors.fullName && <p className="error">Requerido</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Correo</label>
              <input {...register('email', {required:true})} type="email" className="input" placeholder="tucorreo@dominio.com"/>
              {errors.email && <p className="error">Requerido</p>}
            </div>
            <div>
              <label className="label">Teléfono</label>
              <input {...register('phone', {required:true})} className="input" placeholder="+502 5xxxxxxx"/>
              {errors.phone && <p className="error">Requerido</p>}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">¿Asiste actualmente a una iglesia?</label>
              <div className="flex items-center gap-4 mt-1">
                <label className="radio"><input type="radio" value="no" {...register('goesToChurch')}/> No</label>
                <label className="radio"><input type="radio" value="si" {...register('goesToChurch')}/> Sí</label>
              </div>
            </div>

            {goesToChurch === 'si' && (
              <div>
                <label className="label">¿Dónde se congrega?</label>
                <input {...register('churchName')} className="input" placeholder="Nombre de la iglesia"/>
              </div>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">¿Cómo te enteraste del evento?</label>
              <select {...register('howHeard', {required:true})} className="input">
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="casa_oracion">Casa de oración</option>
                <option value="amigo_familiar">Amigo/Familiar</option>
                <option value="iglesia_casa_de_elias">Iglesia Casa de Elías</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            {howHeard === 'otro' && (
              <div>
                <label className="label">Especifica</label>
                <input {...register('howHeardOther')} className="input" placeholder="¿Dónde lo viste?"/>
              </div>
            )}
          </div>

          <div>
            <label className="label">¿Eres parte del equipo de la Casa de Elías?</label>
            <div className="flex items-center gap-4 mt-1">
              <label className="radio"><input type="radio" value="no" {...register('isTeam')}/> No</label>
              <label className="radio"><input type="radio" value="si" {...register('isTeam')}/> Sí</label>
            </div>
          </div>

          {isTeam === 'si' && (
            <div>
              <span className="label">Áreas</span>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                {[
                  ['servidores','Servidores'],
                  ['logistica','Logística'],
                  ['medios','Medios'],
                  ['alabanza','Alabanza'],
                  ['cafeteria','Cafetería'],
                  ['danza','Danza'],
                ].map(([val,label]) => (
                  <label key={val} className="checkbox">
                    <input type="checkbox" value={val} {...register('teamAreas')} /> {label}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="mt-2 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting ? 'Enviando…' : 'Obtener Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
