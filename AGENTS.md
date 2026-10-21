<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Single landing page at `/` composed of section components in `src/components/marea/`; booking rules (services, slots, WhatsApp link) live in `src/lib/booking.ts` with tests in `src/lib/booking.test.ts` — keeps business logic testable and separate from UI.
- Bookings are sent via a prefilled `wa.me` link, no backend storage yet — the client asked for a front-end only.
