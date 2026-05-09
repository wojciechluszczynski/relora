# Relora

B2B SaaS prototype do zarzadzania relacjami biznesowymi, people intelligence i outreachem zatwierdzanym przez czlowieka.

Zamiast klasycznego CRM, Relora laczy graf relacji, kontekst kontaktow, research briefy, playbooki wiadomosci i zrodla danych w jednym interfejsie.

## Co To Jest

Narzędzie dla founders, sprzedawcow i osob prowadzacych precyzyjny outreach do konkretnych ludzi, a nie anonimowych list mailingowych. Relora pomaga sprawdzic kto zna kogo, przygotowac brief przed rozmowa i napisac wiadomosc osadzona w realnym kontekscie relacji.

## Funkcje

- Graf relacji do mapowania osob, organizacji i wprowadzen
- Karty kontaktow z notatkami, kontekstem i historia interakcji
- People intelligence i research briefy przed rozmowa
- Outreach cockpit z podgladem wiadomosci przed wysylka
- Widok zrodel rozdzielajacy public facts od private relationship context
- API pod Resend oraz dokumentacja webhookow
- Migracje Supabase dla schematu bazy i RLS
- Polskie etykiety interfejsu i osobne trasy aplikacji

## Stack

- Next.js 16
- React 19
- TypeScript
- Supabase-ready data model
- Resend-ready email flow

## Struktura Projektu

```text
src/app/              trasy Next.js i endpointy API
src/components/       glowny interfejs Relora i komponenty UI
src/lib/              dane demo, logika researchu i zrodla organizacji
public/               fonty, portrety i assety wizualne
docs/                 notatki produktowe i specyfikacje
examples/             przykladowe dane wejsciowe i parser notes
resend/               dokumentacja webhookow Resend
supabase/migrations/  schema SQL i migracje RLS
```

## Lokalne Uruchomienie

```bash
npm install
npm run dev
```

Aplikacja bedzie dostepna pod `http://localhost:3000`.

## Zmienne Srodowiskowe

Skopiuj `.env.example` do `.env.local` i uzupelnij klucze dla uslug, ktore chcesz wlaczyc:

```bash
cp .env.example .env.local
```

Statyczny prototyp moze dzialac bez live keys. Klucze Supabase, Resend i providerow AI sa potrzebne dopiero dla podlaczonych flow backendowych.

## Build

```bash
npm run build
```

## Deployment

Projekt jest gotowy do GitHuba i deploymentu w stylu Vercel:

```bash
git remote -v
git push origin main
```

Przed wlaczeniem produkcyjnych integracji ustaw zmienne srodowiskowe w platformie deploymentowej.
