export type Contact = {
  id: string;
  initials: string;
  name: string;
  organization: string;
  stage: string;
  priority: string;
  channel: string;
  tags: string[];
  notes: string;
  subject: string;
  message: string;
  ctaUrl: string;
  portfolioUrl: string;
  bookingUrl: string;
  taskId: string;
  source: string;
};

export const contacts: Contact[] = [
  {
    id: "cnt_tomasz-piotrowski",
    initials: "TP",
    name: "Tomasz Piotrowski",
    organization: "Urząd Miasta Łodzi",
    stage: "draft",
    priority: "medium",
    channel: "email",
    tags: ["eventy miejskie", "komunikacja", "turystyka", "operacje miejskie"],
    notes: "Eventy miejskie, komunikacja, turystyka, operacje miejskie",
    subject: "Kilka konkretnych pomysłów dla Łodzi",
    message:
      "Cześć Tomek,\nwiem, że masz dziś na głowie ogromny zakres: inwestycje, komunikację, transport, duże wydarzenia, turystykę i współpracę ze spółkami. Przy tej skali mam poczucie, że można dołożyć warstwę technologii, która realnie pomaga zarządzać informacją, procesami i efektem tych działań.\n\nWidzę kilka gotowych kierunków: Łódź Event Intelligence Platform, EventOps Command Center, AI City Communication Hub oraz Sponsor & Partner Value Dashboard.",
    ctaUrl: "https://cal.com/wojciech-luszczynski",
    portfolioUrl: "https://app.wojciech.io",
    bookingUrl: "https://cal.com/wojciech-luszczynski",
    taskId: "tsk_tomasz-piotrowski_01",
    source: "contacts.csv + messages.csv + tasks.csv",
  },
  {
    id: "cnt_lukasz-goss",
    initials: "ŁG",
    name: "Łukasz Goss",
    organization: "Łódzki Holding / projekty miejskie",
    stage: "draft",
    priority: "medium",
    channel: "email",
    tags: ["holding", "spółki", "przejrzystość danych", "governance"],
    notes: "Holding, spółki, przejrzystość danych, governance",
    subject: "Technologia, która porządkuje fakty zanim zacznie się kryzys",
    message:
      "Cześć Łukasz,\npiszę, bo patrząc z boku na skalę tego, co dzieje się wokół Łodzi, Holdingu, Orientarium, ŁOT i dużych miejskich projektów, widzę jednocześnie ogromny potencjał i coraz większą potrzebę porządkowania danych, komunikacji, decyzji i ryzyk.\n\nWidzę tu kierunki: Transparency & Control Cockpit, Public Value Dashboard, Issue Radar + Playbook, Resident & Stakeholder Impact Panel oraz Governance Cockpit dla Holdingu.",
    ctaUrl: "https://cal.com/wojciech-luszczynski",
    portfolioUrl: "https://app.wojciech.io",
    bookingUrl: "https://cal.com/wojciech-luszczynski",
    taskId: "tsk_lukasz-goss_01",
    source: "contacts.csv + messages.csv + tasks.csv",
  },
  {
    id: "cnt_adam-pustelnik",
    initials: "AP",
    name: "Adam Pustelnik",
    organization: "Urząd Miasta Łodzi",
    stage: "draft",
    priority: "medium",
    channel: "email",
    tags: ["inwestorzy", "nieruchomości", "rozwój gospodarczy"],
    notes: "Inwestorzy, nieruchomości, rozwój gospodarczy",
    subject: "Kilka pomysłów wokół inwestorów i danych",
    message:
      "Cześć Adam,\ndawno się nie odzywałem, ale mam konkretny temat. Przez ostatnie lata mocno przeszedłem z marketingu i growthu w budowanie narzędzi: aplikacji, dashboardów, workflow, integracji API, automatyzacji i rozwiązań z AI. Przy Twoim zakresie, czyli rozwoju gospodarczym, inwestorach i danych, widzę kilka praktycznych kierunków.",
    ctaUrl: "https://cal.com/wojciech-luszczynski",
    portfolioUrl: "https://app.wojciech.io",
    bookingUrl: "https://cal.com/wojciech-luszczynski",
    taskId: "tsk_adam-pustelnik_01",
    source: "contacts.csv + messages.csv + tasks.csv",
  },
  {
    id: "cnt_pawel-blizniuk",
    initials: "PB",
    name: "Paweł Bliźniuk",
    organization: "Sejm RP",
    stage: "draft",
    priority: "medium",
    channel: "email",
    tags: ["cyfryzacja", "AI", "cyberbezpieczeństwo", "sprawy publiczne"],
    notes: "Cyfryzacja, AI, cyberbezpieczeństwo, sprawy publiczne",
    subject: "Kilka pomysłów pod Twoje obecne tematy",
    message:
      "Cześć Paweł,\nkopę lat się nie słyszeliśmy. Bardzo Ci gratuluję miejsca, w którym dziś jesteś: Sejm X kadencji, mandat z Łodzi, cyfryzacja, AI, cyberbezpieczeństwo, sprawy publiczne. Mam kilka konkretnych pomysłów na narzędzia, które mogłyby pomagać w tych obszarach.",
    ctaUrl: "https://cal.com/wojciech-luszczynski",
    portfolioUrl: "https://app.wojciech.io",
    bookingUrl: "https://cal.com/wojciech-luszczynski",
    taskId: "tsk_pawel-blizniuk_01",
    source: "contacts.csv + messages.csv + tasks.csv",
  },
  {
    id: "cnt_wojciech-rosicki",
    initials: "WR",
    name: "Wojciech Rosicki",
    organization: "Urząd Miasta Łodzi",
    stage: "draft",
    priority: "medium",
    channel: "email",
    tags: ["procesy urzędu", "wiedza organizacyjna", "obsługa mieszkańców"],
    notes: "Procesy urzędu, wiedza organizacyjna, obsługa mieszkańców",
    subject: "Procesy, wiedza i technologia w praktyce",
    message:
      "Cześć Wojtek,\ndawno się nie odzywałem, ale ostatnio pomyślałem o Tobie przy Vindel. Wygląda na to, że serwis już nie działa. Pamiętam, że kiedyś przy nim pomagałem, więc jeśli temat jest dla Ciebie nadal ciekawy, chętnie pomogę go przywrócić albo przemyśleć od nowa. Widzę też szerszy temat procesów, wiedzy organizacyjnej i obsługi mieszkańców.",
    ctaUrl: "https://cal.com/wojciech-luszczynski",
    portfolioUrl: "https://app.wojciech.io",
    bookingUrl: "https://cal.com/wojciech-luszczynski",
    taskId: "tsk_wojciech-rosicki_01",
    source: "contacts.csv + messages.csv + tasks.csv",
  },
];

export const organizations = [
  { id: "org_uml", name: "Urząd Miasta Łodzi", type: "institution" },
  { id: "org_holding", name: "Łódzki Holding / projekty miejskie", type: "organization" },
  { id: "org_sejm", name: "Sejm RP", type: "institution" },
];

export const topics = [
  "eventy miejskie",
  "komunikacja",
  "turystyka",
  "operacje miejskie",
  "governance",
  "przejrzystość danych",
  "inwestorzy",
  "cyfryzacja",
  "AI",
  "cyberbezpieczeństwo",
  "obsługa mieszkańców",
];

export const graphEdges = [
  { from: "cnt_tomasz-piotrowski", to: "org_uml", label: "organization" },
  { from: "cnt_adam-pustelnik", to: "org_uml", label: "organization" },
  { from: "cnt_wojciech-rosicki", to: "org_uml", label: "organization" },
  { from: "cnt_lukasz-goss", to: "org_holding", label: "organization" },
  { from: "cnt_pawel-blizniuk", to: "org_sejm", label: "organization" },
  { from: "cnt_tomasz-piotrowski", to: "topic_eventy-miejskie", label: "topic" },
  { from: "cnt_tomasz-piotrowski", to: "topic_komunikacja", label: "topic" },
  { from: "cnt_lukasz-goss", to: "topic_governance", label: "topic" },
  { from: "cnt_adam-pustelnik", to: "topic_inwestorzy", label: "topic" },
  { from: "cnt_pawel-blizniuk", to: "topic_AI", label: "topic" },
  { from: "cnt_wojciech-rosicki", to: "topic_obsługa-mieszkańców", label: "topic" },
];
