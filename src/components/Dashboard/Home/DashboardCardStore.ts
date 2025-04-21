import { createWithEqualityFn } from 'zustand/traditional';
import { DashboardCardInterface } from './dashboardCardModel';




export type DASHBOARD_CARD_STATE = {
    cards: DashboardCardInterface[];

    setCards: (card: DashboardCardInterface[]) => void;
    addCard: (card: DashboardCardInterface) => void;
    addMultipleCard: (card: DashboardCardInterface[]) => void;

    updateCard: (id: string, editedCard: DashboardCardInterface) => void;
    updateInputData: (id: string, inputData: DashboardCardInterface) => void;
    updateDefaultValuesData: (id: string, defaultValuesData: any) => void;
    updateTitle: (id: string, cardData: string) => void;
    updateCardData: (id: string, data: any) => void;
    removeCard: (id: string) => void;

};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useCardStore = createWithEqualityFn<DASHBOARD_CARD_STATE>((set, get) => ({
    cards: [],

    setCards: (cards: DashboardCardInterface[]) => {
        set({ cards });
    },
    addCard(card: DashboardCardInterface) {
        set({
            cards: [...get().cards, card],
        });
    },
    addMultipleCard(card: DashboardCardInterface[]) {
        set({
            cards: [...get().cards, ...card],
        });
    },
    updateCard(id: string, editedCard: DashboardCardInterface) {
        set({
            cards: get().cards.map((card) => {
                if (card.i === id) {
                    return { ...editedCard };
                }
                return card;
            }),
        });
    },
    updateTitle(id: string, title: string) {
        set({
            cards: get().cards.map((card) => {
                if (card.i === id) {
                    return { ...card, title };
                }
                return card;
            }),
        });
    },
    updateCardData(id: string, cardData: any) {
        set({
            cards: get().cards.map((card) => {
                if (card.i === id) {
                    return { ...card, ...cardData };
                }
                return card;
            })
        });
    },
    updateInputData(id: string, inputData: any) {
        set({
            cards: get().cards.map((card) => {
                if (card.i === id) {
                    return { ...card, inputs: { ...card.inputs, inputData } };
                }
                return card;
            }),
        });
    },
    updateDefaultValuesData(id: string, defaultValuesData: any) {
        set({
            cards: get().cards.map((card) => {
                if (card.i === id) {
                    return { ...card, defaultValues: { ...defaultValuesData } };
                }
                return card;
            }),
        });
    },
    removeCard(id: string) {
        set({
            cards: get().cards.filter((card) => {
                return card.i !== id;
            }),
        });
    },



}));

export default useCardStore;