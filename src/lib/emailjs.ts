const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY   || '';

export interface EmailParams {
  from_name: string;
  from_email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message?: string;
  items_list?: string;
  notes?: string;
}

export const sendEmail = async (params: EmailParams): Promise<boolean> => {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.error('EmailJS credentials not configured');
    return false;
  }

  try {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id:  SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id:     PUBLIC_KEY,
        template_params: params,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error('EmailJS send failed:', err);
    return false;
  }
};

export const FALLBACK_EMAIL = 'yahyasameeh00001111@gmail.com';
