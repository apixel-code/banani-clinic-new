import { useEffect, useState } from 'react';
import { Plus, Trash2, X, Save, ImageOff } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useToast } from '../components/Toast';

const CATS = ['Clinic', 'Before & After', 'Procedures', 'Team'];
const empty = { url: '', caption: '', category: 'Clinic', alt_text: '' };

export default function ManageGallery() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ ...empty });
  const [saving, setSaving] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const toast = useToast();

  const load = () => {
    setLoading(true);
    supabase.from('gallery_images').select('*').order('created_at', { ascending: false }).then(({ data }) => { setImages(data || []); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!form.url.trim()) { toast('Image URL is required.', 'error'); return; }
    setSaving(true);
    const { error } = await supabase.from('gallery_images').insert([form]);
    setSaving(false);
    if (error) { toast('Failed to add image.', 'error'); return; }
    toast('Image added!', 'success');
    setModal(false);
    setForm({ ...empty });
    load();
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    await supabase.from('gallery_images').delete().eq('id', id);
    toast('Image deleted.', 'success');
    load();
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <p className="text-gray-500 text-sm">{images.length} images total</p>
        <button onClick={() => { setModal(true); setForm({ ...empty }); setPreviewError(false); }} className="btn-primary text-sm px-4 py-2.5"><Plus size={16}/> Add Image</button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="aspect-square bg-gray-200 rounded-xl animate-pulse" />)}
        </div>
      ) : images.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <ImageOff size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">No images yet. Add your first image!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((img) => (
            <div key={img.id} className="relative group aspect-square bg-gray-100 rounded-xl overflow-hidden">
              <img src={img.url} alt={img.alt_text || img.caption} className="w-full h-full object-cover" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3845806/pexels-photo-3845806.jpeg'; }} />
              <div className="absolute inset-0 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: 'rgba(26,58,92,0.7)' }}>
                <div className="flex justify-end p-2">
                  <button onClick={() => remove(img.id)} className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center text-white transition-colors"><Trash2 size={14}/></button>
                </div>
                <div className="p-2">
                  <span className="text-white text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(43,124,193,0.9)' }}>{img.category}</span>
                  {img.caption && <p className="text-white/80 text-xs mt-1 truncate">{img.caption}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold" style={{ color: '#1A3A5C' }}>Add Gallery Image</h2>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="label">Image URL *</label>
                <input className="input-field" placeholder="https://..." value={form.url} onChange={(e) => { setForm({ ...form, url: e.target.value }); setPreviewError(false); }} />
              </div>
              {form.url && (
                <div className="rounded-xl overflow-hidden h-40 bg-gray-100">
                  {previewError ? <div className="h-full flex items-center justify-center text-gray-400 text-sm"><ImageOff size={20} className="mr-2" />Image not found</div>
                    : <img src={form.url} alt="Preview" className="w-full h-full object-cover" onError={() => setPreviewError(true)} />}
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Category</label>
                  <select className="input-field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {CATS.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Caption</label>
                  <input className="input-field" placeholder="Optional caption" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="label">Alt Text</label>
                <input className="input-field" placeholder="Describe the image for accessibility" value={form.alt_text} onChange={(e) => setForm({ ...form, alt_text: e.target.value })} />
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setModal(false)} className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={save} disabled={saving} className="btn-primary text-sm px-5 py-2 disabled:opacity-60">
                {saving ? 'Saving...' : <><Save size={15}/> Add Image</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
