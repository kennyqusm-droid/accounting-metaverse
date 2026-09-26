import { create } from 'zustand'

export interface UserState {
  userId: string
  matricNo: string
  name: string
  role: 'student' | 'lecturer'
  xp: number
  rp: number
  rpgTokens: number
  caseSimTokens: number
  goldenTickets: number
  tutorTokens: number
  pityCounter: number
  activeTheme: string
  activePet: string
  squadSlots: number
  equippedAvatars: string[]
  strikes: number
  
  // Tamagotchi pet state
  petHunger: number
  petHappiness: number
  lastInteracted: string

  // Actions
  setUserData: (data: Partial<UserState>) => void
  addRewards: (rewards: { xp?: number; rp?: number; goldenTickets?: number }) => void
  useRpgToken: () => boolean
  useCaseSimToken: () => boolean
  useTutorToken: () => boolean
  updatePetState: (hunger: number, happiness: number) => void
  incrementPity: () => void
  resetPity: () => void
}

export const useUserStore = create<UserState>((set, get) => ({
  userId: '',
  matricNo: '',
  name: '',
  role: 'student',
  xp: 0,
  rp: 0,
  rpgTokens: 5,
  caseSimTokens: 5,
  goldenTickets: 0,
  tutorTokens: 10,
  pityCounter: 0,
  activeTheme: 'minimal',
  activePet: '🥚',
  squadSlots: 1,
  equippedAvatars: ['🥚'],
  strikes: 0,

  petHunger: 100,
  petHappiness: 100,
  lastInteracted: new Date().toISOString(),

  setUserData: (data) => set((state) => ({ ...state, ...data })),

  addRewards: ({ xp = 0, rp = 0, goldenTickets = 0 }) =>
    set((state) => ({
      xp: state.xp + xp,
      rp: state.rp + rp,
      goldenTickets: state.goldenTickets + goldenTickets,
    })),

  useRpgToken: () => {
    const { rpgTokens } = get()
    if (rpgTokens <= 0) return false
    set({ rpgTokens: rpgTokens - 1 })
    return true
  },

  useCaseSimToken: () => {
    const { caseSimTokens } = get()
    if (caseSimTokens <= 0) return false
    set({ caseSimTokens: caseSimTokens - 1 })
    return true
  },

  useTutorToken: () => {
    const { tutorTokens } = get()
    if (tutorTokens <= 0) return false
    set({ tutorTokens: tutorTokens - 1 })
    return true
  },

  updatePetState: (hunger, happiness) =>
    set({
      petHunger: hunger,
      petHappiness: happiness,
      lastInteracted: new Date().toISOString(),
    }),

  incrementPity: () => set((state) => ({ pityCounter: state.pityCounter + 1 })),
  resetPity: () => set({ pityCounter: 0 }),
}))