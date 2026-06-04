import { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { items, count, remove, update, clear, isOpen, close } = useCart();
  const [step,        setStep]        = useState<'cart' | 'quote' | 'sent'>('cart');
  const [form,        setForm]        = useState({ name: '', email: '', phone: '', company: '', notes: '' });
  const [submitting,  setSubmitting]  = useState(false);

  const handleQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    /* ── EmailJS ──────────────────────────────────────────────
       1. Go to https://www.emailjs.com and create a free account
       2. Create a Service (Gmail / Outlook)
       3. Create a Template with these variables:
          {{from_name}}, {{from_email}}, {{phone}}, {{company}},
          {{items_list}}, {{notes}}
       4. Replace the three strings below with your real IDs
    ───────────────────────────────────────────────────────── */
    const SERVICE_ID  = 'Ampviacontact';
    const TEMPLATE_ID = 'template_h1nbjck';
    const PUBLIC_KEY  = 'k4yDYY-ZoDExQJj7T';

    const itemsList = items.map(i => `• ${i.name} (qty: ${i.qty})`).join('\n');

    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id:  SERVICE_ID,
          template_id: TEMPLATE_ID,
          user_id:     PUBLIC_KEY,
          template_params: {
            from_name:  form.name,
            from_email: form.email,
            phone:      form.phone || '',
            company:    form.company || '',
            subject:    'New Quote Request',
            message:    '',
            items_list: itemsList,
            notes:      form.notes || '',
          },
        }),
      });
      if (res.ok) { setStep('sent'); clear(); }
      else throw new Error('send failed');
    } catch {
      alert('Could not send. Please email us directly at yahyasameeh00001111@gmail.com');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-[200] backdrop-blur-sm" onClick={close} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-gray-900 z-[201] flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-crimson" />
            <span className="font-semibold text-crimson-dark dark:text-white">
              {step === 'cart'  ? `Quote List (${count})` :
               step === 'quote' ? 'Request Quote' : 'Quote Sent!'}
            </span>
          </div>
          <button onClick={close} data-hover className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center">
            <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* ── STEP 1: Cart items ── */}
        {step === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
                  <ShoppingBag className="w-12 h-12 opacity-30" />
                  <p className="text-sm">Your quote list is empty</p>
                  <button onClick={close} data-hover
                    className="text-crimson text-sm font-medium hover:underline">
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4 py-4 border-b border-gray-50 dark:border-gray-800 last:border-0">
                      <Link to={item.href} onClick={close}
                        className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-crimson-dark dark:text-white truncate">{item.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-full overflow-hidden">
                            <button onClick={() => update(item.id, item.qty - 1)} data-hover
                              className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                              <Minus className="w-3 h-3 text-gray-500" />
                            </button>
                            <span className="text-sm font-medium w-6 text-center dark:text-white">{item.qty}</span>
                            <button onClick={() => update(item.id, item.qty + 1)} data-hover
                              className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                              <Plus className="w-3 h-3 text-gray-500" />
                            </button>
                          </div>
                          <button onClick={() => remove(item.id)} data-hover
                            className="text-gray-300 hover:text-red-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-gray-100 dark:border-gray-800 space-y-3">
                <button onClick={() => setStep('quote')} data-hover
                  className="w-full py-4 bg-crimson text-white font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-crimson-dark transition-colors">
                  Request Quote <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={clear} data-hover
                  className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors">
                  Clear all
                </button>
              </div>
            )}
          </>
        )}

        {/* ── STEP 2: Quote form ── */}
        {step === 'quote' && (
          <form onSubmit={handleQuote} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {[
                { label: 'Full Name *',    key: 'name',    type: 'text',  required: true },
                { label: 'Email *',        key: 'email',   type: 'email', required: true },
                { label: 'Phone',          key: 'phone',   type: 'tel',   required: false },
                { label: 'Company',        key: 'company', type: 'text',  required: false },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">{f.label}</label>
                  <input type={f.type} required={f.required}
                    value={(form as any)[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson bg-white dark:bg-gray-800 dark:text-white" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Additional Notes</label>
                <textarea rows={3} value={form.notes}
                  onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                  className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson resize-none bg-white dark:bg-gray-800 dark:text-white" />
              </div>
              {/* Items summary */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Items in Quote</p>
                {items.map(i => (
                  <div key={i.id} className="flex justify-between text-xs text-gray-600 dark:text-gray-300 py-1">
                    <span>{i.name}</span><span>×{i.qty}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-6 py-5 border-t border-gray-100 dark:border-gray-800 space-y-3">
              <button type="submit" disabled={submitting} data-hover
                className="w-full py-4 bg-crimson text-white font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-crimson-dark transition-colors disabled:opacity-60">
                {submitting ? 'Sending…' : <><Send className="w-4 h-4" /> Send Quote Request</>}
              </button>
              <button type="button" onClick={() => setStep('cart')} data-hover
                className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors">
                ← Back to list
              </button>
            </div>
          </form>
        )}

        {/* ── STEP 3: Sent ── */}
        {step === 'sent' && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6 text-center">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
              <Send className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-crimson-dark dark:text-white mb-2">Quote Sent!</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                We'll get back to you within 24 hours at <strong>{form.email}</strong>
              </p>
            </div>
            <button onClick={() => { setStep('cart'); close(); }} data-hover
              className="px-6 py-3 bg-crimson text-white font-medium rounded-full hover:bg-crimson-dark transition-colors">
              Close
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;