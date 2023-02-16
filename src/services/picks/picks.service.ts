import { useQuery, useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../utils/constants";
import { showToast } from "../../utils/notifications";
import { ErrorResponse } from "../players/players.service";

export type Pick = {
  _id: string;
  userId: string;
  bracketId: string;
  playerId: number;
  isVerified: boolean;
};

export type GetAllPicksByTournamentViewModel = {
  picks: Pick[];
};

export type GetBracketPointsViewModel = {
  bracketPoints: number;
};

export type VerifyPickInputModel = {
  bracketId: string;
  email: string;
};

export type CreatePickInputModel = {
  playerId: number;
} & VerifyPickInputModel;

// React Query hooks

export function useGetTotal(email: string) {
  return useQuery(["picks", email], () => getTotalBracketPoints(email));
}

export function useGetWeekly(weekId: string, email: string) {
  return useQuery(["picks", weekId, email], () =>
    getWeeklyBracketPoints(weekId, email)
  );
}

export function useByTournament(
  tournamentId: number,
  roundId: string,
  email: string
) {
  return useQuery(["picks", tournamentId, roundId, email], () =>
    getAllPicksByTournamentViewModel(tournamentId, roundId, email)
  );
}

export function useCalculateTotal() {
  const queryClient = useQueryClient();

  return useMutation(calculateTotalBracketPoints, {
    onMutate: () => {
      console.log("useCalculateTotal: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast("success", "Total bracket points were updated!");
      console.log("Total points were updated!");
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["picks"]);
    },
  });
}

export function useCreatePick() {
  const queryClient = useQueryClient();

  return useMutation(createPick, {
    onMutate: () => {
      console.log("useCreatePick: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast("success", "New pick was added!");
      console.log("New pick was added!");
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["picks"]);
    },
  });
}

export function useVerifyPick() {
  const queryClient = useQueryClient();

  return useMutation(verifyPick, {
    onMutate: () => {
      console.log("useVerifyPick: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast("success", "Pick was successfully verified!");
      console.log("Pick was successfully verified!");
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["picks"]);
    },
  });
}

// API methods

export const getTotalBracketPoints = async (email: string) => {
  const response = await axios.get<GetBracketPointsViewModel>(
    `${BASE_URL}/picks/calculateTotal?email=${email}`
  );

  return response.data.bracketPoints;
};

export const getWeeklyBracketPoints = async (weekId: string, email: string) => {
  const response = await axios.get<GetBracketPointsViewModel>(
    `${BASE_URL}/picks/calculateWeekly?weekId=${weekId}&email=${email}`
  );

  return response.data.bracketPoints;
};

export const getAllPicksByTournamentViewModel = async (
  tournamentId: number,
  roundId: string,
  email: string
) => {
  const response = await axios.get<GetAllPicksByTournamentViewModel>(
    `${BASE_URL}/picks/byTournament/${tournamentId}?roundId=${roundId}&email=${email}`
  );
  return response.data;
};

export const calculateTotalBracketPoints = async (email: string) => {
  return await axios.patch(`${BASE_URL}/picks/calculateTotal?email=${email}`);
};

export const createPick = async (inputModel: CreatePickInputModel) => {
  return await axios.post(`${BASE_URL}/picks`, inputModel);
};

export const verifyPick = async (inputModel: VerifyPickInputModel) => {
  await axios.patch(
    `${BASE_URL}/picks/verify/${inputModel.bracketId}?email=${inputModel.email}`
  );
};
