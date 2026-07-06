import { useState } from 'react'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading2,
  List,
  Quote,
  Sparkles,
  StickyNote,
  Loader2,
  Check
} from 'lucide-react'

const SEED = `<h2>Chapitre premier — La cabine d'essayage</h2><p>Darelle poussa le rideau de la cabine, le cœur battant. Dans le miroir, une inconnue lui rendait son regard : plus assurée, presque téméraire. Lucien l'attendait de l'autre côté, et elle savait déjà que rien ne serait plus comme avant.</p>`

function TBtn({ active, onClick, title, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      aria-pressed={active}
      className="grid h-8 w-8 place-items-center rounded-lg transition-colors"
      style={{
        color: active ? '#fff' : 'var(--text-secondary)',
        background: active ? 'var(--accent-color)' : 'transparent'
      }}
    >
      {children}
    </button>
  )
}

export default function EditorPreview() {
  const [tab, setTab] = useState('redaction')
  const [correcting, setCorrecting] = useState(false)
  const [corrected, setCorrected] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({ placeholder: 'Commencez votre histoire ici…' })
    ],
    content: SEED,
    editorProps: {
      attributes: { class: 'focus:outline-none', spellcheck: 'false' }
    }
  })

  if (!editor) return <div className="min-h-[420px]" />

  // Correction simulée : niveau 2 — remplace une répétition et surligne.
  const runCorrection = () => {
    if (correcting) return
    setCorrected(false)
    setCorrecting(true)
    setTimeout(() => {
      editor
        .chain()
        .focus()
        .setContent(
          `<h2>Chapitre premier — La cabine d'essayage</h2><p>Darelle écarta le rideau de la cabine, le cœur battant. Dans le miroir, une inconnue lui rendait son regard : plus assurée, presque téméraire. Lucien patientait de l'autre côté&nbsp;; elle pressentait déjà que <mark>rien ne serait plus comme avant</mark>.</p>`
        )
        .run()
      setCorrecting(false)
      setCorrected(true)
      setTimeout(() => setCorrected(false), 2600)
    }, 1400)
  }

  return (
    <div className="flex h-full flex-col">
      {/* Onglets — Rédaction / Mise en page (comme la toolbar de l'app) */}
      <div
        className="flex items-center gap-1 px-3 pt-2"
        style={{ borderBottom: '1px solid var(--toolbar-border)' }}
      >
        {[
          { id: 'redaction', label: 'Rédaction' },
          { id: 'layout', label: 'Mise en page' }
        ].map((t) => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="relative px-3 py-2 text-sm font-medium transition-colors"
              style={{ color: active ? 'var(--tab-active-color)' : 'var(--tab-inactive-color)' }}
            >
              {t.label}
              {active && (
                <motion.span
                  layoutId="editor-tab"
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full"
                  style={{ background: 'var(--tab-active-color)' }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Barre d'outils */}
      <div
        className="flex flex-wrap items-center gap-1 px-3 py-2"
        style={{ background: 'var(--toolbar-bg)', borderBottom: '1px solid var(--toolbar-border)' }}
      >
        <TBtn title="Titre" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 size={16} />
        </TBtn>
        <span className="mx-1 h-5 w-px" style={{ background: 'var(--toolbar-border)' }} />
        <TBtn title="Gras" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold size={16} />
        </TBtn>
        <TBtn title="Italique" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic size={16} />
        </TBtn>
        <TBtn title="Souligné" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon size={16} />
        </TBtn>
        <span className="mx-1 h-5 w-px" style={{ background: 'var(--toolbar-border)' }} />
        <TBtn title="Liste" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List size={16} />
        </TBtn>
        <TBtn title="Citation" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote size={16} />
        </TBtn>

        <div className="ml-auto">
          <button
            onClick={runCorrection}
            disabled={correcting}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-70"
            style={{ background: 'var(--accent-gradient)' }}
          >
            {correcting ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Correction…
              </>
            ) : corrected ? (
              <>
                <Check size={14} /> Corrigé
              </>
            ) : (
              <>
                <Sparkles size={14} /> Correction
              </>
            )}
          </button>
        </div>
      </div>

      {/* Surface papier */}
      <div className="paper-surface flex-1 overflow-auto p-5" style={{ background: 'var(--scroller-bg)' }}>
        <div
          className="mx-auto max-w-[62ch] rounded-md px-6 py-7 sm:px-10 sm:py-10"
          style={{ background: 'var(--paper-color)', boxShadow: 'var(--glass-shadow)' }}
        >
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* Bubble menu — barre flottante de sélection (Gras / Italique / Note) */}
      <BubbleMenu
        editor={editor}
        tippyOptions={{ duration: 150 }}
        className="glass flex items-center gap-1 rounded-xl p-1"
      >
        <TBtn title="Gras" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold size={15} />
        </TBtn>
        <TBtn title="Italique" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic size={15} />
        </TBtn>
        <TBtn title="Souligné" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon size={15} />
        </TBtn>
        <span className="mx-0.5 h-5 w-px" style={{ background: 'var(--glass-border)' }} />
        <TBtn title="Ajouter une note" active={editor.isActive('highlight')} onClick={() => editor.chain().focus().toggleMark('bold').run()}>
          <StickyNote size={15} />
        </TBtn>
      </BubbleMenu>

      <AnimatePresence>
        {corrected && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-lg px-3 py-1.5 text-xs font-medium text-white"
            style={{ background: 'var(--success-color)' }}
          >
            Fluidité améliorée · répétition corrigée
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
