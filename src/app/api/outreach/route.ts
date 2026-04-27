import { NextResponse } from "next/server";
import { contacts as fallbackContacts, graphEdges as fallbackGraphEdges, organizations, topics, type Contact } from "../../../lib/relora-data";
import { organizationSources } from "../../../lib/organization-sources";

type SupabasePerson = {
  id: string;
  full_name: string;
  first_name?: string | null;
  last_name?: string | null;
  role?: string | null;
  headline?: string | null;
  company_id?: string | null;
  website_url?: string | null;
};

type SupabaseOrganization = {
  id: string;
  name: string;
};

type SupabaseCrm = {
  person_id: string;
  pipeline_stage?: string | null;
  priority?: string | null;
};

type SupabaseNote = {
  person_id?: string | null;
  raw_text?: string | null;
};

type SupabaseMessage = {
  person_id: string;
  channel?: string | null;
  subject?: string | null;
  body_text?: string | null;
  approval_status?: string | null;
};

type SupabaseTask = {
  id: string;
  person_id?: string | null;
  title?: string | null;
  priority?: string | null;
};

type SupabasePersonOrganization = {
  person_id: string;
  organization_id: string;
};

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const dynamic = "force-dynamic";

function initialsFor(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function fallbackPayload(reason: string) {
  return NextResponse.json(
    {
      contacts: fallbackContacts,
      graphEdges: fallbackGraphEdges,
      organizations,
      organizationSources,
      topics,
      source: reason,
      updatedAt: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}

async function readTable<T>(table: string) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return [] as T[];
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, {
    cache: "no-store",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Cannot read ${table}`);
  }

  return (await response.json()) as T[];
}

export async function GET() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return fallbackPayload("fallback: brak konfiguracji Supabase");
  }

  try {
    const [people, orgRows, crmRows, notes, messages, tasks, personOrganizations] = await Promise.all([
      readTable<SupabasePerson>("people"),
      readTable<SupabaseOrganization>("organizations"),
      readTable<SupabaseCrm>("crm_records"),
      readTable<SupabaseNote>("notes"),
      readTable<SupabaseMessage>("messages"),
      readTable<SupabaseTask>("tasks"),
      readTable<SupabasePersonOrganization>("person_organizations"),
    ]);

    if (people.length === 0) {
      return fallbackPayload("fallback: Supabase nie ma jeszcze kontaktów");
    }

    const orgById = new Map(orgRows.map((org) => [org.id, org]));
    const crmByPerson = new Map(crmRows.map((row) => [row.person_id, row]));
    const noteByPerson = new Map(notes.filter((note) => note.person_id).map((note) => [note.person_id as string, note]));
    const messageByPerson = new Map(messages.map((message) => [message.person_id, message]));
    const taskByPerson = new Map(tasks.filter((task) => task.person_id).map((task) => [task.person_id as string, task]));
    const orgLinkByPerson = new Map(personOrganizations.map((link) => [link.person_id, link.organization_id]));

    const liveContacts: Contact[] = people.map((person) => {
      const crm = crmByPerson.get(person.id);
      const note = noteByPerson.get(person.id);
      const message = messageByPerson.get(person.id);
      const task = taskByPerson.get(person.id);
      const organizationId = person.company_id ?? orgLinkByPerson.get(person.id);
      const organization = organizationId ? orgById.get(organizationId)?.name : undefined;
      const notesText = note?.raw_text ?? person.headline ?? person.role ?? "Brak notatki użytkownika.";

      return {
        id: person.id,
        initials: initialsFor(person.full_name),
        name: person.full_name,
        organization: organization ?? "Brak organizacji",
        stage: crm?.pipeline_stage ?? message?.approval_status ?? "draft",
        priority: crm?.priority ?? task?.priority ?? "medium",
        channel: message?.channel ?? "email",
        tags: notesText.split(",").map((tag) => tag.trim()).filter(Boolean),
        notes: notesText,
        subject: message?.subject ?? task?.title ?? "Brak tematu wiadomości",
        message: message?.body_text ?? "Brak treści wiadomości.",
        ctaUrl: "https://cal.com/wojciech-luszczynski",
        portfolioUrl: person.website_url ?? "https://app.wojciech.io",
        bookingUrl: "https://cal.com/wojciech-luszczynski",
        taskId: task?.id ?? "brak-zadania",
        source: "Supabase: people, crm_records, notes, messages, tasks",
      };
    });

    return NextResponse.json(
      {
        contacts: liveContacts,
        graphEdges: fallbackGraphEdges,
        organizations: orgRows,
        organizationSources,
        topics,
        source: "Supabase REST",
        updatedAt: new Date().toISOString(),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return fallbackPayload("fallback: błąd odczytu Supabase");
  }
}
