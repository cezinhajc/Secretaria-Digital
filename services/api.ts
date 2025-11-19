const WEBHOOK_URL = 'https://n8n.kazai.io/webhook/simpia-gpt';

/**
 * Sends the user message to the N8N webhook and returns the plain text response.
 */
export const sendMessageToWebhook = async (message: string): Promise<string> => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Sending standard JSON payload. 
      // Adjust keys if the specific N8N workflow expects 'chatInput', 'input', etc.
      // Based on standard N8N webhook nodes, they usually parse the body JSON.
      body: JSON.stringify({ 
        text: message,
        chatInput: message, // Redundancy for compatibility
        message: message 
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const textResponse = await response.text();

    // Attempt to parse JSON to handle responses like [{"output": "text"}] or {"output": "text"}
    try {
      const jsonResponse = JSON.parse(textResponse);

      // Handle Array format: [{"output": "..."}]
      if (Array.isArray(jsonResponse) && jsonResponse.length > 0 && jsonResponse[0]?.output) {
        return String(jsonResponse[0].output);
      }

      // Handle Object format: {"output": "..."}
      if (jsonResponse && typeof jsonResponse === 'object' && !Array.isArray(jsonResponse) && jsonResponse.output) {
        return String(jsonResponse.output);
      }
      
      // If the response is just a JSON string
      if (typeof jsonResponse === 'string') {
          return jsonResponse;
      }
    } catch (e) {
      // If parsing fails, use the raw text response
    }

    return textResponse;

  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};