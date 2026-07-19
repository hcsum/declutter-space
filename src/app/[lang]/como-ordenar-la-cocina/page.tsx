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

const PATH = "/como-ordenar-la-cocina";

const copy: SpanishGuideCopy = {
  eyebrow: "Cocina y despensa",
  heroTitle: "Cómo ordenar la cocina: armarios, cajones y despensa",
  heroSubtitle:
    "La cocina es la habitación que más se usa y la que más rápido se desordena, porque casi todo lo que entra en casa pasa por ella. Mantener el orden en la cocina depende menos de comprar organizadores y más de quitar duplicados, caducados y aparatos que no usas.",
  ctaLabel: "Abrir la lista de la cocina",
  ctaHref: "/es/declutter-checklist/kitchen",
  introTitle: "La cocina se desordena por acumulación, no por desorden",
  introBody:
    "En un armario de cocina normal conviven tres espátulas, dos vasos medidores, tápers sin tapa, especias de hace cuatro años y un aparato que se usó dos veces. Nada de eso está fuera de sitio: simplemente hay demasiado. Por eso ordenar la cocina empieza vaciando cajón por cajón y decidiendo qué se queda, no comprando separadores. Cuando queda solo lo que usas, colocarlo bien es la parte fácil.",
  removeTitle: "Lo que suele sobrar en cualquier cocina",
  removeItems: [
    "Comida caducada y especias sin aroma",
    "Tápers desparejados o sin tapa",
    "Vajilla desportillada y sartenes rayadas",
    "Utensilios repetidos: espátulas, vasos medidores, abrelatas",
    "Botellas y termos de más (2-3 por persona bastan)",
    "Aparatos de encimera que usas menos de una vez por semana",
    "Bolsas de la compra desbordando del colgador",
    "Cartas de comida a domicilio y sobrecitos de salsa sueltos",
  ],
  stepsTitle: "Cómo ordenar la cocina en 6 pasos",
  steps: [
    [
      "1. Empieza por la comida caducada",
      "Es la decisión más rápida de toda la casa: no hay dilema emocional y libera sitio de inmediato en despensa y nevera. Es el mejor arranque posible.",
    ],
    [
      "2. Vacía un cajón entero, no varios a medias",
      "Saca todo lo de un cajón, límpialo y devuelve solo lo que usas. Un cajón terminado motiva mucho más que cinco empezados.",
    ],
    [
      "3. Elimina duplicados por categoría",
      "Junta todas las espátulas, todos los tápers, todos los vasos. Casi siempre hay tres versiones de lo mismo y solo se usa una. Quédate con la mejor.",
    ],
    [
      "4. Coloca según la frecuencia de uso",
      "Lo diario, a la altura de la mano y cerca de donde se usa: el colador junto al fregadero, las especias junto a los fuegos. Lo de una vez al año, arriba del todo.",
    ],
    [
      "5. Libera la encimera",
      "La encimera despejada es lo que hace que una cocina parezca ordenada. Deja fuera solo los aparatos que uses varias veces por semana; el resto, a un armario.",
    ],
    [
      "6. Cierra con dos hábitos diarios",
      "Fregadero vacío antes de dormir y encimera despejada después de cenar. Con esos dos, la cocina aguanta ordenada entre limpiezas.",
    ],
  ],
  highlightTitle: "La regla del brazo extendido",
  highlightBody:
    "Todo lo que uses a diario debería alcanzarse sin agacharte, sin subirte a nada y sin mover otra cosa antes. Si para coger la sartén de cada día hay que sacar dos que casi no usas, el problema no es la sartén: es lo que la tapa. Reorganizar por frecuencia de uso ahorra más tiempo real que cualquier organizador que compres.",
  mistakesTitle: "Errores al ordenar la cocina",
  mistakes: [
    "Comprar organizadores y separadores antes de haber quitado nada",
    "Vaciar todos los armarios a la vez y quedarte sin tiempo",
    "Guardar aparatos «por si acaso» en la encimera",
    "Conservar tápers sin tapa y tapas sin tápers",
    "Colocar lo de uso diario en los estantes altos",
  ],
  keepTitle: "Qué debe quedarse siempre a mano",
  keepBody:
    "Los cuchillos que usas, la tabla, dos o tres sartenes buenas, la vajilla del día a día, y los utensilios que tocas cada semana. Lo demás — moldes de repostería, la vajilla de las visitas, el aparato de una receta concreta — puede quedarse en casa, pero no en el espacio que abres veinte veces al día.",
  quickResetTitle: "Reinicio de cocina en 15 minutos",
  quickResetSteps: [
    "Pon un temporizador de 15 minutos y empieza por la despensa",
    "Tira todo lo caducado sin pensarlo mucho",
    "Vacía el fregadero y despeja la encimera por completo",
    "Elige un solo cajón, vacíalo y devuelve solo lo que usas",
    "Junta los tápers y descarta los que no tengan tapa",
  ],
  faqTitle: "Preguntas frecuentes sobre ordenar la cocina",
  faqs: [
    [
      "¿Por dónde empiezo a ordenar la cocina?",
      "Por la comida caducada de la despensa y la nevera. Son decisiones sin carga emocional, se hacen rápido y liberan espacio de inmediato, que es justo lo que hace falta para seguir con los armarios.",
    ],
    [
      "¿Cómo ordeno los cajones de la cocina?",
      "Vacía el cajón entero, límpialo y devuelve solo lo que usas de verdad, agrupado por función. Los separadores tienen sentido después de esa criba, no antes.",
    ],
    [
      "¿Cómo mantengo la cocina limpia y ordenada?",
      "Con dos hábitos diarios: dejar el fregadero vacío antes de dormir y despejar la encimera al terminar de cenar. Añade una pasada semanal a nevera y microondas y la cocina no vuelve a acumularse.",
    ],
    [
      "¿Cuántos tápers y sartenes hacen falta?",
      "Menos de los que suele haber. Con dos o tres sartenes de tamaños distintos y los tápers que caben en una balda es suficiente para una casa normal: lo que pasa de ahí acaba al fondo del armario.",
    ],
    [
      "¿Qué hago con los aparatos de cocina que no uso?",
      "Si no lo has usado en un año, no lo vas a usar el siguiente. Véndelo de segunda mano o dónalo, y libera la encimera para lo que sí utilizas cada semana.",
    ],
  ],
  toolTitle: "Ordena la cocina con la lista delante",
  toolDesc:
    "La lista de la cocina recoge los puntos que más se acumulan: caducados, duplicados, vajilla desportillada, tápers desparejados y aparatos parados. Marca lo que vayas resolviendo y descarga el PDF si prefieres trabajar en papel.",
  relatedTitle: "Sigue por aquí",
  relatedIntro: "Otras zonas por las que continuar:",
  relatedLinks: [
    { href: "/es/como-ordenar-armarios", label: "Cómo ordenar armarios" },
    { href: "/es/como-ordenar-la-habitacion", label: "Cómo ordenar la habitación" },
    { href: "/es/rutina-de-limpieza-del-hogar", label: "Rutina de limpieza del hogar" },
    { href: "/es/declutter-checklist", label: "Lista de orden y limpieza" },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "es") return {};

  return {
    title: "Cómo ordenar la cocina: armarios, cajones y despensa | DeclutterYourHome",
    description:
      "Guía para ordenar la cocina paso a paso: qué quitar de armarios, cajones y despensa, cómo colocar por frecuencia de uso y cómo mantener el orden. Lista gratis en PDF.",
    keywords: [
      "cómo ordenar la cocina",
      "orden en la cocina",
      "ordenar armarios de cocina",
      "ordenar cajones cocina",
      "cocina ordenada",
      "cómo mantener la cocina limpia y ordenada",
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
          { name: "Cómo ordenar la cocina", path: PATH },
        ])}
      />
      <SpanishGuide copy={copy} />
    </>
  );
}
