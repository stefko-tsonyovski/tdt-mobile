import axios from "axios";
import { useQuery } from "react-query";
import { BASE_URL } from "../../utils/constants";

export type Match = {
  id: number;
  status: string;
  homeId: number;
  awayId: number;
  date: string;
  round: string;
  winnerId: number;
  homeSets: string;
  awaySets: string;
  homeSet1: string;
  homeSet2: string;
  homeSet3: string;
  homeSet4: string;
  homeSet5: string;
  awaySet1: string;
  awaySet2: string;
  awaySet3: string;
  awaySet4: string;
  awaySet5: string;
  tournamentId: number;
  favoriteId?: string;
};

export type MatchesByRoundViewModel = {
  round: {
    _id: string;
    name: string;
  };
  matches: MatchDrawViewModel[];
};

export type MatchDrawViewModel = {
  id: number;
  homeId: number;
  homePlayer: {
    name: string;
    ranking: number;
  };
  homeSets: number;
  awayId: number;
  awayPlayer: {
    name: string;
    ranking: number;
  };
  awaySets: number;
  winnerId: number;
};

export type GetMatchesViewModel = {
  matches: Match[];
};

export type GetDrawMatchesViewModel = {
  matches: MatchDrawViewModel[];
};

export type GetMatchesGroupedByRoundVieModel = {
  groupedMatches: MatchesByRoundViewModel[];
};

// React Query Hooks

export function useMatchesByTournamentAndDate(
  tournamentId?: number,
  date?: string
) {
  return useQuery([`matches`, tournamentId, date], () =>
    getMatchesByTournamentAndDate(tournamentId, date)
  );
}

export function useMatchesByTournamentAndRound(
  tournamentId: number,
  roundId: string
) {
  return useQuery(["matches", tournamentId, roundId], () =>
    getMatchesByTournamentAndRound(tournamentId, roundId)
  );
}

export function useMatchesByTournamentGroupByRound(tournamentId: number) {
  return useQuery(["matches/byTournamentGroupedByRound", tournamentId], () =>
    getMatchesByTournamentGroupByRound(tournamentId)
  );
}

// API Methods

const getMatchesByTournamentAndDate = async (
  tournamentId?: number,
  date?: string
) => {
  const response = await axios.get<GetMatchesViewModel>(
    `/api/v1/matches/byTournamentAndDate?tournamentId=${tournamentId}&date=${date}`
  );
  const result = response.data;
  return result;
};

const getMatchesByTournamentAndRound = async (
  tournamentId: number,
  roundId: string
) => {
  const response = await axios.get<GetDrawMatchesViewModel>(
    `${BASE_URL}/matches/byTournamentAndRound?tournamentId=${tournamentId}&roundId=${roundId}`
  );
  const result = response.data;

  return result;
};

const getMatchesByTournamentGroupByRound = async (tournamentId: number) => {
  const response = await axios.get<GetMatchesGroupedByRoundVieModel>(
    `${BASE_URL}/matches/byTournamentGroupByRound?tournamentId=${tournamentId}`
  );
  const result = response.data;

  return result;
};
