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

const PATH = "/como-ordenar-la-habitacion";

const copy: SpanishGuideCopy = {
  eyebrow: "Dormitorio",
  heroTitle: "Cómo ordenar la habitación y mantenerla ordenada",
  heroSubtitle:
    "La habitación es la última que se ordena y la primera que se vuelve a desordenar, porque nadie la ve más que tú. Ordenarla no requiere un fin de semana entero: requiere un orden concreto de tareas y sesiones lo bastante cortas como para terminarlas.",
  ctaLabel: "Abrir la lista del dormitorio",
  ctaHref: "/es/declutter-checklist/bedroom",
  introTitle: "Ordena por superficies, no por zonas",
  introBody:
    "Cuando una habitación está muy desordenada, mirarla entera paraliza. Funciona mejor ir por superficies en un orden fijo: primero el suelo, después la cama, después la mesilla, después el escritorio o la cómoda, y solo al final lo que hay debajo de la cama y dentro del armario. Cada superficie despejada cambia la sensación de la habitación de inmediato, y eso es lo que hace que sigas en vez de abandonar a la mitad.",
  removeTitle: "Lo que suele acumularse en el dormitorio",
  removeItems: [
    "Ropa en la silla, entre limpia y usada",
    "Vasos, tazas y botellas de agua a medias",
    "Cosas de la mesilla que no tocas desde hace meses",
    "Cables y cargadores que ya no corresponden a nada",
    "Cajas y bolsas guardadas debajo de la cama",
    "Libros empezados y nunca terminados",
    "Almohadas deformadas y sábanas viejas",
    "Cosméticos y muestras que no vas a usar",
  ],
  stepsTitle: "Cómo ordenar tu habitación en 6 pasos",
  steps: [
    [
      "1. Saca la basura y los platos primero",
      "Con una bolsa y una bandeja, retira envoltorios, papeles, vasos y tazas. En cinco minutos la habitación ya parece otra y eso sostiene el resto de la sesión.",
    ],
    [
      "2. Despeja el suelo",
      "El suelo es lo que más pesa visualmente. Recoge todo lo que esté por el suelo en una cesta, sin ordenarlo todavía: primero fuera de la vista, después a su sitio.",
    ],
    [
      "3. Resuelve la silla de la ropa",
      "Es el punto donde encalla casi todo el mundo. La regla más simple: si te lo pondrías otra vez, va a una percha; si no, va al cesto. La silla no es una tercera categoría.",
    ],
    [
      "4. Vacía la mesilla",
      "Sácalo todo, límpiala y devuelve solo lo que usas de noche o al despertarte. Suele quedar en tres o cuatro cosas.",
    ],
    [
      "5. Mira debajo de la cama",
      "Lo que hay debajo lleva ahí meses o años sin echarse en falta. Si no sabes qué contiene una caja sin abrirla, ya sabes lo que hace falta hacer con ella.",
    ],
    [
      "6. Cierra con una recogida de cinco minutos",
      "Cada noche, cinco minutos: ropa a su sitio, superficies despejadas, vasos a la cocina. Es lo único que evita repetir la sesión larga dentro de dos semanas.",
    ],
  ],
  highlightTitle: "La habitación se mantiene con la noche, no con el sábado",
  highlightBody:
    "Una habitación ordenada no depende de la sesión grande, sino de los cinco minutos antes de dormir. Ese rato corto es el que impide que la ropa vuelva a la silla y las tazas se queden en la mesilla. Si solo vas a quedarte con un hábito de toda esta guía, quédate con ese.",
  mistakesTitle: "Errores al ordenar la habitación",
  mistakes: [
    "Vaciar el armario entero cuando aún hay cosas por el suelo",
    "Empezar por lo sentimental en vez de por lo evidente",
    "Guardar cosas debajo de la cama para «resolverlo luego»",
    "Intentar hacer la habitación entera de una sentada",
    "Comprar cajas de almacenaje antes de haber sacado nada",
  ],
  keepTitle: "Qué merece estar en un dormitorio",
  keepBody:
    "El dormitorio funciona mejor cuando contiene lo que sirve para dormir, vestirse y descansar. El trabajo pendiente, las cajas sin abrir y lo que estás guardando «hasta decidir» te acompañan justo en el momento del día en el que menos falta hace. Esas cosas pueden quedarse en casa, pero mejor en otra habitación.",
  quickResetTitle: "Reinicio de habitación en 15 minutos",
  quickResetSteps: [
    "Bolsa en mano: basura, envoltorios y papeles",
    "Bandeja: todos los vasos, tazas y platos a la cocina",
    "Cesta: todo lo que está por el suelo, sin colocarlo aún",
    "Resuelve la silla de la ropa: percha o cesto, nada intermedio",
    "Despeja la mesilla y haz la cama para cerrar",
  ],
  faqTitle: "Preguntas frecuentes sobre ordenar la habitación",
  faqs: [
    [
      "¿Por dónde empiezo a ordenar una habitación muy desordenada?",
      "Por la basura y los platos, después el suelo. Son los pasos que más cambian la sensación de la habitación en menos tiempo, y eso te da impulso para lo que viene después.",
    ],
    [
      "¿Cómo ordeno mi habitación rápido?",
      "Pon 15 minutos de temporizador y haz solo cuatro cosas: basura fuera, vajilla a la cocina, suelo despejado en una cesta y cama hecha. Con eso la habitación pasa a estar presentable aunque queden cajones por revisar.",
    ],
    [
      "¿Qué hago con la ropa que se acumula en la silla?",
      "Aplica una regla binaria: si te la volverías a poner, va a la percha; si no, va al cesto de la ropa sucia. El montón de la silla se sostiene precisamente porque existe como tercera opción.",
    ],
    [
      "¿Cómo ordeno una habitación pequeña con muchas cosas?",
      "En un espacio pequeño el margen está en la cantidad. Revisa primero lo de debajo de la cama y lo alto del armario, que es donde suele estar lo que no se echa en falta, y deja libres las superficies a la vista.",
    ],
    [
      "¿Cómo mantengo la habitación ordenada?",
      "Con cinco minutos cada noche: ropa a su sitio, superficies despejadas y vasos fuera. Es mucho más eficaz que una sesión larga cada varias semanas.",
    ],
  ],
  toolTitle: "Ordena el dormitorio con la lista delante",
  toolDesc:
    "La lista del dormitorio recorre lo que más se acumula: mesilla, ropa que ya no vale, textiles gastados, cosas guardadas debajo de la cama y objetos que conservas por culpa. Márcalos según avances y descarga el PDF si prefieres el papel.",
  relatedTitle: "Sigue por aquí",
  relatedIntro: "Cuando la habitación esté hecha:",
  relatedLinks: [
    { href: "/es/como-ordenar-armarios", label: "Cómo ordenar armarios" },
    { href: "/es/como-ordenar-la-cocina", label: "Cómo ordenar la cocina" },
    { href: "/es/rutina-de-limpieza-del-hogar", label: "Rutina de limpieza del hogar" },
    { href: "/es/declutter-checklist", label: "Lista de orden y limpieza" },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "es") return {};

  return {
    title: "Cómo ordenar la habitación en 6 pasos (y mantenerla ordenada)",
    description:
      "Guía práctica para ordenar tu habitación: por dónde empezar cuando está muy desordenada, cómo resolver la silla de la ropa y qué hacer cada noche. Lista gratis en PDF.",
    keywords: [
      "cómo ordenar la habitación",
      "ordenar la habitación",
      "habitación ordenada",
      "cómo mantener la habitación ordenada",
      "cómo ordenar una habitación pequeña",
      "ordenar el dormitorio",
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
          { name: "Cómo ordenar la habitación", path: PATH },
        ])}
      />
      <SpanishGuide copy={copy} />
    </>
  );
}
