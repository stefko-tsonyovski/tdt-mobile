import axios, { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { BASE_URL } from "../../utils/constants";
import { showToast } from "../../utils/notifications";
import { ErrorResponse } from "../players/players.service";

export type LeagueInvitation = {
  _id: string;
  leagueId: string;
  receiverId: string;
  leagueName: string;
  formattedDate: string;
};

export type GetAllLeagueInvitationsByReceiverViewModel = {
  leagueInvitations: LeagueInvitation[];
};

export type CreateLeagueInvitationInputModel = {
  leagueId: string;
  receiverId: string;
  email: string;
};

export type AcceptLeagueInvitationInputModel = {
  id: string;
  email: string;
};

// React query hooks

export function useByReceiver(email: string) {
  return useQuery(["leagueInvitations", email], () =>
    getAllLeagueInvitationsByReceiver(email)
  );
}

export function useCreateLeagueInvitation() {
  const queryClient = useQueryClient();

  return useMutation(createLeagueInvitation, {
    onMutate: () => {
      console.log("useCreateLeagueInvitation: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast("success", "You successfully sent the invitation!");
      console.log("You successfully sent the invitation!");
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["leagueInvitations"]);
    },
  });
}

export function useAcceptLeagueInvitation() {
  const queryClient = useQueryClient();

  return useMutation(acceptLeagueInvitation, {
    onMutate: () => {
      console.log("useAcceptLeagueInvitation: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast("success", "The invitation was accepted successfully!");
      console.log("The invitation was accepted successfully!");
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["leagueInvitations"]);
    },
  });
}

export function useDeleteLeagueInvitation() {
  const queryClient = useQueryClient();

  return useMutation(deleteLeagueInvitation, {
    onMutate: () => {
      console.log("useDeleteLeagueInvitation: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast("success", "The invitation was deleted successfully!");
      console.log("The invitation was deleted successfully!");
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["leagueInvitations"]);
    },
  });
}

// API methods

export const getAllLeagueInvitationsByReceiver = async (email: string) => {
  const response = await axios.get<GetAllLeagueInvitationsByReceiverViewModel>(
    `${BASE_URL}/leagueInvitations/byReceiver?email=${email}`
  );
  return response.data;
};

export const createLeagueInvitation = async (
  inputModel: CreateLeagueInvitationInputModel
) => {
  await axios.post(`${BASE_URL}/leagueInvitations`, inputModel);
};

export const acceptLeagueInvitation = async (
  inputModel: AcceptLeagueInvitationInputModel
) => {
  await axios.patch(
    `${BASE_URL}/leagueInvitations/${inputModel.id}?email=${inputModel.email}`
  );
};

export const deleteLeagueInvitation = async (id: string) => {
  await axios.delete(`${BASE_URL}/leagueInvitations/${id}`);
};
