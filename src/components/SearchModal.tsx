import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SearchItem {
  id: string;
  title: string;
  desc: string;
  href: string;
  tag: string;
}

const DATA: SearchItem[] = [
  { id:'1', title:'Distribution Panels',       desc:'Main distribution boards, sub-panels, IEC 61439',            href:'/distribution-panels',  tag:'Product' },
  { id:'2', title:'Lighting Solutions',         desc:'LED architectural lighting, façade, interior, outdoor',      href:'/lighting-solutions',   tag:'Product' },
  { id:'3', title:'Cables & Wiring',            desc:'Low voltage, medium voltage, armoured, fire resistant cables',href:'/cables-wiring',        tag:'Product' },
  { id:'4', title:'Industrial Systems',         desc:'MCC, VSD, PFC, PLC/SCADA, UPS, earthing',                   href:'/industrial-systems',   tag:'Product' },
  { id:'5', title:'Main Distribution Board',    desc:'Up to 4000A, 400V, IEC 61439 certified',                    href:'/distribution-panels',  tag:'Item'    },
  { id:'6', title:'LED Architectural Lighting', desc:'50,000+ hours, CE RoHS, 220-240V',                          href:'/lighting-solutions',   tag:'Item'    },
  { id:'7', title:'Power Cables',               desc:'1.5mm² to 300mm², up to 33kV, IEC 60502',                   href:'/cables-wiring',        tag:'Item'    },
  { id:'8', title:'Industrial Control Systems', desc:'PLC/SCADA, UL/CE certified, 24-415V',                       href:'/industrial-systems',   tag:'Item'    },
  { id:'9', title:'Contact Us',                 desc:'Get in touch with our sales and engineering team',           href:'/contact',              tag:'Page'    },
  { id:'10',title:'Technical Support',          desc:'FAQs, phone support, on-site service',                      href:'/technical-support',    tag:'Page'    },
  { id:'11',title:'Our Mission',                desc:'Who we are and what drives us',                              href:'/mission',              tag:'Page'    },
  { id:'12',title:'Certifications',             desc:'IEC, CE, RoHS, ISO 9001:2015 certificates',                 href:'/certifications',       tag:'Page'    },
  { id:'13',title:'Warranty Information',       desc:'24-month warranty on panels, 36-month on lighting',         href:'/warranty',             tag:'Page'    },
  { id:'14',title:'Documentation',              desc:'Datasheets, manuals, test reports',                         href:'/documentation',        tag:'Page'    },
  { id:'15',title:'Careers',                    desc:'Open positions at AMPVIA',                                  href:'/careers',              tag:'Page'    },
];

const TAG_COLORS: Record<string, string> = {
  Product: 'bg-crimson/10 text-crimson',
  Item:    'bg-blue-50 text-blue-600',
  Page:    'bg-gray-100 text-gray-500',
};

interface SearchModalProps { onClose: () => void; }

const SearchModal = ({ onClose }: SearchModalProps) => {
  const [q,       setQ]       = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 50); }, []);

  useEffect(() => {
    const lower = q.toLowerCase().trim();
    if (!lower) { setResults(DATA.slice(0, 6)); return; }
    setResults(
      DATA.filter(d =>
        d.title.toLowerCase().includes(lower) ||
        d.desc.toLowerCase().includes(lower) ||
        d.tag.toLowerCase().includes(lower)
      ).slice(0, 8)
    );
  }, [q]);

  const onKey = (e: React.KeyboardEvent) => { if (e.key === 'Escape') onClose(); };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-[300] backdrop-blur-sm" onClick={onClose} />
      <div className="fixed top-[10vh] left-1/2 -translate-x-1/2 w-full max-w-xl z-[301] px-4">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">

          {/* Input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-gray-800">
            <Search className="w-5 h-5 text-crimson flex-shrink-0" />
            <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)} onKeyDown={onKey}
              placeholder="Search products, services, pages…"
              className="flex-1 text-sm bg-transparent focus:outline-none text-gray-800 dark:text-white placeholder-gray-400" />
            {q && (
              <button onClick={() => setQ('')} data-hover className="text-gray-300 hover:text-gray-500">
                <X className="w-4 h-4" />
              </button>
            )}
            <button onClick={onClose} data-hover
              className="text-xs text-gray-400 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 hover:border-gray-400 transition-colors">
              ESC
            </button>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto py-2">
            {results.length === 0 ? (
              <p className="text-center text-sm text-gray-400 py-8">No results found</p>
            ) : results.map(r => (
              <Link key={r.id} to={r.href} onClick={onClose} data-hover
                className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-gray-800 dark:text-white">{r.title}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${TAG_COLORS[r.tag]}`}>{r.tag}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{r.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-crimson transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>

          {/* Footer */}
          {!q && (
            <div className="px-5 py-3 border-t border-gray-50 dark:border-gray-800">
              <p className="text-xs text-gray-400">Popular: <button className="text-crimson hover:underline ml-1" onClick={() => setQ('panels')}>panels</button>, <button className="text-crimson hover:underline ml-1" onClick={() => setQ('lighting')}>lighting</button>, <button className="text-crimson hover:underline ml-1" onClick={() => setQ('cables')}>cables</button></p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchModal;
