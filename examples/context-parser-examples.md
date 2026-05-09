# Context parser examples

## Example 1
Input:
Poznałem Annę na konferencji w Krakowie jesienią 2024. Rozmawialiśmy o partnerstwach i miała wrócić w styczniu.

Expected extraction:
- person: Anna
- channel: event
- happened_at: 2024-Q4
- topic: partnerships
- next_action_at: January
- status: waiting

## Example 2
Input:
Marek nie odpisał na LinkedIn, ale otworzył maila dwa razy i kliknął case study.

Expected extraction:
- person: Marek
- channel: LinkedIn + email
- response: no reply on LinkedIn
- email_open_count_signal: positive
- click_signal: positive
- recommendation: follow-up in 3 days
