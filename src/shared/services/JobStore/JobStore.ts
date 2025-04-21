import { create } from "zustand";

export const useActivatedTabsStore = create<{ activatedTabs: number[], handleActiveTabChange: (tabsIndex: number[]) => void, }>((set) => ({
    activatedTabs: [0],
    handleActiveTabChange: (tabsIndex: number[]) => set({ activatedTabs: tabsIndex })
}));