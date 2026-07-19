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

const PATH = "/como-ordenar-armarios";

const copy: SpanishGuideCopy = {
  eyebrow: "Armarios y ropa",
  heroTitle: "Cómo ordenar armarios sin acabar con todo por el suelo",
  heroSubtitle:
    "El problema del armario casi nunca es que falte espacio: es que hay demasiada ropa compitiendo por el mismo sitio. Ordenar un armario consiste en decidir qué se queda antes de pensar en cajas, perchas u organizadores. Esta guía va en ese orden.",
  ctaLabel: "Abrir la lista del armario",
  ctaHref: "/es/declutter-checklist/closets",
  introTitle: "Primero se saca, después se organiza",
  introBody:
    "Es tentador empezar por comprar cajas y separadores, porque da sensación de avance sin obligarte a decidir nada. Pero organizar ropa que no te pones solo hace que ocupe mejor el mismo espacio: en dos meses el armario vuelve a estar lleno. Si sacas primero lo que no te vale, lo que está estropeado y lo repetido, muchas veces descubres que no necesitas ningún organizador. Y la parte difícil no es tirar, es reconocer que ciertas prendas pertenecen a una versión anterior de ti.",
  removeTitle: "Lo primero que debe salir del armario",
  removeItems: [
    "Ropa que no te vale desde hace más de un año",
    "Prendas con manchas, roturas o llenas de bolitas",
    "Ropa con la etiqueta puesta desde hace meses",
    "Básicos repetidos que siempre te saltas",
    "Prendas de solo tintorería que evitas ponerte",
    "Zapatos que te hacen daño",
    "Perchas de alambre de la tienda o la tintorería",
    "Bolsos y complementos que ya no coges nunca",
  ],
  stepsTitle: "Los 7 pasos para ordenar un armario",
  steps: [
    [
      "1. Empieza por lo evidente, no por lo difícil",
      "Saca primero lo roto, lo manchado, lo que ha perdido la forma y lo que no te vale. Son decisiones que no cuestan nada y te dan impulso para las que sí cuestan.",
    ],
    [
      "2. Trabaja por categorías, no prenda a prenda",
      "Junta todas las camisetas, después todos los pantalones, después los abrigos. Solo viendo la categoría entera te das cuenta de que tienes nueve camisetas negras casi idénticas.",
    ],
    [
      "3. Aparta lo que siempre te saltas",
      "Si una prenda la ves cada mañana y nunca la eliges, ya has tomado la decisión: llevas meses tomándola. Solo falta reconocerla.",
    ],
    [
      "4. Revisa la ropa de una vida que ya no llevas",
      "Ropa de otro trabajo, de otro momento social, de otro estilo. No está estropeada, simplemente ya no es tuya. Esa es la categoría que más espacio ocupa en la mayoría de armarios.",
    ],
    [
      "5. Deja de pagar el alquiler de las compras caras y equivocadas",
      "El dinero ya está gastado. Conservar la prenda no lo recupera: solo añade culpa y ocupa el mejor sitio del armario. Véndela de segunda mano o dónala.",
    ],
    [
      "6. Guarda por frecuencia de uso, no por tipo",
      "Lo que te pones cada semana va a la altura de los ojos y al frente. Lo de temporada, arriba. Lo de ocasiones especiales, al fondo. Ese orden ahorra tiempo cada mañana.",
    ],
    [
      "7. Fija una revisión por temporada",
      "Ordenar un armario no es un proyecto único. Dos revisiones cortas al año, al cambiar de temporada, evitan volver al punto de partida.",
    ],
  ],
  highlightTitle: "Si dudas con una prenda, ponle una fecha",
  highlightBody:
    "Para lo que no consigues decidir, no fuerces la decisión hoy: mete esas prendas en una caja aparte con la fecha de dentro de tres meses escrita encima. Lo que hayas necesitado sacar de ahí vuelve al armario; lo que siga en la caja al llegar la fecha se va sin que tengas que volver a pensarlo. El tiempo decide mejor que la fuerza de voluntad.",
  mistakesTitle: "Errores frecuentes al ordenar el armario",
  mistakes: [
    "Comprar organizadores antes de haber sacado nada",
    "Ordenar para el cuerpo o el estilo que te gustaría tener, no para el de ahora",
    "Dejar la ropa cara pero sin usar en el sitio más accesible",
    "Vaciar el armario entero de golpe y quedarte sin energía a mitad",
    "Guardar por color cuando el problema es la cantidad",
  ],
  keepTitle: "Qué merece el mejor sitio",
  keepBody:
    "El espacio a la altura de los ojos y en primera fila debería ser para la ropa, los zapatos y los bolsos que usas en una semana real. Lo de ocasiones especiales, lo sentimental y lo que conservas por lo que costó puede quedarse, pero no debería ocupar el espacio que consultas cada mañana con prisa.",
  quickResetTitle: "Repaso rápido del armario en 15 minutos",
  quickResetSteps: [
    "Saca lo que esté roto, manchado, deformado o con bolitas",
    "Elige una sola categoría: camisetas, pantalones, zapatos o bolsos",
    "Aparta las prendas que ves cada día y nunca eliges",
    "Recoloca en primera fila solo lo que te pones esta temporada",
    "Mete las dudas en una caja con fecha dentro de tres meses",
  ],
  faqTitle: "Preguntas frecuentes sobre ordenar armarios",
  faqs: [
    [
      "¿Por dónde empiezo a ordenar un armario?",
      "Por lo evidente: prendas rotas, manchadas, deformadas o que no te valen. Son decisiones fáciles que despejan sitio rápido y hacen que las decisiones difíciles cuesten menos después.",
    ],
    [
      "¿Es mejor ir prenda a prenda o por categorías?",
      "Por categorías. Al juntar toda la ropa del mismo tipo ves de golpe lo repetido, lo que falta y lo que realmente eliges, algo imposible de detectar mirando una prenda cada vez.",
    ],
    [
      "¿Cuándo hay que deshacerse de una prenda que todavía sirve?",
      "Que sirva no significa que la vayas a usar. Si llevas un año sin ponértela, no te sienta bien o siempre la descartas al vestirte, ya está ocupando espacio sin darte nada a cambio.",
    ],
    [
      "¿Cómo ordeno un armario pequeño con mucha ropa?",
      "En un armario pequeño el margen está en la cantidad, no en el sistema de guardado. Reduce primero por categorías, guarda fuera la ropa de otra temporada y deja únicamente la temporada actual a la vista.",
    ],
    [
      "¿Qué hago con la ropa que ya no uso?",
      "Divide en tres: vender de segunda mano lo que esté en buen estado y tenga valor, donar lo que esté usable, y reciclar como textil lo roto o manchado. Tener decidido el destino evita que las bolsas se queden meses en el recibidor.",
    ],
  ],
  toolTitle: "Sigue la lista del armario mientras ordenas",
  toolDesc:
    "La lista de armarios recoge, punto por punto, lo que conviene revisar: tallas que ya no valen, básicos repetidos, complementos parados y ropa que guardas por culpa. Marca lo que vayas haciendo y descarga el PDF si prefieres ir en papel.",
  relatedTitle: "Sigue por aquí",
  relatedIntro: "Cuando el armario esté hecho, estas son las siguientes zonas:",
  relatedLinks: [
    { href: "/es/como-ordenar-la-habitacion", label: "Cómo ordenar la habitación" },
    { href: "/es/como-ordenar-la-cocina", label: "Cómo ordenar la cocina" },
    { href: "/es/rutina-de-limpieza-del-hogar", label: "Rutina de limpieza del hogar" },
    { href: "/es/declutter-checklist", label: "Lista de orden y limpieza" },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "es") return {};

  return {
    title: "Cómo ordenar armarios: guía en 7 pasos + lista gratis | DeclutterYourHome",
    description:
      "Cómo ordenar armarios de ropa paso a paso: qué sacar primero, cómo trabajar por categorías y qué hacer con lo que dudas. Con lista gratuita y PDF para imprimir.",
    keywords: [
      "ordenar armarios",
      "cómo ordenar un armario",
      "ordenar armario ropa",
      "orden en el armario",
      "ordenar armarios ideas",
      "cómo ordenar un armario pequeño",
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
          { name: "Cómo ordenar armarios", path: PATH },
        ])}
      />
      <SpanishGuide copy={copy} />
    </>
  );
}
