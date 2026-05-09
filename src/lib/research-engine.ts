import { contacts, graphEdges, type Contact } from "./relora-data";

export type ResearchBrief = {
  contactId: string;
  generatedAt: string;
  confidence: number;
  publicFacts: string[];
  userContext: string[];
  possibleNeeds: string[];
  suggestedAngle: string;
  suggestedSystems: string[];
  riskNotes: string[];
  bestChannel: string;
  sources: string[];
  relatedEdges: typeof graphEdges;
};

function systemsFor(contact: Contact) {
  const text = `${contact.notes} ${contact.message}`.toLowerCase();
  if (text.includes("zgłosz") || text.includes("utrzymanie") || text.includes("awaria")) {
    return ["Maintenance Request Cockpit", "Owner Update Queue", "Vendor Follow-up Tracker"];
  }
  if (text.includes("check-in") || text.includes("wakacyj")) {
    return ["Guest Ops Timeline", "Cleaning Handoff Board", "Review Recovery Workflow"];
  }
  if (text.includes("inwestor")) {
    return ["Investor Relation Map", "Portfolio Reporting Desk", "Decision Follow-up System"];
  }
  if (text.includes("umow") || text.includes("właściciel")) {
    return ["Owner Context Timeline", "Contract Renewal Queue", "Message Approval Desk"];
  }
  return ["Property CRM Workspace", "Relationship Context Map", "Manual Approval Inbox"];
}

export function runResearch(contactId: string): ResearchBrief {
  const contact = contacts.find((item) => item.id === contactId) ?? contacts[0];
  const relatedEdges = graphEdges.filter((edge) => edge.from === contact.id || edge.to === contact.id);
  const systems = systemsFor(contact);

  return {
    contactId: contact.id,
    generatedAt: new Date().toISOString(),
    confidence: Math.min(92, 64 + contact.tags.length * 5 + relatedEdges.length * 3),
    publicFacts: [
      `Organizacja: ${contact.organization}.`,
      `Etap CRM w demo: ${contact.stage}.`,
      `Tematy z rekordu: ${contact.tags.join(", ")}.`,
      `Wiadomość źródłowa ma temat: "${contact.subject}".`,
    ],
    userContext: [
      `Notatka użytkownika: ${contact.notes}.`,
      `Portfolio: ${contact.portfolioUrl}.`,
      `Booking: ${contact.bookingUrl}.`,
      "Kontekst pochodzi z fikcyjnego datasetu demo oraz notatek dopisywanych w UI.",
    ],
    possibleNeeds: contact.tags.map((tag) => `Uporządkowanie obszaru: ${tag}`),
    suggestedAngle:
      "Wejść przez jeden konkretny workflow property management: kontakt, kontekst, brief, wiadomość i ręczna akceptacja.",
    suggestedSystems: systems,
    riskNotes: [
      "Demo nie używa prawdziwych danych użytkownika ani danych z uploadu.",
      "Nie sugerować wiedzy spoza widocznych notatek i źródeł demo.",
      "Każda wiadomość musi przejść preview i ręczną akceptację.",
    ],
    bestChannel: contact.channel,
    sources: ["demo contacts", "demo messages", "demo tasks", "manual context notes"],
    relatedEdges,
  };
}
