'use client'

import { BookOpen, Sparkles, Heart, Flame, Mountain } from 'lucide-react'
import { useStore } from '@/lib/store'
import { useNav } from '@/components/nav-context'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
// Import known verse IDs for unambiguous scripture matching
import { allVerses as allGitaVerses } from '@/lib/gita-data'
import { allYogaSutraVerses } from '@/lib/yoga-sutras-data'
import { allAshtavakraVerses } from '@/lib/ashtavakra-gita-data'

interface Scripture {
  id: string
  name: string
  sanskritName: string
  viewKey: string
  icon: typeof BookOpen
  verseIds?: RegExp
  matchFn?: (id: string) => boolean
  totalVerses: number
  color: string
  description: string
}

const SCRIPTURES: Scripture[] = [
  {
    id: 'gita',
    name: 'Bhagavad Gita',
    sanskritName: 'श्रीमद्भगवद्गीता',
    viewKey: 'gita',
    icon: BookOpen,
    matchFn: (id: string) => allGitaVerses.some((v) => v.id === id),
    totalVerses: 700,
    color: 'var(--saffron)',
    description: '18 chapters, 700 verses — the eternal song of Krishna and Arjuna',
  },
  {
    id: 'upanishads',
    name: 'Principal Upanishads',
    sanskritName: 'उपनिषद्',
    viewKey: 'upanishad',
    icon: Mountain,
    verseIds: /^(isha|katha|mandukya|kena|aitareya|prashna|mundaka|taittiriya)\./,
    totalVerses: 355,
    color: 'var(--gold)',
    description: 'Isha, Katha, Mandukya, Kena, Aitareya, Prashna, Mundaka, Taittiriya — 8 principal Upanishads',
  },
  {
    id: 'chalisa',
    name: 'Hanuman Chalisa',
    sanskritName: 'हनुमान चालीसा',
    viewKey: 'chalisa',
    icon: Heart,
    verseIds: /^v\d+$/,
    totalVerses: 43,
    color: 'var(--vermilion)',
    description: '40 chaupais by Tulsidas — the most recited devotional hymn',
  },
  {
    id: 'baan',
    name: 'Bajrang Baan',
    sanskritName: 'बजरंग बाण',
    viewKey: 'baan',
    icon: Flame,
    verseIds: /^b\d+$/,
    totalVerses: 42,
    color: 'var(--saffron)',
    description: 'The protective arrow of Hanuman — for courage and divine protection',
  },
  {
    id: 'tandav',
    name: 'Shiv Tandav Stotram',
    sanskritName: 'शिवताण्डवस्तोत्रम्',
    viewKey: 'tandav',
    icon: Sparkles,
    verseIds: /^t\d+$/,
    totalVerses: 16,
    color: 'var(--gold)',
    description: '16 stanzas by Ravana — the cosmic dance of Shiva',
  },
  {
    id: 'yogasutras',
    name: 'Yoga Sutras',
    sanskritName: 'पातञ्जलयोगसूत्राणि',
    viewKey: 'yogasutras',
    icon: BookOpen,
    matchFn: (id: string) => allYogaSutraVerses.some((v) => v.id === id),
    totalVerses: 196,
    color: 'var(--saffron)',
    description: '196 aphorisms by Patanjali — the path of classical yoga',
  },
  {
    id: 'ashtavakragita',
    name: 'Ashtavakra Gita',
    sanskritName: 'अष्टावक्रगीता',
    viewKey: 'ashtavakragita',
    icon: BookOpen,
    matchFn: (id: string) => allAshtavakraVerses.some((v) => v.id === id),
    totalVerses: 298,
    color: 'var(--gold)',
    description: '298 verses of radical Advaita — you are already free',
  },
]

function ProgressRing({ percent, color, size = 48 }: { percent: number; color: string; size?: number }) {
  const strokeWidth = 4
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <svg width={size} height={size} className="scripture-progress-ring">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--muted)"
        strokeWidth={strokeWidth}
        opacity={0.3}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={size * 0.22}
        fontWeight="bold"
        fill="var(--foreground)"
      >
        {percent}%
      </text>
    </svg>
  )
}

export function ScriptureMap() {
  const { navigate } = useNav()
  const readVerses = useStore((s) => s.readVerses)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
            Scripture Map
          </h2>
          <p className="text-xs text-muted-foreground">Your journey across all sacred texts</p>
        </div>
        <Badge variant="outline" className="text-xs">
          {Object.keys(readVerses).length} total verses read
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {SCRIPTURES.map((scripture) => {
          const Icon = scripture.icon
          const readCount = Object.keys(readVerses).filter((id) => scripture.matchFn?.(id) ?? scripture.verseIds?.test(id) ?? false).length
          const percent = scripture.totalVerses > 0 ? Math.round((readCount / scripture.totalVerses) * 100) : 0

          return (
            <Card
              key={scripture.id}
              className="scripture-map-card p-4 cursor-pointer relative overflow-hidden"
              onClick={() => navigate(scripture.viewKey as Parameters<typeof navigate>[0])}
            >
              <div className="flex items-start gap-3">
                <ProgressRing percent={percent} color={scripture.color} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="h-4 w-4" style={{ color: scripture.color }} />
                    <h3 className="font-semibold text-sm truncate">{scripture.name}</h3>
                  </div>
                  <p className="text-[10px] text-muted-foreground mb-1" style={{ fontFamily: 'var(--font-serif-display), serif' }}>
                    {scripture.sanskritName}
                  </p>
                  <p className="text-[11px] text-muted-foreground line-clamp-2">{scripture.description}</p>
                  <div className="mt-2">
                    <Progress value={percent} className="h-1 bg-muted" />
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {readCount}/{scripture.totalVerses} verses
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
