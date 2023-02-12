import { atom } from "jotai";
import { PLAYERS_INITIAL_PAGE } from "./constants";

export type Item = {
  text: string;
  value: string;
  from: string;
  to: string;
};

export const selectedWeekAtom = atom<Item>({
  text: "GW1",
  value: "63a0343ad7fba86bf211d965",
  from: "2022-12-29",
  to: "2023-01-08",
});

export const isBoughtAtom = atom(false);
export const playerSearchTermAtom = atom("");
export const fetchPlayersAtom = atom(true);
export const playersCurrentPageAtom = atom(PLAYERS_INITIAL_PAGE);
export const isPlayersSidebarOpenAtom = atom(false);
