import { useMutation, useQueryClient, useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../utils/constants";

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

// React Query hooks

export function useTop200() {
  return useQuery(["users"], getTop200Users);
}

export function useTradesByUser(email: string) {
  return useQuery(["team", "substitutions", email], () =>
    getTradesByUser(email)
  );
}

export function useUserByEmail(email: string) {
  return useQuery(["users", email], () => getUserByEmail(email));
}

export function useCurrentUserPosition(email: string) {
  return useQuery(["leagues", "users", email], () =>
    getCurrentUserPosition(email)
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

export const getTop200Users = async () => {
  const response = await axios.get<GetTop200ViewModel>(`${BASE_URL}/users`);
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

export const getCurrentUserPosition = async (email: string) => {
  const response = await axios.get<User>(
    `${BASE_URL}/users/showMe?email=${email}`
  );
  return response.data;
};

export const createUser = async (dto: CreateUserDto) => {
  await axios.post(`${BASE_URL}/auth/register`, dto);
};
