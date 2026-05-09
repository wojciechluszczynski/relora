export type Contact = {
  id: string;
  initials: string;
  name: string;
  organization: string;
  stage: string;
  communicationStatus: "context" | "draft" | "sent" | "reply" | "followup";
  lastContactAt: string;
  nextStep: string;
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

export type Organization = {
  id: string;
  name: string;
  type: string;
  logoUrl: string;
  imageUrl: string;
  websiteUrl: string;
  assetSourceUrl: string;
  assetCredit: string;
};

const lodzLogoUrl = "https://upload.wikimedia.org/wikipedia/commons/2/22/Logo_of_%C5%81%C3%B3d%C5%BA_05.svg";
const lodzCityHallUrl = "https://upload.wikimedia.org/wikipedia/commons/8/88/UM_Lodz.jpg";

export const contacts: Contact[] = [
  {
    id: "cnt_marta-nowak",
    initials: "MN",
    name: "Marta Nowak",
    organization: "Miasto Łódź",
    stage: "reply",
    communicationStatus: "reply",
    lastContactAt: "2026-04-26 14:20",
    nextStep: "Odpowiedzieć na pytanie o raporty właścicielskie i dopisać przykład SLA.",
    priority: "high",
    channel: "email",
    tags: ["apartamenty premium", "właściciele", "utrzymanie", "raporty miesięczne"],
    notes: "Demo: zarządza portfelem apartamentów premium i potrzebuje szybkiego widoku właścicieli, zgłoszeń oraz statusów płatności.",
    subject: "Szybszy przegląd portfela i zgłoszeń właścicieli",
    message:
      "Dzień dobry Marta,\nprzy portfelu premium najwięcej czasu znika zwykle na łączeniu informacji: właściciel, lokal, zgłoszenie, wykonawca, płatność i kolejny krok. Relora spina to w jeden widok operacyjny.\n\nProponuję krótki przepływ: wybór właściciela, dopisanie kontekstu, przygotowanie wiadomości i ręczna akceptacja przed wysyłką.",
    ctaUrl: "https://relora.example/demo",
    portfolioUrl: "https://relora.example/properties",
    bookingUrl: "https://relora.example/calendar",
    taskId: "demo-task-001",
    source: "Demo dataset + public sources",
  },
  {
    id: "cnt_jakub-zielinski",
    initials: "JZ",
    name: "Jakub Zieliński",
    organization: "Invest in Łódź",
    stage: "sent",
    communicationStatus: "sent",
    lastContactAt: "2026-04-25 09:10",
    nextStep: "Sprawdzić, czy wiadomość została otwarta i przygotować follow-up na jutro.",
    priority: "medium",
    channel: "email",
    tags: ["najem długoterminowy", "SLA", "komunikacja", "zgłoszenia"],
    notes: "Demo: odpowiada za najem długoterminowy i chce ograniczyć chaos między e-mailami, telefonami i ticketami.",
    subject: "Jedna kolejka zgłoszeń zamiast rozproszonej komunikacji",
    message:
      "Dzień dobry Jakub,\nRelora porządkuje kontakt z najemcami i właścicielami w jednym CRM: zgłoszenia, kontekst relacji, historia decyzji i wersje wiadomości do akceptacji.\n\nNajlepszy pierwszy krok to demo na 5 przykładowych lokalach i dwóch typach zgłoszeń: awaria oraz opóźniona płatność.",
    ctaUrl: "https://relora.example/demo",
    portfolioUrl: "https://relora.example/properties",
    bookingUrl: "https://relora.example/calendar",
    taskId: "demo-task-002",
    source: "Demo dataset + public sources",
  },
  {
    id: "cnt_ewa-wisniewska",
    initials: "EW",
    name: "Ewa Wiśniewska",
    organization: "Łódź Travel",
    stage: "draft",
    communicationStatus: "draft",
    lastContactAt: "2026-04-24 16:40",
    nextStep: "Uzupełnić kontekst check-in i zatwierdzić wiadomość.",
    priority: "medium",
    channel: "email",
    tags: ["najem wakacyjny", "check-in", "automatyzacja", "opinie"],
    notes: "Demo: prowadzi najem krótkoterminowy i potrzebuje lepszej kontroli nad check-in, sprzątaniem oraz opiniami gości.",
    subject: "Automatyzacja kontaktu z gośćmi i ekipą operacyjną",
    message:
      "Dzień dobry Ewa,\nprzy najmie krótkoterminowym Relora może działać jak cockpit: status lokalu, najbliższy check-in, zgłoszenia, zadania dla ekipy i gotowe wiadomości do zatwierdzenia.\n\nW demo pokażę prosty scenariusz: gość zgłasza problem, system dopisuje kontekst i przygotowuje odpowiedź.",
    ctaUrl: "https://relora.example/demo",
    portfolioUrl: "https://relora.example/properties",
    bookingUrl: "https://relora.example/calendar",
    taskId: "demo-task-003",
    source: "Demo dataset + public sources",
  },
  {
    id: "cnt_piotr-kaminski",
    initials: "PK",
    name: "Piotr Kamiński",
    organization: "Zarząd Lokali Miejskich",
    stage: "followup",
    communicationStatus: "followup",
    lastContactAt: "2026-04-22 11:30",
    nextStep: "Wysłać follow-up z linkiem do widoku relacji i źródeł publicznych.",
    priority: "low",
    channel: "email",
    tags: ["inwestorzy", "raportowanie", "portfel", "decyzje"],
    notes: "Demo: pracuje z inwestorami i potrzebuje jasnego widoku relacji, nieruchomości oraz tematów wymagających reakcji.",
    subject: "Mapa relacji inwestorów i lokali w jednym widoku",
    message:
      "Dzień dobry Piotr,\nRelora pozwala zobaczyć, kto jest powiązany z którą nieruchomością, jaki temat jest aktywny i jaka wiadomość czeka na akceptację.\n\nTo powinno skrócić czas przygotowania follow-upów i raportów dla inwestorów.",
    ctaUrl: "https://relora.example/demo",
    portfolioUrl: "https://relora.example/properties",
    bookingUrl: "https://relora.example/calendar",
    taskId: "demo-task-004",
    source: "Demo dataset + public sources",
  },
  {
    id: "cnt_anna-lewandowska",
    initials: "AL",
    name: "Anna Lewandowska",
    organization: "Miasto Łódź",
    stage: "context",
    communicationStatus: "context",
    lastContactAt: "brak wysyłki",
    nextStep: "Dopisać kontekst właściciela przed przygotowaniem wiadomości.",
    priority: "medium",
    channel: "email",
    tags: ["obsługa właścicieli", "umowy", "zadania", "akceptacja"],
    notes: "Demo: koordynuje właścicieli, umowy i zadania operacyjne; potrzebuje łatwego dopisywania kontekstu przed wysyłką.",
    subject: "Kontekst właściciela przed każdą wiadomością",
    message:
      "Dzień dobry Anna,\nRelora może działać jako bezpieczna warstwa przed wysyłką: użytkownik dopisuje kontekst, system układa brief i wiadomość, a wysyłka wymaga ręcznej akceptacji.\n\nW demo możesz przejść cały przepływ bez logowania i bez prawdziwych danych.",
    ctaUrl: "https://relora.example/demo",
    portfolioUrl: "https://relora.example/properties",
    bookingUrl: "https://relora.example/calendar",
    taskId: "demo-task-005",
    source: "Demo dataset + public sources",
  },
];

export const organizations: Organization[] = [
  {
    id: "org_lodz",
    name: "Miasto Łódź",
    type: "city",
    logoUrl: lodzLogoUrl,
    imageUrl: lodzCityHallUrl,
    websiteUrl: "https://uml.lodz.pl/",
    assetSourceUrl: "https://commons.wikimedia.org/wiki/File:Logo_of_%C5%81%C3%B3d%C5%BA_05.svg",
    assetCredit: "Logo: City of Lodz / Wikimedia Commons",
  },
  {
    id: "org_invest_lodz",
    name: "Invest in Łódź",
    type: "economic_development",
    logoUrl: "https://invest.lodz.pl/typo3conf/ext/invest_in_lodz/Resources/Public/Images/logos/invest_poziom.jpg",
    imageUrl: "https://invest.lodz.pl/files/public/_processed_/6/5/csm_Ul._Piotrkowska_Plac_Wolnosci_ul._Legionow_dron_fotZydowicz_28-03-24__2__7d9cad9a5c.jpg",
    websiteUrl: "https://invest.lodz.pl/",
    assetSourceUrl: "https://invest.lodz.pl/",
    assetCredit: "Logo/photo: official Invest in Łódź website",
  },
  {
    id: "org_lodz_travel",
    name: "Łódź Travel",
    type: "tourism",
    logoUrl: "https://lodz.travel/typo3conf/ext/uml_portal/Resources/Public/Images/logos/logo-travel_lodz.png",
    imageUrl: "https://lodz.travel/files/public/_processed_/5/7/csm_1920x720_ENG-min_bec97f4071.jpg",
    websiteUrl: "https://lodz.travel/en/",
    assetSourceUrl: "https://lodz.travel/en/",
    assetCredit: "Logo/photo: official Łódź Travel website",
  },
  {
    id: "org_zlm",
    name: "Zarząd Lokali Miejskich",
    type: "municipal_property",
    logoUrl: "https://zlm.lodz.pl/files/zlm/public/logo-ZLM.png",
    imageUrl: "https://zlm.lodz.pl/files/public/_processed_/6/7/csm_1_kamienica_i_kwiaty_a30c7edf3b.jpg",
    websiteUrl: "https://zlm.lodz.pl/",
    assetSourceUrl: "https://zlm.lodz.pl/",
    assetCredit: "Logo/photo: official ZLM website",
  },
];

export const topics = ["utrzymanie", "SLA", "raporty miesięczne", "check-in", "inwestorzy", "właściciele", "umowy", "akceptacja"];

export const graphEdges = [
  { from: "cnt_marta-nowak", to: "org_lodz", label: "organization" },
  { from: "cnt_jakub-zielinski", to: "org_invest_lodz", label: "organization" },
  { from: "cnt_ewa-wisniewska", to: "org_lodz_travel", label: "organization" },
  { from: "cnt_piotr-kaminski", to: "org_zlm", label: "organization" },
  { from: "cnt_anna-lewandowska", to: "org_lodz", label: "organization" },
  { from: "cnt_marta-nowak", to: "topic_utrzymanie", label: "topic" },
  { from: "cnt_marta-nowak", to: "topic_raporty", label: "topic" },
  { from: "cnt_jakub-zielinski", to: "topic_sla", label: "topic" },
  { from: "cnt_ewa-wisniewska", to: "topic_checkin", label: "topic" },
  { from: "cnt_piotr-kaminski", to: "topic_inwestorzy", label: "topic" },
  { from: "cnt_anna-lewandowska", to: "topic_umowy", label: "topic" },
];
