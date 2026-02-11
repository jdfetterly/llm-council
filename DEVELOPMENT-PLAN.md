# LLM Council Development Plan

## Goal
Ship a stable, mobile-friendly LLM Council with a premium executive visual style, reliable backend/frontend integration, and a safe deployment workflow.

## Scope
- Primary dev machine: personal MacBook
- Secondary machine: Mac mini (occasional use)
- Runtime: Docker Compose
- Model routing: OpenRouter (`OPENROUTER_API_KEY`)
- OpenRouter request/API parameter support is required (for selected council/chairman models), implementation approach TBD

## Current Baseline
- Backend service runs on `:8001` (FastAPI)
- Frontend service runs on `:5173` (Vite/React)
- Model lineup is env-driven (`COUNCIL_MODELS`, `CHAIRMAN_MODEL`)
- Gina operator context skill exists under `skills/gina-operator-context/SKILL.md`

## Priority Roadmap

### P0 - Stabilize Runtime
- Verify end-to-end startup from clean clone on MacBook.
- Confirm frontend can call backend using host-dynamic API base.
- Remove fragile build assumptions (branch refs, buildkit-only dependencies).
- Add one command health check for both services.

### P1 - Mobile-First Executive UI
- Redesign chat shell for small screens first.
- Improve hierarchy: typography, spacing, input ergonomics, message readability.
- Add distinctive premium branding with an intentionally smug name/tone (as requested).
- Ensure fast initial paint and responsive behavior on iPhone Safari/Chrome.

### P1 - Chat Experience
- Clarify stages/progress in-stream (stage 1/2/3 visibility).
- Improve error states and retries.
- Keep long responses readable (line length, markdown handling, scroll behavior).

### P1 - API/Frontend Contract Hardening
- Validate frontend behavior for network drops/timeouts.
- Handle malformed SSE events gracefully.
- Ensure CORS policy matches chosen access model (Tailscale-first, Cloudflare optional).
- Add support for configurable OpenRouter API parameters per model/request (exact parameter set and control surface TBD).

### P2 - Cost & Reliability Controls
- Add request timeout budget and user-facing timeout messaging.
- Optional: expose per-run token/cost estimate panel.
- Add conservative defaults for council size and model mix.

### P2 - Observability
- Add structured logs for request lifecycle.
- Add simple operational metrics endpoint or counters.
- Provide a minimal troubleshooting runbook for common failures.

### P3 - Testing & CI
- Add backend smoke tests (health, conversation lifecycle, streaming path).
- Add frontend smoke test for basic chat flow.
- Add CI check for lint + basic tests + Docker compose config validation.

## Security & Ops Constraints
- Never commit secrets (`.env` local only, `chmod 600`).
- Tailscale is default private access path.
- Cloudflare tunnel remains opt-in only.
- Rotate keys immediately if exposed in screenshots/logs/chat.

## Definition of Done
- Fresh clone on MacBook runs with 3 commands.
- Mobile chat UI is polished and usable in portrait mode.
- End-to-end council flow works reliably with selected models.
- OpenRouter model/API parameters needed for selected models are supported.
- `README.md` reflects real URLs and run commands.
- Basic smoke tests pass locally.

## Execution Checklist (Order)
1. Confirm clean local run on MacBook.
2. Lock backend/frontend contract (SSE + API base + CORS).
3. Implement UI redesign pass.
4. Run mobile QA (Safari + Chrome).
5. Add smoke tests and docs updates.
6. Final key rotation and release tag.

## Notes for Agents
- Use `skills/gina-operator-context/SKILL.md` before operational changes.
- Treat MacBook as source of truth for development.
- Keep changes incremental and deployable at each step.
