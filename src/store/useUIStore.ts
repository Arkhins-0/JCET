import { create } from "zustand";

interface UIState {
  mobileNavOpen: boolean;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  toggleMobileNav: () => void;

  // Which mega-menu group is currently open (desktop), by label.
  openMenu: string | null;
  setOpenMenu: (label: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  mobileNavOpen: false,
  openMobileNav: () => set({ mobileNavOpen: true }),
  closeMobileNav: () => set({ mobileNavOpen: false }),
  toggleMobileNav: () => set((s) => ({ mobileNavOpen: !s.mobileNavOpen })),

  openMenu: null,
  setOpenMenu: (label) => set({ openMenu: label }),
}));
