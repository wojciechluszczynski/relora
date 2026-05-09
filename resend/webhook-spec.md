# Resend webhook spec

Endpoint:
- POST /api/webhooks/resend

Expected actions:
1. Verify signature.
2. Map event to message by resend_message_id.
3. Insert message_events row.
4. Update denormalized message status timestamps.
5. Create alert row for important events.
6. Update CRM when reply arrives.

Important event mapping:
- email.sent -> send_status=sent
- email.delivered -> send_status=delivered
- email.opened -> opened_at and warmth_score +1
- email.clicked -> clicked_at and warmth_score +2
- email.bounced -> send_status=bounced and critical alert
- email.replied -> replied_at, CRM stage to replied, critical alert
