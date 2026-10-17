"use client";

import { useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { printWorksheet } from "@/lib/print-worksheet";
import {
  cleaningDays,
  dailyCleaningTasks,
  monthlyCleaningTasks,
  weeklyCleaningTasks,
  weekendCleaningTasks,
} from "@/lib/cleaning-plan";

export default function WeeklyCleaningPlanner() {
  const sheet = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"distributed" | "weekend">("distributed");
  const [plans, setPlans] = useState({
    distributed: [...weeklyCleaningTasks],
    weekend: [...weekendCleaningTasks],
  });
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const inputClass =
    "mt-2 block w-full rounded-xl border border-[#335748]/30 bg-white p-3 text-sm font-normal leading-6 text-[#1a1c18] focus:outline-none focus:ring-2 focus:ring-[#335748]";

  function print() {
    if (!sheet.current) return;
    trackEvent("worksheet_print_requested", {
      worksheet: "weekly_cleaning",
      template: mode,
    });
    printWorksheet(sheet.current, "Plan de limpieza semanal para imprimir");
  }

  function toggle(key: string, checked: boolean) {
    setChecks((previous) => ({ ...previous, [key]: checked }));
    if (checked) trackEvent("cleaning_task_checked", { template: mode });
  }

  return (
    <section
      id="plantilla"
      className="scroll-mt-24 rounded-[2rem] bg-[#dcebdd] px-6 py-8 ring-1 ring-black/5 md:px-8"
    >
      <div
        className="mb-6 flex flex-wrap gap-3"
        role="group"
        aria-label="Versión del plan"
      >
        {(
          [
            ["distributed", "Un poco cada día"],
            ["weekend", "Limpieza el fin de semana"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            aria-pressed={mode === value}
            onClick={() => setMode(value)}
            className={`min-h-12 rounded-full border border-[#335748] px-5 py-3 text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#002d1c] ${mode === value ? "bg-[#002d1c] text-white" : "bg-white text-[#002d1c] hover:bg-[#f9faf2]"}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div ref={sheet} lang="es">
        <h2 className="text-2xl font-bold text-[#002d1c] md:text-3xl">
          Mi plan de limpieza semanal
        </h2>
        <p className="mt-3 leading-7 text-[#335748]">
          {mode === "distributed"
            ? "Una zona cada día. Si solo tienes 10 minutos, elige una parte y programa lo que quede."
            : "Mantenimiento diario y dos bloques el fin de semana. Ajusta las tareas al tiempo y la energía disponibles."}
        </p>
        <label className="mt-5 block text-sm font-semibold text-[#002d1c]">
          Semana del
          <input
            type="text"
            name="week"
            placeholder="Ej.: 19 al 25 de octubre"
            className={inputClass}
          />
        </label>
        <section className="mt-6">
          <h3 className="text-lg font-bold text-[#002d1c]">
            Cada día: repaso básico
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#335748]">
            Las casillas de este bloque son para hoy. En papel, vuelve a
            marcarlas con lápiz o imprime una copia nueva cuando la necesites.
          </p>
          {dailyCleaningTasks.map((task, index) => (
            <label
              key={task}
              className="mt-3 flex min-h-11 items-start gap-3 text-sm leading-6 text-[#002d1c]"
            >
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 shrink-0 accent-[#002d1c]"
                checked={!!checks[`daily-${index}`]}
                onChange={(event) =>
                  toggle(`daily-${index}`, event.target.checked)
                }
              />
              {task}
            </label>
          ))}
        </section>
        <section className="mt-6">
          <h3 className="text-lg font-bold text-[#002d1c]">
            De lunes a domingo: cambia tareas o responsables
          </h3>
          <div className="mt-4 space-y-3">
            {cleaningDays.map((day, index) => (
              <div
                key={day}
                className="rounded-2xl bg-white/70 p-4 sm:grid sm:grid-cols-[130px_1fr] sm:gap-4"
              >
                <label className="flex min-h-11 items-center gap-3 text-sm font-bold text-[#002d1c]">
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-[#002d1c]"
                    checked={!!checks[`${mode}-${index}`]}
                    onChange={(event) =>
                      toggle(`${mode}-${index}`, event.target.checked)
                    }
                  />
                  {day}
                </label>
                <label className="block text-sm font-semibold text-[#335748]">
                  Tareas y responsable · {day}
                  <textarea
                    rows={2}
                    className={inputClass}
                    value={plans[mode][index]}
                    onChange={(event) =>
                      setPlans((previous) => ({
                        ...previous,
                        [mode]: previous[mode].map((task, taskIndex) =>
                          taskIndex === index ? event.target.value : task,
                        ),
                      }))
                    }
                  />
                </label>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-6">
          <h3 className="text-lg font-bold text-[#002d1c]">
            Este mes: elegir una tarea pendiente
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#335748]">
            No hace falta hacerlas todas esta semana. Elige una y anótala en el
            día que te venga bien.
          </p>
          {monthlyCleaningTasks.map((task, index) => (
            <label
              key={task}
              className="mt-3 flex min-h-11 items-start gap-3 text-sm leading-6 text-[#002d1c]"
            >
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 shrink-0 accent-[#002d1c]"
                checked={!!checks[`monthly-${index}`]}
                onChange={(event) =>
                  toggle(`monthly-${index}`, event.target.checked)
                }
              />
              {task}
            </label>
          ))}
        </section>
        <label className="mt-6 block text-sm font-semibold text-[#002d1c]">
          Lo que dejamos para después / notas
          <textarea
            rows={3}
            className={inputClass}
            placeholder="Una tarea concreta, quién la hará y cuándo"
          />
        </label>
      </div>
      <button
        type="button"
        onClick={print}
        className="mt-6 min-h-12 rounded-full bg-[#002d1c] px-6 py-3 text-sm font-bold text-white hover:bg-[#335748] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#002d1c]"
      >
        Imprimir / Guardar como PDF
      </button>
      <p className="mt-3 text-sm leading-6 text-[#335748]">
        En el diálogo de impresión, elige «Guardar como PDF». Se incluyen tus
        cambios y casillas. No necesitas cuenta: los datos se quedan en esta
        pestaña y no se guardan al salir o recargar.
      </p>
    </section>
  );
}
