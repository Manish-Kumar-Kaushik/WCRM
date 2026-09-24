// eslint-disable-next-line @typescript-eslint/no-require-imports
const crypto = require('crypto');

async function sendTestWebhook() {
  const secret = '986e27a0a5e89c19c1d8872682fe88b7'; // Your META_APP_SECRET
  
  // Fake WhatsApp text message payload
  const payload = {
    "object": "whatsapp_business_account",
    "entry": [
      {
        "id": "1234567890", // Fake WABA ID
        "changes": [
          {
            "value": {
              "messaging_product": "whatsapp",
              "metadata": {
                "display_phone_number": "1234567890",
                "phone_number_id": "1234567890" // Fake Phone Number ID
              },
              "contacts": [
                {
                  "profile": { "name": "Local Tester" },
                  "wa_id": "919876543210" // Sender phone number
                }
              ],
              "messages": [
                {
                  "from": "919876543210",
                  "id": `wamid.${Math.random().toString(36).substring(7)}`,
                  "timestamp": Math.floor(Date.now() / 1000).toString(),
                  "text": { "body": "Hello! This is a test message from local script." },
                  "type": "text"
                }
              ]
            },
            "field": "messages"
          }
        ]
      }
    ]
  };

  const bodyString = JSON.stringify(payload);
  
  // Meta Webhook Verification Hash
  const signature = crypto
    .createHmac('sha256', secret)
    .update(bodyString)
    .digest('hex');

  console.log('Sending Webhook to http://localhost:3000/api/whatsapp/webhook...');
  
  try {
    const response = await fetch('http://localhost:3000/api/whatsapp/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hub-signature-256': `sha256=${signature}`,
      },
      body: bodyString
    });

    const text = await response.text();
    console.log(`\nStatus Code: ${response.status}`);
    console.log(`Response: ${text || '(empty response)'}`);
  } catch (error) {
    console.error('\nError connecting to server. Is `npm run dev` running?', error.message);
  }
}

sendTestWebhook();
