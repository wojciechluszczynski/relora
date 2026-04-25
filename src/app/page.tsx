const people = [
  {
    initials: "JL",
    name: "Julia Lewandowska",
    role: "Zastępczyni prezydenta ds. cyfryzacji",
    organization: "Urząd Miasta Wrocławia",
    stage: "Po kontakcie",
    priority: "wysoki",
    confidence: 86,
    next: "Sprawdzić kontekst konsultacji społecznych i zatwierdzić krótką wiadomość.",
    publicFacts: ["odpowiada za cyfrowe usługi mieszkańca", "występuje na panelach smart city"],
    userContext: ["rozmowa po konferencji GovTech", "unikać tonu sprzedażowego"],
  },
  {
    initials: "AK",
    name: "Anna Kowalska",
    role: "Head of Partnerships",
    organization: "Example Ventures",
    stage: "Ciepła relacja",
    priority: "średni",
    confidence: 82,
    next: "Wysłać forward-proof mail o mapowaniu partnerstw dla spółek portfelowych.",
    publicFacts: ["prowadzi partnerstwa funduszu", "komunikuje się językiem growth i ekosystemu"],
    userContext: ["krótka rozmowa po panelu growth", "lubi konkretny przykład przed spotkaniem"],
  },
  {
    initials: "MN",
    name: "Marek Nowak",
    role: "Founder",
    organization: "SaaS Forge",
    stage: "Research",
    priority: "średni",
    confidence: 68,
    next: "Dokończyć brief i przygotować audyt positioning + demand generation.",
    publicFacts: ["buduje narzędzie B2B", "aktywnie publikuje o sprzedaży founderskiej"],
    userContext: ["brak relacji bezpośredniej", "najbezpieczniej zacząć od krótkiego audytu"],
  },
];

const stages = [
  ["Nowe", 4],
  ["Research", 7],
  ["Ciepła relacja", 9],
  ["Po kontakcie", 6],
  ["Odpisał/a", 2],
  ["Rozmowa", 3],
  ["Oferta wysłana", 2],
  ["Czekamy", 5],
];

const crmCards = [
  { stage: "Research", name: "Marek Nowak", meta: "Founder SaaS, brak relacji", action: "brief do dokończenia" },
  { stage: "Ciepła relacja", name: "Anna Kowalska", meta: "Example Ventures", action: "mail short do akceptacji" },
  { stage: "Po kontakcie", name: "Julia Lewandowska", meta: "Urząd miasta, cyfryzacja", action: "follow-up po otwarciu" },
  { stage: "Odpisał/a", name: "Tomasz Urban", meta: "Public affairs", action: "odpisać dziś do 16:00" },
  { stage: "Oferta wysłana", name: "Katarzyna Bień", meta: "Instytucja kultury", action: "czekać 3 dni" },
];

const alerts = [
  {
    tone: "critical",
    title: "Tomasz Urban odpisał na wiadomość",
    body: "Webhook Resend oznaczył email.replied, CRM przesunięty na Odpisał/a, utworzono zadanie odpowiedzi.",
    time: "2 min temu",
  },
  {
    tone: "warning",
    title: "Bounce na alias urzędu miasta",
    body: "Dostarczenie nie powiodło się. Relora podniosła alert i zablokowała follow-up do korekty adresu.",
    time: "18 min temu",
  },
  {
    tone: "ok",
    title: "Anna otworzyła mail partnerstwowy",
    body: "Warmth score +1. Follow-up jest gotowy, ale czeka na ręczną akceptację podglądu.",
    time: "41 min temu",
  },
];

function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "teal" | "gold" | "wine" | "green";
}) {
  return <span className={`v2-badge ${tone}`}>{children}</span>;
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="v2-section" id={id}>
      <div className="v2-section-title">
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function Page() {
  return (
    <div className="v2-app">
      <aside className="v2-sidebar">
        <div className="v2-brand">
          <div className="v2-mark">R</div>
          <div>
            <strong>Relora</strong>
            <span>people intelligence CRM</span>
          </div>
        </div>
        <nav className="v2-nav" aria-label="Nawigacja Relora">
          <a href="#kokpit" className="active">Kokpit</a>
          <a href="#osoby">Osoby</a>
          <a href="#karta">Karta osoby</a>
          <a href="#brief">Research brief</a>
          <a href="#crm">CRM</a>
          <a href="#graf">Graf relacji</a>
          <a href="#wiadomosc">Composer</a>
          <a href="#alerty">Alerty</a>
        </nav>
        <div className="v2-sidebar-card">
          <span>Tryb danych</span>
          <strong>Public facts oddzielone od user context</strong>
          <p>Każdy insight ma source albo etykietę user_provided.</p>
        </div>
      </aside>

      <main className="v2-main">
        <header className="v2-topbar">
          <div>
            <span className="v2-kicker">Workspace: Relacje strategiczne</span>
            <h1>Kokpit relacji, researchu i wiadomości</h1>
          </div>
          <label className="v2-search">
            <span>⌕</span>
            <input placeholder="Szukaj osoby, instytucji, notatki, źródła albo wiadomości" />
            <kbd>⌘K</kbd>
          </label>
          <button className="v2-button primary">Dodaj kontekst</button>
        </header>

        <div className="v2-content">
          <section className="v2-command" id="kokpit">
            <div className="v2-command-main">
              <div className="v2-command-head">
                <div>
                  <span className="v2-kicker">Najważniejsza decyzja dziś</span>
                  <h2>Julia Lewandowska: wysłać bezpieczny follow-up o usługach mieszkańca?</h2>
                </div>
                <Badge tone="gold">wymaga akceptacji</Badge>
              </div>
              <div className="v2-decision-grid">
                <div>
                  <span>Najlepszy angle</span>
                  <strong>Nie „sprzedajemy AI”, tylko pokazujemy system skracający obsługę spraw mieszkańców.</strong>
                </div>
                <div>
                  <span>Ryzyko</span>
                  <strong>Średnie. Wiadomość może zostać przesłana dalej, więc bez prywatnych sugestii i aluzji politycznych.</strong>
                </div>
                <div>
                  <span>Następny krok</span>
                  <strong>Zatwierdzić podgląd maila short form albo odłożyć na alert po konferencji.</strong>
                </div>
              </div>
            </div>
            <aside className="v2-live-panel">
              <span className="v2-kicker">Realtime Supabase</span>
              <div className="v2-live-row"><b>notes</b><span>3 nowe</span></div>
              <div className="v2-live-row"><b>messages</b><span>14 draftów</span></div>
              <div className="v2-live-row"><b>alerts</b><span>3 pilne</span></div>
              <div className="v2-live-row"><b>crm_records</b><span>2 zmiany</span></div>
            </aside>
          </section>

          <div className="v2-metrics">
            <div><span>Osoby w bazie</span><strong>248</strong><small>39 z pełnym briefem</small></div>
            <div><span>Wiadomości do akceptacji</span><strong>14</strong><small>0 wysyłek automatycznych</small></div>
            <div><span>Relacje ciepłe</span><strong>62</strong><small>z historią kontaktu</small></div>
            <div><span>Alerty krytyczne</span><strong>3</strong><small>reply, bounce, deadline</small></div>
          </div>

          <Section id="osoby" eyebrow="People list" title="Lista osób z kontekstem, nie zwykła książka adresowa">
            <div className="v2-people">
              {people.map((person) => (
                <article className="v2-person" key={person.name}>
                  <div className="v2-person-head">
                    <div className="v2-avatar">{person.initials}</div>
                    <div>
                      <h3>{person.name}</h3>
                      <p>{person.role} · {person.organization}</p>
                    </div>
                    <Badge tone={person.priority === "wysoki" ? "wine" : "gold"}>{person.priority}</Badge>
                  </div>
                  <div className="v2-person-meta">
                    <Badge tone="teal">{person.stage}</Badge>
                    <Badge>{person.confidence}% confidence</Badge>
                  </div>
                  <p className="v2-next">{person.next}</p>
                  <div className="v2-split-mini">
                    <div>
                      <b>Public facts</b>
                      {person.publicFacts.map((item) => <span key={item}>{item}</span>)}
                    </div>
                    <div>
                      <b>User context</b>
                      {person.userContext.map((item) => <span key={item}>{item}</span>)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <Section id="karta" eyebrow="Person detail" title="Karta osoby jako centralny artefakt">
            <div className="v2-detail-grid">
              <article className="v2-profile">
                <div className="v2-profile-head">
                  <div className="v2-avatar large">JL</div>
                  <div>
                    <span className="v2-kicker">aktywny rekord</span>
                    <h2>Julia Lewandowska</h2>
                    <p>Zastępczyni prezydenta ds. cyfryzacji, Urząd Miasta Wrocławia</p>
                    <div className="v2-person-meta">
                      <Badge tone="teal">Po kontakcie</Badge>
                      <Badge tone="gold">forward-proof</Badge>
                      <Badge>source coverage 86%</Badge>
                    </div>
                  </div>
                </div>
                <div className="v2-two-columns">
                  <div className="v2-factbox">
                    <h3>Public facts</h3>
                    <ul>
                      <li>Publiczna odpowiedzialność: cyfrowe usługi mieszkańca i modernizacja procesów.</li>
                      <li>Źródło: strona urzędu, agenda panelu GovTech, wzmianki konferencyjne.</li>
                      <li>Potencjalna potrzeba: uporządkowanie spraw, konsultacji i komunikacji z mieszkańcami.</li>
                    </ul>
                  </div>
                  <div className="v2-factbox private">
                    <h3>User context</h3>
                    <ul>
                      <li>user_provided: krótka rozmowa po konferencji, pozytywna reakcja na konkretne przykłady.</li>
                      <li>Notatka prywatna: unikać politycznego tonu i obietnic „automatyzacji wszystkiego”.</li>
                      <li>Preferowany CTA: pokazanie jednego procesu, nie pełna prezentacja sprzedażowa.</li>
                    </ul>
                  </div>
                </div>
              </article>
              <aside className="v2-timeline">
                <h3>Timeline</h3>
                <div><time>Dziś 12:40</time><strong>Wygenerowano wariant email short</strong><p>Czeka na preview i ręczną akceptację.</p></div>
                <div><time>Wczoraj</time><strong>Dodano źródło publiczne</strong><p>Agenda konferencji GovTech zwiększyła confidence.</p></div>
                <div><time>18 kwi</time><strong>Interakcja po panelu</strong><p>Notatka użytkownika oznaczona jako user_provided.</p></div>
              </aside>
            </div>
          </Section>

          <Section id="brief" eyebrow="Research brief" title="Brief badawczy, który prowadzi do decyzji">
            <div className="v2-brief-grid">
              <div><span>Kim jest dziś</span><p>Osoba odpowiedzialna za cyfrowe procesy publiczne i jakość obsługi mieszkańców.</p></div>
              <div><span>Jak mówi publicznie</span><p>Język: sprawność urzędu, dostępność usług, mierzalne usprawnienia, bezpieczeństwo.</p></div>
              <div><span>Możliwa potrzeba</span><p>System do mapowania spraw, interesariuszy, statusów i follow-upów między wydziałami.</p></div>
              <div><span>Najlepszy angle</span><p>Pokazać mały pilotaż: jedna kategoria spraw, jeden dashboard, jasny raport efektów.</p></div>
              <div><span>Czego unikać</span><p>Brzmienia jak masowy cold mail, obietnic AI, prywatnych sugestii i tonu politycznego.</p></div>
              <div><span>Kanał pierwszy</span><p>Email short form, potem follow-up po otwarciu lub kliknięciu, wszystko przez preview.</p></div>
            </div>
          </Section>

          <Section id="crm" eyebrow="CRM board" title="Pipeline relacji z następnym krokiem">
            <div className="v2-crm">
              {stages.map(([stage, count]) => (
                <div className="v2-stage" key={stage}>
                  <header><strong>{stage}</strong><span>{count}</span></header>
                  {crmCards.filter((card) => card.stage === stage).map((card) => (
                    <article key={card.name}>
                      <b>{card.name}</b>
                      <p>{card.meta}</p>
                      <small>{card.action}</small>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </Section>

          <Section id="graf" eyebrow="Relationship graph" title="Mapa powiązań osób, instytucji i tematów">
            <div className="v2-graph">
              <div className="v2-edge e1" />
              <div className="v2-edge e2" />
              <div className="v2-edge e3" />
              <div className="v2-node n1"><b>Julia Lewandowska</b><span>person</span></div>
              <div className="v2-node n2"><b>Urząd miasta</b><span>institution</span></div>
              <div className="v2-node n3"><b>Usługi mieszkańca</b><span>topic</span></div>
              <div className="v2-node n4"><b>Email short 04</b><span>message</span></div>
              <div className="v2-node n5"><b>Konferencja GovTech</b><span>interaction</span></div>
            </div>
          </Section>

          <Section id="wiadomosc" eyebrow="Message composer" title="Wiadomość nie wychodzi bez podglądu">
            <div className="v2-composer">
              <aside>
                <h3>Playbook</h3>
                <Badge tone="teal">email short</Badge>
                <Badge>email long</Badge>
                <Badge>LinkedIn DM</Badge>
                <Badge>SMS</Badge>
                <Badge>follow-up 1</Badge>
                <div className="v2-policy">
                  <strong>Reguła wysyłki</strong>
                  <p>draft / preview / approved / Resend. Brak automatycznej wysyłki.</p>
                </div>
              </aside>
              <div className="v2-draft">
                <label>Temat<input defaultValue="Krótki pilotaż dla cyfrowej obsługi mieszkańców" /></label>
                <label>Treść<textarea defaultValue={`Pani Julio,\n\npo panelu GovTech zostałem z jedną myślą: w cyfryzacji urzędu najwięcej wartości daje nie kolejny formularz, tylko jasny system obsługi spraw i follow-upów między zespołami.\n\nPrzygotowałem krótki przykład pilotażu dla jednej kategorii spraw mieszkańców: statusy, osoby odpowiedzialne, historia kontaktu i alerty, bez ryzyka automatycznej komunikacji bez akceptacji.\n\nJeżeli to użyteczne, mogę podesłać 2-minutowy podgląd albo pokazać konkretny workflow.`} /></label>
              </div>
              <div className="v2-preview">
                <span className="v2-kicker">Preview przed Resend</span>
                <h3>Krótki pilotaż dla cyfrowej obsługi mieszkańców</h3>
                <p>Pani Julio,</p>
                <p>po panelu GovTech zostałem z jedną myślą: w cyfryzacji urzędu najwięcej wartości daje nie kolejny formularz, tylko jasny system obsługi spraw i follow-upów między zespołami.</p>
                <p>Przygotowałem krótki przykład pilotażu dla jednej kategorii spraw mieszkańców: statusy, osoby odpowiedzialne, historia kontaktu i alerty, bez ryzyka automatycznej komunikacji bez akceptacji.</p>
                <div className="v2-approval">
                  <Badge tone="gold">approval_status: draft</Badge>
                  <button className="v2-button">Zapisz</button>
                  <button className="v2-button primary">Zatwierdź podgląd</button>
                </div>
              </div>
            </div>
          </Section>

          <Section id="alerty" eyebrow="Alerts center" title="Alerty z Resend i Supabase Realtime">
            <div className="v2-alerts">
              {alerts.map((alert) => (
                <article className={`v2-alert ${alert.tone}`} key={alert.title}>
                  <span />
                  <div><strong>{alert.title}</strong><p>{alert.body}</p></div>
                  <time>{alert.time}</time>
                </article>
              ))}
            </div>
          </Section>
        </div>
      </main>
    </div>
  );
}
