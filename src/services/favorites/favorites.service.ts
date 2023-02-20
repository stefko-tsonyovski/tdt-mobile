import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

// Types
type CreateFavoriteInputModel = {
  matchId: number;
  email: string;
};

// React Query Hooks

export function useCreateFavorite(tournamentId?: number, date?: string) {
  const queryClient = useQueryClient();

  return useMutation(createFavorite, {
    onMutate: () => {
      console.log("useCreateFavorite: onMutate hook was triggered");
    },
    onSuccess: () => {
      console.log("New favorite match was added!");
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries([`matches`]);
    },
  });
}

export function useDeleteFavorite(tournamentId?: number, date?: string) {
  const queryClient = useQueryClient();

  return useMutation(deleteFavorite, {
    onMutate: () => {
      console.log("useDeleteFavorite: onMutate hook was triggered");
    },
    onSuccess: () => {
      console.log("Delete favorite!");
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries([`matches`]);
      queryClient.invalidateQueries([`favorites`]);
    },
  });
}

// API Methods

const createFavorite = async (
  createFavoriteInputModel: CreateFavoriteInputModel
) => {
  const response = await axios.post(
    `${BASE_URL}/favorites`,
    createFavoriteInputModel
  );
  const result = response.data;

  return result;
};

const deleteFavorite = async ({
  favoriteId,
  email,
}: {
  favoriteId: string;
  email: string;
}) => {
  return await axios.delete(
    `${BASE_URL}/favorites/delete?favoriteId=${favoriteId}&email=${email}`
  );
};
