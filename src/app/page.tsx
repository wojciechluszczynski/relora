"use client";

import { useEffect, useMemo, useState } from "react";
import { contacts, graphEdges, organizations, topics, type Contact } from "../lib/relora-data";
import type { ResearchBrief } from "../lib/research-engine";

function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "teal" | "gold" | "wine" | "green";
}) {
  return <span className={`r-badge ${tone}`}>{children}</span>;
}

function Panel({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="r-panel">
      {eyebrow ? <span className="r-eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {children}
    </section>
  );
}

const nodePositions: Record<string, { x: number; y: number; type: string; label: string }> = {
  "cnt_tomasz-piotrowski": { x: 12, y: 28, type: "person", label: "Tomasz Piotrowski" },
  "cnt_lukasz-goss": { x: 15, y: 62, type: "person", label: "Łukasz Goss" },
  "cnt_adam-pustelnik": { x: 39, y: 23, type: "person", label: "Adam Pustelnik" },
  "cnt_pawel-blizniuk": { x: 39, y: 70, type: "person", label: "Paweł Bliźniuk" },
  "cnt_wojciech-rosicki": { x: 66, y: 30, type: "person", label: "Wojciech Rosicki" },
  org_uml: { x: 68, y: 54, type: "org", label: "Urząd Miasta Łodzi" },
  org_holding: { x: 43, y: 48, type: "org", label: "Łódzki Holding" },
  org_sejm: { x: 66, y: 78, type: "org", label: "Sejm RP" },
  "topic_eventy-miejskie": { x: 88, y: 18, type: "topic", label: "eventy miejskie" },
  topic_komunikacja: { x: 87, y: 38, type: "topic", label: "komunikacja" },
  topic_governance: { x: 62, y: 12, type: "topic", label: "governance" },
  topic_inwestorzy: { x: 88, y: 62, type: "topic", label: "inwestorzy" },
  topic_AI: { x: 87, y: 82, type: "topic", label: "AI" },
  "topic_obsługa-mieszkańców": { x: 84, y: 52, type: "topic", label: "obsługa mieszkańców" },
};

export default function Page() {
  const [selectedId, setSelectedId] = useState(contacts[0].id);
  const [brief, setBrief] = useState<ResearchBrief | null>(null);
  const [engineStatus, setEngineStatus] = useState<"idle" | "running" | "ready">("idle");
  const selected = contacts.find((contact) => contact.id === selectedId) ?? contacts[0];

  const activeEdges = useMemo(
    () => graphEdges.filter((edge) => edge.from === selected.id || edge.to === selected.id),
    [selected.id],
  );

  async function runBackgroundResearch(contact: Contact) {
    setEngineStatus("running");
    const response = await fetch(`/api/research?contactId=${contact.id}`, { cache: "no-store" });
    const result = (await response.json()) as ResearchBrief;
    setBrief(result);
    setEngineStatus("ready");
  }

  useEffect(() => {
    runBackgroundResearch(selected);
  }, [selectedId]);

  return (
    <main className="r-shell">
      <aside className="r-rail" aria-label="Relora navigation">
        <div className="r-brand">
          <div className="r-logo">R</div>
          <div>
            <strong>Relora</strong>
            <span>research graph engine</span>
          </div>
        </div>
        <nav>
          <a href="#dashboard">Dashboard</a>
          <a href="#people">People</a>
          <a href="#engine">Research engine</a>
          <a href="#graph">Graph</a>
          <a href="#composer">Composer</a>
          <a href="#alerts">Alerts</a>
        </nav>
      </aside>

      <div className="r-workspace">
        <header className="r-header" id="dashboard">
          <div>
            <span className="r-eyebrow">Dane: contacts.csv, messages.csv, tasks.csv + lokalny research engine</span>
            <h1>Relora z działającym grafem i silnikiem researchu</h1>
            <p>
              Wybierz osobę. Relora odpala endpoint researchu, buduje brief, wylicza confidence i
              podświetla powiązania osoby z organizacjami oraz tematami na grafie.
            </p>
          </div>
          <div className="r-engine-chip">
            <span>Research engine</span>
            <strong>{engineStatus === "running" ? "pracuje..." : engineStatus === "ready" ? "brief gotowy" : "oczekuje"}</strong>
            <button onClick={() => runBackgroundResearch(selected)}>Uruchom ponownie</button>
          </div>
        </header>

        <section className="r-metrics" aria-label="Import summary">
          <div><span>Kontakty</span><strong>{contacts.length}</strong><small>contacts.csv</small></div>
          <div><span>Organizacje</span><strong>{organizations.length}</strong><small>graph nodes</small></div>
          <div><span>Tematy</span><strong>{topics.length}</strong><small>topic nodes</small></div>
          <div><span>Krawędzie</span><strong>{graphEdges.length}</strong><small>person → org/topic</small></div>
        </section>

        <div className="r-grid">
          <Panel title="People list" eyebrow="kliknięcie zmienia person detail, graph i research">
            <div className="r-people" id="people">
              {contacts.map((person) => (
                <button
                  className={`r-person-card as-button ${person.id === selected.id ? "selected" : ""}`}
                  key={person.id}
                  onClick={() => setSelectedId(person.id)}
                >
                  <div className="r-card-head">
                    <div className="r-avatar">{person.initials}</div>
                    <div>
                      <h3>{person.name}</h3>
                      <p>{person.organization}</p>
                    </div>
                  </div>
                  <div className="r-badges">
                    <Badge tone="gold">{person.stage}</Badge>
                    <Badge tone="teal">{person.channel}</Badge>
                  </div>
                  <p className="r-notes">{person.notes}</p>
                </button>
              ))}
            </div>
          </Panel>

          <Panel title={`Person detail: ${selected.name}`} eyebrow={selected.source}>
            <div className="r-person-detail">
              <div className="r-identity">
                <div className="r-avatar large">{selected.initials}</div>
                <div>
                  <h2>{selected.name}</h2>
                  <p>{selected.organization}</p>
                  <div className="r-badges">
                    <Badge tone="gold">stage: {selected.stage}</Badge>
                    <Badge>task: {selected.taskId}</Badge>
                    <Badge tone="teal">channel: {selected.channel}</Badge>
                  </div>
                </div>
              </div>
              <div className="r-box private">
                <span>User context z importu</span>
                <p>{selected.notes}</p>
              </div>
            </div>
          </Panel>
        </div>

        <div className="r-grid engine-grid" id="engine">
          <Panel title="Research brief generowany przez engine" eyebrow="/api/research">
            {brief ? (
              <div className="r-engine-output">
                <div><span>Confidence</span><strong>{brief.confidence}%</strong></div>
                <div><span>Najlepszy angle</span><p>{brief.suggestedAngle}</p></div>
                <div><span>Proponowane systemy</span><p>{brief.suggestedSystems.join(", ")}</p></div>
                <div><span>Ryzyka</span><p>{brief.riskNotes.join(" ")}</p></div>
                <div><span>Źródła</span><p>{brief.sources.join(", ")}</p></div>
              </div>
            ) : (
              <div className="r-empty">Research engine czeka na wynik.</div>
            )}
          </Panel>

          <Panel title="Public facts vs user context" eyebrow="bez mieszania warstw">
            {brief ? (
              <div className="r-two compact">
                <div className="r-box">
                  <span>Public facts</span>
                  <ul>{brief.publicFacts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
                </div>
                <div className="r-box private">
                  <span>User context</span>
                  <ul>{brief.userContext.map((fact) => <li key={fact}>{fact}</li>)}</ul>
                </div>
              </div>
            ) : null}
          </Panel>
        </div>

        <Panel title="Relationship graph" eyebrow="prawdziwe węzły i krawędzie z importu">
          <div className="r-connected-graph" id="graph">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {graphEdges.map((edge) => {
                const from = nodePositions[edge.from];
                const to = nodePositions[edge.to];
                const active = edge.from === selected.id || edge.to === selected.id;
                return (
                  <line
                    key={`${edge.from}-${edge.to}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    className={active ? "active" : ""}
                  />
                );
              })}
            </svg>
            {Object.entries(nodePositions).map(([id, node]) => {
              const isContact = id.startsWith("cnt_");
              const active = id === selected.id || activeEdges.some((edge) => edge.to === id || edge.from === id);
              return (
                <button
                  key={id}
                  className={`r-graph-node ${node.type} ${active ? "active" : ""}`}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  onClick={() => isContact && setSelectedId(id)}
                  disabled={!isContact}
                >
                  <strong>{node.label}</strong>
                  <span>{node.type}</span>
                </button>
              );
            })}
          </div>
        </Panel>

        <Panel title="Message composer" eyebrow="messages.csv + preview przed Resend">
          <div className="r-composer" id="composer">
            <div className="r-draft">
              <label>Kontakt<input value={selected.name} readOnly /></label>
              <label>Temat<input value={selected.subject} readOnly /></label>
              <label>Treść źródłowa<textarea value={selected.message} readOnly /></label>
            </div>
            <div className="r-preview">
              <span>Preview przed wysyłką</span>
              <h3>{selected.subject}</h3>
              <p>{selected.message}</p>
              <div className="r-preview-actions">
                <Badge tone="gold">ready_to_send</Badge>
                <button>Zapisz draft</button>
                <button className="primary">Akceptuj preview</button>
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Alerts center" eyebrow="resend/webhook-spec.md">
          <div className="r-empty" id="alerts">
            <strong>Brak realnych alertów w dostarczonych danych.</strong>
            <p>
              Engine nie zmyśla alertów. Alerty powstaną po realnych webhookach Resend i zapisach
              do message_events: sent, delivered, opened, clicked, replied, bounced albo failed.
            </p>
          </div>
        </Panel>
      </div>
    </main>
  );
}
