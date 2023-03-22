import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { Tournament } from "../tournaments/tournaments.service";
import { Match, MatchesByTournament } from "../matches/matches.service";

// Types
export type TournamentsByDate = {
  date: string;
  tournaments: MatchesByTournament[];
};

export type GetFavoriteMatchesViewModel = {
  matchesByDate: TournamentsByDate[];
};

export type CreateFavoriteInputModel = {
  matchId: number;
  email: string;
};

// React Query Hooks
export function useFavoriteMatchesByUser(email: string) {
  return useQuery(["favorites", email], () => getFavoriteMatchesByUser(email));
}

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
      queryClient.invalidateQueries([`favorites`]);
      queryClient.invalidateQueries([`tournaments`]);
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
      queryClient.invalidateQueries([`favorites`]);
      queryClient.invalidateQueries([`matches`]);
      queryClient.invalidateQueries([`tournaments`]);
    },
  });
}

// API Methods
const getFavoriteMatchesByUser = async (email: string) => {
  const response = await axios.get<GetFavoriteMatchesViewModel>(
    `${BASE_URL}/favorites?email=${email}`
  );
  const result = response.data;

  return result;
};

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
