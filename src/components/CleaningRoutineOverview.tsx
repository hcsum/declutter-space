import Link from "next/link";
import {
  dailyCleaningTasks,
  monthlyCleaningTasks,
  cleaningDays,
  weeklyCleaningTasks,
} from "@/lib/cleaning-plan";

export default function CleaningRoutineOverview() {
  return (
    <section
      id="tablas-de-limpieza"
      className="scroll-mt-24 rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8"
    >
      <h2 className="text-2xl font-bold text-[#002d1c] md:text-3xl">
        Tabla de limpieza diaria, semanal y mensual
      </h2>
      <p className="mt-3 max-w-3xl leading-7 text-[#414844]">
        Este es un punto de partida, no una lista obligatoria. El tamaño de la
        casa, las personas que viven en ella y tus necesidades cambian el tiempo
        necesario. Reparte el trabajo entre quienes puedan participar.
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-bold text-[#002d1c]">
            Cada día: mantenimiento básico
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-[#414844]">
            {dailyCleaningTasks.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#002d1c]">
            Cada mes: una tarea por semana
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-[#414844]">
            {monthlyCleaningTasks.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ul>
        </div>
      </div>
      <h3 className="mt-8 text-lg font-bold text-[#002d1c]">
        Ejemplo semanal: una zona cada día
      </h3>
      <div className="mt-4 overflow-x-auto rounded-xl border border-black/10">
        <table className="w-full text-left text-sm leading-6">
          <caption className="sr-only">Plan de lunes a domingo</caption>
          <thead className="bg-[#dcebdd]">
            <tr>
              <th scope="col" className="p-4">
                Día
              </th>
              <th scope="col" className="p-4">
                Zona y tarea
              </th>
            </tr>
          </thead>
          <tbody>
            {cleaningDays.map((day, index) => (
              <tr key={day} className="border-t border-black/10">
                <th scope="row" className="p-4 align-top text-[#002d1c]">
                  {day}
                </th>
                <td className="p-4 text-[#414844]">
                  {weeklyCleaningTasks[index]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-5 leading-7 text-[#414844]">
        Si solo tienes 10 minutos, termina una parte de la zona y deja el resto
        programado. Si prefieres concentrar la limpieza el fin de semana, usa la
        segunda versión de la plantilla: mantenimiento entre semana y dos
        bloques con pausas.
      </p>
      <Link
        href="/es/plan-de-limpieza-semanal"
        className="mt-5 inline-flex min-h-12 items-center rounded-full bg-[#002d1c] px-6 py-3 text-sm font-bold text-white hover:bg-[#335748]"
      >
        Personalizar el plan e imprimir / guardar PDF →
      </Link>
    </section>
  );
}
