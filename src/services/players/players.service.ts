import { useQuery, useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../utils/constants";
import { Item } from "../../utils/atoms";

export type Player = {
  _id: string;
  id: number;
  name: string;
  country: string;
  countryKey: string;
  points: number;
  ranking: number;
  price: number;
  imageUrl: string;
  gender: string;
  isBought: boolean;
};

export type GetTeamPointsViewModel = {
  points: number;
};

export type GetAllPlayersViewModel = {
  players: Player[];
  totalItems: number;
};

export type FilterPlayersInTeamObject = {
  selected: Item;
};

export type FilterPlayersObject = {
  playerSearchTerm: string;
  isBought: boolean;
  page: number;
  itemsPerPage: number;
  email: string;
} & FilterPlayersInTeamObject;

// React Query hooks

export function useGetTotal(email: string) {
  return useQuery(["team", email], () => getTotalPoints(email));
}

export function useFilteredPlayers(
  filters: FilterPlayersObject,
  enabled: boolean
) {
  return useQuery(
    ["players", filters, enabled],
    () => getAllFilteredPlayers(filters),
    {
      enabled: enabled,
      keepPreviousData: true,
    }
  );
}

// API methods

export const getTotalPoints = async (email: string) => {
  const response = await axios.get<GetTeamPointsViewModel>(
    `${BASE_URL}/players/calculateTotal?email=${email}`
  );
  return response.data.points;
};

export const getAllFilteredPlayers = async (filters: FilterPlayersObject) => {
  const response = await axios.post<GetAllPlayersViewModel>(
    `${BASE_URL}/players`,
    {
      ...filters,
    }
  );
  const result = response.data;

  return result;
};
