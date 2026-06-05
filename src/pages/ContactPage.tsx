import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Send, CircleCheck as CheckCircle } from 'lucide-react';
import { sendEmail, FALLBACK_EMAIL } from '../lib/emailjs';

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Contact Us | AMPVIA';
  }, []);

  const prefillEmail = searchParams.get('email') || '';
  const [form, setForm]     = useState({ name:'', email: prefillEmail, phone:'', company:'', subject:'', message:'' });
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const ok = await sendEmail({
      from_name:  form.name,
      from_email: form.email,
      phone:      form.phone || '',
      company:    form.company || '',
      subject:    form.subject,
      message:    form.message,
    });

    if (ok) {
      setStatus('sent');
      setForm({ name:'', email:'', phone:'', company:'', subject:'', message:'' });
    } else {
      setStatus('error');
    }
  };

  const info = [
    { icon: Phone,  title:'Phone',         value:'+20 127 096 7959',                     link:'tel:+201270967959' },
    { icon: Mail,   title:'Email',          value:'yahyasameeh00001111@gmail.com',         link:`mailto:${FALLBACK_EMAIL}` },
    { icon: MapPin, title:'Location',       value:'Cairo, Egypt',                         link:'#' },
    { icon: Clock,  title:'Business Hours', value:'Sun–Thu: 9 AM – 6 PM',               link:null },
  ];

  const field = (label: string, key: keyof typeof form, type='text', required=false, half=false) => (
    <div className={half ? '' : 'md:col-span-2'} key={key}>
      <label htmlFor={`contact-${key}`} className="block text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">{label}</label>
      <input id={`contact-${key}`} type={type} required={required} value={form[key]} maxLength={200}
        onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
        className="w-full px-5 py-3.5 text-sm bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-crimson focus:bg-white dark:focus:bg-gray-900 rounded-xl outline-none transition-all duration-200 dark:text-white" />
    </div>
  );

  return (
    <div className="pt-32 pb-20 dark:bg-gray-950 min-h-screen">
      {/* Hero */}
      <section className="bg-crimson-dark py-20 mb-0">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="section-label-white mb-5 block justify-center">Get In Touch</span>
          <h1 className="display-text text-white" style={{ fontSize:'clamp(2.5rem,5vw,4rem)' }}>
            Let's discuss your <em className="display-italic">project</em>
          </h1>
          <p className="text-white/70 mt-4 max-w-xl mx-auto">
            Our team responds within 24 hours. Free consultation, no obligations.
          </p>
        </div>
      </section>

      {/* Info cards */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
            {info.map(({ icon: Icon, title, value, link }) => (
              <div key={title} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-crimson/10 rounded-xl mb-4">
                  <Icon className="w-6 h-6 text-crimson" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{title}</p>
                {link && link !== '#'
                  ? <a href={link} className="text-sm text-crimson-dark dark:text-white font-medium hover:text-crimson transition-colors break-all">{value}</a>
                  : <p className="text-sm text-crimson-dark dark:text-white font-medium">{value}</p>
                }
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-card dark:shadow-none dark:border dark:border-gray-800">
            <h2 className="display-text text-crimson-dark dark:text-white mb-8" style={{ fontSize:'1.8rem' }}>
              Send a message
            </h2>

            {status === 'sent' ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-500" />
                <h3 className="text-xl font-bold text-crimson-dark dark:text-white">Message Sent!</h3>
                <p className="text-gray-500 dark:text-gray-400">We'll reply within 24 hours.</p>
                <button onClick={() => setStatus('idle')} className="mt-4 px-6 py-3 bg-crimson text-white font-semibold rounded-full hover:bg-crimson-dark transition-colors">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {field('Full Name *', 'name', 'text', true, true)}
                {field('Email *',     'email','email',true, true)}
                {field('Phone',       'phone','tel', false,true)}
                {field('Company',     'company','text',false,true)}
                <div className="md:col-span-2">
                  <label htmlFor="contact-subject" className="block text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Subject *</label>
                  <input id="contact-subject" type="text" required value={form.subject} maxLength={200}
                    onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                    className="w-full px-5 py-3.5 text-sm bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-crimson focus:bg-white dark:focus:bg-gray-900 rounded-xl outline-none transition-all dark:text-white" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Message *</label>
                  <textarea id="contact-message" required rows={5} value={form.message} maxLength={5000}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="w-full px-5 py-3.5 text-sm bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-crimson focus:bg-white dark:focus:bg-gray-900 rounded-xl outline-none transition-all resize-none dark:text-white" />
                </div>

                {status === 'error' && (
                  <p className="md:col-span-2 text-red-500 text-sm">
                    Could not send. Please email us directly at <a href={`mailto:${FALLBACK_EMAIL}`} className="underline">{FALLBACK_EMAIL}</a>
                  </p>
                )}

                <div className="md:col-span-2">
                  <button type="submit" disabled={status === 'sending'} data-hover
                    className="w-full py-4 bg-crimson text-white font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-crimson-dark transition-colors disabled:opacity-60">
                    {status === 'sending' ? 'Sending…' : <><Send className="w-5 h-5" /> Send Message</>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
export default ContactPage;