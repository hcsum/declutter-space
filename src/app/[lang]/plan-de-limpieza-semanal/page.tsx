import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import WeeklyCleaningPlanner from "@/components/WeeklyCleaningPlanner";
import { JsonLd } from "@/components/json-ld";
import {
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  buildLanguageAlternates,
} from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };
const PATH = "/plan-de-limpieza-semanal";
const faqs = [
  {
    question: "¿Cómo descargo el plan de limpieza semanal en PDF?",
    answer:
      "Elige una versión, modifica las tareas si quieres y pulsa «Imprimir / Guardar como PDF». En el diálogo del navegador, selecciona «Guardar como PDF». Se imprime solo la plantilla con tus cambios y casillas, no toda la página.",
  },
  {
    question: "¿Puedo cambiar los días, las tareas y los responsables?",
    answer:
      "Sí. Cada día tiene un campo editable. Mueve el texto de una tarea al día que prefieras y añade el nombre de la persona responsable. La plantilla es un punto de partida; puedes sustituir o eliminar cualquier tarea.",
  },
  {
    question: "¿Qué versión uso si trabajo toda la semana?",
    answer:
      "La versión de fin de semana deja el mantenimiento básico entre semana y agrupa la limpieza en dos bloques. Si el fin de semana tampoco está libre, usa la versión repartida y reduce cada zona a una tarea de diez minutos.",
  },
  {
    question: "¿Se guarda el plan para la semana siguiente?",
    answer:
      "No. Los cambios y las casillas se mantienen mientras esta página está abierta, pero no se guardan al recargar o salir. Guarda una copia en PDF antes de cerrar. No necesitas cuenta y tus notas no se envían al servidor.",
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if ((await params).lang !== "es") return {};
  return {
    title:
      "Plan de limpieza semanal para imprimir: plantilla editable y PDF gratis",
    description:
      "Personaliza un plan de limpieza de lunes a domingo, con versiones diaria y de fin de semana. Marca tareas, añade responsables e imprime o guarda tu PDF gratis, sin registro.",
    alternates: buildLanguageAlternates("es", PATH),
  };
}

export default async function Page({ params }: Props) {
  if ((await params).lang !== "es") notFound();
  return (
    <main className="min-h-screen bg-[#f3f4ec] px-5 pb-20 pt-24 text-[#1a1c18] md:px-8">
      <JsonLd data={buildFaqPageSchema(faqs)} />
      <JsonLd
        data={buildBreadcrumbSchema("es", [
          { name: "Inicio", path: "/" },
          { name: "Rutina de limpieza", path: "/rutina-de-limpieza-del-hogar" },
          { name: "Plan semanal para imprimir", path: PATH },
        ])}
      />
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="rounded-[2rem] bg-white px-6 py-10 shadow-sm ring-1 ring-black/5 md:px-10 md:py-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#59615d]">
            Plantilla gratuita · sin registro
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-[-0.05em] text-[#002d1c] md:text-6xl">
            Plan de limpieza semanal para imprimir
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#414844]">
            Una semana visible, tareas concretas y espacio para repartirlas.
            Elige entre limpiar un poco cada día o concentrar las zonas el fin
            de semana. Edita la plantilla y guarda una copia en PDF para tu
            casa.
          </p>
          <a
            href="#plantilla"
            className="mt-6 inline-flex rounded-full bg-[#002d1c] px-6 py-3 text-sm font-bold text-white hover:bg-[#335748]"
          >
            Editar mi plan semanal →
          </a>
        </section>
        <WeeklyCleaningPlanner />
        <section className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold text-[#002d1c]">
            Cómo adaptar la plantilla en cinco minutos
          </h2>
          <ol className="mt-5 list-decimal space-y-3 pl-5 leading-7 text-[#414844]">
            <li>
              Elige una versión según el tiempo que tienes, no según tu semana
              ideal.
            </li>
            <li>
              Quita las tareas que no correspondan a tu casa y reduce las zonas
              grandes a una parte concreta.
            </li>
            <li>
              Cambia las tareas de día copiando el texto y añade responsables.
              Acordad el reparto antes de imprimir.
            </li>
            <li>
              Escoge una sola tarea mensual para esta semana. El resto puede
              esperar.
            </li>
            <li>
              Pulsa «Imprimir / Guardar como PDF». Para una hoja sin marcas,
              imprime antes de marcar las casillas.
            </li>
          </ol>
          <p className="mt-5 leading-7 text-[#414844]">
            Si necesitas decidir qué hacer a diario, semanalmente o cada mes,
            consulta la{" "}
            <Link
              href="/es/rutina-de-limpieza-del-hogar"
              className="font-semibold text-[#002d1c] underline underline-offset-4"
            >
              guía para crear una rutina de limpieza del hogar
            </Link>
            . Esta página es la plantilla de trabajo.
          </p>
        </section>
        <section className="rounded-[2rem] bg-white px-6 py-8 shadow-sm ring-1 ring-black/5 md:px-8">
          <h2 className="text-2xl font-bold text-[#002d1c]">
            Preguntas sobre el plan de limpieza semanal
          </h2>
          <div className="mt-5 space-y-6">
            {faqs.map(({ question, answer }) => (
              <div key={question}>
                <h3 className="text-lg font-bold text-[#002d1c]">{question}</h3>
                <p className="mt-2 leading-7 text-[#414844]">{answer}</p>
              </div>
            ))}
          </div>
        </section>
        <nav
          aria-label="Guías relacionadas"
          className="flex flex-wrap gap-5 rounded-[2rem] bg-[#dcebdd] p-6 font-semibold text-[#002d1c]"
        >
          <Link
            className="underline underline-offset-4"
            href="/es/rutina-de-limpieza-del-hogar"
          >
            Rutina diaria, semanal y mensual →
          </Link>
          <Link
            className="underline underline-offset-4"
            href="/es/como-ordenar-la-cocina"
          >
            Ordenar la cocina antes de limpiar →
          </Link>
          <Link
            className="underline underline-offset-4"
            href="/es/declutter-checklist"
          >
            Lista para reducir la cantidad de cosas →
          </Link>
        </nav>
      </div>
    </main>
  );
}
