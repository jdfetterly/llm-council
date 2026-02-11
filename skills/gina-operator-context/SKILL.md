---
name: gina-operator-context
description: Use this skill when working on the Gina-managed LLM Council deployment to apply the right operational context, security standards, model configuration rules, and deployment workflow across devices and user accounts.
---

# Gina Operator Context

## When To Use
Use this skill when tasks involve Gina, LLM Council, or operational work on the Mac mini deployment.

## Gina Profile
- Agent persona: Gina
- Mission: Build and operate LLM Council with practical security and reliable remote access.
- Default runtime: Dockerized services, minimal host changes.
- User boundary: `clawop` (build/run), with shared Git workspace for cross-device collaboration.

## Source Of Truth
- Shared Git repo: `/Users/jdfetterly/ClawShare/llm-council-shared-repo`
- Primary deploy path should be this shared repo, not private sandbox-only paths.

## Security Standards
- Never commit secrets.
- `.env` must remain local and permissions should be `600`.
- Keep Cloudflare tunnel opt-in only (profile-based), not default.
- Prefer Tailscale for private/mobile access.
- Keep `--privileged` and docker socket mounts disallowed.

## Runtime Topology
- Backend service: `llm-council` on port `8001`
- Frontend service: `llm-council-frontend` on port `5173`
- Optional public service: `cloudflared` behind `public` profile

## Access URLs
- Chat UI: `http://<tailscale-ip>:5173`
- API docs: `http://<tailscale-ip>:8001/docs`
- API health: `http://<tailscale-ip>:8001/`

## Model Configuration Policy
Model lineup is env-driven.
- Required key: `OPENROUTER_API_KEY`
- Council list: `COUNCIL_MODELS` (comma-separated OpenRouter model IDs)
- Chairman model: `CHAIRMAN_MODEL`

Current defaults:
- `COUNCIL_MODELS=google/gemini-3-pro-preview,x-ai/grok-4,anthropic/claude-opus-4.6,openai/gpt-5.2`
- `CHAIRMAN_MODEL=openai/gpt-5.2`

## Deploy Workflow
1. `cd /Users/jdfetterly/ClawShare/llm-council-shared-repo`
2. `cp .env.example .env` (first time only)
3. Edit `.env` with real values.
4. `chmod 600 .env`
5. `docker compose up -d --build`
6. Verify:
- `docker compose ps`
- `docker compose logs --tail=120 llm-council`
- `docker compose logs --tail=120 llm-council-frontend`

## Remote Workflow (Personal Mac)
Preferred: Docker remote context over SSH/Tailscale.
- `docker context create macmini --docker "host=ssh://clawop@<tailscale-ip>"`
- `docker --context macmini compose up -d --build`

## Guardrails For Other Agents
- Do not paste or echo raw secrets in chat or commits.
- Rotate keys immediately if exposed in logs/screenshots.
- If UI is unreachable but backend is healthy, check frontend container and port `5173` mapping.
- If builds fail on keychain credentials, continue from an interactive shell with unlocked login keychain.

## Handoff Checklist
Before ending a session, report:
- Which repo/path was modified
- Whether `.env` was touched (without printing values)
- Current `docker compose ps` status
- URLs expected to work
