# LLM Council (Shared Repo)

This is the shared, Git-friendly deployment copy of LLM Council.

## Paths

- Shared repo: `/Users/jdfetterly/ClawShare/llm-council-shared-repo`
- Runtime `.env` (not committed): create locally in this folder

## First-Time Setup

1. Create secrets file:
```bash
cp .env.example .env
chmod 600 .env
```
2. Set at least:
- `OPENROUTER_API_KEY=or-...`
- `COUNCIL_MODELS=google/gemini-3-pro-preview,x-ai/grok-4,anthropic/claude-opus-4.6,openai/gpt-5.2`
- `CHAIRMAN_MODEL=openai/gpt-5.2`

## Run (Mac mini)

```bash
cd /Users/jdfetterly/ClawShare/llm-council-shared-repo
docker compose up -d --build
docker compose ps
```

## Access

- Chat UI: `http://<tailscale-ip>:5173`
- API docs: `http://<tailscale-ip>:8001/docs`

## Run From Personal Mac (optional)

Configure Docker context once:
```bash
docker context create macmini --docker "host=ssh://clawop@<tailscale-ip>"
```

Then deploy remotely from your personal Mac:
```bash
cd llm-council-shared-repo
docker --context macmini compose up -d --build
```

## Git Safety

- `.env` is ignored by git.
- Rotate any key that was ever pasted or screenshotted.
