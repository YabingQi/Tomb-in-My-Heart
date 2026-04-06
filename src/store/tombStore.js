import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'

// ─── Store ────────────────────────────────────────────────────────────────
export const useTombStore = create(
  persist(
    (set, get) => ({
      tombs: [],
      activeRitual: null, // null | 'flowers' | 'wine' | 'letter' | 'archive' | 'sit'

      // ── Tomb CRUD ────────────────────────────────────────────────────────
      createTomb: ({ name, fandom, universe, epitaph, deathNote }) => {
        const tomb = {
          id: nanoid(8),
          createdAt: new Date().toISOString(),
          lastVisitedAt: new Date().toISOString(),
          character: { name, fandom, universe: universe || 'other', epitaph, deathNote: deathNote || '' },
          offerings: { flowers: [], wines: [] },
          letters: [],
        }
        set(state => ({ tombs: [...state.tombs, tomb] }))
        return tomb.id
      },

      getTomb: (id) => get().tombs.find(t => t.id === id) || null,

      deleteTomb: (id) =>
        set(state => ({ tombs: state.tombs.filter(t => t.id !== id) })),

      markVisited: (id) =>
        set(state => ({
          tombs: state.tombs.map(t =>
            t.id === id ? { ...t, lastVisitedAt: new Date().toISOString() } : t
          ),
        })),

      // ── Offerings ────────────────────────────────────────────────────────
      placeFlower: (tombId, flowerId, note = null) =>
        set(state => ({
          tombs: state.tombs.map(t =>
            t.id !== tombId ? t : {
              ...t,
              offerings: {
                ...t.offerings,
                flowers: [...t.offerings.flowers, {
                  id: nanoid(8),
                  flowerId,
                  placedAt: new Date().toISOString(),
                  note,
                }],
              },
            }
          ),
        })),

      pourWine: (tombId, wineId, toast = null) =>
        set(state => ({
          tombs: state.tombs.map(t =>
            t.id !== tombId ? t : {
              ...t,
              offerings: {
                ...t.offerings,
                wines: [...t.offerings.wines, {
                  id: nanoid(8),
                  wineId,
                  pouredAt: new Date().toISOString(),
                  toast,
                }],
              },
            }
          ),
        })),

      // ── Letters ──────────────────────────────────────────────────────────
      saveLetter: (tombId, content) => {
        const letter = {
          id: nanoid(8),
          content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          burned: false,
          burnedAt: null,
        }
        set(state => ({
          tombs: state.tombs.map(t =>
            t.id !== tombId ? t : { ...t, letters: [...t.letters, letter] }
          ),
        }))
        return letter.id
      },

      burnLetter: (tombId, letterId) =>
        set(state => ({
          tombs: state.tombs.map(t =>
            t.id !== tombId ? t : {
              ...t,
              letters: t.letters.map(l =>
                l.id !== letterId ? l : {
                  ...l,
                  content: '',
                  burned: true,
                  burnedAt: new Date().toISOString(),
                }
              ),
            }
          ),
        })),

      // ── UI State ─────────────────────────────────────────────────────────
      setActiveRitual: (ritual) => set({ activeRitual: ritual }),
      closeRitual: () => set({ activeRitual: null }),
    }),
    {
      name: 'tomb-in-my-heart:v1',
    }
  )
)
