import { atom } from "jotai";
import { INITIAL_TOURNAMENT_INDEX, PLAYERS_INITIAL_PAGE } from "./constants";

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
export const selectedDateAtom = atom(new Date().toLocaleDateString("en-CA"));
export const isSubstitutionsSidebarOpenAtom = atom(false);
export const bracketsCurrentPageAtom = atom(PLAYERS_INITIAL_PAGE);
export const selectedRoundId = atom("63a43db0416fe2a5d31c9a31");
export const selectedSurfaceAtom = atom("all");
export const currentTournamentAtom = atom(INITIAL_TOURNAMENT_INDEX);
export const approvedPredictionsCurrentPageAtom = atom(PLAYERS_INITIAL_PAGE);
export const votePredictionsCurrentPageAtom = atom(PLAYERS_INITIAL_PAGE);
export const unapprovedPredictionsCurrentPageAtom = atom(PLAYERS_INITIAL_PAGE);
export const predictionsWithoutAnswerCurrentPageAtom =
  atom(PLAYERS_INITIAL_PAGE);
