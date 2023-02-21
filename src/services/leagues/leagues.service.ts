import axios from "axios";
import { useQuery } from "react-query";
import { BASE_URL } from "../../utils/constants";

export type League = {
  _id: string;
  name: string;
  points: number;
  creatorId: string;
  position: number;
};

export type GetTop200ViewModel = {
  leagues: League[];
};

export type CreateLeagueInputModel = {
  name: string;
};

export type UpdateLeagueInputModel = {
  _id: string;
  creatorId: string;
  points: number;
} & CreateLeagueInputModel;

export type KickMemberInputModel = {
  leagueId: string;
  memberId: string;
};

// React Query hooks

export function useTop200(searchTerm: string, enabled: boolean) {
  return useQuery(
    ["leagues", searchTerm, enabled],
    () => getTop200Leagues(searchTerm),
    {
      enabled: enabled,
    }
  );
}

// API methods

export const getTop200Leagues = async (searchTerm: string) => {
  const response = await axios.get<GetTop200ViewModel>(
    `${BASE_URL}/leagues?searchTerm=${searchTerm}`
  );
  return response.data;
};
