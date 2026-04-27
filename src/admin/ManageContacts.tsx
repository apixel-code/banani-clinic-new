import { useEffect, useState } from 'react';
import { X, Phone, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ManageContacts() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);

  const load = () => {
    setLoading(true);
    supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }).then(({ data }) => { setContacts(data || []); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const view = async (contact: any) => {
    setSelected(contact);
    if (!contact.read) {
      await supabase.from('contact_submissions').update({ read: true }).eq('id', contact.id);
      setContacts((prev) => prev.map((c) => c.id === contact.id ? { ...c, read: true } : c));
    }
  };

  const unread = contacts.filter((c) => !c.read).length;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <p className="text-gray-500 text-sm">{contacts.length} submissions total</p>
        {unread > 0 && <span className="badge text-xs text-white" style={{ backgroundColor: '#FF6B35' }}>{unread} unread</span>}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>{['Name','Phone','Email','Pref. Date','Submitted','Action'].map((h) => <th key={h} className="text-left px-4 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wider">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? Array.from({ length: 4 }).map((_, i) => (
                <tr key={i}>{Array.from({ length: 6 }).map((_, j) => <td key={j} className="px-4 py-3"><div className="h-4 bg-gray-200 rounded animate-pulse" /></td>)}</tr>
              )) : contacts.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {!c.read && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#2B7CC1' }} />}
                      <span className={`text-xs font-medium ${!c.read ? 'text-gray-900' : 'text-gray-600'}`}>{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><a href={`tel:${c.phone}`} className="text-xs text-blue-600 hover:underline">{c.phone}</a></td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{c.email || '—'}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{c.preferred_date || '—'}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => view(c)} className="px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors" style={{ borderColor: '#2B7CC1', color: '#2B7CC1' }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#EBF4FF'; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && contacts.length === 0 && <tr><td colSpan={6} className="text-center py-10 text-gray-400 text-sm">No contact submissions yet</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="font-bold" style={{ color: '#1A3A5C' }}>{selected.name}</h2>
                <p className="text-xs text-gray-400">{new Date(selected.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Phone</p>
                  <a href={`tel:${selected.phone}`} className="text-sm font-semibold flex items-center gap-1.5 hover:text-blue-600 transition-colors" style={{ color: '#1A3A5C' }}><Phone size={14} />{selected.phone}</a>
                </div>
                {selected.email && <div>
                  <p className="text-xs text-gray-400 mb-1">Email</p>
                  <a href={`mailto:${selected.email}`} className="text-sm font-semibold flex items-center gap-1.5 hover:text-blue-600 transition-colors" style={{ color: '#1A3A5C' }}><Mail size={14} />{selected.email}</a>
                </div>}
                {selected.preferred_date && <div>
                  <p className="text-xs text-gray-400 mb-1">Preferred Date</p>
                  <p className="text-sm font-semibold" style={{ color: '#1A3A5C' }}>{selected.preferred_date}</p>
                </div>}
              </div>
              {selected.message && (
                <div>
                  <p className="text-xs text-gray-400 mb-2">Message</p>
                  <div className="rounded-xl p-4 text-sm text-gray-700 leading-relaxed" style={{ backgroundColor: '#EBF4FF' }}>{selected.message}</div>
                </div>
              )}
              <span className="badge text-xs" style={{ backgroundColor: selected.read ? '#dcfce7' : '#fef9c3', color: selected.read ? '#166534' : '#854d0e' }}>
                {selected.read ? 'Read' : 'Unread'}
              </span>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
              <a href={`tel:${selected.phone}`} className="btn-primary flex-1 justify-center text-sm py-2.5"><Phone size={15}/> Call Patient</a>
              <button onClick={() => setSelected(null)} className="flex-1 py-2.5 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
