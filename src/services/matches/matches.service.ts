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

export type GetMatches = {
  matches: Match[];
};

// React Query Hooks

export function useMatchesByTournamentAndRound(
  tournamentId: number,
  roundId: string
) {
  return useQuery(["matches", tournamentId, roundId], () =>
    getMatchesByTournamentAndRound(tournamentId, roundId)
  );
}

// API Methods

const getMatchesByTournamentAndRound = async (
  tournamentId: number,
  roundId: string
) => {
  const response = await axios.get<GetMatches>(
    `${BASE_URL}/matches/byTournamentAndRound?tournamentId=${tournamentId}&roundId=${roundId}`
  );
  const result = response.data;

  return result;
};
