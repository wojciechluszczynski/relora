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
  if (text.includes("event")) {
    return ["Łódź Event Intelligence Platform", "EventOps Command Center", "Sponsor & Partner Value Dashboard"];
  }
  if (text.includes("holding") || text.includes("governance")) {
    return ["Governance Cockpit dla Holdingu", "Issue Radar + Playbook", "Public Value Dashboard"];
  }
  if (text.includes("inwestor")) {
    return ["Investor Pipeline Cockpit", "Economic Development Dashboard", "Partner Follow-up System"];
  }
  if (text.includes("cyber") || text.includes("ai")) {
    return ["AI Policy Briefing System", "Cyber & Public Affairs Radar", "Constituent Knowledge Base"];
  }
  return ["Knowledge Ops System", "Resident Service Workflow", "Internal Process Cockpit"];
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
      `Etap CRM z importu: ${contact.stage}.`,
      `Tematy z rekordu: ${contact.tags.join(", ")}.`,
      `Wiadomość źródłowa ma temat: "${contact.subject}".`,
    ],
    userContext: [
      `Notatka użytkownika: ${contact.notes}.`,
      `Portfolio: ${contact.portfolioUrl}.`,
      `Booking: ${contact.bookingUrl}.`,
      "Kontekst pochodzi z paczki importowej, nie z publicznego scrapingu.",
    ],
    possibleNeeds: contact.tags.map((tag) => `Uporządkowanie obszaru: ${tag}`),
    suggestedAngle:
      "Wejść przez jeden konkretny workflow i krótki prototyp, nie przez ogólną narrację o AI ani szeroką prezentację.",
    suggestedSystems: systems,
    riskNotes: [
      "Nie mieszać publicznych faktów z prywatnym kontekstem użytkownika.",
      "Nie sugerować znajomości wewnętrznych procesów bez źródła.",
      "Każda wiadomość musi przejść preview i ręczną akceptację przed Resend.",
    ],
    bestChannel: contact.channel,
    sources: ["contacts.csv", "messages.csv", "tasks.csv", "research/paste.txt", "resend/webhook-spec.md"],
    relatedEdges,
  };
}
