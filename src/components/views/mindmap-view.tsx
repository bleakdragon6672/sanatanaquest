'use client'

import { useState } from 'react'
import { useNav } from '@/components/nav-context'
import { OmSymbol } from '@/components/spiritual-icons'
import { Network, Sparkles, BookOpen, Compass, ArrowRight, Zap, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MindNode {
  id: string
  label: string
  sanskrit: string
  category: 'karma' | 'jnana' | 'bhakti' | 'dhyana' | 'advaita'
  chapterRef?: string
  verseRef?: string
  viewTarget: 'gita' | 'yogasutras' | 'ashtavakragita' | 'upanishad'
  targetParams?: Record<string, string>
  description: string
  corePrinciple: string
  x: number // percentage 0-100
  y: number // percentage 0-100
  connections: string[] // IDs of connected nodes
}

const NODES: MindNode[] = [
  {
    id: 'karma-action',
    label: 'Nishkama Karma',
    sanskrit: 'निष्कामकर्म',
    category: 'karma',
    viewTarget: 'gita',
    targetParams: { chapter: '2', verse: '47' },
    description: 'Selfless action without attachment to fruits or anxiety about outcomes.',
    corePrinciple: 'Perform your duty with full devotion, detached from victory or loss.',
    x: 20,
    y: 30,
    connections: ['karma-equanimity', 'dhyana-mind']
  },
  {
    id: 'karma-equanimity',
    label: 'Samatvam Yoga',
    sanskrit: 'समत्वं योग उच्यते',
    category: 'karma',
    viewTarget: 'gita',
    targetParams: { chapter: '2', verse: '48' },
    description: 'Equanimity of mind in success and failure is called Yoga.',
    corePrinciple: 'Stability amidst dualities of pleasure, pain, praise, and blame.',
    x: 38,
    y: 20,
    connections: ['karma-action', 'jnana-self']
  },
  {
    id: 'jnana-self',
    label: 'Atman & Impermanence',
    sanskrit: 'न जायते म्रियते वा',
    category: 'jnana',
    viewTarget: 'gita',
    targetParams: { chapter: '2', verse: '20' },
    description: 'The Soul is never born nor dies; it is eternal, immutable, and timeless.',
    corePrinciple: 'Discrimination (Viveka) between eternal consciousness and transient body.',
    x: 55,
    y: 25,
    connections: ['karma-equanimity', 'advaita- साक्षी', 'upanishad-isha']
  },
  {
    id: 'advaita-साक्षी',
    label: 'Witness Consciousness',
    sanskrit: 'साक्षी चेता केवलो निर्गुणश्च',
    category: 'advaita',
    viewTarget: 'ashtavakragita',
    targetParams: { chapter: '1', verse: '1' },
    description: 'You are not the body or mind, but the pure unattached witness.',
    corePrinciple: 'Instant realization of inherent freedom and unconditioned bliss.',
    x: 75,
    y: 35,
    connections: ['jnana-self', 'advaita-dissolution']
  },
  {
    id: 'dhyana-mind',
    label: 'Abhyasa & Vairagya',
    sanskrit: 'अभ्यासवैराग्याभ्याम्',
    category: 'dhyana',
    viewTarget: 'yogasutras',
    targetParams: { pada: '1', sutra: '12' },
    description: 'Mastery over mind fluctuations is achieved through practice and non-attachment.',
    corePrinciple: 'Consistent internal practice combined with radical letting go.',
    x: 28,
    y: 60,
    connections: ['karma-action', 'dhyana-limbs', 'bhakti-surrender']
  },
  {
    id: 'dhyana-limbs',
    label: 'Ashtanga Yoga Limbs',
    sanskrit: 'अष्टाङ्गयोग',
    category: 'dhyana',
    viewTarget: 'yogasutras',
    targetParams: { pada: '2', sutra: '29' },
    description: 'Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, Samadhi.',
    corePrinciple: 'The eightfold ladder leading from external purity to internal absorption.',
    x: 48,
    y: 65,
    connections: ['dhyana-mind', 'jnana-self']
  },
  {
    id: 'bhakti-surrender',
    label: 'Sharana-gati',
    sanskrit: 'सर्वधर्मान्परित्यज्य',
    category: 'bhakti',
    viewTarget: 'gita',
    targetParams: { chapter: '18', verse: '66' },
    description: 'Surrender all duties to the Supreme Divine and be liberated from all fear.',
    corePrinciple: 'Pure loving surrender dissolves ego and brings divine grace.',
    x: 68,
    y: 70,
    connections: ['dhyana-mind', 'advaita-dissolution']
  },
  {
    id: 'advaita-dissolution',
    label: 'Chitta Vrutti Nirodha',
    sanskrit: 'योगश्चित्तवृत्तिनिरोधः',
    category: 'advaita',
    viewTarget: 'yogasutras',
    targetParams: { pada: '1', sutra: '2' },
    description: 'Yoga is the complete stillness of all mental modifications.',
    corePrinciple: 'When the water of mind becomes still, the Sun of Self shines crystal clear.',
    x: 85,
    y: 60,
    connections: ['advaita-साक्षी', 'bhakti-surrender']
  },
  {
    id: 'upanishad-isha',
    label: 'Isha Vasya',
    sanskrit: 'ईशा वास्यमिदं सर्वम्',
    category: 'jnana',
    viewTarget: 'upanishad',
    targetParams: { name: 'isha' },
    description: 'All this in the cosmos is enfolded by the Divine. Renounce and enjoy.',
    corePrinciple: 'Living in the world with sacred awareness without greed.',
    x: 50,
    y: 85,
    connections: ['jnana-self', 'dhyana-limbs']
  }
]

const CATEGORY_MAP: Record<string, { label: string; color: string; border: string }> = {
  karma: { label: 'Karma Yoga (Action)', color: 'from-amber-500/20 to-orange-500/20 text-amber-400', border: 'border-amber-500/40' },
  jnana: { label: 'Jnana Yoga (Wisdom)', color: 'from-blue-500/20 to-cyan-500/20 text-cyan-400', border: 'border-cyan-500/40' },
  bhakti: { label: 'Bhakti Yoga (Devotion)', color: 'from-rose-500/20 to-pink-500/20 text-rose-400', border: 'border-rose-500/40' },
  dhyana: { label: 'Raja Yoga (Meditation)', color: 'from-purple-500/20 to-indigo-500/20 text-indigo-400', border: 'border-indigo-500/40' },
  advaita: { label: 'Advaita (Non-Duality)', color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400', border: 'border-emerald-500/40' },
}

export function MindMapView() {
  const { navigate } = useNav()
  const [selectedNode, setSelectedNode] = useState<MindNode>(NODES[0])
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filteredNodes = activeCategory === 'all' 
    ? NODES 
    : NODES.filter(n => n.category === activeCategory)

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="card-sacred-glow relative overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-card via-card/90 to-background border border-saffron/20 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-100 dark:bg-saffron-950/60 text-saffron-600 dark:text-saffron-400 text-xs font-semibold">
              <Network className="h-3.5 w-3.5" />
              <span>Cosmic Knowledge Web</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-serif-display">
              Dharma Mind Map <span className="text-muted-foreground text-lg font-normal font-serif">धर्मचित्रम्</span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl">
              Explore how sacred concepts across Bhagavad Gita, Upanishads, Yoga Sutras, and Ashtavakra Gita interconnect in a unified cosmic mandala.
            </p>
          </div>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-saffron-gradient text-white shadow-lg glow-sacred-pulse">
            <OmSymbol size={32} className="!text-white" />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveCategory('all')}
            className={cn(
              'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap',
              activeCategory === 'all'
                ? 'bg-saffron-gradient text-white shadow-md'
                : 'bg-muted/60 hover:bg-muted text-muted-foreground'
            )}
          >
            All Concepts ({NODES.length})
          </button>
          {Object.entries(CATEGORY_MAP).map(([catKey, catMeta]) => (
            <button
              key={catKey}
              onClick={() => setActiveCategory(catKey)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border',
                catMeta.border,
                activeCategory === catKey
                  ? 'bg-saffron-gradient text-white shadow-md border-transparent'
                  : 'bg-card hover:bg-muted text-muted-foreground'
              )}
            >
              {catMeta.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map & Detail Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Canvas Interactive Mandala */}
        <div className="lg:col-span-8 card-sacred-glow rounded-2xl p-4 bg-card border border-border relative min-h-[440px] sm:min-h-[520px] overflow-hidden flex flex-col justify-between">
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-xs text-muted-foreground bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-border">
            <Sparkles className="h-3.5 w-3.5 text-saffron" />
            <span>Click any node to explore connections</span>
          </div>

          {/* Canvas SVG Web */}
          <div className="relative w-full h-[400px] sm:h-[460px] my-auto">
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--saffron)" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {NODES.map((node) =>
                node.connections.map((targetId) => {
                  const targetNode = NODES.find((n) => n.id === targetId)
                  if (!targetNode) return null
                  const isHighlighted = selectedNode.id === node.id || selectedNode.id === targetNode.id
                  return (
                    <line
                      key={`${node.id}-${targetId}`}
                      x1={`${node.x}%`}
                      y1={`${node.y}%`}
                      x2={`${targetNode.x}%`}
                      y2={`${targetNode.y}%`}
                      stroke={isHighlighted ? 'url(#lineGlow)' : 'currentColor'}
                      strokeWidth={isHighlighted ? 2.5 : 1}
                      strokeDasharray={isHighlighted ? 'none' : '4 4'}
                      className={cn(
                        'transition-all duration-300',
                        isHighlighted ? 'opacity-100 text-saffron' : 'opacity-25 text-muted-foreground'
                      )}
                    />
                  )
                })
              )}
            </svg>

            {/* Render Nodes */}
            {filteredNodes.map((node) => {
              const isSelected = selectedNode.id === node.id
              const catMeta = CATEGORY_MAP[node.category]
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className={cn(
                    'absolute -translate-x-1/2 -translate-y-1/2 group z-10 flex flex-col items-center gap-1 transition-all duration-300',
                    isSelected ? 'scale-110 z-20' : 'hover:scale-105'
                  )}
                >
                  <div
                    className={cn(
                      'h-10 w-10 sm:h-12 sm:w-12 rounded-2xl flex items-center justify-center border shadow-lg backdrop-blur-md transition-all duration-300',
                      isSelected
                        ? 'bg-saffron-gradient text-white border-saffron shadow-saffron-500/50 glow-sacred-pulse ring-4 ring-saffron/20'
                        : 'bg-card/95 hover:bg-card border-saffron/30 text-foreground'
                    )}
                  >
                    <OmSymbol size={20} className={isSelected ? '!text-white' : 'text-saffron'} />
                  </div>
                  <span
                    className={cn(
                      'text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full backdrop-blur-md transition-all truncate max-w-[110px] shadow-sm',
                      isSelected
                        ? 'bg-saffron-gradient text-white font-bold shadow-md'
                        : 'bg-background/90 text-foreground border border-border/60 group-hover:border-saffron/50'
                    )}
                  >
                    {node.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected Node Details Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="card-sacred-glow rounded-2xl p-6 bg-card border border-border shadow-lg space-y-5 relative overflow-hidden">
            <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-3">
              <span className={cn('text-xs font-semibold px-3 py-1 rounded-full border', CATEGORY_MAP[selectedNode.category].border, CATEGORY_MAP[selectedNode.category].color)}>
                {CATEGORY_MAP[selectedNode.category].label}
              </span>
              <span className="text-xs text-muted-foreground font-mono">ID: #{selectedNode.id}</span>
            </div>

            <div>
              <h2 className="text-xl font-bold font-serif-display text-foreground">{selectedNode.label}</h2>
              <p className="text-sm font-semibold text-saffron mt-0.5 font-serif" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                {selectedNode.sanskrit}
              </p>
            </div>

            <div className="space-y-3 bg-muted/40 p-4 rounded-xl border border-border/50">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-saffron" /> Core Principle
              </h4>
              <p className="text-sm font-medium text-foreground leading-relaxed">
                "{selectedNode.corePrinciple}"
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Description</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {selectedNode.description}
              </p>
            </div>

            {/* Jump to Reader Button */}
            <button
              onClick={() => navigate(selectedNode.viewTarget, selectedNode.targetParams)}
              className="w-full py-3 px-4 rounded-xl bg-saffron-gradient text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group glow-saffron"
            >
              <BookOpen className="h-4 w-4" />
              <span>Read Scripture Shloka</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
