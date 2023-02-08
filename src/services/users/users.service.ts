import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../utils/constants";

export type CreateUserDto = {
  firstName: string;
  lastName: string;
  email: string;
};

// React Query hooks

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

export const createUser = async (dto: CreateUserDto) => {
  await axios.post(`${BASE_URL}/auth/register`, dto);
};
