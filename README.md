# Relora

B2B SaaS do zarządzania relacjami biznesowymi i outreachem. Zamiast klasycznego CRM — graph relacji, automatyczne briefy o kontaktach i gotowe playbooki wiadomości dostosowane do kontekstu rozmowy.

---

## Co to jest

Narzędzie dla sprzedawców i founders prowadzących outreach do konkretnych osób, nie do list mailingowych. Relora śledzi kto zna kogo, generuje research brief przed rozmową i pomaga pisać wiadomości, które brzmią jak od człowieka, który zrobił pracę domową.

---

## Funkcje

- **Graf relacji** — wizualizacja połączeń między kontaktami i organizacjami
- **People Intelligence** — automatyczne briefy o kontakcie przed rozmową
- **CRM Kanban** — pipeline outreachowy z etapami (szkic → podgląd → wysłany)
- **Composer** — przygotowanie wiadomości z kontekstem relacji
- **Alerty** — powiadomienia Supabase realtime o zmianach statusu
- **Resend** — śledzenie dostarczalności wiadomości

---

## Stack

| Warstwa | Technologia |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Baza danych | Supabase (Postgres, Auth, Realtime) |
| Email | Resend |
| Style | Tailwind CSS |

---

## Lokalne uruchomienie

```bash
npm install
npm run dev
```

Aplikacja dostępna pod `http://localhost:3000`.

```bash
npm run build   # produkcyjny build
```
