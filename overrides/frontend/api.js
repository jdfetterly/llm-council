/**
 * API client for the LLM Council backend.
 * Use same host as frontend, but backend port 8001.
 */
const API_BASE = `${window.location.protocol}//${window.location.hostname}:8001`;

export const api = {
  async listConversations() {
    const response = await fetch(`${API_BASE}/api/conversations`);
    if (!response.ok) {
      throw new Error(`Failed to fetch conversations: ${response.statusText}`);
    }
    return response.json();
  },

  async createConversation() {
    const response = await fetch(`${API_BASE}/api/conversations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    if (!response.ok) {
      throw new Error(`Failed to create conversation: ${response.statusText}`);
    }
    return response.json();
  },

  async getConversation(conversationId) {
    const response = await fetch(`${API_BASE}/api/conversations/${conversationId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch conversation: ${response.statusText}`);
    }
    return response.json();
  },

  async sendMessage(conversationId, content) {
    const response = await fetch(`${API_BASE}/api/conversations/${conversationId}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`);
    }
    return response.json();
  },

  async sendMessageStream(conversationId, content, onEvent) {
    const response = await fetch(`${API_BASE}/api/conversations/${conversationId}/message/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error(`Failed to start stream: ${response.statusText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const event = JSON.parse(line.slice(6));
            onEvent(event.type, event);
          } catch {
            // ignore parse errors for partial lines
          }
        }
      }
    }
  },
};
