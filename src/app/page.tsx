const people = [
  {
    initials: "AK",
    name: "Anna Kowalska",
    role: "Head of Partnerships",
    company: "Example Ventures",
    stage: "Warm",
    score: 82,
    needs: ["warm lead sourcing", "growth partnerships"],
    angle: "Nawiązanie do wcześniejszej rozmowy o partnerstwach growth.",
  },
  {
    initials: "MN",
    name: "Marek Nowak",
    role: "Founder",
    company: "SaaS Forge",
    stage: "Researching",
    score: 64,
    needs: ["positioning", "demand generation"],
    angle: "Krótki outreach z propozycją konkretnego audytu systemów.",
  },
  {
    initials: "JL",
    name: "Julia Lewandowska",
    role: "Deputy Mayor, Digital Affairs",
    company: "City Office",
    stage: "Contacted",
    score: 76,
    needs: ["citizen service automation", "public consultation workflows"],
    angle: "Bezpieczny, forward-proof mail o usprawnieniu obsługi mieszkańców.",
  },
];

const stages = [
  "New",
  "Researching",
  "Warm",
  "Contacted",
  "Replied",
  "In Conversation",
  "Proposal Sent",
  "Waiting",
  "Won",
  "Lost",
  "Dormant",
];

const crmDeals = [
  { stage: "New", name: "Piotr Zielinski", detail: "Public affairs, verify sources" },
  { stage: "Researching", name: "Marek Nowak", detail: "Founder offer angle" },
  { stage: "Warm", name: "Anna Kowalska", detail: "Partnership intro ready" },
  { stage: "Contacted", name: "Julia Lewandowska", detail: "Email delivered, waiting" },
  { stage: "Replied", name: "Tomasz Urban", detail: "Asked for examples" },
  { stage: "Proposal Sent", name: "Katarzyna Bien", detail: "System pilot deck" },
];

const alerts = [
  {
    type: "critical",
    title: "Reply detected from Tomasz Urban",
    body: "Resend webhook mapped email.replied, moved CRM stage to Replied and created a next action.",
    time: "2 min",
  },
  {
    type: "warn",
    title: "Bounce on city-office alias",
    body: "Delivery failed. Relora marked the message as bounced and raised a critical outreach alert.",
    time: "18 min",
  },
  {
    type: "ok",
    title: "Anna opened the partnership message",
    body: "Warmth score increased. Suggested follow-up waits for manual approval.",
    time: "41 min",
  },
];

function Badge({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone?: "teal" | "wine" | "gold";
}) {
  return <span className={`badge ${tone ?? ""}`}>{children}</span>;
}

function SectionHead({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="section-head">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="mark">R</div>
          <div>
            <strong>Relora</strong>
            <span>Relationship intelligence</span>
          </div>
        </div>
        <nav className="nav" aria-label="Primary navigation">
          <a className="active" href="#dashboard">
            Dashboard <kbd>D</kbd>
          </a>
          <a href="#people">People List</a>
          <a href="#person">Person Detail</a>
          <a href="#brief">Research Brief</a>
          <a href="#crm">CRM Board</a>
          <a href="#graph">Relationship Graph</a>
          <a href="#composer">Message Composer</a>
          <a href="#alerts">Alerts Center</a>
        </nav>
        <div className="sidebar-footer">
          <span>Realtime layer</span>
          <strong>Supabase tables watched: notes, interactions, crm_records, messages, message_events, alerts</strong>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <label className="search">
            <span>⌕</span>
            <input placeholder="Search people, public facts, private context, messages..." />
            <kbd>⌘K</kbd>
          </label>
          <button className="btn ghost">◐ Theme</button>
          <button className="btn primary">＋ Add context</button>
        </header>

        <div className="content">
          <section className="hero" id="dashboard">
            <div className="hero-main">
              <span className="eyebrow">Premium B2B SaaS cockpit</span>
              <h1>Know the person before you write the message.</h1>
              <p>
                Relora combines public research, private relationship context, CRM stages,
                timelines, playbooks and Resend delivery tracking in one calm workspace.
              </p>
              <div className="hero-actions">
                <button className="btn primary">Open next best action</button>
                <button className="btn">Review email previews</button>
                <button className="btn">Map relationships</button>
              </div>
            </div>
            <div className="architecture">
              <span className="eyebrow">Screen architecture</span>
              <h2>Core flow</h2>
              <div className="flow-list">
                <div className="flow-item">
                  <b>1</b>
                  <div>
                    <strong>Add person and sources</strong>
                    <span>Public URLs, notes, organizations and relationship edges are captured separately.</span>
                  </div>
                </div>
                <div className="flow-item">
                  <b>2</b>
                  <div>
                    <strong>Build research brief</strong>
                    <span>Facts, confidence, sources, possible needs, risk notes and suggested systems.</span>
                  </div>
                </div>
                <div className="flow-item">
                  <b>3</b>
                  <div>
                    <strong>Move through CRM</strong>
                    <span>Every status change becomes timeline activity and can trigger alerts.</span>
                  </div>
                </div>
                <div className="flow-item">
                  <b>4</b>
                  <div>
                    <strong>Preview then approve</strong>
                    <span>No outbound message is sent through Resend without manual approval.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="grid-4">
              <div className="metric">
                <span>Tracked people</span>
                <strong>248</strong>
                <small>32 with complete briefs</small>
              </div>
              <div className="metric">
                <span>Manual approvals waiting</span>
                <strong>14</strong>
                <small>All have previews</small>
              </div>
              <div className="metric">
                <span>Warmth increase</span>
                <strong>+18%</strong>
                <small>From opens, clicks, replies</small>
              </div>
              <div className="metric">
                <span>Critical alerts</span>
                <strong>3</strong>
                <small>Bounces and replies</small>
              </div>
            </div>
          </section>

          <section id="people">
            <SectionHead
              eyebrow="People list"
              title="Research-ready people database"
              copy="Each person shows CRM status, confidence, needs and the safest opening angle before you enter the detail view."
            />
            <div className="people-grid">
              {people.map((person) => (
                <article className="person-card" key={person.name}>
                  <div className="person-top">
                    <div className="avatar">{person.initials}</div>
                    <div>
                      <strong>{person.name}</strong>
                      <span>
                        {person.role}, {person.company}
                      </span>
                    </div>
                    <Badge tone="teal">{person.score}%</Badge>
                  </div>
                  <div className="badge-row">
                    <Badge tone="gold">{person.stage}</Badge>
                    {person.needs.map((need) => (
                      <Badge key={need}>{need}</Badge>
                    ))}
                  </div>
                  <p>{person.angle}</p>
                  <div className="status-row">
                    <button className="btn">Brief</button>
                    <button className="btn">Timeline</button>
                    <button className="btn primary">Compose</button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="person">
            <SectionHead
              eyebrow="Person detail"
              title="The person card is the central artifact"
              copy="Public facts and user context are never blended. Every insight is either sourced or explicitly marked as user provided."
            />
            <div className="detail-layout">
              <div className="identity">
                <div className="identity-head">
                  <div className="avatar">AK</div>
                  <div>
                    <h2>Anna Kowalska</h2>
                    <p>Head of Partnerships at Example Ventures. Met once after a growth panel.</p>
                    <div className="badge-row">
                      <Badge tone="teal">Warmth 82</Badge>
                      <Badge tone="gold">CRM: Warm</Badge>
                      <Badge>Owner: Wojciech</Badge>
                    </div>
                  </div>
                  <button className="btn primary">＋ Note</button>
                </div>

                <div className="fact-context">
                  <div className="data-box">
                    <h3>Public facts</h3>
                    <ul>
                      <li>Role: partnerships and venture network development. Source: company profile.</li>
                      <li>Speaks publicly about growth partnerships and ecosystem building. Source: event page.</li>
                      <li>Connected to Example Ventures and SaaS founders. Confidence: 0.84.</li>
                    </ul>
                  </div>
                  <div className="data-box">
                    <h3>User context</h3>
                    <ul>
                      <li>User provided: quick conversation after the Warsaw growth panel.</li>
                      <li>Prefers concise follow-up with a concrete partnership hypothesis.</li>
                      <li>Sensitivity: medium. Keep the message forward-proof.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <aside className="panel">
                <h3>Activity timeline</h3>
                <ul className="timeline">
                  <li>
                    <time>Today</time>
                    <div>
                      <strong>Suggested message generated</strong>
                      <p>Short email variant waits for preview approval.</p>
                    </div>
                  </li>
                  <li>
                    <time>Apr 22</time>
                    <div>
                      <strong>Research brief refreshed</strong>
                      <p>New source added, confidence increased to 82%.</p>
                    </div>
                  </li>
                  <li>
                    <time>Apr 18</time>
                    <div>
                      <strong>CRM moved to Warm</strong>
                      <p>Status change recorded in crm_records and interactions.</p>
                    </div>
                  </li>
                </ul>
              </aside>
            </div>
          </section>

          <section id="brief">
            <SectionHead
              eyebrow="Research brief"
              title="Public role, needs, angle and what to avoid"
              copy="The brief turns research into a practical outreach decision: what system to propose, which channel to use and which risks to respect."
            />
            <div className="brief-grid">
              <div className="brief-panel">
                <h3>Who she is today</h3>
                <p>Partnership leader working around venture-backed SaaS companies and growth collaborations.</p>
              </div>
              <div className="brief-panel">
                <h3>Communication style</h3>
                <p>Publicly concise, opportunity-driven, comfortable with ecosystem and founder language.</p>
              </div>
              <div className="brief-panel">
                <h3>Possible needs</h3>
                <p>Warm lead sourcing, partner mapping, portfolio founder follow-up and signal-based outreach.</p>
              </div>
              <div className="brief-panel wide">
                <h3>Suggested systems to pitch</h3>
                <p>
                  A lightweight relationship intelligence system that maps founders, partners and previous
                  conversations, then drafts safe follow-ups with approval and delivery tracking.
                </p>
              </div>
              <div className="brief-panel">
                <h3>Avoid</h3>
                <p>Overclaiming automation, implying private knowledge from public data, or sending an unsourced insight.</p>
              </div>
            </div>
          </section>

          <section id="crm">
            <SectionHead
              eyebrow="CRM board"
              title="Pipeline with relationship-aware status"
              copy="Stages match the Supabase crm_records model and every move should create a timeline entry."
            />
            <div className="crm-board">
              {stages.map((stage) => (
                <div className="crm-column" key={stage}>
                  <h3>{stage}</h3>
                  {crmDeals
                    .filter((deal) => deal.stage === stage)
                    .map((deal) => (
                      <div className="deal" key={deal.name}>
                        <strong>{deal.name}</strong>
                        <span>{deal.detail}</span>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </section>

          <section id="graph">
            <SectionHead
              eyebrow="Relationship graph"
              title="People, organizations, topics, messages and interactions"
              copy="The graph makes the relationship model visible without hiding source confidence or context type."
            />
            <div className="graph-wrap" aria-label="Relationship graph preview">
              <div className="graph-line" style={{ left: 280, top: 210, width: 210, transform: "rotate(-16deg)" }} />
              <div className="graph-line" style={{ left: 470, top: 232, width: 220, transform: "rotate(18deg)" }} />
              <div className="graph-line" style={{ left: 380, top: 275, width: 260, transform: "rotate(55deg)" }} />
              <div className="graph-line" style={{ left: 250, top: 300, width: 230, transform: "rotate(25deg)" }} />
              <div className="node person" style={{ left: "9%", top: "35%" }}>
                Anna Kowalska
                <br />
                <span className="muted">person</span>
              </div>
              <div className="node" style={{ left: "36%", top: "25%" }}>
                Example Ventures
                <br />
                <span className="muted">organization</span>
              </div>
              <div className="node topic" style={{ left: "66%", top: "37%" }}>
                Growth partnerships
                <br />
                <span className="muted">topic</span>
              </div>
              <div className="node" style={{ left: "46%", top: "66%" }}>
                Email draft 03
                <br />
                <span className="muted">message</span>
              </div>
              <div className="node person" style={{ left: "18%", top: "68%" }}>
                Marek Nowak
                <br />
                <span className="muted">related person</span>
              </div>
            </div>
          </section>

          <section id="composer">
            <SectionHead
              eyebrow="Message composer"
              title="Variants, preview and manual approval before Resend"
              copy="Relora can draft long email, short email, Messenger, LinkedIn DM, SMS and follow-ups, but sending is blocked until the preview is approved."
            />
            <div className="composer-grid">
              <div className="composer-panel">
                <h3>Playbook variants</h3>
                <div className="tags" style={{ marginTop: 14 }}>
                  <Badge tone="teal">email short</Badge>
                  <Badge>email long</Badge>
                  <Badge>linkedin DM</Badge>
                  <Badge>messenger</Badge>
                  <Badge>SMS</Badge>
                  <Badge>follow-up 1</Badge>
                  <Badge>follow-up 2</Badge>
                </div>
                <div className="approval">
                  <strong>Send policy</strong>
                  <p>No automatic sends. Approval status must move from draft to approved.</p>
                </div>
              </div>
              <div className="composer-panel">
                <h3>Draft</h3>
                <div className="field">
                  <label>Recipient</label>
                  <select defaultValue="Anna Kowalska">
                    <option>Anna Kowalska</option>
                    <option>Marek Nowak</option>
                    <option>Julia Lewandowska</option>
                  </select>
                </div>
                <div className="field">
                  <label>Subject</label>
                  <input defaultValue="Partnership map for portfolio growth conversations" />
                </div>
                <div className="field">
                  <label>Message body</label>
                  <textarea defaultValue={`Hi Anna,\n\nI kept thinking about your point from the growth panel: the best partnerships usually start from the right context, not from a cold list.\n\nI am building Relora, a relationship intelligence system that separates public facts from private context, maps people and organizations, and drafts follow-ups that still need human approval before sending.\n\nIf useful, I can show you a concrete portfolio partnership workflow in 15 minutes.`} />
                </div>
              </div>
              <div className="composer-panel">
                <h3>Email preview</h3>
                <div className="preview">
                  <span className="eyebrow">Preview before Resend</span>
                  <h4>Partnership map for portfolio growth conversations</h4>
                  <p>Hi Anna,</p>
                  <p>
                    I kept thinking about your point from the growth panel: the best partnerships usually start from
                    the right context, not from a cold list.
                  </p>
                  <p>
                    I am building Relora, a relationship intelligence system that separates public facts from private
                    context, maps people and organizations, and drafts follow-ups that still need human approval before
                    sending.
                  </p>
                  <p>If useful, I can show you a concrete portfolio partnership workflow in 15 minutes.</p>
                </div>
                <div className="status-row" style={{ marginTop: 12 }}>
                  <button className="btn">Save draft</button>
                  <button className="btn">Approve preview</button>
                  <button className="btn primary">Send via Resend</button>
                </div>
              </div>
            </div>
          </section>

          <section id="alerts">
            <SectionHead
              eyebrow="Alerts center"
              title="Realtime monitoring for replies, bounces and CRM changes"
              copy="Resend webhook events create message_events, update message timestamps and raise alerts for important outcomes."
            />
            <div className="split">
              <div className="alerts">
                {alerts.map((alert) => (
                  <article className="alert-row" key={alert.title}>
                    <span className={`dot ${alert.type === "critical" ? "critical" : alert.type === "warn" ? "warn" : ""}`} />
                    <div>
                      <strong>{alert.title}</strong>
                      <p>{alert.body}</p>
                    </div>
                    <Badge>{alert.time}</Badge>
                  </article>
                ))}
              </div>
              <div className="dark-band">
                <span className="eyebrow">Backend contract</span>
                <h3>Supabase + Resend</h3>
                <p>
                  POST /api/webhooks/resend verifies signature, maps resend_message_id, inserts message_events, updates
                  sent, delivered, opened, clicked, replied, bounced and failed states, then creates alerts.
                </p>
                <div className="badge-row" style={{ marginTop: 14 }}>
                  <Badge>messages</Badge>
                  <Badge>message_events</Badge>
                  <Badge>alerts</Badge>
                  <Badge>crm_records</Badge>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
