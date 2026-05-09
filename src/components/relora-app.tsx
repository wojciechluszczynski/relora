"use client";

import { useEffect, useMemo, useState } from "react";
import { contacts, graphEdges, organizations, type Contact } from "../lib/relora-data";
import { organizationSources, type OrganizationSource } from "../lib/organization-sources";
import type { ResearchBrief } from "../lib/research-engine";
import { RelationshipGraph } from "./relationship-graph";
import { Badge, Panel } from "./ui";

type EngineStatus = "idle" | "running" | "ready" | "error";
type NavIcon = "home" | "people" | "context" | "process" | "map" | "message" | "events";
export type ReloraView = "dashboard" | "contacts" | "process" | "relations" | "sources";
type OutreachData = {
  contacts: Contact[];
  graphEdges: typeof graphEdges;
  organizationSources: OrganizationSource[];
  source: string;
  updatedAt: string;
};

const navigation = [
  { href: "/", icon: "home", label: "Pulpit", view: "dashboard" },
  { href: "/kontakty", icon: "people", label: "Kontakty", view: "contacts" },
  { href: "/proces", icon: "process", label: "Proces", view: "process" },
  { href: "/relacje", icon: "map", label: "Relacje", view: "relations" },
  { href: "/zrodla", icon: "link", label: "Źródła", view: "sources" },
] as const;

const viewCopy: Record<ReloraView, { title: string; eyebrow: string; note: string }> = {
  dashboard: {
    title: "Pulpit",
    eyebrow: "Demo bez logowania",
    note: "Szybki przegląd kontaktów, aktywnych spraw i relacji.",
  },
  contacts: {
    title: "Kontakty",
    eyebrow: "CRM",
    note: "Lista kontaktów, karta wybranej osoby i miejsce na dopisanie kontekstu.",
  },
  process: {
    title: "Proces",
    eyebrow: "Kolejka pracy",
    note: "Sprawy do obsługi, szkice wiadomości i ręczna akceptacja.",
  },
  relations: {
    title: "Relacje",
    eyebrow: "Mapa powiązań",
    note: "Osoby, organizacje, tematy i źródła publiczne w jednym widoku.",
  },
  sources: {
    title: "Źródła",
    eyebrow: "Publiczne linki",
    note: "Zweryfikowane logotypy, zdjęcia i adresy używane w demo.",
  },
};

const crmColumns = [
  { id: "context", label: "Kontekst", hint: "brakuje informacji" },
  { id: "draft", label: "Szkic", hint: "do akceptacji" },
  { id: "sent", label: "Wysłane", hint: "czeka na reakcję" },
  { id: "reply", label: "Odpowiedź", hint: "wymaga reakcji" },
  { id: "followup", label: "Follow-up", hint: "kolejny kontakt" },
] as const;

const processSteps = [
  { id: "context", label: "Kontekst" },
  { id: "draft", label: "Szkic" },
  { id: "sent", label: "Wysłane" },
  { id: "reply", label: "Odpowiedź" },
  { id: "followup", label: "Follow-up" },
] as const;

function crmStageLabel(stage: string) {
  if (stage === "draft") return "szkic";
  if (stage === "context") return "kontekst";
  if (stage === "sent") return "wysłane";
  if (stage === "reply") return "odpowiedź";
  if (stage === "followup") return "follow-up";
  return stage;
}

function processProgress(status: Contact["communicationStatus"]) {
  return Math.max(0, processSteps.findIndex((step) => step.id === status));
}

function channelLabel(channel: string) {
  if (channel === "email") return "e-mail";
  return channel;
}

function statusLabel(status: EngineStatus) {
  if (status === "running") return "analiza";
  if (status === "ready") return "gotowe";
  if (status === "error") return "błąd";
  return "oczekuje";
}

const portraitByContactId: Record<string, string> = {
  "cnt_marta-nowak": "/figma/avatar-jacob.png",
  "cnt_jakub-zielinski": "/figma/avatar-albert.png",
  "cnt_ewa-wisniewska": "/figma/avatar-robert.png",
  "cnt_piotr-kaminski": "/figma/avatar-jacob.png",
  "cnt_anna-lewandowska": "/figma/avatar-albert.png",
};

const figmaRequestVisuals = [
  { icon: "/figma/icon-plumbing.svg", avatar: "/figma/avatar-jacob.png" },
  { icon: "/figma/icon-electrical.svg", avatar: "/figma/avatar-albert.png" },
  { icon: "/figma/icon-hvac.svg", avatar: "/figma/avatar-robert.png" },
  { icon: "/figma/icon-plumbing.svg", avatar: "/figma/avatar-jacob.png" },
];

const figmaPropertyImages = ["/figma/property-1.png", "/figma/property-2.png", "/figma/property-3.png"];
const organizationByName = new Map(organizations.map((organization) => [organization.name, organization]));

function portraitFor(contactId: string) {
  return portraitByContactId[contactId] ?? "/portraits/default.svg";
}

function PhotoAvatar({ contact, size = "md" }: { contact: Contact; size?: "md" | "lg" }) {
  return (
    <span className={`photo-avatar photo-avatar-${size}`}>
      <img alt="" src={portraitFor(contact.id)} />
    </span>
  );
}

function dataSourceLabel(source: string) {
  if (source.startsWith("demo:")) return "tryb demo: dane przykładowe";
  if (source.startsWith("fallback: brak konfiguracji")) return "tryb demo: brak konfiguracji";
  if (source.startsWith("fallback: ostatni znany stan")) return "tryb demo: ostatni znany stan";
  if (source.startsWith("fallback:")) return source.replace("fallback:", "tryb demo:");
  return source;
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

export function ReloraApp({ view = "dashboard" }: { view?: ReloraView }) {
  const [outreachData, setOutreachData] = useState<OutreachData>({
    contacts,
    graphEdges,
    organizationSources,
    source: "demo: dane przykładowe bez logowania",
    updatedAt: new Date().toISOString(),
  });
  const [selectedId, setSelectedId] = useState(contacts[0].id);
  const [brief, setBrief] = useState<ResearchBrief | null>(null);
  const [engineStatus, setEngineStatus] = useState<EngineStatus>("idle");
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const [contextDraft, setContextDraft] = useState("");
  const [contextByContact, setContextByContact] = useState<Record<string, string[]>>({});
  const [searchQuery, setSearchQuery] = useState("");
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
  const selectedOrganization = organizationByName.get(selected.organization);
  const selectedContext = contextByContact[selected.id] ?? [];
  const briefContext = brief ? [...brief.userContext, ...selectedContext.map((item) => `Dopisane w demo: ${item}`)] : selectedContext;
  const copy = viewCopy[view];
  const selectedProgress = processProgress(selected.communicationStatus);
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const visibleContacts = normalizedSearch
    ? liveContacts.filter((contact) =>
        [contact.name, contact.organization, contact.subject, contact.notes, ...contact.tags].join(" ").toLowerCase().includes(normalizedSearch),
      )
    : liveContacts;
  const visibleSources = normalizedSearch
    ? liveOrganizationSources.filter((source) => [source.title, source.authority, source.url ?? "", ...source.facts].join(" ").toLowerCase().includes(normalizedSearch))
    : liveOrganizationSources;

  function addContextNote() {
    const value = contextDraft.trim();
    if (!value) return;

    setContextByContact((current) => ({
      ...current,
      [selected.id]: [...(current[selected.id] ?? []), value],
    }));
    setContextDraft("");
  }

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
          <a className="brand" href="/" aria-label="Relora">
            <span className="brand-mark">R</span>
            <span className="brand-copy">
              <strong>Relora</strong>
              <small>CRM</small>
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
          {navigation.map(({ href, icon, label, view: itemView }) => (
            <a aria-current={itemView === view ? "page" : undefined} href={href} key={href}>
              <Icon name={icon} />
              <span className="nav-label">{label}</span>
            </a>
          ))}
        </nav>

        <div className="rail-card">
          <span>Źródło</span>
          <strong>{dataSourceLabel(outreachData.source)}</strong>
          <p>{new Date(outreachData.updatedAt).toLocaleTimeString("pl-PL")}</p>
        </div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <div>
            <span className="eyebrow">{copy.eyebrow}</span>
            <h1>{copy.title}</h1>
            <p className="topbar-note">{copy.note}</p>
          </div>
          <label className="global-search">
            <input
              aria-label="Szukaj osoby, relacji lub tematu"
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Szukaj osoby, relacji, tematu..."
              value={searchQuery}
            />
          </label>
          <div className="topbar-actions">
            <Badge tone={outreachData.source.startsWith("demo") || outreachData.source.startsWith("fallback") ? "gold" : "green"}>
              {outreachData.source.startsWith("demo") || outreachData.source.startsWith("fallback") ? "demo" : "na żywo"}
            </Badge>
            <a className="button" href="/kontakty">Dodaj kontekst</a>
            <a className="button button-primary" href="/proces">
              Nowa wiadomość
            </a>
          </div>
        </header>

        <section className="metric-grid" aria-label="Metryki">
          <div>
            <Icon name="people" />
            <span>Kontakty</span>
            <strong>{liveContacts.length}</strong>
            <small>rekordów w przestrzeni</small>
          </div>
          <div>
            <PhotoAvatar contact={selected} />
            <span>Wybrany kontakt</span>
            <strong>{selected.name}</strong>
            <small>{selected.organization}</small>
          </div>
          <div>
            <Icon name="context" />
            <span>Brief</span>
            <strong>{statusLabel(engineStatus)}</strong>
            <small>{brief?.confidence ?? 0}% kompletności</small>
          </div>
          <div>
            <Icon name="link" />
            <span>Relacje</span>
            <strong>{relatedEdges.length}</strong>
            <small>aktywnych powiązań</small>
          </div>
        </section>

        {view === "dashboard" || view === "process" || view === "contacts" ? (
          <section className="process-overview" aria-label="Postęp komunikacji">
            <div className="process-overview-head">
              <div>
                <span>Postęp komunikacji</span>
                <strong>{selected.name}</strong>
              </div>
              <p>{selected.nextStep}</p>
            </div>
            <div className="process-steps">
              {processSteps.map((step, index) => (
                <span
                  className={`${index < selectedProgress ? "is-done" : ""} ${index === selectedProgress ? "is-current" : ""}`}
                  key={step.id}
                >
                  {step.label}
                </span>
              ))}
            </div>
            <div className="process-meta">
              <span>Ostatni kontakt: {selected.lastContactAt}</span>
              <span>Status: {crmStageLabel(selected.stage)}</span>
            </div>
          </section>
        ) : null}

        {(view === "dashboard" || view === "contacts" || view === "process") ? <section className={`reference-grid ${view !== "dashboard" ? "reference-grid-single" : ""}`}>
          {view !== "process" ? <section className="reference-panel" id="people">
            <div className="reference-head">
              <h2>Kontakty</h2>
              <a href="/kontakty">Zobacz wszystko</a>
            </div>
            <div className="reference-list">
              {visibleContacts.length > 0 ? visibleContacts.map((person) => (
                <button
                  aria-pressed={person.id === selected.id}
                  className={`reference-row ${person.id === selected.id ? "is-selected" : ""}`}
                  key={person.id}
                  onClick={() => setSelectedId(person.id)}
                  type="button"
                >
                  <PhotoAvatar contact={person} />
                  <span className="reference-main">
                    <strong>{person.name}</strong>
                    <small>{person.organization}</small>
                  </span>
                  <span className="reference-meta">{crmStageLabel(person.stage)}</span>
                </button>
              )) : <div className="empty-lane">Brak kontaktów dla tego filtra</div>}
            </div>
          </section> : null}

          {view !== "contacts" ? <section className="reference-panel" id="crm">
            <div className="reference-head">
              <h2>Proces kontaktu</h2>
              <a href="/proces">Zobacz wszystko</a>
            </div>
            <div className="reference-list">
              {visibleContacts.slice(0, 4).map((person, index) => (
                <button
                  aria-pressed={person.id === selected.id}
                  className={`reference-row reference-row-wide ${person.id === selected.id ? "is-selected" : ""}`}
                  key={person.id}
                  onClick={() => setSelectedId(person.id)}
                  type="button"
                >
                  <span className="request-main">
                    <span
                      aria-hidden="true"
                      className="request-icon"
                      style={{ backgroundImage: `url(${figmaRequestVisuals[index % figmaRequestVisuals.length].icon})` }}
                    />
                    <span className="reference-main">
                      <strong>{person.subject}</strong>
                      <small>{person.taskId}</small>
                    </span>
                  </span>
                  <span className="reference-issue">{person.organization}</span>
                  <span className="figma-avatar">
                    <img alt="" src={figmaRequestVisuals[index % figmaRequestVisuals.length].avatar} />
                  </span>
                  <span className="reference-owner">{person.name}</span>
                </button>
              ))}
            </div>
          </section> : null}
        </section> : null}

        {(view === "dashboard" || view === "contacts" || view === "process") ? <section className={`crm-workspace crm-workspace-${view}`}>
          <div className="center-stack">
            {(view === "dashboard" || view === "contacts") ? <Panel title="Karta kontaktu" eyebrow={selected.source}>
              <article className="person-detail">
                <img className="contact-cover" alt="" src={selectedOrganization?.imageUrl ?? "/scenes/lodz-workspace.svg"} />
                <div className="identity-row">
                  <PhotoAvatar contact={selected} size="lg" />
                  <div>
                    <h2>{selected.name}</h2>
                    <p>{selected.organization}</p>
                    {selectedOrganization ? (
                      <a className="org-link" href={selectedOrganization.websiteUrl} rel="noreferrer" target="_blank">
                        <img alt="" src={selectedOrganization.logoUrl} />
                        Oficjalny profil organizacji
                      </a>
                    ) : null}
                    <div className="tag-row">
                      <Badge tone="gold">{crmStageLabel(selected.stage)}</Badge>
                      <Badge tone="blue">{selected.taskId}</Badge>
                      <Badge tone="teal">{channelLabel(selected.channel)}</Badge>
                    </div>
                  </div>
                </div>
                <div className="data-box data-box-private">
                  <span>Kontekst prywatny</span>
                  <p>{selected.notes}</p>
                </div>
                {selectedContext.length > 0 ? (
                  <div className="context-chips" aria-label="Dopisany kontekst">
                    {selectedContext.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                ) : null}
              </article>
            </Panel> : null}

            {view === "contacts" ? <Panel title="Dodaj kontekst" eyebrow="lokalnie w demo">
              <div className="context-editor">
                <p>
                  Dopisz fakt, preferencję albo ograniczenie dla wybranego kontaktu. Notatka zostaje w tej sesji demo.
                </p>
                <label>
                  <span>Nowa notatka</span>
                  <textarea
                    onChange={(event) => setContextDraft(event.target.value)}
                    placeholder="Np. właściciel preferuje SMS po każdej awarii i tygodniowy raport w piątek."
                    rows={4}
                    value={contextDraft}
                  />
                </label>
                <button className="button button-primary" onClick={addContextNote} type="button">
                  Dodaj do kontaktu
                </button>
              </div>
            </Panel> : null}

            {view === "contacts" ? <Panel title="Brief" eyebrow={brief ? `${brief.confidence}% kompletności` : "w toku"}>
              {brief ? (
                <div className="research-stack" id="research">
                  <div className="data-box">
                    <span>Zakres</span>
                    <p>Profil kontaktu, relacje, źródła publiczne i dopisane notatki. Wysyłka zawsze wymaga akceptacji.</p>
                  </div>
                  <div className="data-box">
                    <span>Kąt wejścia</span>
                    <p>{brief.suggestedAngle}</p>
                  </div>
                  <div className="compact-list">
                    {briefContext.slice(0, 5).map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                  <div className="compact-list">
                    {brief.suggestedSystems.slice(0, 4).map((system) => (
                      <span key={system}>{system}</span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="empty-state">W toku</div>
              )}
            </Panel> : null}
          </div>

          {(view === "dashboard" || view === "process") ? <div className="right-stack">
            <Panel title="Kolejka" eyebrow="ręczna akceptacja" >
              <div className="crm-board">
                {crmColumns.map((column) => (
                  <section className="crm-column" key={column.id}>
                    <div className="crm-column-head">
                      <strong>{column.label}</strong>
                      <span>{visibleContacts.filter((person) => person.communicationStatus === column.id).length}</span>
                    </div>
                    {visibleContacts.some((person) => person.communicationStatus === column.id) ? (
                      visibleContacts.filter((person) => person.communicationStatus === column.id).map((person) => (
                        <button
                          className={`crm-card ${person.id === selected.id ? "is-selected" : ""}`}
                          key={person.id}
                          onClick={() => setSelectedId(person.id)}
                          type="button"
                        >
                          <strong>{person.name}</strong>
                          <span>{person.subject}</span>
                          <small>{person.nextStep}</small>
                        </button>
                      ))
                    ) : (
                      <div className="empty-lane">Pusto</div>
                    )}
                  </section>
                ))}
              </div>
            </Panel>

            <Panel title="Wiadomość" eyebrow="podgląd przed wysyłką">
              <article className="message-preview" id="composer">
                <span>{selected.name}</span>
                <h3>{selected.subject}</h3>
                <p>{selected.message}</p>
                <div className="preview-actions">
                  <button className="button" type="button">Zapisz</button>
                  <button className="button button-primary" type="button">Akceptuj</button>
                </div>
              </article>
            </Panel>
          </div> : null}
        </section> : null}

        {(view === "dashboard" || view === "relations" || view === "sources") ? <section className={`bottom-grid ${view !== "dashboard" ? "bottom-grid-single" : ""}`}>
          {view !== "sources" ? (
          <Panel title="Mapa powiązań" eyebrow={`${liveGraphEdges.length} relacji`}>
            <RelationshipGraph graphEdges={liveGraphEdges} selectedId={selected.id} onSelectPerson={setSelectedId} />
          </Panel>
          ) : null}

          {view !== "relations" ? <Panel title="Źródła" eyebrow={`${liveOrganizationSources.length} rekordy`}>
            <div className="source-list">
              {visibleSources.map((source, index) => (
                <article className="source-row" key={source.id}>
                  <img alt="" src={source.imageUrl ?? figmaPropertyImages[index % figmaPropertyImages.length]} />
                  <span>{source.kind === "pdf" ? "PDF" : "WWW"}</span>
                  <strong>{source.title}</strong>
                  <small>{source.authority}</small>
                  {source.url ? (
                    <a href={source.url} rel="noreferrer" target="_blank">
                      Otwórz źródło
                    </a>
                  ) : null}
                </article>
              ))}
              {visibleSources.length === 0 ? <div className="empty-lane">Brak źródeł dla tego filtra</div> : null}
            </div>
          </Panel> : null}
        </section> : null}
      </div>
    </main>
  );
}
