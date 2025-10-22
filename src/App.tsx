import React, { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Search, Download, Bell, ArrowLeft, Check, BadgeCheck, Mail } from 'lucide-react'
import { SITE, computeSubs } from './data/site'
import { PROJECTS } from './data/projects'
import { PLAYLISTS } from './data/playlists'
import { POSTS } from './data/posts'
import { CERTS } from './data/certificates'
import type { Project } from './types'
import { relativeTimeFromISO } from './lib/time'

// ---------- Small UI Bits ----------
function Tag({ label }: { label:string }) {
  return <span className="text-xs bg-brand-peach text-brand-brown px-2 py-0.5 rounded-full mr-1 border border-brand-border">#{label}</span>
}

function Thumb({ title }: { title:string }) {
  return (
    <div className="w-full aspect-video rounded-lg bg-gradient-to-br from-brand-peach via-brand-peachMid to-brand-peach grid place-items-center border border-brand-border">
      <span className="text-zinc-600 text-xs px-2 text-center">{title}</span>
    </div>
  )
}

function LoaderBar({ loading }: { loading: boolean }) {
  return (
    <div className="h-0.5 bg-brand-peachMid overflow-hidden">
      <div className={`h-0.5 bg-brand-brown transition-all duration-500 ${loading ? 'w-full' : 'w-0'}`} />
    </div>
  )
}

function CenterSpinner() {
  return (
    <div className="w-full py-12 grid place-items-center">
      <div className="flex items-center gap-3 text-zinc-600">
        <div className="h-4 w-4 rounded-full border-2 border-brand-brown border-t-transparent animate-spin" />
        <span className="text-sm">Loading…</span>
      </div>
    </div>
  )
}

function LogoMark() {
  return (
    <div className="h-6 w-8 rounded-md border-2 border-brand-brown grid place-items-center overflow-hidden bg-brand-peach">
      <img src={SITE.logoPath} alt="Mai's Data Diaries logo" className="h-5 w-7 object-contain" />
    </div>
  )
}

function TopBar({ onHome, q, setQ }: { onHome: ()=>void, q: string, setQ: (v: string)=>void }) {
  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-brand-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center gap-3">
        <button onClick={onHome} aria-label="Go to channel home" className="inline-flex items-center gap-2">
          <LogoMark />
          <span className="sr-only">Mai's Data Diaries</span>
        </button>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 w-full max-w-xl border border-brand-border shadow-soft">
            <Search className="w-4 h-4 text-zinc-500" aria-hidden />
            <input
              aria-label="Search projects and posts"
              value={q}
              onChange={(e)=>setQ(e.target.value)}
              placeholder="Search Data Diaries..."
              className="bg-transparent outline-none flex-1 text-sm text-zinc-800 placeholder:text-zinc-400"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// ---------- Header ----------
function ChannelHeader() {
  const baseSubs = computeSubs()
  const [subscribed, setSubscribed] = useState(false)
  const subs = baseSubs + (subscribed ? 1 : 0)

  return (
    <div className="w-full">
      <div className="relative w-full border-b border-brand-border bg-brand-peach">
        <div className="mx-auto w-full max-w-5xl px-4">
          {SITE.bannerUrl ? (
            <img
              src={SITE.bannerUrl}
              alt="Channel banner"
              className="block w-full max-w-[1200px] h-[310px] object-cover object-center mx-auto"
              loading="eager"
              decoding="async"
            />
          ) : (
            <div className="w-full max-w-[1200px] h-[310px] mx-auto bg-gradient-to-r from-brand-peach via-brand-peachMid to-brand-peach" />
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full border-2 border-brand-border shadow-soft overflow-hidden bg-white text-2xl grid place-items-center">
          {SITE.avatarUrl ? (
            <img src={SITE.avatarUrl} alt={`${SITE.name} avatar`} className="w-full h-full object-cover transform scale-[1.9]" />
          ) : (
            <span>{SITE.avatarEmoji}</span>
          )}
        </div>
        <div className="flex-1">
          <div className="text-2xl md:text-3xl font-bold text-zinc-900 flex items-center gap-2">
            {SITE.name}
            <BadgeCheck className="w-5 h-5 text-brand-brown" strokeWidth={3.5} aria-label="Verified" />
          </div>
          <div className="text-sm"><span className="font-semibold text-zinc-800">{SITE.handle}</span> • {subs.toLocaleString()} Subscribers & Stars <span title="Sum of GitHub stars + LinkedIn followers" className="text-zinc-400 text-xs">ⓘ</span></div>
        </div>
        <div className="flex items-center gap-2">
          {!subscribed ? (
            <button
              className="flex items-center gap-2 bg-brand-brown text-white px-3 py-2 rounded-full font-medium shadow-soft hover:bg-brand-brownDark"
              onClick={()=>setSubscribed(true)}
              aria-label="Subscribe on GitHub"
            >
              <Bell className="w-4 h-4"/> Subscribe
            </button>
          ) : (
            <button
              className="flex items-center gap-2 bg-white text-brand-brown border border-brand-border px-3 py-2 rounded-full font-medium shadow-soft"
              onClick={()=>setSubscribed(false)}
              aria-label="Unsubscribe"
              title="Click to unsubscribe"
            >
              <Check className="w-4 h-4"/> Subscribed
            </button>
          )}
          <a className="flex items-center gap-2 bg-white border border-brand-border px-3 py-2 rounded-full shadow-soft" aria-label="Download resume" href={SITE.resumeUrl} target="_blank" rel="noreferrer"><Download className="w-4 h-4"/> Join</a>
          <button className="p-2 rounded-full bg-white border border-brand-border shadow-soft" aria-label="GitHub">
            <GithubIcon className="w-5 h-5 text-zinc-700" />
          </button>
          <a
            className="p-2 rounded-full bg-white border border-brand-border shadow-soft"
            aria-label="LinkedIn"
            href={SITE.linkedinUrl}
            target="_blank"
            rel="noreferrer"
          >
            <LinkedinIcon className="w-5 h-5 text-zinc-700" />
          </a>
          <a
            className="p-2 rounded-full bg-white border border-brand-border shadow-soft"
            aria-label="Email"
            href="mailto:mqlam@andrew.cmu.edu"
          >
            <Mail className="w-5 h-5 text-zinc-700" />
          </a>
        </div>
      </div>

      <motion.div initial={{opacity:0,y:-5}} animate={{opacity:1,y:0}} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
        <div className="flex gap-2 overflow-x-auto py-2">
          {SITE.techStack.map(s=> (
            <span key={s} className="text-xs whitespace-nowrap bg-white border border-brand-border px-3 py-1 rounded-full text-zinc-700 shadow-soft">{s}</span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// ---------- Cards ----------
function ProjectCard({ p, onOpen }: { p: Project, onOpen: (p: Project)=>void }) {
  return (
    <motion.button whileHover={{ scale: 1.02 }} onClick={()=>onOpen(p)} className="text-left bg-white rounded-xl overflow-hidden shadow-soft border border-brand-border">
      <div className="relative">
        <Thumb title={p.title} />
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition bg-black/5 flex items-center justify-center">
          <div className="flex items-center gap-2 bg-brand-brown text-white px-3 py-1.5 rounded-full shadow-soft"><Play className="w-4 h-4"/> View Project</div>
        </div>
      </div>
      <div className="p-3">
        <div className="font-medium text-zinc-900 line-clamp-2">{p.title}</div>
        <div className="text-sm text-zinc-500 line-clamp-1 mt-1">{p.description}</div>
        <div className="text-xs text-zinc-500 mt-2">{p.views.toLocaleString()} views • {relativeTimeFromISO(p.date)}</div>
        <div className="mt-2">{p.tags.slice(0,4).map(t=> <Tag key={t} label={t} />)}</div>
      </div>
    </motion.button>
  )
}

function PlaylistRow({ onOpen }: { onOpen: (p: Project)=>void }) {
  return (
    <div className="mt-8">
      {PLAYLISTS.map(pl => {
        const list = PROJECTS.filter(p=>p.playlists.includes(pl.slug)).sort((a,b)=> new Date(b.date).getTime()-new Date(a.date).getTime())
        return (
          <div key={pl.slug} className="mb-6">
            <div className="flex items-center justify-between px-1 mb-2">
              <h3 className="font-semibold text-zinc-800">{pl.title}</h3>
              <span className="text-sm text-brand-brown cursor-default">View playlist</span>
            </div>
            <div className="flex gap-3 overflow-x-auto">
              {list.map(p => (
                <button key={p.id} onClick={()=>onOpen(p)} className="min-w-[260px] bg-white rounded-lg overflow-hidden border border-brand-border shadow-soft text-left">
                  <Thumb title={p.title} />
                  <div className="p-2 text-sm text-zinc-600 line-clamp-3">{p.description}</div>
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function PostCard({ post }: { post: { id:string; text:string; likes:number; comments:number; date:string } }) {
  return (
    <div className="bg-white rounded-xl p-3 border border-brand-border shadow-soft">
      <div className="text-sm text-zinc-500">{relativeTimeFromISO(post.date)}</div>
      <p className="mt-2 whitespace-pre-wrap text-zinc-800">{post.text}</p>
      <div className="mt-3 text-xs text-zinc-500">👍 {post.likes} • 💬 {post.comments}</div>
    </div>
  )
}

// ---------- Tabs & Views ----------
const TABS = ['home','shorts','playlists','posts','about'] as const

type Tab = typeof TABS[number]

type View = { name: 'channel' } | { name: 'video', projectId: string }

export default function App() {
  const [tab, setTab] = useState<Tab>('home')
  const [displayTab, setDisplayTab] = useState<Tab>('home')
  const [q, setQ] = useState('')
  const [view, setView] = useState<View>({ name: 'channel' })
  const [loading, setLoading] = useState(false)

  const startLoad = (cb: () => void) => { setLoading(true); setTimeout(() => { cb(); setLoading(false) }, 450) }
  const onChangeTab = (t: Tab) => { if (t!==tab) { setTab(t); startLoad(()=> setDisplayTab(t)) } }
  const goHome = () => { if (view.name!=='channel') setView({ name:'channel' }); setTab('home'); setDisplayTab('home') }
  const openProject = (p: Project) => startLoad(()=> setView({ name:'video', projectId: p.id }))
  const backToChannel = () => startLoad(()=> setView({ name:'channel' }))

  const filtered = useMemo(()=>{
    const term = q.toLowerCase().trim()
    const base = term
      ? PROJECTS.filter(p => p.title.toLowerCase().includes(term) || p.description.toLowerCase().includes(term) || p.tags.some(t=>t.toLowerCase().includes(term)) || p.category.toLowerCase().includes(term))
      : PROJECTS
    return [...base].sort((a,b)=> new Date(b.date).getTime()-new Date(a.date).getTime())
  }, [q])

  if (view.name === 'video') {
    const p = PROJECTS.find(x=>x.id===view.projectId)
    return (
      <>
        <TopBar onHome={goHome} q={q} setQ={setQ} />
        <div className="min-h-[80vh] bg-white text-zinc-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><LoaderBar loading={loading} /></div>
          {loading ? (
            <CenterSpinner />
          ) : p ? (
            <VideoPage p={p} onBack={backToChannel} onOpen={openProject} />
          ) : (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <button onClick={backToChannel} className="inline-flex items-center gap-2 text-sm text-zinc-700"><ArrowLeft className="w-4 h-4"/> Back</button>
              <div className="mt-6">Not found</div>
            </div>
          )}
        </div>
      </>
    )
  }

  return (
    <>
      <TopBar onHome={goHome} q={q} setQ={setQ} />
      <div className="min-h-[80vh] bg-white text-zinc-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ChannelHeader />
          <div className="mt-4 border-b border-brand-border">
            <div className="flex gap-2 sm:gap-4">
              {TABS.map(t => (
                <button key={t} onClick={()=>onChangeTab(t)} className={`uppercase text-xs tracking-wide py-3 border-b-2 ${tab===t? 'border-brand-brown text-brand-brown' : 'border-transparent text-zinc-500 hover:text-zinc-800'}`}>{t}</button>
              ))}
            </div>
            <LoaderBar loading={loading} />
          </div>

          <main className="py-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <section className="lg:col-span-9">
              {loading ? (
                <CenterSpinner />
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div key={displayTab + q} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
                    {displayTab === 'home' && (
                      <>
                        {q && <div className="text-sm text-zinc-500 mb-3">Showing results for <span className="text-zinc-700">“{q}”</span></div>}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {filtered.map(p=> <ProjectCard key={p.id} p={p} onOpen={openProject} />)}
                        </div>
                        <PlaylistRow onOpen={openProject} />
                      </>
                    )}

                    {displayTab === 'shorts' && (
                      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                        {['Cleaning 2M rows in Pandas','Airflow DAG run in 8s','DistilBERT confusion matrix'].map((t,i)=> (
                          <div key={i} className="break-inside-avoid rounded-xl overflow-hidden bg-white border border-brand-border shadow-soft">
                            <div className="w-full h-48 bg-gradient-to-br from-brand-peach via-brand-peachMid to-brand-peach" />
                            <div className="p-2 text-sm text-zinc-700">{t}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {displayTab === 'playlists' && <PlaylistRow onOpen={openProject} />}

                    {displayTab === 'posts' && (
                      <div className="space-y-4">{POSTS.map(p=> <PostCard key={p.id} post={p} />)}</div>
                    )}

                    {displayTab === 'about' && <About />}
                  </motion.div>
                </AnimatePresence>
              )}
            </section>

            <aside className="lg:col-span-3">
              <div className="bg-white rounded-xl p-3 border border-brand-border shadow-soft">
                <CertificateBubbles />
              </div>
            </aside>
          </main>
        </div>
      </div>
    </>
  )
}

// ---------- Video Page ----------
function VideoPage({ p, onBack, onOpen }: { p: Project, onBack: ()=>void, onOpen: (proj: Project)=>void }) {
  const related = PROJECTS.filter(x=>x.id!==p.id && x.playlists.some(pl=>p.playlists.includes(pl))).sort((a,b)=> new Date(b.date).getTime()-new Date(a.date).getTime()).slice(0,6)
  return (
    <div className="min-h-[80vh] bg-white text-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-8">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-zinc-700 mb-3"><ArrowLeft className="w-4 h-4"/> Back to channel</button>
          <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-brand-peach via-brand-peachMid to-brand-peach border border-brand-border grid place-items-center">
            <span className="text-zinc-600 text-sm">Video / Demo Placeholder</span>
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-zinc-900">{p.title}</h1>
          <div className="text-sm text-zinc-500 mt-1">{p.views.toLocaleString()} views • {relativeTimeFromISO(p.date)} • {p.durationHint || 'read'}</div>
          <div className="mt-3 flex flex-wrap gap-2">{p.tags.map(t=> <Tag key={t} label={t} />)}</div>
          <p className="mt-4 text-zinc-700">{p.description}</p>
          <div className="mt-4 flex gap-3 text-sm">
            {p.github && <a className="text-brand-brown underline" href={p.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
            {p.demo && <a className="text-brand-brown underline" href={p.demo} target="_blank" rel="noreferrer">Live Demo ↗</a>}
            {p.report && <a className="text-brand-brown underline" href={p.report} target="_blank" rel="noreferrer">Report ↗</a>}
          </div>
        </section>

        <aside className="lg:col-span-4">
          <h3 className="font-semibold mb-2 text-zinc-800">Related Projects</h3>
          <div className="space-y-3">
            {related.map(r => (
              <button key={r.id} onClick={()=>onOpen(r)} className="flex gap-3 w-full text-left bg-white border border-brand-border rounded-lg overflow-hidden shadow-soft">
                <div className="w-40"><Thumb title={r.title} /></div>
                <div className="py-2 pr-3">
                  <div className="font-medium text-zinc-800 line-clamp-2">{r.title}</div>
                  <div className="text-xs text-zinc-500">{r.views.toLocaleString()} views • {relativeTimeFromISO(r.date)}</div>
                </div>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}

// ---------- About & Certificates ----------
function About() {
  return (
    <div className="prose max-w-none">
      <h2 className="text-3xl font-extrabold tracking-tight text-brand-brown">About Mai’s Data Diaries</h2>
      <p>Hey, I’m Mai, a master’s student at Carnegie Mellon University. Welcome to Data Diaries, my little corner of the internet where I share behind-the-scenes stories from my journey in data engineering, machine learning, and visualization.</p>
      <p>Each “vlog” walks through a project I’ve worked on, from messy datasets to reliable pipelines, with quick recaps, the tools I used, and links to code or demos. I love turning raw logs into clean data flows, building models that actually ship, and telling the story behind the numbers in a way that makes sense to everyone.</p>
      <h3 className="mt-6 text-xl font-semibold uppercase tracking-wide text-brand-brown">Skills</h3>
      <ul className="space-y-3 list-disc pl-5 text-zinc-700">
        <li>
          <span className="font-semibold text-zinc-900">Languages &amp; Libraries</span>
          <ul className="mt-1 list-disc pl-5">
            <li>Python (Pandas, NumPy, Scikit-learn, PySpark, PyTorch)</li>
            <li>SQL</li>
            <li>R</li>
          </ul>
        </li>
        <li>
          <span className="font-semibold text-zinc-900">ML &amp; Statistical Methods</span>
          <ul className="mt-1 list-disc pl-5">
            <li>Supervised &amp; unsupervised learning</li>
            <li>Time series forecasting</li>
            <li>Causal inference &amp; A/B testing</li>
            <li>Natural language processing</li>
          </ul>
        </li>
        <li>
          <span className="font-semibold text-zinc-900">Platforms &amp; Big Data</span>
          <ul className="mt-1 list-disc pl-5">
            <li>Databricks, Snowflake, Spark, Kafka</li>
            <li>AWS, Azure, GCP, Redshift, BigQuery</li>
            <li>Airflow, Git, dbt</li>
          </ul>
        </li>
        <li>
          <span className="font-semibold text-zinc-900">MLOps &amp; GenAI</span>
          <ul className="mt-1 list-disc pl-5">
            <li>Model deployment &amp; lifecycle (MLflow)</li>
            <li>CI/CD (GitHub Actions)</li>
            <li>Docker</li>
            <li>Large language models</li>
          </ul>
        </li>
        <li>
          <span className="font-semibold text-zinc-900">Visualization</span>
          <ul className="mt-1 list-disc pl-5">
            <li>Tableau</li>
            <li>Power BI</li>
            <li>Looker Studio</li>
          </ul>
        </li>
        <li>
          <span className="font-semibold text-zinc-900">Certifications</span>
          <ul className="mt-1 list-disc pl-5">
            <li>DataCamp Data Engineer Associate</li>
            <li>DataCamp Data Scientist Associate</li>
            <li>Google Advanced Data Analytics Professional Certificate</li>
            <li>AWS Certified Machine Learning Engineer – Associate (Expected Oct. 2025)</li>
            <li>Google Data Analytics Professional Certificate</li>
          </ul>
        </li>
      </ul>
      <h3 className="mt-8 text-xl font-semibold uppercase tracking-wide text-brand-brown">Fun Stats</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[['Projects','25+'],['Pipelines','10+'],['Models','12+'],['Dashboards','8+']].map(([k,v])=> (
          <div key={k} className="bg-white rounded-lg p-3 text-center border border-brand-border shadow-soft">
            <div className="text-2xl font-semibold text-zinc-900">{v}</div>
            <div className="text-xs text-zinc-500">{k}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CertificateBubbles() {
  const [open, setOpen] = useState<string|null>(null)
  const curr = CERTS.find(c=>c.id===open)
  return (
    <div>
      <h3 className="text-sm uppercase tracking-wide text-zinc-500 mb-2">Certificates</h3>
      <div className="flex flex-wrap gap-3">
        {CERTS.map(c => (
          <button
            key={c.id}
            onClick={()=>setOpen(c.id)}
            className="flex flex-col items-center gap-2 text-center"
            type="button"
          >
            <div className="w-14 h-14 rounded-full grid place-items-center bg-white border border-brand-border shadow-soft overflow-hidden">
              {c.logo ? (
                <img src={c.logo} alt={`${c.issuer} logo`} className="h-full w-full object-cover scale-110" />
              ) : (
                <span className="text-lg">🎓</span>
              )}
            </div>
            <span className="text-xs text-zinc-700 max-w-[6.5rem] leading-tight">{c.name}</span>
          </button>
        ))}
      </div>

      {curr && (
        <div
          role="dialog"
          aria-modal
          className="fixed inset-0 bg-black/30 flex items-center justify-center p-4"
          onClick={()=>setOpen(null)}
        >
          <div
            className="bg-white max-w-md w-full rounded-xl p-5 border border-brand-border shadow-soft space-y-4"
            onClick={e=>e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full grid place-items-center bg-zinc-100 border border-brand-border overflow-hidden">
                {curr.logo ? (
                  <img src={curr.logo} alt={`${curr.issuer} logo`} className="h-full w-full object-cover scale-110" />
                ) : (
                  <span className="text-xl">🎓</span>
                )}
              </div>
              <div>
                <div className="font-semibold text-zinc-900">{curr.name}</div>
                <div className="text-xs text-zinc-500">{curr.issuer}</div>
              </div>
            </div>
            <p className="text-sm text-zinc-700 leading-relaxed">{curr.takeaway}</p>
            {curr.link ? (
              <a
                href={curr.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-brand-brown font-medium underline"
            >
                View credential &rarr;
              </a>
            ) : null}
            <button className="text-sm text-zinc-500 underline" onClick={()=>setOpen(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.799 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.303.468-2.368 1.235-3.205-.124-.303-.535-1.527.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.296-1.23 3.296-1.23.653 1.649.242 2.873.118 3.176.77.837 1.233 1.902 1.233 3.205 0 4.61-2.804 5.624-5.476 5.921.432.37.824 1.096.824 2.21 0 1.595-.015 2.877-.015 3.27 0 .321.216.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z"
      />
    </svg>
  )
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003zM7.117 20.452H3.561V9h3.556v11.452zM5.339 7.433a2.062 2.062 0 01-2.058-2.056A2.062 2.062 0 015.34 3.32a2.06 2.06 0 012.058 2.057A2.06 2.06 0 015.34 7.433zM20.447 20.452h-3.554v-5.569c0-1.328-.026-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.047c.476-.9 1.637-1.852 3.369-1.852 3.602 0 4.267 2.37 4.267 5.455v6.288z"
      />
    </svg>
  )
}
