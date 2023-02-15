import axios from "axios";
import { useQuery } from "react-query";
import { BASE_URL } from "../../utils/constants";
import { Player } from "../players/players.service";

export type UpdateBracketInputModel = {
  _id: string;
  name: string;
  homeId?: number;
  awayId?: number;
  winnerId?: number;
  roundId: string;
  tournamentId: number;
};

export type Bracket = {
  homePlayer: Player;
  awayPlayer: Player;
} & UpdateBracketInputModel;

export type GetAllBracketsByTournamentAndRoundViewModel = {
  brackets: Bracket[];
  totalItems: number;
};

// React Query hooks

export function useAllBracketsByTournamentAndRound(
  tournamentId: number,
  roundId: string,
  page: number,
  itemsPerPage: number
) {
  return useQuery(
    ["brackets", tournamentId, roundId, page, itemsPerPage],
    () =>
      getAllBracketsByTournamentAndRound(
        tournamentId,
        roundId,
        page,
        itemsPerPage
      ),
    {
      keepPreviousData: true,
    }
  );
}

// API methods

export const getAllBracketsByTournamentAndRound = async (
  tournamentId: number,
  roundId: string,
  page: number,
  itemsPerPage: number
) => {
  const response = await axios.get<GetAllBracketsByTournamentAndRoundViewModel>(
    `${BASE_URL}/brackets/byTournamentAndRound?tournamentId=${tournamentId}&roundId=${roundId}&page=${page}&itemsPerPage=${itemsPerPage}`
  );
  const result = response.data;

  return result;
};
