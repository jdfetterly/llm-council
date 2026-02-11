
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    && rm -rf /var/lib/apt/lists/*

ARG LLM_COUNCIL_REF=master
RUN git clone https://github.com/karpathy/llm-council.git /app \
    && cd /app \
    && git checkout "$LLM_COUNCIL_REF"

RUN pip install --no-cache-dir \
    fastapi \
    "uvicorn[standard]" \
    python-dotenv \
    httpx \
    pydantic

# Override upstream config with env-driven model selection
COPY overrides/backend/config.py /app/backend/config.py

# Allow private Tailnet frontend origin (port 5173) to call backend on 8001.
RUN python - <<'PY'
from pathlib import Path
p = Path('/app/backend/main.py')
s = p.read_text()
s = s.replace('allow_origins=["http://localhost:5173", "http://localhost:3000"],', 'allow_origins=["*"],')
s = s.replace('allow_credentials=True,', 'allow_credentials=False,')
p.write_text(s)
PY

RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 8001

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8001"]
