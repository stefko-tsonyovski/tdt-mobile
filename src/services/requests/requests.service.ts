import axios, { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { BASE_URL } from "../../utils/constants";
import { showToast } from "../../utils/notifications";
import { ErrorResponse } from "../players/players.service";

export type Request = {
  _id: string;
  leagueId: string;
  creatorId: string;
  creatorFirstName: string;
  creatorLastName: string;
  formattedDate: string;
};

export type GetAllUnapprovedRequestsViewModel = {
  requests: Request[];
};

export type CreateRequestInputModel = {
  leagueId: string;
  email: string;
};

export type ApproveRequestInputModel = {
  creatorId: string;
  leagueId: string;
  email: string;
};

// React Query hooks

export function useUnapprovedByLeague(leagueId: string, email: string) {
  return useQuery(["requests", leagueId, email], () =>
    getAllUnapprovedRequestsByLeague(leagueId, email)
  );
}

export function useApproveRequest() {
  const queryClient = useQueryClient();

  return useMutation(approveRequest, {
    onMutate: () => {
      console.log("useApproveRequest: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast("success", "The request was approved successfully!");
      console.log("The request was approved successfully!");
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["requests"]);
    },
  });
}

export function useDeleteRequest() {
  const queryClient = useQueryClient();

  return useMutation(deleteRequest, {
    onMutate: () => {
      console.log("useDeleteRequest: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast("success", "The request was deleted successfully!");
      console.log("The request was deleted successfully!");
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["requests"]);
    },
  });
}

export function useCreateRequest() {
  const queryClient = useQueryClient();

  return useMutation(createRequest, {
    onMutate: () => {
      console.log("useCreateRequest: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast("success", "You successfully sent the request!");
      console.log("You successfully sent the request!");
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["requests"]);
    },
  });
}

// API methods

export const getAllUnapprovedRequestsByLeague = async (
  leagueId: string,
  email: string
) => {
  const response = await axios.get<GetAllUnapprovedRequestsViewModel>(
    `${BASE_URL}/requests/unapprovedByLeague/${leagueId}?email=${email}`
  );
  return response.data;
};

export const approveRequest = async (inputModel: ApproveRequestInputModel) => {
  const { creatorId, leagueId, email } = inputModel;

  await axios.patch(
    `${BASE_URL}/requests/approve?creatorId=${creatorId}&leagueId=${leagueId}&email=${email}`
  );
};

export const deleteRequest = async (id: string) => {
  await axios.delete(`${BASE_URL}/requests/${id}`);
};

export const createRequest = async (inputModel: CreateRequestInputModel) => {
  await axios.post(`${BASE_URL}/requests`, inputModel);
};
