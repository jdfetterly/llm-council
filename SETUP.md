# LLM Council Docker Setup Guide

Complete setup instructions for running llm-council with Docker and Cloudflare Tunnel.

## Prerequisites

- Docker and Docker Compose installed
- A Cloudflare account (free)
- API keys for at least one LLM provider (OpenAI and/or Anthropic recommended)

## Step-by-Step Setup

### 1. Clone and Prepare

```bash
# Navigate to the project directory
cd /path/to/llm-council

# Copy the environment template
cp .env.example .env
```

### 2. Get Your Cloudflare Tunnel Token

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and sign up/login
2. Navigate to **Zero Trust** → **Networks** → **Tunnels**
3. Click **Create a tunnel**
4. Select **Cloudflared** as the connector
5. Give your tunnel a name (e.g., "llm-council")
6. In the **Install connector** step, copy the token (looks like `eyJh...long_string...`)
7. Paste this token into your `.env` file:
   ```
   CLOUDFLARE_TUNNEL_TOKEN=eyJh...your_token_here...
   ```
8. In the **Public Hostname** tab:
   - Subdomain: Choose something unique (e.g., `llm-council-yourname`)
   - Domain: Select your domain
   - Type: HTTP
   - URL: `llm-council:5000` (this points to the container)

### 3. Get LLM API Keys

#### OpenAI (Recommended)
1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Create a new secret key
3. Copy it to your `.env` file:
   ```
   OPENAI_API_KEY=sk-...
   ```

#### Anthropic (Recommended)
1. Go to [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)
2. Create a new key
3. Copy it to your `.env` file:
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ```

#### Google Gemini (Optional)
1. Go to [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Copy it to your `.env` file:
   ```
   GOOGLE_API_KEY=...
   ```

### 4. Deploy

```bash
# Build and start the containers
docker-compose up -d

# Check logs
docker-compose logs -f

# Verify containers are running
docker-compose ps
```

### 5. Access Your LLM Council

Once running, you can access it:

- **Locally**: http://localhost:5000
- **Remotely**: https://your-subdomain.your-domain.com (from Cloudflare)

## Useful Commands

```bash
# View logs
docker-compose logs -f llm-council
docker-compose logs -f cloudflared

# Restart services
docker-compose restart

# Update to latest version
docker-compose pull
docker-compose up -d

# Stop everything
docker-compose down

# Stop and remove all data (careful!)
docker-compose down -v
```

## Troubleshooting

### Container won't start
```bash
# Check for errors
docker-compose logs llm-council

# Rebuild from scratch
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Tunnel not connecting
```bash
# Check tunnel logs
docker-compose logs cloudflared

# Verify your token is correct in .env
# Ensure the token hasn't expired (regenerate if needed)
```

### API errors
- Verify your API keys are correct in `.env`
- Check that you have credits/billing set up with the providers
- Some providers require a verified phone number or payment method

## Security Notes

- The `.env` file contains sensitive API keys - never commit it to git
- The Flask app only binds to localhost (127.0.0.1) - external access is only via the Cloudflare tunnel
- Cloudflare tunnel provides HTTPS encryption and DDoS protection
- Consider rotating your API keys periodically

## Updating

To update to the latest version of llm-council:

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

This will pull the latest code from the GitHub repository and rebuild the container.

## Support

- LLM Council repository: https://github.com/karpathy/llm-council
- Cloudflare Tunnel docs: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/
- Docker docs: https://docs.docker.com/compose/
