import Image from "next/image";
import Link from "next/link";
import ChecklistPdfLink from "./ChecklistPdfLink";
import { JsonLd } from "./json-ld";
import { buildBreadcrumbSchema, buildFaqPageSchema } from "@/lib/seo";

const homeSections = [
  [
    "Wohnung ausmisten: Wo anfangen?",
    "Wähle einen kleinen Bereich, den du heute fertigstellen kannst: eine Schublade, ein Fach oder die Ablage neben der Tür. Beginne mit wenig emotionalen Dingen. Erinnerungsstücke und wichtige Unterlagen können warten.",
    [
      "Stelle einen Timer auf 10 bis 15 Minuten und halte einen Beutel zum Weitergeben bereit.",
      "Nimm nur eine kleine Menge heraus. Der Rest bleibt an seinem Platz.",
      "Reserviere die letzten fünf Minuten fürs Zurückräumen und Wegbringen.",
    ],
  ],
  [
    "Tipps zum Ausmisten: Vier klare Entscheidungen",
    "Frage bei jedem Gegenstand: Nutze ich ihn? Funktioniert er? Würde ich ihm heute wieder Platz geben? Entscheide nur über deine eigenen Sachen.",
    [
      "Behalten: Gib Dingen, die du brauchst oder gern hast, einen festen Platz.",
      "Spenden oder verschenken: Gib nur saubere, nutzbare Dinge weiter und kläre, was angenommen wird.",
      "Verkaufen: Fotografiere das Stück und setze eine Frist. Wenn es nicht verkauft wird, entscheide erneut über einen passenden Weg.",
      "Entsorgen: Trenne Abfall und prüfe bei Elektrogeräten, Batterien, Farben und Medikamenten die örtlichen Hinweise.",
    ],
  ],
  [
    "Radikal ausmisten, ohne alles auf einmal auszuräumen",
    "Wenn du deutlich weniger besitzen möchtest, helfen klare Entscheidungen und kleine Etappen. Ein leerer Schrank auf dem Bett kann schnell überfordern. Bearbeite eine Kategorie nach der anderen und stoppe, solange noch Zeit zum Aufräumen bleibt.",
    [
      "Starte mit offensichtlichen Duplikaten und Dingen ohne Verwendung.",
      "Nutze für schwierige Entscheidungen eine kleine Vielleicht-Kiste mit festem Prüftermin.",
      "Prüfe wichtige Dokumente, notwendige Alltagsgegenstände und Erinnerungsstücke in Ruhe. Über fremde Dinge entscheidet die Person, der sie gehören.",
    ],
  ],
  [
    "Die Wohnung Raum für Raum ausmisten",
    "In der Küche helfen doppelte Küchenhelfer und unpassende Vorratsdosen beim Einstieg. Im Schlafzimmer bringt ein freier Nachttisch schnell Ruhe. Im Kleiderschrank beginne mit einer Kategorie wie T-Shirts. Hake die erledigten Schritte in der passenden Checkliste ab.",
    [],
  ],
  [
    "Aussortierte Dinge wirklich wegbringen",
    "Ein voller Spendenbeutel im Flur bleibt eine offene Aufgabe. Lege vor dem nächsten Bereich fest, wann und wohin du ihn bringst. Plane den Termin realistisch und stelle nichts in gemeinsame Fluchtwege. Prüfe außerdem vor neuen Käufen, ob du den Gegenstand schon besitzt.",
    [],
  ],
] satisfies [string, string, string[]][];
const closetSections = [
  [
    "Kleiderschrank ausmisten in fünf Schritten",
    "Plane zunächst 15 Minuten für eine kleine Kategorie ein. Du musst den Schrank nicht vollständig ausräumen.",
    [
      "Wähle eine Kategorie, zum Beispiel T-Shirts oder Socken. Lass das Bett möglichst frei.",
      "Prüfe jedes Teil auf Passform, Zustand und tatsächliche Verwendung. Probiere unklare Stücke an.",
      "Sortiere in Behalten, Reparieren, Weitergeben und sachgerecht Entsorgen. Reparaturen bekommen einen konkreten Termin.",
      "Lege unsichere Stücke in eine begrenzte Vielleicht-Kiste und notiere einen Prüftermin.",
      "Räume die behaltene Kleidung übersichtlich zurück. Packe Spenden und Verkäufe getrennt ein und plane den nächsten Schritt.",
    ],
  ],
  [
    "Welche Kleidung behalten? Fragen für jedes Teil",
    "Ein Jahr ohne Nutzung kann ein Anlass zum Prüfen sein. Saisonkleidung, Arbeitskleidung und selten benötigte Anlasskleidung haben unterschiedliche Aufgaben.",
    [
      "Passt das Teil heute und fühle ich mich darin wohl?",
      "Trage ich es in meinem tatsächlichen Alltag oder nur in einer Vorstellung davon?",
      "Ist es tragbar, oder würde ich die notwendige Reparatur wirklich erledigen?",
      "Habe ich ähnliche Stücke, die ich immer bevorzuge?",
      "Möchte ich es behalten, auch wenn niemand weiß, was es gekostet hat?",
    ],
  ],
  [
    "Kleiderschrank ausmisten: Psychologie und Schuldgefühle",
    "Ein hoher Kaufpreis, ein Geschenk oder eine frühere Lebensphase können das Loslassen schwer machen. Der bezahlte Preis kommt durch Aufbewahren nicht zurück. Du darfst ein Geschenk würdigen und trotzdem weitergeben. Bei Erinnerungsstücken kann ein Foto oder eine kleine Erinnerungsbox helfen. Wenn du unsicher bist, verschiebe die Entscheidung bewusst, statt dich unter Zeitdruck zu setzen.",
    [],
  ],
  [
    "Vorher und nachher: Deinen Fortschritt sichtbar machen",
    "Fotografiere vor dem Start dasselbe Fach aus demselben Winkel wie nach dem Zurückräumen. Vergleiche, ob du deine Kleidung besser sehen und leichter entnehmen kannst. Entscheidend ist, ob dein Schrank im Alltag funktioniert.",
    [],
  ],
  [
    "Wohin mit aussortierter Kleidung?",
    "Saubere, tragbare Kleidung kannst du nach vorheriger Absprache verschenken, spenden oder verkaufen. Prüfe bei lokalen Annahmestellen, welche Textilien sie nehmen. Für kaputte oder verschmutzte Textilien gelten die örtlichen Entsorgungshinweise. Gib einen Beutel erst ab, wenn du weißt, dass er dort angenommen wird.",
    [],
  ],
] satisfies [string, string, string[]][];
const homeFaqs = [
  {
    question: "Wie kann ich meine Wohnung ausmisten, wenn ich wenig Zeit habe?",
    answer:
      "Bearbeite für 10 bis 15 Minuten nur eine kleine Fläche. Plane die letzten Minuten zum Zurückräumen ein. Ein abgeschlossener kleiner Bereich ist ein sinnvoller Tagesfortschritt.",
  },
  {
    question: "Was bedeutet radikal ausmisten?",
    answer:
      "Du hinterfragst konsequent, welche Dinge du brauchst und behalten möchtest. Du kannst dabei in kleinen Abschnitten vorgehen und wichtige oder emotionale Entscheidungen in Ruhe treffen.",
  },
];
const closetFaqs = [
  {
    question: "Wie fange ich beim Kleiderschrank-Ausmisten an?",
    answer:
      "Wähle eine kleine Kategorie wie Socken oder T-Shirts. Prüfe Passform, Zustand und Nutzung, bevor du die nächste Kategorie öffnest. Räume am Ende alles zurück und plane, wann du aussortierte Kleidung weitergibst.",
  },
  {
    question: "Was tun, wenn ich mich nicht von Kleidung trennen kann?",
    answer:
      "Prüfe, ob Schuldgefühle, der Kaufpreis oder Erinnerungen die Entscheidung erschweren. Du kannst einzelne Stücke bewusst behalten oder eine kleine Vielleicht-Kiste mit Prüftermin nutzen. Du musst nicht unter Druck entscheiden.",
  },
  {
    question: "Gibt es eine Kleiderschrank-Checkliste als kostenloses PDF?",
    answer:
      "Ja. Die deutsche A4-Checkliste ist kostenlos und ohne Anmeldung herunterladbar. Online kannst du die Einträge bearbeiten, abhaken und deinen Fortschritt in diesem Browser speichern.",
  },
];

export default function GermanGuide({ closet = false }: { closet?: boolean }) {
  const sections = closet ? closetSections : homeSections;
  const faqs = closet ? closetFaqs : homeFaqs;
  return (
    <main className="min-h-screen bg-[#f7f3ec] pb-20 pt-24 text-[#1f2a21]">
      <JsonLd data={buildFaqPageSchema(faqs)} />
      {closet && (
        <JsonLd
          data={buildBreadcrumbSchema("de", [
            { name: "Ausmisten: Tipps", path: "/" },
            {
              name: "Kleiderschrank ausmisten",
              path: "/kleiderschrank-ausmisten",
            },
          ])}
        />
      )}
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <section className="grid items-center gap-10 py-12 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#8c5a2b]">
              Kleine Schritte · Mehr Platz im Alltag
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-[#173223] md:text-5xl">
              {closet
                ? "Kleiderschrank ausmisten: Platz für Kleidung, die du wirklich trägst"
                : "Ausmisten: Tipps für eine Wohnung, die sich leichter anfühlt"}
            </h1>
            <p className="mt-6 text-lg leading-8">
              {closet
                ? "Entscheide Stück für Stück, welche Kleidung zu deinem Alltag passt – mit klaren Fragen, Platz für Zweifel und einer kostenlosen Checkliste."
                : "Du möchtest deine Wohnung ausmisten und weißt nicht, wo du anfangen sollst? Beginne mit einer Schublade. Diese Anleitung hilft dir beim Entscheiden, Weitergeben und Abschließen."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="rounded-full bg-[#173223] px-6 py-3 font-semibold text-white"
                href={
                  closet
                    ? "/de/declutter-checklist/closets#interactive-checklist"
                    : "/de/declutter-checklist"
                }
              >
                Checkliste online bearbeiten
              </Link>
              <ChecklistPdfLink
                className="rounded-full border border-[#173223] px-6 py-3 font-semibold"
                href={`/checklists/de/${closet ? "closets" : "kitchen"}-declutter-checklist.pdf`}
                area={closet ? "closets" : "kitchen"}
                source="checklist_printable"
              >
                {closet
                  ? "Kleiderschrank-PDF kostenlos"
                  : "Küchen-PDF kostenlos"}
              </ChecklistPdfLink>
            </div>
            <p className="mt-3 text-sm text-[#546259]">
              Deutsch · A4 · PDF ohne Anmeldung
            </p>
          </div>
          <Image
            src={closet ? "/blazer.webp" : "/hero.webp"}
            alt={
              closet
                ? "Kleidungsstück für den Alltag"
                : "Helles Wohnzimmer mit freien Flächen"
            }
            width={600}
            height={500}
            priority
            className="h-[340px] w-full rounded-3xl object-cover md:h-[480px]"
          />
        </section>
        <nav
          aria-label="Inhalt"
          className="my-8 rounded-3xl bg-white p-6 shadow-sm"
        >
          <p className="font-bold">Direkt zum nächsten Schritt</p>
          <ol className="mt-3 grid gap-3 md:grid-cols-2">
            {sections.map(([title], index) => (
              <li key={title}>
                <a
                  className="text-[#2b694d] underline underline-offset-4"
                  href={`#schritt-${index + 1}`}
                >
                  {title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <article className="mx-auto max-w-3xl space-y-8 py-8">
          {sections.map(([title, body, steps], index) => (
            <section
              id={`schritt-${index + 1}`}
              key={title}
              className="scroll-mt-24 rounded-3xl bg-white p-6 shadow-sm md:p-9"
            >
              <h2 className="text-2xl font-bold tracking-tight text-[#173223]">
                {title}
              </h2>
              <p className="mt-4 leading-8 text-[#46534b]">{body}</p>
              {steps.length > 0 && (
                <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7">
                  {steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              )}
            </section>
          ))}
          <section className="rounded-3xl bg-[#173223] p-8 text-white">
            <h2 className="text-2xl font-bold">
              Deine Checkliste zum Weitermachen
            </h2>
            <p className="mt-4 leading-8">
              Bearbeite und ergänze die Einträge online. Änderungen und
              Fortschritt bleiben in diesem Browser gespeichert; die täglichen
              Häkchen beginnen jeden Tag neu. Für Cloud-Sicherung kannst du dich
              anmelden.
            </p>
            <div className="mt-5 flex flex-wrap gap-5 underline underline-offset-4">
              <Link href="/de/declutter-checklist">
                Alle Checklisten und kostenlosen PDFs
              </Link>
              <Link href={closet ? "/de" : "/de/kleiderschrank-ausmisten"}>
                {closet
                  ? "Weitere Ausmisten-Tipps"
                  : "Anleitung: Kleiderschrank ausmisten"}
              </Link>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold">Häufige Fragen</h2>
            {faqs.map((faq) => (
              <div key={faq.question} className="mt-6">
                <h3 className="text-lg font-bold">{faq.question}</h3>
                <p className="mt-2 leading-8">{faq.answer}</p>
              </div>
            ))}
          </section>
        </article>
      </div>
    </main>
  );
}
