import { useEffect, useState } from 'react';
import { Plus, Pencil as Edit2, Trash2, Eye, EyeOff, X, Save } from 'lucide-react';
import adminApi from '../lib/adminApi';
import { useToast } from '../components/Toast';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

const CATEGORIES = ['Dental Health Tips', 'Treatment Guide', 'Patient Stories', 'Clinic News'];
const emptyPost = { title: '', slug: '', excerpt: '', content: '', meta_description: '', og_image: '', author: 'Dr. Aslam Al Mehdi', category: 'Dental Health Tips', tags: [], published: false };

export default function ManageBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  const load = () => {
    setLoading(true);
    adminApi.getAllBlogPosts().then((data) => { setPosts(data || []); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing.title || !editing.slug) { toast('Title and slug are required.', 'error'); return; }
    setSaving(true);
    const payload = { ...editing, published_at: editing.published ? (editing.published_at || new Date().toISOString()) : null };
    try {
      const editingId = getPostId(editing);
      if (editingId) {
        await adminApi.updateBlogPost(editingId, payload);
      } else {
        await adminApi.createBlogPost(payload);
      }
      setSaving(false);
      toast('Post saved!', 'success');
      setEditing(null);
      load();
    } catch (err) {
      setSaving(false);
      toast('Failed to save post.', 'error');
    }
  };

  const togglePublish = async (id: string, published: boolean) => {
    try {
      await adminApi.updateBlogPost(id, { published: !published, published_at: !published ? new Date().toISOString() : null });
      load();
    } catch (err) { toast('Failed to update post.', 'error'); }
  };

  const getPostId = (post: any) => post?._id || post?.id;

  const remove = async () => {
    const id = getPostId(deleteTarget);
    if (!id) {
      toast('Missing post ID.', 'error');
      return;
    }

    setDeleting(true);
    try {
      await adminApi.deleteBlogPost(id);
      toast('Post deleted.', 'success');
      setDeleteTarget(null);
      load();
    } catch (err) { toast('Failed to delete post.', 'error'); }
    finally { setDeleting(false); }
  };

  const editPost = async (id: string) => {
    try {
      const data = await adminApi.getBlogPostById(id);
      if (data) setEditing(data);
    } catch (err) { toast('Failed to load post.', 'error'); }
  };

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <p className="text-gray-500 text-sm">{posts.length} posts total</p>
        <button onClick={() => setEditing({ ...emptyPost })} className="btn-primary text-sm px-4 py-2.5"><Plus size={16} /> New Post</button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>{['Title','Category','Author','Status','Actions'].map((h) => <th key={h} className="text-left px-4 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wider">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? Array.from({ length: 3 }).map((_, i) => (
                <tr key={i}>{Array.from({ length: 5 }).map((_, j) => <td key={j} className="px-4 py-3"><div className="h-4 bg-gray-200 rounded animate-pulse" /></td>)}</tr>
              )) : posts.map((post) => {
                const postId = getPostId(post);
                const rowKey = postId || `${post.slug}-${post.created_at}`;
                return (
                <tr key={rowKey} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-xs max-w-[200px] truncate" style={{ color: '#1A3A5C' }}>{post.title}</td>
                  <td className="px-4 py-3"><span className="badge text-xs" style={{ backgroundColor: '#EBF4FF', color: '#2268A8' }}>{post.category}</span></td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{post.author}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => togglePublish(postId, post.published)} disabled={!postId} className={`badge text-xs cursor-pointer disabled:opacity-50 ${post.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => editPost(postId)} disabled={!postId} className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors disabled:opacity-50" style={{ backgroundColor: '#EBF4FF', color: '#2B7CC1' }} onMouseEnter={e => (e.currentTarget.style.backgroundColor='#D6E9FF')} onMouseLeave={e => (e.currentTarget.style.backgroundColor='#EBF4FF')}><Edit2 size={14}/></button>
                      <button onClick={() => togglePublish(postId, post.published)} disabled={!postId} className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 transition-colors">{post.published ? <EyeOff size={14}/> : <Eye size={14}/>}</button>
                      <button onClick={() => setDeleteTarget(post)} disabled={!postId} className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 disabled:opacity-50 transition-colors"><Trash2 size={14}/></button>
                    </div>
                  </td>
                </tr>
              );})}
              {!loading && posts.length === 0 && <tr><td colSpan={5} className="text-center text-gray-400 py-10 text-sm">No posts yet</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold" style={{ color: '#1A3A5C' }}>{getPostId(editing) ? 'Edit Post' : 'New Post'}</h2>
              <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="label">Title *</label>
                <input className="input-field" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: getPostId(editing) ? editing.slug : slugify(e.target.value) })} />
              </div>
              <div>
                <label className="label">Slug *</label>
                <input className="input-field font-mono text-sm" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Category</label>
                  <select className="input-field" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">OG Image URL</label>
                  <input className="input-field" placeholder="https://..." value={editing.og_image || ''} onChange={(e) => setEditing({ ...editing, og_image: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="label">Excerpt</label>
                <textarea className="input-field resize-none" rows={3} value={editing.excerpt || ''} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} />
              </div>
              <div>
                <label className="label">Meta Description <span className="text-gray-400 font-normal">({(editing.meta_description || '').length}/160)</span></label>
                <textarea className="input-field resize-none" rows={2} maxLength={160} value={editing.meta_description || ''} onChange={(e) => setEditing({ ...editing, meta_description: e.target.value })} />
              </div>
              <div>
                <label className="label">Content (HTML)</label>
                <textarea className="input-field resize-none font-mono text-xs" rows={10} value={editing.content || ''} onChange={(e) => setEditing({ ...editing, content: e.target.value })} />
              </div>
              <div className="flex items-center gap-3 py-2">
                <input type="checkbox" id="published" checked={editing.published || false} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} className="w-4 h-4 rounded" />
                <label htmlFor="published" className="text-sm font-medium cursor-pointer" style={{ color: '#1A3A5C' }}>Publish immediately</label>
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={save} disabled={saving} className="btn-primary text-sm px-5 py-2 disabled:opacity-60">
                {saving ? 'Saving...' : <><Save size={15}/> Save Post</>}
              </button>
            </div>
          </div>
        </div>
      )}
      <DeleteConfirmModal
        open={!!deleteTarget}
        title="Delete Blog Post"
        message="Are you sure you want to permanently delete this blog post?"
        itemName={deleteTarget?.title}
        confirmLabel="Delete Post"
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={remove}
      />
    </div>
  );
}
