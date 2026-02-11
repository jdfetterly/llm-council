"""Configuration for the LLM Council (env-driven)."""

import os
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

DEFAULT_COUNCIL_MODELS = [
    "google/gemini-3-pro-preview",
    "x-ai/grok-4",
    "anthropic/claude-opus-4.6",
    "openai/gpt-5.2",
]
DEFAULT_CHAIRMAN_MODEL = "openai/gpt-5.2"


def _parse_models(value: str | None) -> list[str]:
    if not value:
        return DEFAULT_COUNCIL_MODELS
    models = [m.strip() for m in value.split(",") if m.strip()]
    return models or DEFAULT_COUNCIL_MODELS


COUNCIL_MODELS = _parse_models(os.getenv("COUNCIL_MODELS"))
CHAIRMAN_MODEL = os.getenv("CHAIRMAN_MODEL", DEFAULT_CHAIRMAN_MODEL).strip() or DEFAULT_CHAIRMAN_MODEL

OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"
DATA_DIR = "data/conversations"
