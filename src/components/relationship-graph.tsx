"use client";

import { contacts, graphEdges as fallbackGraphEdges, organizations } from "../lib/relora-data";

const portraitByContactId: Record<string, string> = {
  "cnt_marta-nowak": "/figma/avatar-jacob.png",
  "cnt_jakub-zielinski": "/figma/avatar-albert.png",
  "cnt_ewa-wisniewska": "/figma/avatar-robert.png",
  "cnt_piotr-kaminski": "/figma/avatar-jacob.png",
  "cnt_anna-lewandowska": "/figma/avatar-albert.png",
};

const topicLabels: Record<string, string> = {
  topic_utrzymanie: "utrzymanie",
  topic_raporty: "raporty",
  topic_sla: "SLA",
  topic_checkin: "check-in",
  topic_inwestorzy: "inwestorzy",
  topic_umowy: "umowy",
};

function orgForContact(contactId: string, graphEdges: typeof fallbackGraphEdges) {
  const orgEdge = graphEdges.find((edge) => edge.from === contactId && edge.label === "organization");
  return organizations.find((organization) => organization.id === orgEdge?.to);
}

function topicsForContact(contactId: string, graphEdges: typeof fallbackGraphEdges) {
  return graphEdges
    .filter((edge) => edge.from === contactId && edge.label === "topic")
    .map((edge) => topicLabels[edge.to] ?? edge.to.replace("topic_", ""));
}

export function RelationshipGraph({
  graphEdges = fallbackGraphEdges,
  selectedId,
  onSelectPerson,
}: {
  graphEdges?: typeof fallbackGraphEdges;
  selectedId: string;
  onSelectPerson: (id: string) => void;
}) {
  const selectedContact = contacts.find((contact) => contact.id === selectedId) ?? contacts[0];
  const grouped = organizations.map((organization) => ({
    organization,
    people: contacts.filter((contact) => orgForContact(contact.id, graphEdges)?.id === organization.id),
  }));

  return (
    <div className="org-graph" id="graph">
      <div className="org-graph-header">
        <div>
          <span>Mapa relacji</span>
          <strong>{selectedContact.name}</strong>
        </div>
        <div className="org-graph-legend">
          <span>wybrany</span>
          <span>organizacja</span>
          <span>temat</span>
        </div>
      </div>

      <div className="org-directory">
        {grouped.map(({ organization, people }) => (
          <section className={`org-column ${people.some((person) => person.id === selectedId) ? "is-active" : ""}`} key={organization.id}>
            <header>
              <img alt="" src={organization.logoUrl} />
              <div>
                <strong>{organization.name}</strong>
                <a href={organization.websiteUrl} rel="noreferrer" target="_blank">
                  oficjalny link
                </a>
              </div>
            </header>

            <div className="org-people">
              {people.length > 0 ? (
                people.map((person) => {
                  const topics = topicsForContact(person.id, graphEdges);

                  return (
                    <button
                      aria-pressed={person.id === selectedId}
                      className={`org-person ${person.id === selectedId ? "is-selected" : ""}`}
                      key={person.id}
                      onClick={() => onSelectPerson(person.id)}
                      type="button"
                    >
                      <img alt="" src={portraitByContactId[person.id]} />
                      <span>
                        <strong>{person.name}</strong>
                        <small>{person.nextStep}</small>
                      </span>
                      <em>{topics.length > 0 ? topics.join(", ") : "brak tematów"}</em>
                    </button>
                  );
                })
              ) : (
                <p>Brak kontaktów w demo</p>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
