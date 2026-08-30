import { useState, useEffect } from 'react'
import { supabase, isConfigured, ADMIN_EMAIL } from '../lib/supabase'
import { Lock, LogOut, Save, Plus, Trash2, ArrowLeft, Loader2, Upload } from 'lucide-react'

// Uploads a file to a Supabase Storage bucket and returns its public URL.
async function uploadImage(bucket, file) {
  const ext = file.name.split('.').pop()
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true })
  if (error) throw error
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl
}

// An image field: shows a preview + an Upload button.
function ImageField({ label, value, bucket, onChange }) {
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const pick = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setErr(''); setBusy(true)
    try { onChange(await uploadImage(bucket, file)) }
    catch (x) { setErr(x.message) }
    finally { setBusy(false) }
  }
  return (
    <label className="block sm:col-span-2">
      <span className="text-xs font-medium text-neutral-500">{label}</span>
      <div className="mt-1 flex items-center gap-3">
        {value
          ? <img src={value} alt="preview" className="w-16 h-16 rounded-lg object-cover border border-black/10 dark:border-white/10" />
          : <div className="w-16 h-16 rounded-lg bg-black/5 dark:bg-white/10 grid place-items-center text-neutral-400 text-xs">none</div>}
        <label className="inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg glass cursor-pointer hover:scale-105 transition">
          {busy ? <Loader2 className="animate-spin" size={14} /> : <Upload size={14} />}
          {busy ? 'Uploading…' : 'Upload image'}
          <input type="file" accept="image/*" className="hidden" onChange={pick} disabled={busy} />
        </label>
        {value && <button type="button" onClick={() => onChange('')} className="text-xs text-red-600">remove</button>}
      </div>
      {err && <p className="text-xs text-red-600 mt-1">{err}</p>}
    </label>
  )
}

// ---- small reusable field ----
function Field({ label, value, onChange, textarea, type = 'text' }) {
  const cls =
    'w-full px-3 py-2 rounded-lg bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none focus:ring-2 ring-black/20 dark:ring-white/20 text-sm'
  return (
    <label className="block">
      <span className="text-xs font-medium text-neutral-500">{label}</span>
      {textarea ? (
        <textarea rows={3} value={value || ''} onChange={(e) => onChange(e.target.value)} className={cls + ' mt-1'} />
      ) : (
        <input type={type} value={value ?? ''} onChange={(e) => onChange(e.target.value)} className={cls + ' mt-1'} />
      )}
    </label>
  )
}

// ---- login screen ----
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const signIn = async (e) => {
    e.preventDefault()
    setErr(''); setBusy(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setBusy(false)
    if (error) setErr(error.message)
  }

  return (
    <div className="min-h-screen grid place-items-center px-6">
      <form onSubmit={signIn} className="glass rounded-3xl p-8 w-full max-w-sm space-y-4">
        <div className="flex items-center gap-2 text-lg font-bold"><Lock size={18} /> Admin Login</div>
        <p className="text-xs text-neutral-500">Enter your admin email and password to continue.</p>
        <Field label="Email" value={email} onChange={setEmail} type="email" />
        <Field label="Password" value={password} onChange={setPassword} type="password" />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <button disabled={busy} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-medium disabled:opacity-50">
          {busy ? <Loader2 className="animate-spin" size={16} /> : 'Sign In'}
        </button>
        <a href="#/" className="block text-center text-xs text-neutral-500 hover:underline">← Back to site</a>
      </form>
    </div>
  )
}

// ---- editor for a list-type table (stats, skills, projects, experience) ----
function ListEditor({ table, title, fields }) {
  const [rows, setRows] = useState([])
  const [busy, setBusy] = useState(true)
  const [msg, setMsg] = useState('')

  const load = async () => {
    setBusy(true)
    const { data } = await supabase.from(table).select('*').order('sort')
    setRows(data || []); setBusy(false)
  }
  useEffect(() => { load() }, [])

  const update = (id, key, val) =>
    setRows(rows.map((r) => (r.id === id ? { ...r, [key]: val } : r)))

  const addRow = async () => {
    const blank = { sort: rows.length + 1 }
    fields.forEach((f) => { if (!(f.key in blank)) blank[f.key] = f.num ? 80 : '' })
    const { data, error } = await supabase.from(table).insert(blank).select().single()
    if (!error && data) setRows([...rows, data])
  }

  const removeRow = async (id) => {
    await supabase.from(table).delete().eq('id', id)
    setRows(rows.filter((r) => r.id !== id))
  }

  const saveRow = async (row) => {
    setMsg('')
    const payload = {}
    fields.forEach((f) => { payload[f.key] = f.num ? Number(row[f.key]) : row[f.key] })
    payload.sort = Number(row.sort) || 0
    const { error } = await supabase.from(table).update(payload).eq('id', row.id)
    setMsg(error ? `Error: ${error.message}` : `Saved "${title}" ✓`)
    setTimeout(() => setMsg(''), 2500)
  }

  if (busy) return <Loader2 className="animate-spin" />
  return (
    <section className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold">{title}</h3>
        <button onClick={addRow} className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black">
          <Plus size={14} /> Add
        </button>
      </div>
      {msg && <p className="text-xs mb-3 text-green-600">{msg}</p>}
      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.id} className="rounded-xl border border-black/10 dark:border-white/10 p-4">
            <div className="grid sm:grid-cols-2 gap-3">
              {fields.map((f) => (
                f.image ? (
                  <ImageField key={f.key} label={f.label} value={row[f.key]} bucket={f.bucket || 'certificates'}
                    onChange={(v) => update(row.id, f.key, v)} />
                ) : (
                  <Field key={f.key} label={f.label} value={row[f.key]}
                    textarea={f.textarea} type={f.num ? 'number' : 'text'}
                    onChange={(v) => update(row.id, f.key, v)} />
                )
              ))}
              <Field label="Order" value={row.sort} type="number" onChange={(v) => update(row.id, 'sort', v)} />
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={() => saveRow(row)} className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-black text-white dark:bg-white dark:text-black">
                <Save size={14} /> Save
              </button>
              <button onClick={() => removeRow(row.id)} className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg text-red-600 border border-red-200">
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ---- profile editor (single row) ----
function ProfileEditor() {
  const [p, setP] = useState(null)
  const [msg, setMsg] = useState('')
  useEffect(() => {
    supabase.from('profile').select('*').eq('id', 1).maybeSingle().then(({ data }) => setP(data || { id: 1 }))
  }, [])
  const set = (k, v) => setP({ ...p, [k]: v })
  const save = async () => {
    setMsg('')
    const { error } = await supabase.from('profile').upsert({ ...p, id: 1, updated_at: new Date().toISOString() })
    setMsg(error ? `Error: ${error.message}` : 'Profile saved ✓')
    setTimeout(() => setMsg(''), 2500)
  }
  if (!p) return <Loader2 className="animate-spin" />
  const F = [
    ['brand', 'Brand (logo text)'], ['greeting', 'Greeting'], ['first_name', 'First name'],
    ['last_name', 'Last name'], ['role', 'Role'], ['tag', 'Tag pill'],
    ['availability', 'Availability text'], ['photo_url', 'Photo URL'], ['resume_url', 'Resume URL'],
    ['email', 'Contact email'], ['github', 'GitHub URL'], ['linkedin', 'LinkedIn URL'],
    ['twitter', 'Twitter URL'], ['instagram', 'Instagram URL'],
  ]
  return (
    <section className="glass rounded-2xl p-5">
      <h3 className="font-bold mb-4">Profile & Hero</h3>
      {msg && <p className="text-xs mb-3 text-green-600">{msg}</p>}
      <div className="grid sm:grid-cols-2 gap-3">
        {F.map(([k, l]) => <Field key={k} label={l} value={p[k]} onChange={(v) => set(k, v)} />)}
      </div>
      <div className="mt-3 grid gap-3">
        <Field label="Bio (hero paragraph)" value={p.bio} textarea onChange={(v) => set('bio', v)} />
        <Field label="About Me paragraph" value={p.about} textarea onChange={(v) => set('about', v)} />
      </div>
      <button onClick={save} className="mt-4 inline-flex items-center gap-1 text-sm px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black">
        <Save size={14} /> Save profile
      </button>
    </section>
  )
}

// ---- messages viewer ----
function Messages() {
  const [rows, setRows] = useState([])
  useEffect(() => {
    supabase.from('messages').select('*').order('created_at', { ascending: false }).then(({ data }) => setRows(data || []))
  }, [])
  const del = async (id) => {
    await supabase.from('messages').delete().eq('id', id)
    setRows(rows.filter((r) => r.id !== id))
  }
  return (
    <section className="glass rounded-2xl p-5">
      <h3 className="font-bold mb-4">Contact Messages ({rows.length})</h3>
      {rows.length === 0 && <p className="text-sm text-neutral-500">No messages yet.</p>}
      <div className="space-y-3">
        {rows.map((m) => (
          <div key={m.id} className="rounded-xl border border-black/10 dark:border-white/10 p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">{m.name} · <a className="hover:underline" href={`mailto:${m.email}`}>{m.email}</a></span>
              <button onClick={() => del(m.id)} className="text-red-600"><Trash2 size={14} /></button>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">{m.body}</p>
            <p className="text-xs text-neutral-400 mt-1">{new Date(m.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Dashboard({ email }) {
  return (
    <div className="min-h-screen max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold">Admin Dashboard</h1>
          <p className="text-xs text-neutral-500">Signed in as {email}</p>
        </div>
        <div className="flex gap-2">
          <a href="#/" className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-full glass"><ArrowLeft size={14} /> View site</a>
          <button onClick={() => supabase.auth.signOut()} className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black"><LogOut size={14} /> Sign out</button>
        </div>
      </div>
      <div className="space-y-6">
        <ProfileEditor />
        <ListEditor table="stats" title="Stats" fields={[
          { key: 'value', label: 'Value (e.g. 15+)' }, { key: 'label', label: 'Label' },
        ]} />
        <ListEditor table="skills" title="Skills" fields={[
          { key: 'name', label: 'Skill name' }, { key: 'level', label: 'Level (0-100)', num: true },
        ]} />
        <ListEditor table="projects" title="Projects" fields={[
          { key: 'title', label: 'Title' }, { key: 'desc', label: 'Description', textarea: true },
          { key: 'tags', label: 'Tags (comma separated)' }, { key: 'link', label: 'Link URL' },
        ]} />
        <ListEditor table="experience" title="Experience" fields={[
          { key: 'role', label: 'Role' }, { key: 'org', label: 'Organisation' },
          { key: 'period', label: 'Period' }, { key: 'desc', label: 'Description', textarea: true },
        ]} />
        <ListEditor table="certificates" title="Certificates & Achievements" fields={[
          { key: 'title', label: 'Title' }, { key: 'issuer', label: 'Issuer / Event' },
          { key: 'year', label: 'Year' }, { key: 'desc', label: 'Description', textarea: true },
          { key: 'link', label: 'Credential URL (optional)' },
          { key: 'image_url', label: 'Certificate image', image: true, bucket: 'certificates' },
        ]} />
        <Messages />
      </div>
    </div>
  )
}

export default function Admin() {
  const [session, setSession] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!isConfigured) { setReady(true); return }
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true) })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  if (!isConfigured) {
    return (
      <div className="min-h-screen grid place-items-center px-6 text-center">
        <div className="glass rounded-3xl p-8 max-w-md">
          <Lock className="mx-auto mb-3" />
          <h2 className="text-xl font-bold mb-2">Admin not connected yet</h2>
          <p className="text-sm text-neutral-500">Add your Supabase keys (see SETUP_GUIDE) to enable secure admin login and editing.</p>
          <a href="#/" className="inline-block mt-4 text-sm hover:underline">← Back to site</a>
        </div>
      </div>
    )
  }

  if (!ready) return <div className="min-h-screen grid place-items-center"><Loader2 className="animate-spin" /></div>
  if (!session) return <Login />

  const isAdmin = session.user?.email === ADMIN_EMAIL
  if (!isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center px-6 text-center">
        <div className="glass rounded-3xl p-8 max-w-md">
          <h2 className="text-xl font-bold mb-2">Access denied</h2>
          <p className="text-sm text-neutral-500">This account ({session.user.email}) is not authorised to edit this site.</p>
          <button onClick={() => supabase.auth.signOut()} className="mt-4 text-sm hover:underline">Sign out</button>
        </div>
      </div>
    )
  }

  return <Dashboard email={session.user.email} />
}
