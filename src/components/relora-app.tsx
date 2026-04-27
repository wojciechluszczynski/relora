"use client";

import { useEffect, useMemo, useState } from "react";
import { contacts, graphEdges, type Contact } from "../lib/relora-data";
import { organizationSources, type OrganizationSource } from "../lib/organization-sources";
import type { ResearchBrief } from "../lib/research-engine";
import { RelationshipGraph } from "./relationship-graph";
import { Avatar, Badge, Panel } from "./ui";

type EngineStatus = "idle" | "running" | "ready" | "error";
type NavIcon = "home" | "people" | "context" | "process" | "map" | "message" | "events";
type OutreachData = {
  contacts: Contact[];
  graphEdges: typeof graphEdges;
  organizationSources: OrganizationSource[];
  source: string;
  updatedAt: string;
};

const navigation = [
  { href: "#dashboard", icon: "home", label: "Pulpit" },
  { href: "#people", icon: "people", label: "Kontakty" },
  { href: "#research", icon: "context", label: "Kontekst" },
  { href: "#crm", icon: "process", label: "Proces" },
  { href: "#graph", icon: "map", label: "Mapa relacji" },
  { href: "#composer", icon: "message", label: "Wiadomość" },
  { href: "#alerts", icon: "events", label: "Zdarzenia" },
] as const;

const crmColumns = [
  { id: "todo", label: "Do przygotowania", hint: "zadania z importu" },
  { id: "draft", label: "Szkic", hint: "wiadomość gotowa do podglądu" },
  { id: "preview", label: "Podgląd", hint: "wymaga akceptacji" },
] as const;

function crmStageLabel(stage: string) {
  if (stage === "draft") return "szkic";
  return stage;
}

function channelLabel(channel: string) {
  if (channel === "email") return "e-mail";
  return channel;
}

function statusLabel(status: EngineStatus) {
  if (status === "running") return "analizuję kontekst";
  if (status === "ready") return "notatka gotowa";
  if (status === "error") return "analiza przerwana";
  return "oczekuje";
}

function Icon({ name }: { name: NavIcon | "collapse" | "decision" | "layers" | "link" }) {
  const common = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.8 } as const;

  return (
    <svg aria-hidden="true" className="icon" viewBox="0 0 24 24">
      {name === "home" ? <path {...common} d="M4 10.5 12 4l8 6.5V20H5.5v-7H4z" /> : null}
      {name === "people" ? (
        <>
          <path {...common} d="M8.2 11.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" />
          <path {...common} d="M3.5 19.5c.7-3.5 2.4-5.2 5-5.2s4.3 1.7 5 5.2" />
          <path {...common} d="M16.8 10.7a2.7 2.7 0 1 0 0-5.4" />
          <path {...common} d="M15.5 14.5c2.4.3 4 1.9 4.8 5" />
        </>
      ) : null}
      {name === "context" ? (
        <>
          <path {...common} d="M5 6.5h14M5 12h10M5 17.5h7" />
          <path {...common} d="M17 14.5l2 2 2-2" />
        </>
      ) : null}
      {name === "process" ? (
        <>
          <path {...common} d="M5 7h4v4H5zM15 4h4v4h-4zM15 16h4v4h-4z" />
          <path {...common} d="M9 9h3.5c2.2 0 3.5-1.1 3.5-3M9 9h3.5c2.2 0 3.5 1.1 3.5 3v4" />
        </>
      ) : null}
      {name === "map" ? (
        <>
          <path {...common} d="M6 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
          <path {...common} d="M7.8 6.2 16.2 6M7.2 7.4l3.8 9.8M16.8 8.2l-3.6 8.9" />
        </>
      ) : null}
      {name === "message" ? <path {...common} d="M4 6h16v10H9l-5 4z" /> : null}
      {name === "events" ? (
        <>
          <path {...common} d="M7 5h10M6 9h12M8 13h5M8 17h8" />
          <path {...common} d="M5 3h14v18H5z" />
        </>
      ) : null}
      {name === "collapse" ? <path {...common} d="M15 6 9 12l6 6M5 5v14" /> : null}
      {name === "decision" ? <path {...common} d="M5 12h7M12 5v14M12 12l7-5v10z" /> : null}
      {name === "layers" ? <path {...common} d="m12 4 8 4-8 4-8-4zM4 12l8 4 8-4M4 16l8 4 8-4" /> : null}
      {name === "link" ? <path {...common} d="M9.5 7.5 11 6a4 4 0 0 1 5.7 5.7l-1.4 1.4M14.5 16.5 13 18a4 4 0 0 1-5.7-5.7l1.4-1.4M9.5 14.5l5-5" /> : null}
    </svg>
  );
}

function RelationshipGlyph() {
  return (
    <div className="relationship-glyph" aria-hidden="true">
      <svg viewBox="0 0 220 160">
        <path d="M42 82C62 34 120 20 174 48" />
        <path d="M45 84c35 18 73 26 132 4" />
        <path d="M94 124c25-24 55-44 86-72" />
        <circle cx="42" cy="82" r="18" />
        <circle cx="98" cy="124" r="14" />
        <circle cx="176" cy="48" r="16" />
        <circle cx="178" cy="88" r="20" />
        <circle cx="110" cy="50" r="8" />
      </svg>
      <div>
        <span>Mapa pracy</span>
        <strong>{contacts.length} kontaktów, {graphEdges.length} relacji</strong>
      </div>
    </div>
  );
}

async function fetchResearch(contactId: string) {
  const response = await fetch(`/api/research?contactId=${contactId}`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Research endpoint returned an error");
  }

  return (await response.json()) as ResearchBrief;
}

function clientBriefFor(contact: Contact): ResearchBrief {
  return {
    contactId: contact.id,
    generatedAt: new Date().toISOString(),
    confidence: Math.min(88, 62 + contact.tags.length * 5),
    publicFacts: [
      `Organizacja: ${contact.organization}.`,
      `Etap CRM: ${contact.stage}.`,
      `Tematy z rekordu: ${contact.tags.join(", ") || "brak tagów"}.`,
      `Temat wiadomości: "${contact.subject}".`,
    ],
    userContext: [
      `Notatka użytkownika: ${contact.notes}.`,
      `Portfolio: ${contact.portfolioUrl}.`,
      `Booking: ${contact.bookingUrl}.`,
      "Kontekst pochodzi z aktualnego rekordu danych.",
    ],
    possibleNeeds: contact.tags.map((tag) => `Uporządkowanie obszaru: ${tag}`),
    suggestedAngle:
      "Zacząć od jednego konkretnego przepływu pracy i krótkiego prototypu, bez deklarowania wiedzy, której nie ma w danych.",
    suggestedSystems: contact.tags.length > 0 ? contact.tags.map((tag) => `Widok pracy dla obszaru: ${tag}`) : ["Widok pracy dla relacji"],
    riskNotes: [
      "Nie mieszać faktów publicznych z prywatnym kontekstem użytkownika.",
      "Każda wiadomość wymaga podglądu i ręcznej akceptacji przed wysyłką.",
    ],
    bestChannel: contact.channel,
    sources: [contact.source],
    relatedEdges: [],
  };
}

async function fetchOutreachData() {
  const response = await fetch("/api/outreach", { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Outreach data endpoint returned an error");
  }

  return (await response.json()) as OutreachData;
}

export function ReloraApp() {
  const [outreachData, setOutreachData] = useState<OutreachData>({
    contacts,
    graphEdges,
    organizationSources,
    source: "fallback: import lokalny",
    updatedAt: new Date().toISOString(),
  });
  const [selectedId, setSelectedId] = useState(contacts[0].id);
  const [brief, setBrief] = useState<ResearchBrief | null>(null);
  const [engineStatus, setEngineStatus] = useState<EngineStatus>("idle");
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const liveContacts = outreachData.contacts.length > 0 ? outreachData.contacts : contacts;
  const liveGraphEdges = outreachData.graphEdges.length > 0 ? outreachData.graphEdges : graphEdges;
  const liveOrganizationSources = outreachData.organizationSources.length > 0 ? outreachData.organizationSources : organizationSources;
  const selected = useMemo(
    () => liveContacts.find((contact) => contact.id === selectedId) ?? liveContacts[0],
    [liveContacts, selectedId],
  );

  const relatedEdges = useMemo(
    () => liveGraphEdges.filter((edge) => edge.from === selected.id || edge.to === selected.id),
    [liveGraphEdges, selected.id],
  );

  async function runResearch(contact: Contact) {
    setEngineStatus("running");

    try {
      const result = await fetchResearch(contact.id);
      setBrief(result.contactId === contact.id ? result : clientBriefFor(contact));
      setEngineStatus("ready");
    } catch {
      setBrief(clientBriefFor(contact));
      setEngineStatus("ready");
    }
  }

  useEffect(() => {
    let isCurrent = true;

    setEngineStatus("running");
    fetchResearch(selected.id)
      .then((result) => {
        if (!isCurrent) return;
        setBrief(result.contactId === selected.id ? result : clientBriefFor(selected));
        setEngineStatus("ready");
      })
      .catch(() => {
        if (!isCurrent) return;
        setBrief(clientBriefFor(selected));
        setEngineStatus("ready");
      });

    return () => {
      isCurrent = false;
    };
  }, [selected.id]);

  useEffect(() => {
    let isCurrent = true;

    const refreshData = () => {
      fetchOutreachData()
        .then((result) => {
          if (!isCurrent) return;
          setOutreachData(result);
          setSelectedId((currentId) => result.contacts.some((contact) => contact.id === currentId) ? currentId : result.contacts[0]?.id ?? currentId);
        })
        .catch(() => {
          if (!isCurrent) return;
          setOutreachData((current) => ({
            ...current,
            source: "fallback: ostatni znany stan",
            updatedAt: new Date().toISOString(),
          }));
        });
    };

    refreshData();
    const intervalId = window.setInterval(refreshData, 15000);

    return () => {
      isCurrent = false;
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <main className={`app-shell ${menuCollapsed ? "menu-collapsed" : ""}`}>
      <aside className={`side-rail ${menuCollapsed ? "is-collapsed" : ""}`} aria-label="Nawigacja Relora">
        <div className="rail-top">
          <a className="brand" href="#dashboard" aria-label="Relora">
            <span className="brand-mark">R</span>
            <span className="brand-copy">
              <strong>Relora</strong>
              <small>inteligencja relacji</small>
            </span>
          </a>
          <button
            aria-label={menuCollapsed ? "Rozwiń menu" : "Zwiń menu"}
            className="rail-toggle"
            onClick={() => setMenuCollapsed((value) => !value)}
            type="button"
          >
            <Icon name="collapse" />
          </button>
        </div>

        <nav className="nav-list">
          {navigation.map(({ href, icon, label }) => (
            <a href={href} key={href}>
              <Icon name={icon} />
              <span className="nav-label">{label}</span>
            </a>
          ))}
        </nav>

        <div className="rail-card">
          <span>Dane</span>
          <strong>{outreachData.source}</strong>
          <p>Odświeżanie co 15 sekund. Ostatni odczyt: {new Date(outreachData.updatedAt).toLocaleTimeString("pl-PL")}.</p>
        </div>
      </aside>

      <div className="workspace">
        <header className="hero" id="dashboard">
          <div className="hero-copy">
            <span className="eyebrow">Relora · relacje · kontekst · wysyłka</span>
            <h1>Jedno miejsce do pracy nad relacją przed pierwszą wiadomością.</h1>
            <p>
              Po lewej wybierasz kontakt. W środku widzisz notatkę analityczną, źródła, status sprawy,
              mapę powiązań i szkic wiadomości. Nic nie wychodzi bez podglądu i ręcznej akceptacji.
            </p>
            <div className="hero-strip" aria-label="Najważniejsze zasady pracy">
              <span>Fakty publiczne osobno</span>
              <span>Kontekst użytkownika osobno</span>
              <span>Podgląd przed wysyłką</span>
              <span>Resend dopiero po akceptacji</span>
            </div>
          </div>

          <div className="hero-side">
            <RelationshipGlyph />
            <div className="engine-card" aria-live="polite">
              <span>Wybrany kontakt</span>
              <strong>{statusLabel(engineStatus)}</strong>
              <p>{selected.name}</p>
              <button className="button button-primary" onClick={() => runResearch(selected)} type="button">
                Odśwież analizę
              </button>
            </div>
          </div>
        </header>

        <section className="work-grid" aria-label="Najważniejsze informacje robocze">
          <div>
            <Icon name="decision" />
            <span>Do decyzji</span>
            <strong>{liveContacts.length} szkiców</strong>
            <small>Każdy wymaga podglądu przed wysyłką.</small>
          </div>
          <div>
            <Icon name="people" />
            <span>Teraz pracujesz nad</span>
            <strong>{selected.name}</strong>
            <small>{selected.organization}</small>
          </div>
          <div>
            <Icon name="layers" />
            <span>Granica danych</span>
            <strong>2 warstwy</strong>
            <small>Fakty publiczne nie są mieszane z Twoją notatką.</small>
          </div>
          <div>
            <Icon name="link" />
            <span>Powiązania kontaktu</span>
            <strong>{relatedEdges.length} relacje</strong>
            <small>Organizacja i tematy dla wybranej osoby.</small>
          </div>
        </section>

        <section className="content-grid content-grid-people" id="people">
          <Panel title="Kontakty" eyebrow="osoby z paczki źródłowej">
            <div className="people-list">
              {liveContacts.map((person) => (
                <button
                  aria-pressed={person.id === selected.id}
                  className={`person-card ${person.id === selected.id ? "is-selected" : ""}`}
                  key={person.id}
                  onClick={() => setSelectedId(person.id)}
                  type="button"
                >
                  <span className="person-card-main">
                    <Avatar initials={person.initials} />
                    <span>
                      <strong>{person.name}</strong>
                      <small>{person.organization}</small>
                    </span>
                  </span>
                  <span className="tag-row">
                    <Badge tone="gold">{crmStageLabel(person.stage)}</Badge>
                    <Badge tone="teal">{channelLabel(person.channel)}</Badge>
                  </span>
                  <span className="person-note">{person.notes}</span>
                </button>
              ))}
            </div>
          </Panel>

          <Panel title="Karta kontaktu" eyebrow={selected.source}>
            <article className="person-detail">
              <div className="identity-row">
                <Avatar initials={selected.initials} size="lg" />
                <div>
                  <h2>{selected.name}</h2>
                  <p>{selected.organization}</p>
                  <div className="tag-row">
                    <Badge tone="gold">CRM: {crmStageLabel(selected.stage)}</Badge>
                    <Badge tone="blue">zadanie: {selected.taskId}</Badge>
                    <Badge tone="teal">kanał: {channelLabel(selected.channel)}</Badge>
                  </div>
                </div>
              </div>

              <div className="detail-grid">
                <div className="data-box">
                  <span>Fakty publiczne</span>
                  <p>{brief?.publicFacts[0] ?? `Organizacja: ${selected.organization}.`}</p>
                </div>
                <div className="data-box data-box-private">
                  <span>Kontekst użytkownika</span>
                  <p>{selected.notes}</p>
                </div>
              </div>
            </article>
          </Panel>
        </section>

        <section className="content-grid" id="research">
          <Panel title="Notatka analityczna" eyebrow="generowana przez /api/research">
            {brief ? (
              <div className="research-stack">
                <div className="research-score">
                  <span>Pewność</span>
                  <strong>{brief.confidence}%</strong>
                </div>
                <div className="data-box">
                  <span>Najlepsze wejście</span>
                  <p>{brief.suggestedAngle}</p>
                </div>
                <div className="data-box">
                  <span>Proponowane kierunki</span>
                  <ul>
                    {brief.suggestedSystems.map((system) => (
                      <li key={system}>{system}</li>
                    ))}
                  </ul>
                </div>
                <div className="data-box">
                  <span>Źródła</span>
                  <p>{brief.sources.join(", ")}</p>
                </div>
              </div>
            ) : (
              <div className="empty-state">Analiza czeka na wynik.</div>
            )}
          </Panel>

          <Panel title="Granica danych" eyebrow="fakty publiczne i kontekst użytkownika są pokazane osobno">
            {brief ? (
              <div className="boundary-grid">
                <div className="data-box">
                  <span>Fakty publiczne</span>
                  <ul>
                    {brief.publicFacts.map((fact) => (
                      <li key={fact}>{fact}</li>
                    ))}
                  </ul>
                </div>
                <div className="data-box data-box-private">
                  <span>Kontekst użytkownika</span>
                  <ul>
                    {brief.userContext.map((fact) => (
                      <li key={fact}>{fact}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="empty-state">Brak briefu do pokazania.</div>
            )}
          </Panel>
        </section>

        <section className="content-grid content-grid-crm" id="crm">
          <Panel title="Proces" eyebrow="statusy z importu, bez sztucznych leadów">
            <div className="crm-board">
              {crmColumns.map((column) => (
                <section className="crm-column" key={column.id}>
                  <div className="crm-column-head">
                    <strong>{column.label}</strong>
                    <span>{column.hint}</span>
                  </div>
                  {column.id === "draft" ? (
                    liveContacts.map((person) => (
                      <button
                        className={`crm-card ${person.id === selected.id ? "is-selected" : ""}`}
                        key={person.id}
                        onClick={() => setSelectedId(person.id)}
                        type="button"
                      >
                        <strong>{person.name}</strong>
                        <span>{person.subject}</span>
                      </button>
                    ))
                  ) : (
                    <div className="empty-lane">Brak realnych rekordów w tej kolumnie.</div>
                  )}
                </section>
              ))}
            </div>
          </Panel>

          <Panel title="Oś czasu" eyebrow="historia kontaktu i następny krok">
            <ol className="timeline">
              <li>
                <span>Import</span>
                <p>Dodano kontakt, wiadomość i zadanie z paczki źródłowej.</p>
              </li>
              <li>
                <span>Analiza</span>
                <p>Brief dla {selected.name} budowany na faktach publicznych i kontekście użytkownika.</p>
              </li>
              <li>
                <span>Następny krok</span>
                <p>Podgląd wiadomości, ręczna akceptacja i dopiero potem wysyłka przez Resend.</p>
              </li>
            </ol>
          </Panel>
        </section>

        <Panel title="Mapa relacji" eyebrow="osoba, organizacja i tematy z importu">
          <RelationshipGraph graphEdges={liveGraphEdges} selectedId={selected.id} onSelectPerson={setSelectedId} />
          <div className="graph-summary">
            <span>Aktywne relacje dla {selected.name}</span>
            <strong>{relatedEdges.length}</strong>
          </div>
        </Panel>

        <section id="composer">
          <Panel title="Wiadomość" eyebrow="podgląd przed Resend">
            <div className="composer-grid">
              <form className="draft-form">
                <label>
                  Kontakt
                  <input value={selected.name} readOnly />
                </label>
                <label>
                  Temat
                  <input value={selected.subject} readOnly />
                </label>
                <label>
                  Treść źródłowa
                  <textarea value={selected.message} readOnly rows={8} />
                </label>
              </form>

              <article className="message-preview">
                <span>Podgląd wiadomości</span>
                <h3>{selected.subject}</h3>
                <p>{selected.message}</p>
                <div className="preview-actions">
                  <Badge tone="gold">wymagany podgląd</Badge>
                  <button className="button" type="button">
                    Zapisz szkic
                  </button>
                  <button className="button button-primary" type="button">
                    Akceptuj podgląd
                  </button>
                </div>
              </article>
            </div>
          </Panel>
        </section>

        <Panel title="Zdarzenia" eyebrow="resend/webhook-spec.md">
          <div className="alerts-center" id="alerts">
            <strong>Brak realnych alertów w dostarczonych danych.</strong>
            <p>
              Relora nie dopisuje aktywności bez źródła. Zdarzenia pojawią się po webhookach Resend
              zapisanych w Supabase: wysłano, dostarczono, otwarto, kliknięto, odpisano, odrzucono albo nie wysłano.
            </p>
          </div>
        </Panel>

        <Panel title="Źródła organizacyjne" eyebrow="schematy UMŁ i strona władz miasta">
          <div className="source-grid">
            {liveOrganizationSources.map((source) => (
              <article className="source-card" key={source.id}>
                <span>{source.kind === "pdf" ? "PDF" : "Strona www"}</span>
                <h3>{source.title}</h3>
                <p>{source.authority}</p>
                {source.validFrom ? <small>Zakres: {source.validFrom}{source.validTo ? ` - ${source.validTo}` : ""}</small> : null}
                <ul>
                  {source.facts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
                {source.url ? <a href={source.url}>Otwórz źródło</a> : null}
              </article>
            ))}
          </div>
        </Panel>
      </div>
    </main>
  );
}
