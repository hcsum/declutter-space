import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SpanishGuide, { type SpanishGuideCopy } from "@/components/SpanishGuide";
import { JsonLd } from "@/components/json-ld";
import {
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  buildLanguageAlternates,
} from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

const PATH = "/rutina-de-limpieza-del-hogar";

const copy: SpanishGuideCopy = {
  eyebrow: "Rutina de limpieza del hogar",
  heroTitle: "Rutina de limpieza del hogar: diaria, semanal y mensual",
  heroSubtitle:
    "La casa no se desordena porque limpies poco, sino porque todo se acumula para el mismo día. Una rutina de limpieza del hogar reparte el trabajo en tareas cortas: 10-15 minutos al día, una pasada semanal por zonas y una revisión mensual. Puedes descargar la lista en PDF y marcarla a mano.",
  ctaLabel: "Abrir la lista y descargar el PDF",
  ctaHref: "/es/declutter-checklist",
  introTitle: "Por qué el plan de limpieza semanal falla casi siempre",
  introBody:
    "La mayoría de los planes de limpieza fallan por lo mismo: son demasiado ambiciosos para un día normal. Se planifica un sábado entero de limpieza a fondo, llega el sábado, no hay ganas, y la casa acumula otra semana. Una rutina que funciona se diseña al revés: primero decides cuánto tiempo tienes de verdad entre semana (normalmente 10 o 15 minutos), y solo después decides qué cabe dentro. Lo que no cabe pasa a la pasada semanal o a la revisión mensual, no al día siguiente.",
  removeTitle: "Las tareas diarias que sostienen la casa",
  removeItems: [
    "Hacer la cama al levantarte",
    "Dejar el fregadero vacío antes de dormir",
    "Despejar la mesa del comedor y la encimera",
    "Una pasada rápida al baño después de la ducha",
    "Recoger lo que esté fuera de sitio en el salón",
    "Sacar la basura si el cubo está lleno",
    "Poner una lavadora si hay carga completa",
  ],
  stepsTitle: "Cómo montar tu rutina de limpieza en 6 pasos",
  steps: [
    [
      "1. Mide tu tiempo real, no el ideal",
      "Antes de repartir tareas, decide cuántos minutos tienes un martes cualquiera. Si son 10, tu rutina diaria dura 10 minutos. Un plan que solo funciona los días buenos no es un plan.",
    ],
    [
      "2. Separa mantener de limpiar a fondo",
      "Mantener es lo diario: recoger, fregar los platos, despejar superficies. Limpiar a fondo es lo semanal y mensual: baños, suelos, polvo, electrodomésticos. Si los mezclas, lo diario se hace eterno y dejas de hacerlo.",
    ],
    [
      "3. Reparte la casa por zonas, un día cada una",
      "Lunes baño, martes cocina, miércoles dormitorios, jueves salón, viernes suelos. Cada zona toca una vez por semana y ninguna sesión pasa de 20-30 minutos.",
    ],
    [
      "4. Ancla cada tarea a algo que ya haces",
      "Las rutinas se sostienen enganchadas a un hábito existente: fregar mientras se hace el café, despejar la encimera al terminar de cenar, pasar la escoba antes de la serie. No hace falta acordarse, hace falta un disparador.",
    ],
    [
      "5. Saca lo que sobra antes de organizar",
      "Limpiar una casa con demasiadas cosas cuesta el doble: cada superficie hay que despejarla antes de pasar el paño. Una ronda de orden previa recorta el tiempo de limpieza de forma permanente.",
    ],
    [
      "6. Deja lo mensual por escrito y olvídate",
      "Cambiar sábanas, limpiar el frigorífico, ventanas, filtros de la campana, revisar caducados. Son tareas que nadie recuerda por intuición: van en la lista mensual, no en tu cabeza.",
    ],
  ],
  highlightTitle: "10 minutos al día ganan a tres horas el sábado",
  highlightBody:
    "Setenta minutos repartidos en la semana rinden mucho más que tres horas de golpe, porque la casa nunca llega a un estado en el que ordenar dé pereza. El sábado intensivo, además, solo funciona si el sábado sale bien; la rutina corta sobrevive a las semanas malas, que son la mayoría.",
  mistakesTitle: "Errores habituales al crear una rutina de limpieza",
  mistakes: [
    "Planificar una rutina para tu mejor semana, no para una semana normal",
    "Meter la limpieza a fondo dentro de las tareas diarias",
    "Empezar por comprar productos y organizadores en vez de por sacar cosas",
    "No fijar un día concreto para lo semanal, dejarlo en «cuando pueda»",
    "Intentar arrancar con la casa entera el mismo día",
  ],
  keepTitle: "Qué va en la pasada semanal",
  keepBody:
    "La sesión semanal es para lo que se nota pero no es urgente: polvo en superficies, aspirar y fregar suelos, baño a fondo (inodoro, ducha, espejos), cambiar toallas, limpiar el microondas y la vitrocerámica, y una pasada por la nevera para tirar lo que ha caducado. Con 20-30 minutos por zona es suficiente si lo diario se está cumpliendo.",
  quickResetTitle: "Reinicio rápido de 15 minutos cuando se te ha ido de las manos",
  quickResetSteps: [
    "Pon un temporizador de 15 minutos: al sonar, paras aunque no hayas terminado",
    "Primera ronda solo con una bolsa: basura y cosas para tirar",
    "Segunda ronda con una cesta: todo lo que está fuera de su sitio, sin colocarlo aún",
    "Despeja las superficies visibles (mesa, encimera, mesilla) y pasa un paño",
    "Reparte la cesta por habitaciones y deja el resto para la sesión de mañana",
  ],
  faqTitle: "Preguntas frecuentes sobre la rutina de limpieza del hogar",
  faqs: [
    [
      "¿Cuánto tiempo hay que dedicar cada día a limpiar la casa?",
      "Entre 10 y 15 minutos diarios bastan para mantener una casa normal, siempre que haya una pasada semanal por zonas de 20-30 minutos. El objetivo del rato diario no es limpiar a fondo, es evitar que se acumule.",
    ],
    [
      "¿En qué orden se debe limpiar una casa?",
      "De arriba abajo y de dentro afuera: primero polvo y superficies altas, después muebles y encimeras, y al final suelos. Así lo que cae mientras limpias termina recogiéndose en el último paso en lugar de obligarte a repetir.",
    ],
    [
      "¿Es mejor limpiar un poco cada día o todo un día a la semana?",
      "Un poco cada día se sostiene mejor. La sesión larga semanal depende de tener ese día libre y con energía; la rutina corta sobrevive a las semanas complicadas, y la casa nunca llega al punto en el que ponerse cuesta mucho.",
    ],
    [
      "¿Cómo mantengo la casa limpia y ordenada con niños?",
      "Reduce el objetivo diario a las zonas comunes y añade una recogida corta antes de cenar y otra antes de dormir, con los niños participando. Las habitaciones infantiles van en la pasada semanal, no en la diaria.",
    ],
    [
      "¿Puedo descargar la rutina de limpieza en PDF?",
      "Sí. Abre la lista de cualquier zona y pulsa «Descargar PDF»: obtienes una lista con casillas lista para imprimir y marcar a mano, con tu progreso actual ya marcado.",
    ],
  ],
  toolTitle: "Empieza hoy con la lista marcada",
  toolDesc:
    "La lista de orden y limpieza está organizada por zonas: recibidor, cocina, dormitorio, salón, baño, armarios y despacho. Marca lo que hagas hoy, guarda el progreso y descarga el PDF cuando quieras trabajar en papel.",
  relatedTitle: "Sigue por aquí",
  relatedIntro: "Si el problema no es la limpieza sino la cantidad de cosas:",
  relatedLinks: [
    { href: "/es/como-ordenar-armarios", label: "Cómo ordenar armarios" },
    { href: "/es/como-ordenar-la-cocina", label: "Cómo ordenar la cocina" },
    { href: "/es/como-ordenar-la-habitacion", label: "Cómo ordenar la habitación" },
    { href: "/es/declutter-checklist", label: "Lista de orden y limpieza" },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "es") return {};

  return {
    title:
      "Rutina de limpieza del hogar: plan diario, semanal y mensual (PDF gratis)",
    description:
      "Cómo crear una rutina de limpieza del hogar realista: 15 minutos al día, plan de limpieza semanal por zonas y revisión mensual. Con lista gratuita y PDF para imprimir.",
    keywords: [
      "rutina de limpieza del hogar",
      "plan de limpieza semanal",
      "planning de limpieza",
      "rutina de limpieza diaria semanal y mensual",
      "rutina de limpieza del hogar pdf",
      "cómo organizar la limpieza de la casa",
    ],
    alternates: buildLanguageAlternates("es", PATH),
  };
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  if (lang !== "es") notFound();

  return (
    <>
      <JsonLd
        data={buildFaqPageSchema(
          copy.faqs.map(([question, answer]) => ({ question, answer })),
        )}
      />
      <JsonLd
        data={buildBreadcrumbSchema("es", [
          { name: "Inicio", path: "/" },
          { name: "Rutina de limpieza del hogar", path: PATH },
        ])}
      />
      <SpanishGuide copy={copy} />
    </>
  );
}
