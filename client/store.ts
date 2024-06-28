import { create } from "zustand";

type ClientStore = {
  allSubscriptions: Array<any>;
  setAllSubscriptions: (subscriptions: Array<any>) => void;
};

export const useClientStore = create<ClientStore>((set) => ({
  allSubscriptions: [],
  setAllSubscriptions: (subscriptions: Array<any>) => {
    set(() => ({ allSubscriptions: subscriptions }));
  },
}));
