import { useMutation, useQueryClient, useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../utils/constants";
import { PlayerInTeam } from "../players/players.service";

export type GetTradesByUserViewModel = {
  trades: number;
};

export type CreateUserDto = {
  firstName: string;
  lastName: string;
  email: string;
};

export type User = {
  _id: string;
  role: string;
  position: number;
  leaguePosition: number;
  leagueId: string;
  leagueCreatorId: string;
  totalPoints: number;
} & CreateUserDto;

export type GetTop200ViewModel = {
  users: User[];
  leagueName: string;
};

export type GetTeamPointsByUserViewModel = {
  points: number;
};

export type GetTeamByUserAndByWeekViewModel = {
  players: PlayerInTeam[];
};

// React Query hooks

export function useTop200(searchTerm: string, enabled: boolean) {
  return useQuery(
    ["users", searchTerm, enabled],
    () => getTop200Users(searchTerm),
    { enabled }
  );
}

export function useTradesByUser(email: string) {
  return useQuery(["team", "substitutions", email], () =>
    getTradesByUser(email)
  );
}

export function useUserByEmail(email: string) {
  return useQuery(["users", email], () => getUserByEmail(email));
}

export function useUserById(id: string) {
  return useQuery(["users", id], () => getUserById(id));
}

export function useCurrentUserPosition(email: string) {
  return useQuery(["leagues", "users", email], () =>
    getCurrentUserPosition(email)
  );
}

export function useTotalByUserAndByWeek(userId: string, weekId: string) {
  return useQuery(["totalPoints", userId, weekId], () =>
    getTotalByUserAndByWeek(userId, weekId)
  );
}

export function useWeeklyByUserAndByWeek(userId: string, weekId: string) {
  return useQuery(["weeklyPoints", userId, weekId], () =>
    getWeeklyByUserAndByWeek(userId, weekId)
  );
}

export function useTeamByUserAndByWeek(userId: string, weekId: string) {
  return useQuery(["teamByUserAndByWeek", userId, weekId], () =>
    getTeamByUserAndByWeek(userId, weekId)
  );
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation(createUser, {
    onMutate: () => {
      console.log("useCreateUser: onMutate hook was triggered");
    },
    onSuccess: () => {
      console.log("New user was added!");
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
}

// API methods

export const getTop200Users = async (searchTerm: string) => {
  const response = await axios.get<GetTop200ViewModel>(
    `${BASE_URL}/users?searchTerm=${searchTerm}`
  );
  return response.data;
};

export const getTradesByUser = async (email: string) => {
  const response = await axios.get<GetTradesByUserViewModel>(
    `${BASE_URL}/users/trades?email=${email}`
  );
  return response.data;
};

export const getUserByEmail = async (email: string) => {
  const response = await axios.get<User>(`${BASE_URL}/users/byEmail/${email}`);
  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await axios.get<User>(`${BASE_URL}/users/${id}`);
  return response.data;
};

export const getCurrentUserPosition = async (email: string) => {
  const response = await axios.get<User>(
    `${BASE_URL}/users/showMe?email=${email}`
  );
  return response.data;
};

export const getTotalByUserAndByWeek = async (
  userId: string,
  weekId: string
) => {
  const response = await axios.get<GetTeamPointsByUserViewModel>(
    `${BASE_URL}/users/total?userId=${userId}&weekId=${weekId}`
  );
  return response.data;
};

export const getWeeklyByUserAndByWeek = async (
  userId: string,
  weekId: string
) => {
  const response = await axios.get<GetTeamPointsByUserViewModel>(
    `${BASE_URL}/users/weekly?userId=${userId}&weekId=${weekId}`
  );
  return response.data;
};

export const getTeamByUserAndByWeek = async (
  userId: string,
  weekId: string
) => {
  const response = await axios.get<GetTeamByUserAndByWeekViewModel>(
    `${BASE_URL}/users/teamByUser?userId=${userId}&weekId=${weekId}`
  );
  return response.data;
};

export const createUser = async (dto: CreateUserDto) => {
  await axios.post(`${BASE_URL}/auth/register`, dto);
};
