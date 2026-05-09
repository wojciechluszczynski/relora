# Relora

B2B SaaS prototype do zarządzania relacjami biznesowymi, people intelligence i outreachem zatwierdzanym przez człowieka.

Zamiast klasycznego CRM, Relora łączy graf relacji, kontekst kontaktów, research briefy, playbooki wiadomości i źródła danych w jednym interfejsie.

**Live:** [relora-jet.vercel.app](https://relora-jet.vercel.app)

---

## Co to jest

Narzędzie dla founderów, sprzedawców i osób prowadzących precyzyjny outreach do konkretnych ludzi, a nie anonimowych list mailingowych. Relora pozwala sprawdzić kto zna kogo, przygotować brief przed rozmową i napisać wiadomość osadzoną w realnym kontekście relacji.

---

## Funkcje

- **Graf relacji** — mapowanie osób, organizacji i wprowadzeń
- **Karty kontaktów** — notatki, kontekst i historia interakcji
- **People intelligence** — research briefy przed rozmową
- **Outreach cockpit** — podgląd wiadomości przed wysyłką, zatwierdzanie przez człowieka
- **Źródła danych** — rozdzielenie public facts od private relationship context
- **Email API** — integracja z Resend, dokumentacja webhooków
- **Supabase** — migracje schematu bazy i RLS

---

## Stack

| Warstwa | Technologia |
|---|---|
| Framework | Next.js 16 + TypeScript |
| Frontend | React 19 |
| Database | Supabase (schema + RLS migrations) |
| Email | Resend |
| Hosting | Vercel |

---

## Lokalne uruchomienie

```bash
npm install
npm run dev
```

Aplikacja dostępna pod [http://localhost:3000](http://localhost:3000).

Skopiuj `.env.example` do `.env.local` i uzupełnij klucze:

```bash
cp .env.example .env.local
```

Statyczny prototyp działa bez live keys. Klucze Supabase i Resend są potrzebne dopiero dla backendowych flow.

---

## Struktura

```
src/app/              trasy Next.js i endpointy API
src/components/       główny interfejs i komponenty UI
src/lib/              dane demo, logika researchu, źródła organizacji
public/               fonty, portrety i assety wizualne
docs/                 notatki produktowe i specyfikacje
resend/               dokumentacja webhooków
supabase/migrations/  schema SQL i migracje RLS
```
