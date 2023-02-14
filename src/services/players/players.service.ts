import { useQuery, useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../utils/constants";
import { Item } from "../../utils/atoms";
import { showToast } from "../../utils/notifications";

export type ErrorResponse = {
  msg: string;
};

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

export type PlayerInTeam = {
  pointsWon: number;
  balls: number;
} & Player;

export type GetTeamPointsViewModel = {
  points: number;
};

export type GetAllPlayersViewModel = {
  players: Player[];
  totalItems: number;
};

export type GetAllPlayersInTeamViewModel = {
  players: PlayerInTeam[];
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

export type AddPlayerToTeamInputModel = {
  weekId: string;
  playerId: number;
  email: string;
};

export type PerformSubstitutionInputModel = {
  substitutionId: number;
  starterId: number;
  weekId: string;
  email: string;
};

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

export function usePlayersInTeam(
  filters: FilterPlayersInTeamObject,
  email: string
) {
  return useQuery(["team", filters, email], () =>
    getAllPlayersInTeam(filters, email)
  );
}

export function useSubstitutions(
  filters: FilterPlayersInTeamObject,
  email: string
) {
  return useQuery(["team", "substitutions", filters, email], () =>
    getAllSubstitutions(filters, email)
  );
}

export function useAddPlayerToTeam() {
  const queryClient = useQueryClient();

  return useMutation(addPlayerToTeam, {
    onMutate: () => {
      console.log("useAddPlayerToTeam: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast("success", "New player was added!");
      console.log("New player was added!");
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["team"]);
    },
  });
}

export function useDeletePlayerFromTeam() {
  const queryClient = useQueryClient();

  return useMutation(deletePlayerFromTeam, {
    onMutate: () => {
      console.log("useDeletePlayerFromTeam: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast("success", "A player was removed!");
      console.log("A player was removed!");
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["team"]);
    },
  });
}

export function useAddBallToPlayer() {
  const queryClient = useQueryClient();

  return useMutation(addBallToPlayer, {
    onMutate: () => {
      console.log("useAddBallToPlayer: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast("success", "New ball was added to player!");
      console.log("New ball was added to player!");
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["team"]);
    },
  });
}

export function useDeleteBallFromPlayer() {
  const queryClient = useQueryClient();

  return useMutation(deleteBallFromPlayer, {
    onMutate: () => {
      console.log("useDeleteBallFromPlayer: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast("success", "A ball was removed from player!");
      console.log("A ball was removed from player!");
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["team"]);
    },
  });
}

export function usePerformSubstitution() {
  const queryClient = useQueryClient();

  return useMutation(performSubstitution, {
    onMutate: () => {
      console.log("usePerformSubstitution: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast("success", "Players were successfully exchanged!");
      console.log("Players were successfully exchanged!");
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["team"]);
    },
  });
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

export const getAllPlayersInTeam = async (
  filters: FilterPlayersInTeamObject,
  email: string
) => {
  const response = await axios.post<GetAllPlayersInTeamViewModel>(
    `${BASE_URL}/players/team?email=${email}`,
    {
      ...filters,
    }
  );
  const result = response.data;

  return result;
};

export const getAllSubstitutions = async (
  filters: FilterPlayersInTeamObject,
  email: string
) => {
  const response = await axios.post<GetAllPlayersViewModel>(
    `${BASE_URL}/players/substitutions?email=${email}`,
    {
      ...filters,
    }
  );
  const result = response.data;

  return result;
};

export const addPlayerToTeam = async (
  inputModel: AddPlayerToTeamInputModel
) => {
  return await axios.post(`${BASE_URL}/players/add`, inputModel);
};

export const deletePlayerFromTeam = async (
  inputModel: AddPlayerToTeamInputModel
) => {
  return await axios.delete(
    `${BASE_URL}/players/team?weekId=${inputModel.weekId}&playerId=${inputModel.playerId}&email=${inputModel.email}`
  );
};

export const addBallToPlayer = async (
  inputModel: AddPlayerToTeamInputModel
) => {
  return await axios.patch(`${BASE_URL}/players/addBall`, inputModel);
};

export const deleteBallFromPlayer = async (
  inputModel: AddPlayerToTeamInputModel
) => {
  return await axios.patch(`${BASE_URL}/players/deleteBall`, inputModel);
};

export const performSubstitution = async (
  inputModel: PerformSubstitutionInputModel
) => {
  await axios.patch(`${BASE_URL}/players/substitutions`, inputModel);
};
