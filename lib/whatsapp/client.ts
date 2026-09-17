type WhatsAppTemplateComponent = {
  type: 'body' | 'button';
  sub_type?: 'url';
  index?: string;
  parameters: Array<{
    type: 'text';
    text: string;
  }>;
};

function getWhatsAppConfig() {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const templateName = process.env.WHATSAPP_OTP_TEMPLATE_NAME;
  const templateLanguage = process.env.WHATSAPP_OTP_TEMPLATE_LANG || 'tr';
  const graphVersion = process.env.WHATSAPP_GRAPH_API_VERSION || 'v23.0';

  if (!accessToken || !phoneNumberId || !templateName) {
    throw new Error('WhatsApp Cloud API is not configured');
  }

  return { accessToken, phoneNumberId, templateName, templateLanguage, graphVersion };
}

export async function sendWhatsAppOtp(phone: string, code: string) {
  const { accessToken, phoneNumberId, templateName, templateLanguage, graphVersion } =
    getWhatsAppConfig();

  const components: WhatsAppTemplateComponent[] = [
    {
      type: 'body',
      parameters: [{ type: 'text', text: code }],
    },
    {
      type: 'button',
      sub_type: 'url',
      index: '0',
      parameters: [{ type: 'text', text: code }],
    },
  ];

  const response = await fetch(
    `https://graph.facebook.com/${graphVersion}/${phoneNumberId}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: phone.replace(/^\+/, ''),
        type: 'template',
        template: {
          name: templateName,
          language: { code: templateLanguage },
          components,
        },
      }),
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    const details = await response.text();
    console.error('WhatsApp Cloud API OTP send failed', response.status, details);
    throw new Error('WhatsApp OTP could not be sent');
  }

  return response.json();
}
