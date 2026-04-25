const contacts = [
  {
    id: "cnt_tomasz-piotrowski",
    initials: "TP",
    name: "Tomasz Piotrowski",
    organization: "Urząd Miasta Łodzi",
    stage: "draft",
    priority: "medium",
    channel: "email",
    notes: "Eventy miejskie, komunikacja, turystyka, operacje miejskie",
    subject: "Kilka konkretnych pomysłów dla Łodzi",
    message:
      "Cześć Tomek, wiem, że masz dziś na głowie ogromny zakres: inwestycje, komunikację, transport, duże wydarzenia, turystykę i współpracę ze spółkami.",
    offer: ["Łódź Event Intelligence Platform", "EventOps Command Center", "AI City Communication Hub"],
    source: "contacts.csv + messages.csv",
  },
  {
    id: "cnt_lukasz-goss",
    initials: "ŁG",
    name: "Łukasz Goss",
    organization: "Łódzki Holding / projekty miejskie",
    stage: "draft",
    priority: "medium",
    channel: "email",
    notes: "Holding, spółki, przejrzystość danych, governance",
    subject: "Technologia, która porządkuje fakty zanim zacznie się kryzys",
    message:
      "Piszę, bo patrząc z boku na skalę tego, co dzieje się wokół Łodzi, Holdingu, Orientarium, ŁOT i dużych miejskich projektów, widzę potencjał i potrzebę porządkowania danych.",
    offer: ["Transparency & Control Cockpit", "Public Value Dashboard", "Issue Radar + Playbook"],
    source: "contacts.csv + messages.csv",
  },
  {
    id: "cnt_adam-pustelnik",
    initials: "AP",
    name: "Adam Pustelnik",
    organization: "Urząd Miasta Łodzi",
    stage: "draft",
    priority: "medium",
    channel: "email",
    notes: "Inwestorzy, nieruchomości, rozwój gospodarczy",
    subject: "Kilka pomysłów wokół inwestorów i danych",
    message:
      "Przez ostatnie lata mocno przeszedłem z marketingu i growthu w budowanie narzędzi: aplikacji, dashboardów, workflow, integracji API, automatyzacji i rozwiązań z AI.",
    offer: ["Investor Pipeline Cockpit", "Economic Development Dashboard", "Partner Follow-up System"],
    source: "contacts.csv + messages.csv",
  },
  {
    id: "cnt_pawel-blizniuk",
    initials: "PB",
    name: "Paweł Bliźniuk",
    organization: "Sejm RP",
    stage: "draft",
    priority: "medium",
    channel: "email",
    notes: "Cyfryzacja, AI, cyberbezpieczeństwo, sprawy publiczne",
    subject: "Kilka pomysłów pod Twoje obecne tematy",
    message:
      "Bardzo Ci gratuluję miejsca, w którym dziś jesteś: Sejm X kadencji, mandat z Łodzi, cyfryzacja, AI, cyberbezpieczeństwo i sprawy publiczne.",
    offer: ["AI Policy Briefing System", "Cyber & Public Affairs Radar", "Constituent Knowledge Base"],
    source: "contacts.csv + messages.csv",
  },
  {
    id: "cnt_wojciech-rosicki",
    initials: "WR",
    name: "Wojciech Rosicki",
    organization: "Urząd Miasta Łodzi",
    stage: "draft",
    priority: "medium",
    channel: "email",
    notes: "Procesy urzędu, wiedza organizacyjna, obsługa mieszkańców",
    subject: "Procesy, wiedza i technologia w praktyce",
    message:
      "Dawno się nie odzywałem, ale ostatnio pomyślałem o Tobie przy Vindel. Wygląda na to, że serwis już nie działa.",
    offer: ["Knowledge Ops System", "Resident Service Workflow", "Internal Process Cockpit"],
    source: "contacts.csv + messages.csv",
  },
];

const selected = contacts[0];

const tasks = contacts.map((contact) => ({
  id: contact.id.replace("cnt_", "tsk_") + "_01",
  contact: contact.name,
  title: "Wyślij wiadomość otwierającą",
  status: "todo",
  priority: contact.priority,
  owner: "Wojciech Luszczyński",
}));

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

export default function Page() {
  return (
    <main className="r-shell">
      <aside className="r-rail" aria-label="Relora navigation">
        <div className="r-brand">
          <div className="r-logo">R</div>
          <div>
            <strong>Relora</strong>
            <span>Outreach cockpit</span>
          </div>
        </div>
        <nav>
          <a href="#dashboard">Dashboard</a>
          <a href="#people">People</a>
          <a href="#person">Person detail</a>
          <a href="#brief">Research brief</a>
          <a href="#crm">CRM</a>
          <a href="#graph">Graph</a>
          <a href="#composer">Composer</a>
          <a href="#alerts">Alerts</a>
        </nav>
      </aside>

      <div className="r-workspace">
        <header className="r-header" id="dashboard">
          <div>
            <span className="r-eyebrow">Dane z paczki: contacts.csv, messages.csv, tasks.csv</span>
            <h1>Relora dla łódzkiego outreachu</h1>
            <p>
              Interfejs pokazuje realne rekordy z importu: 5 kontaktów, 5 wiadomości gotowych do
              wysyłki i 5 zadań follow-up. Public facts, user context i treść wiadomości są
              rozdzielone na poziomie widoku.
            </p>
          </div>
          <label className="r-search">
            <span>⌕</span>
            <input placeholder="Szukaj: Tomasz, Holding, AI, eventy, governance..." />
          </label>
        </header>

        <section className="r-metrics" aria-label="Import summary">
          <div><span>Kontakty</span><strong>{contacts.length}</strong><small>contacts.csv</small></div>
          <div><span>Wiadomości</span><strong>5</strong><small>ready_to_send</small></div>
          <div><span>Zadania</span><strong>{tasks.length}</strong><small>todo</small></div>
          <div><span>Etap CRM</span><strong>draft</strong><small>wszystkie rekordy</small></div>
        </section>

        <div className="r-grid">
          <Panel title="People list" eyebrow="Prawdziwe kontakty z importu">
            <div className="r-people" id="people">
              {contacts.map((person) => (
                <article className="r-person-card" key={person.id}>
                  <div className="r-card-head">
                    <div className="r-avatar">{person.initials}</div>
                    <div>
                      <h3>{person.name}</h3>
                      <p>{person.organization}</p>
                    </div>
                  </div>
                  <div className="r-badges">
                    <Badge tone="gold">{person.stage}</Badge>
                    <Badge>{person.priority}</Badge>
                    <Badge tone="teal">{person.channel}</Badge>
                  </div>
                  <p className="r-notes">{person.notes}</p>
                  <small>{person.source}</small>
                </article>
              ))}
            </div>
          </Panel>

          <Panel title="Kolejka zadań" eyebrow="tasks.csv">
            <div className="r-task-list">
              {tasks.map((task) => (
                <div className="r-task" key={task.id}>
                  <div>
                    <strong>{task.contact}</strong>
                    <span>{task.title}</span>
                  </div>
                  <Badge tone="gold">{task.status}</Badge>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <Panel title="Person detail: Tomasz Piotrowski" eyebrow="centralny rekord osoby">
          <div className="r-person-detail" id="person">
            <div className="r-identity">
              <div className="r-avatar large">{selected.initials}</div>
              <div>
                <h2>{selected.name}</h2>
                <p>{selected.organization}</p>
                <div className="r-badges">
                  <Badge tone="gold">relationship_stage: {selected.stage}</Badge>
                  <Badge>consent_status: unknown</Badge>
                  <Badge tone="teal">preferred_channel: {selected.channel}</Badge>
                </div>
              </div>
            </div>

            <div className="r-two">
              <div className="r-box">
                <span>Public facts</span>
                <ul>
                  <li>Źródła w research/paste.txt wskazują zakres: inwestycje, komunikacja, transport, wydarzenia i turystyka.</li>
                  <li>Kontakt powiązany z Urzędem Miasta Łodzi oraz miejskimi projektami eventowymi.</li>
                  <li>W wiadomości proponowane są systemy wokół eventów, komunikacji i wartości dla partnerów.</li>
                </ul>
              </div>
              <div className="r-box private">
                <span>User context</span>
                <ul>
                  <li>notes: {selected.notes}</li>
                  <li>portfolio_url: https://app.wojciech.io</li>
                  <li>booking_url: https://cal.com/wojciech-luszczynski</li>
                </ul>
              </div>
            </div>
          </div>
        </Panel>

        <div className="r-grid">
          <Panel title="Research brief" eyebrow="research/paste.txt + message body">
            <div className="r-brief" id="brief">
              <div><span>Kim jest w tym kontekście</span><p>Osoba wejścia do rozmowy o miejskich eventach, komunikacji, turystyce i operacjach.</p></div>
              <div><span>Najlepszy angle</span><p>Nie ogólny pitch AI, tylko konkretny system do zarządzania wydarzeniami i komunikacją miejską.</p></div>
              <div><span>Proponowane systemy</span><p>{selected.offer.join(", ")}.</p></div>
              <div><span>Czego unikać</span><p>Brzmienia jak masowa oferta lub obietnica znania procesów miasta od środka.</p></div>
            </div>
          </Panel>

          <Panel title="CRM board" eyebrow="relationship_stage">
            <div className="r-crm" id="crm">
              <div className="r-stage active">
                <header><strong>draft</strong><span>5</span></header>
                {contacts.map((contact) => (
                  <article key={contact.id}>
                    <strong>{contact.name}</strong>
                    <p>{contact.subject}</p>
                  </article>
                ))}
              </div>
              {["contacted", "replied", "meeting", "proposal", "won", "lost"].map((stage) => (
                <div className="r-stage" key={stage}>
                  <header><strong>{stage}</strong><span>0</span></header>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <Panel title="Relationship graph" eyebrow="osoby, organizacje, tematy" >
          <div className="r-graph" id="graph">
            <div className="r-graph-group">
              <h3>Urząd Miasta Łodzi</h3>
              <p>Tomasz Piotrowski, Adam Pustelnik, Wojciech Rosicki</p>
              <div className="r-topic-row">
                <Badge>eventy miejskie</Badge>
                <Badge>inwestorzy</Badge>
                <Badge>obsługa mieszkańców</Badge>
              </div>
            </div>
            <div className="r-graph-group">
              <h3>Łódzki Holding / projekty miejskie</h3>
              <p>Łukasz Goss</p>
              <div className="r-topic-row">
                <Badge>governance</Badge>
                <Badge>przejrzystość danych</Badge>
              </div>
            </div>
            <div className="r-graph-group">
              <h3>Sejm RP</h3>
              <p>Paweł Bliźniuk</p>
              <div className="r-topic-row">
                <Badge>AI</Badge>
                <Badge>cyberbezpieczeństwo</Badge>
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Message composer" eyebrow="messages.csv">
          <div className="r-composer" id="composer">
            <div className="r-draft">
              <label>
                Kontakt
                <input defaultValue={selected.name} />
              </label>
              <label>
                Temat
                <input defaultValue={selected.subject} />
              </label>
              <label>
                Fragment wiadomości źródłowej
                <textarea defaultValue={selected.message} />
              </label>
            </div>
            <div className="r-preview">
              <span>Preview przed wysyłką przez Resend</span>
              <h3>{selected.subject}</h3>
              <p>{selected.message}</p>
              <div className="r-preview-actions">
                <Badge tone="gold">message_status: ready_to_send</Badge>
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
              Paczka zawiera contacts, messages i tasks. Alerty pojawią się po webhookach Resend:
              email.sent, email.delivered, email.opened, email.clicked, email.replied, email.bounced
              albo email.failed.
            </p>
          </div>
        </Panel>
      </div>
    </main>
  );
}
