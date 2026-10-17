import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SpanishGuide, { type SpanishGuideCopy } from "@/components/SpanishGuide";
import { JsonLd } from "@/components/json-ld";
import CleaningRoutineOverview from "@/components/CleaningRoutineOverview";
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
    "Si las tareas se acumulan para el mismo día, puede costar encontrar tiempo para empezar. Una rutina de limpieza del hogar permite repartirlas: un repaso diario, tareas semanales por zonas y una revisión mensual. Prueba con 10-15 minutos al día y ajusta el plan a tu casa. Puedes personalizar la plantilla e imprimirla o guardarla como PDF desde el navegador.",
  ctaLabel: "Personalizar el plan e imprimir / guardar PDF",
  ctaHref: "/es/plan-de-limpieza-semanal#plantilla",
  introTitle: "Cómo hacer un plan que encaje en tu semana",
  introBody:
    "Un plan puede resultar difícil de seguir si exige más tiempo o energía de los que tienes. Antes de reservar un sábado entero, piensa qué ratos tienes disponibles entre semana y el fin de semana. Después decide qué tareas caben en cada rato. Si algo queda pendiente, busca otro momento concreto en vez de añadirlo sin más al día siguiente.",
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
      "Por ejemplo: lunes baño, martes cocina, miércoles dormitorios, jueves salón y viernes suelos. Reserva un rato para cada zona y reduce el alcance si no te da tiempo. Puedes empezar con bloques de 20-30 minutos y ajustarlos según lo que necesites.",
    ],
    [
      "4. Ancla cada tarea a algo que ya haces",
      "Las rutinas se sostienen enganchadas a un hábito existente: fregar mientras se hace el café, despejar la encimera al terminar de cenar, pasar la escoba antes de la serie. No hace falta acordarse, hace falta un disparador.",
    ],
    [
      "5. Saca lo que sobra antes de organizar",
      "Si las superficies están llenas, primero hay que mover objetos para poder pasar el paño. Dedica unos minutos a despejarlas y devuelve cada cosa a su sitio. Si hay objetos que ya no necesitas, decide su destino por separado.",
    ],
    [
      "6. Deja lo mensual por escrito y olvídate",
      "Limpiar una zona del frigorífico, ventanas, zócalos o revisar filtros según las instrucciones del fabricante. Reparte esas tareas entre las semanas del mes. Las sábanas y toallas van en la revisión semanal, ajustando la frecuencia a tus necesidades.",
    ],
  ],
  highlightTitle: "Reparte las tareas según tu tiempo y energía",
  highlightBody:
    "Los repasos cortos pueden ayudarte a mantener despejadas las zonas de uso diario. Si prefieres concentrar la limpieza, reserva uno o dos bloques el fin de semana y deja solo lo básico para los demás días. Prueba el reparto y cambia lo que no encaje: ninguna de las dos opciones funciona igual para todo el mundo.",
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
    "Puedes reservar para la semana el polvo de las superficies, los suelos, el inodoro, la ducha, los espejos, las sábanas y las toallas. Añade el microondas, la placa de cocina y una revisión de los alimentos según haga falta. El tiempo necesario cambia con el tamaño de la casa y su uso; si una zona no cabe en el rato disponible, divídela en tareas más pequeñas.",
  quickResetTitle:
    "Reinicio rápido de 15 minutos cuando se te ha ido de las manos",
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
      "Puedes probar con 10-15 minutos para un repaso básico y ajustar después. El tiempo depende del tamaño de la casa, de cuántas personas viven en ella y de sus necesidades. Reserva aparte las tareas semanales y mensuales; el repaso diario no tiene que incluir toda la limpieza.",
    ],
    [
      "¿En qué orden se debe limpiar una casa?",
      "De arriba abajo y de dentro afuera: primero polvo y superficies altas, después muebles y encimeras, y al final suelos. Así lo que cae mientras limpias termina recogiéndose en el último paso en lugar de obligarte a repetir.",
    ],
    [
      "¿Es mejor limpiar un poco cada día o todo un día a la semana?",
      "Depende de tus horarios y preferencias. Puedes repartir las zonas entre varios días o concentrarlas en uno o dos bloques el fin de semana. En ambos casos, deja un mantenimiento básico para los días de uso: platos, encimera y recogida de objetos. La plantilla ofrece las dos versiones para que elijas y las adaptes.",
    ],
    [
      "¿Cómo mantengo la casa limpia y ordenada con niños?",
      "Reduce el objetivo diario a las zonas comunes y añade una recogida corta antes de cenar y otra antes de dormir, con los niños participando. Las habitaciones infantiles van en la pasada semanal, no en la diaria.",
    ],
    [
      "¿Puedo descargar la rutina de limpieza en PDF?",
      "Sí. Abre la plantilla de limpieza semanal, elige la versión repartida o de fin de semana y adapta las tareas. Pulsa «Imprimir / Guardar como PDF» y elige «Guardar como PDF» en tu navegador. Incluye el mantenimiento diario, el plan de lunes a domingo y las tareas mensuales.",
    ],
  ],
  toolTitle: "Personaliza tu plan de limpieza semanal",
  toolDesc:
    "La plantilla incluye tareas de limpieza diarias, una semana editable y una revisión mensual. Puedes cambiar tareas y responsables, marcar lo que has hecho e imprimir el resultado sin crear una cuenta.",
  relatedTitle: "Sigue por aquí",
  relatedIntro: "Personaliza tu semana o consulta estas guías para despejar las zonas antes de limpiar:",
  relatedLinks: [
    {
      href: "/es/plan-de-limpieza-semanal",
      label: "Plan de limpieza semanal editable para imprimir",
    },
    { href: "/es/como-ordenar-armarios", label: "Cómo ordenar armarios" },
    { href: "/es/como-ordenar-la-cocina", label: "Cómo ordenar la cocina" },
    {
      href: "/es/como-ordenar-la-habitacion",
      label: "Cómo ordenar la habitación",
    },
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
      <SpanishGuide copy={copy}>
        <CleaningRoutineOverview />
      </SpanishGuide>
    </>
  );
}
