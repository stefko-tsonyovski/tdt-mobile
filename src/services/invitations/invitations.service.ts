import axios, { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { BASE_URL } from "../../utils/constants";
import { showToast } from "../../utils/notifications";
import { ErrorResponse } from "../players/players.service";

export type Invitation = {
  _id: string;
  senderId: string;
  receiverEmail: string;
  verified: boolean;
};

export type GetAllInvitationsViewModel = {
  invitations: Invitation[];
};

export type SendInvitationInputModel = {
  receiverEmail: string;
  senderEmail: string;
};

// React query hooks
export function useSendInvitation() {
  const queryClient = useQueryClient();

  return useMutation(sendInvitation, {
    onMutate: () => {
      console.log("useSendInvitation: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast("success", "Invitation is sent!");
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["invitations/sent"]);
    },
  });
}

export function useVerifyInvitation() {
  const queryClient = useQueryClient();
  return useMutation(verifyInvitation, {
    onMutate: () => {
      console.log("useVerifyInvitation: onMutate hook was triggered");
    },
    onSuccess: () => {
      console.log("Invitation is verified!");
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["invitations/received"]);
    },
  });
}

// API methods
const sendInvitation = async (inputModel: SendInvitationInputModel) => {
  const response = await axios.post(`${BASE_URL}/invitations`, {
    receiverEmail: inputModel.receiverEmail,
    senderEmail: inputModel.senderEmail,
  });
  const result = response.data;

  return result;
};

const verifyInvitation = async (email: string | null) => {
  const response = await axios.post(`${BASE_URL}/invitations/verify`, {
    email,
  });
  const result = response.data;

  return result;
};
