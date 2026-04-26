"use client";

import { useEffect, useMemo, useState } from "react";
import { contacts, graphEdges, organizations, topics, type Contact } from "../lib/relora-data";
import type { ResearchBrief } from "../lib/research-engine";
import { RelationshipGraph } from "./relationship-graph";
import { Avatar, Badge, Panel } from "./ui";

type EngineStatus = "idle" | "running" | "ready" | "error";

const navigation = [
  ["Dashboard", "#dashboard"],
  ["People", "#people"],
  ["Research", "#research"],
  ["CRM", "#crm"],
  ["Graph", "#graph"],
  ["Composer", "#composer"],
  ["Alerts", "#alerts"],
] as const;

const crmColumns = [
  { id: "todo", label: "Do przygotowania", hint: "zadania z importu" },
  { id: "draft", label: "Draft", hint: "wiadomość gotowa do preview" },
  { id: "preview", label: "Preview", hint: "wymaga akceptacji" },
] as const;

function statusLabel(status: EngineStatus) {
  if (status === "running") return "research pracuje";
  if (status === "ready") return "brief gotowy";
  if (status === "error") return "błąd researchu";
  return "oczekuje";
}

async function fetchResearch(contactId: string) {
  const response = await fetch(`/api/research?contactId=${contactId}`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Research endpoint returned an error");
  }

  return (await response.json()) as ResearchBrief;
}

export function ReloraApp() {
  const [selectedId, setSelectedId] = useState(contacts[0].id);
  const [brief, setBrief] = useState<ResearchBrief | null>(null);
  const [engineStatus, setEngineStatus] = useState<EngineStatus>("idle");
  const selected = useMemo(
    () => contacts.find((contact) => contact.id === selectedId) ?? contacts[0],
    [selectedId],
  );

  const relatedEdges = useMemo(
    () => graphEdges.filter((edge) => edge.from === selected.id || edge.to === selected.id),
    [selected.id],
  );

  async function runResearch(contact: Contact) {
    setEngineStatus("running");

    try {
      const result = await fetchResearch(contact.id);
      setBrief(result);
      setEngineStatus("ready");
    } catch {
      setBrief(null);
      setEngineStatus("error");
    }
  }

  useEffect(() => {
    let isCurrent = true;

    setEngineStatus("running");
    fetchResearch(selected.id)
      .then((result) => {
        if (!isCurrent) return;
        setBrief(result);
        setEngineStatus("ready");
      })
      .catch(() => {
        if (!isCurrent) return;
        setBrief(null);
        setEngineStatus("error");
      });

    return () => {
      isCurrent = false;
    };
  }, [selected.id]);

  return (
    <main className="app-shell">
      <aside className="side-rail" aria-label="Nawigacja Relora">
        <a className="brand" href="#dashboard" aria-label="Relora dashboard">
          <span className="brand-mark">R</span>
          <span>
            <strong>Relora</strong>
            <small>relationship intelligence</small>
          </span>
        </a>

        <nav className="nav-list">
          {navigation.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="rail-card">
          <span>Źródło prawdy</span>
          <strong>Supabase-ready import</strong>
          <p>contacts.csv, messages.csv, tasks.csv, migrations i spec webhooków Resend.</p>
        </div>
      </aside>

      <div className="workspace">
        <header className="hero" id="dashboard">
          <div className="hero-copy">
            <span className="eyebrow">Relora Intelligence OS · Supabase realtime · Resend preview gate</span>
            <h1>Kokpit relacji, researchu i outreachu działający na realnych rekordach.</h1>
            <p>
              Wybierz osobę, sprawdź separację public facts i user context, zobacz graf powiązań,
              status CRM oraz wiadomość zanim trafi do Resend.
            </p>
            <div className="hero-strip" aria-label="Architektura aplikacji">
              <span>Research brief</span>
              <span>CRM status</span>
              <span>Timeline</span>
              <span>Suggested messages</span>
            </div>
          </div>

          <div className="engine-card" aria-live="polite">
            <span>Research engine</span>
            <strong>{statusLabel(engineStatus)}</strong>
            <p>{selected.name}</p>
            <button className="button button-primary" onClick={() => runResearch(selected)} type="button">
              Uruchom ponownie
            </button>
          </div>
        </header>

        <section className="metric-grid" aria-label="Podsumowanie importu">
          <div>
            <span>Kontakty</span>
            <strong>{contacts.length}</strong>
            <small>contacts.csv</small>
          </div>
          <div>
            <span>Organizacje</span>
            <strong>{organizations.length}</strong>
            <small>węzły grafu</small>
          </div>
          <div>
            <span>Tematy</span>
            <strong>{topics.length}</strong>
            <small>warstwa researchu</small>
          </div>
          <div>
            <span>Krawędzie</span>
            <strong>{graphEdges.length}</strong>
            <small>relacje person-org-topic</small>
          </div>
        </section>

        <section className="content-grid content-grid-people" id="people">
          <Panel title="People list" eyebrow="realne osoby z importu">
            <div className="people-list">
              {contacts.map((person) => (
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
                    <Badge tone="gold">{person.stage}</Badge>
                    <Badge tone="teal">{person.channel}</Badge>
                  </span>
                  <span className="person-note">{person.notes}</span>
                </button>
              ))}
            </div>
          </Panel>

          <Panel title="Person detail" eyebrow={selected.source}>
            <article className="person-detail">
              <div className="identity-row">
                <Avatar initials={selected.initials} size="lg" />
                <div>
                  <h2>{selected.name}</h2>
                  <p>{selected.organization}</p>
                  <div className="tag-row">
                    <Badge tone="gold">CRM: {selected.stage}</Badge>
                    <Badge tone="blue">task: {selected.taskId}</Badge>
                    <Badge tone="teal">kanał: {selected.channel}</Badge>
                  </div>
                </div>
              </div>

              <div className="detail-grid">
                <div className="data-box">
                  <span>Public facts</span>
                  <p>{brief?.publicFacts[0] ?? `Organizacja: ${selected.organization}.`}</p>
                </div>
                <div className="data-box data-box-private">
                  <span>User context</span>
                  <p>{selected.notes}</p>
                </div>
              </div>
            </article>
          </Panel>
        </section>

        <section className="content-grid" id="research">
          <Panel title="Research brief" eyebrow="generowany przez /api/research">
            {brief ? (
              <div className="research-stack">
                <div className="research-score">
                  <span>Confidence</span>
                  <strong>{brief.confidence}%</strong>
                </div>
                <div className="data-box">
                  <span>Najlepszy angle</span>
                  <p>{brief.suggestedAngle}</p>
                </div>
                <div className="data-box">
                  <span>Suggested systems</span>
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
              <div className="empty-state">Research engine czeka na wynik.</div>
            )}
          </Panel>

          <Panel title="Data boundary" eyebrow="public facts oddzielone od user context">
            {brief ? (
              <div className="boundary-grid">
                <div className="data-box">
                  <span>Public facts</span>
                  <ul>
                    {brief.publicFacts.map((fact) => (
                      <li key={fact}>{fact}</li>
                    ))}
                  </ul>
                </div>
                <div className="data-box data-box-private">
                  <span>User context</span>
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
          <Panel title="CRM board" eyebrow="statusy z importu, bez sztucznych leadów">
            <div className="crm-board">
              {crmColumns.map((column) => (
                <section className="crm-column" key={column.id}>
                  <div className="crm-column-head">
                    <strong>{column.label}</strong>
                    <span>{column.hint}</span>
                  </div>
                  {column.id === "draft" ? (
                    contacts.map((person) => (
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

          <Panel title="Timeline" eyebrow="osoba ma historię i następny krok">
            <ol className="timeline">
              <li>
                <span>Import</span>
                <p>Dodano kontakt, wiadomość i zadanie z paczki źródłowej.</p>
              </li>
              <li>
                <span>Research</span>
                <p>Brief dla {selected.name} budowany na danych public facts i user context.</p>
              </li>
              <li>
                <span>Następny krok</span>
                <p>Preview wiadomości, ręczna akceptacja i dopiero potem wysyłka przez Resend.</p>
              </li>
            </ol>
          </Panel>
        </section>

        <Panel title="Relationship graph" eyebrow="powiązane węzły osoby, organizacji i tematów">
          <RelationshipGraph selectedId={selected.id} onSelectPerson={setSelectedId} />
          <div className="graph-summary">
            <span>Aktywne relacje dla {selected.name}</span>
            <strong>{relatedEdges.length}</strong>
          </div>
        </Panel>

        <section id="composer">
          <Panel title="Message composer" eyebrow="preview przed Resend">
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
                <span>Preview wiadomości</span>
                <h3>{selected.subject}</h3>
                <p>{selected.message}</p>
                <div className="preview-actions">
                  <Badge tone="gold">preview_required</Badge>
                  <button className="button" type="button">
                    Zapisz draft
                  </button>
                  <button className="button button-primary" type="button">
                    Akceptuj preview
                  </button>
                </div>
              </article>
            </div>
          </Panel>
        </section>

        <Panel title="Alerts center" eyebrow="resend/webhook-spec.md">
          <div className="alerts-center" id="alerts">
            <strong>Brak realnych alertów w dostarczonych danych.</strong>
            <p>
              Relora nie zmyśla aktywności. Alerty pojawią się po webhookach Resend zapisanych w
              Supabase jako sent, delivered, opened, clicked, replied, bounced albo failed.
            </p>
          </div>
        </Panel>
      </div>
    </main>
  );
}
