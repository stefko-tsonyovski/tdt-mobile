import { useQuery, useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../utils/constants";
import { showToast } from "../../utils/notifications";
import { ErrorResponse } from "../players/players.service";

export type Prediction = {
  _id: string;
  content: string;
  creatorId: string;
  isApproved: boolean;
  answer: string;
  creatorFirstName: string;
  creatorLastName: string;
  countdownDays: number;
  countdownHours: number;
  countdownMinutes: number;
};

export type VotePrediction = {
  _id: string;
  answer: string;
  prediction: Prediction;
};

export type GetAllVotePredictionsViewModel = {
  votePredictions: VotePrediction[];
  totalItems: number;
};

export type GetPredictionPointsViewModel = {
  points: number;
};

export type GetAllUnapprovedPredictionsViewModel = {
  predictions: Prediction[];
  totalItems: number;
};

export type GetReceivedPointsViewModel = {
  receivedPoints: number;
};

export type CreateVotePredictionInputModel = {
  _id: string;
  answer: string;
  email: string;
};

export type VerifyPredictionInputModel = {
  votePredictionId: string;
  email: string;
};

export type CreatePredictionInputModel = {
  content: string;
  email: string;
};

export type UpdatePredictionInputModel = {
  _id: string;
  answer: string;
};

// React Query hooks

export function useGetTotal(email: string) {
  return useQuery(["predictions", email], () =>
    getTotalPredictionPoints(email)
  );
}

export function useApproved(page: number, itemsPerPage: number, email: string) {
  return useQuery(
    ["predictions", page, itemsPerPage],
    () => getAllApprovedPredictions(page, itemsPerPage, email),
    {
      keepPreviousData: true,
    }
  );
}

export function useVotedPredictionsByUser(
  page: number,
  itemsPerPage: number,
  email: string
) {
  return useQuery(
    ["predictions/votedByUser", page, itemsPerPage, email],
    () => getAllVotedPredictionsByUser(page, itemsPerPage, email),
    {
      keepPreviousData: true,
    }
  );
}

export function useUnapproved(page: number, itemsPerPage: number) {
  return useQuery(
    ["predictions", page, itemsPerPage],
    () => getAllUnapprovedPredictions(page, itemsPerPage),
    {
      keepPreviousData: true,
    }
  );
}

export function useCreateVotePrediction() {
  const queryClient = useQueryClient();

  return useMutation(createVotePrediction, {
    onMutate: () => {
      console.log("useCreateVotePrediction: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast("success", "Vote to prediction was successful!");
      console.log("Vote to prediction was successful!");
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["predictions"]);
    },
  });
}

export function useVerifyVotePrediction() {
  const queryClient = useQueryClient();

  return useMutation(verifyVotedPrediction, {
    onMutate: () => {
      console.log("useVerifyVotePrediction: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast("success", "Successfully verified");
      console.log("Prediction verified successfully!");
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["predictions"]);
    },
  });
}

export function useCreatePrediction() {
  const queryClient = useQueryClient();

  return useMutation(createPrediction, {
    onMutate: () => {
      console.log("useCreatePrediction: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast(
        "success",
        "You successfully created the prediction! Waiting for approval..."
      );
      console.log(
        "error",
        "You successfully created the prediction! Waiting for approval..."
      );
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["predictions"]);
    },
  });
}

export function useApprovePrediction() {
  const queryClient = useQueryClient();

  return useMutation(approvePrediction, {
    onMutate: () => {
      console.log("useApprovePrediction: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast("success", "Prediction approved successfully!");
      console.log("Prediction approved successfully!");
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["predictions"]);
    },
  });
}

export function useDeletePrediction() {
  const queryClient = useQueryClient();

  return useMutation(deletePrediction, {
    onMutate: () => {
      console.log("useDeletePrediction: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast("success", "Prediction deleted successfully!");
      console.log("Prediction deleted successfully!");
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["predictions"]);
    },
  });
}

export function useUpdatePrediction() {
  const queryClient = useQueryClient();

  return useMutation(updatePrediction, {
    onMutate: () => {
      console.log("useUpdatePrediction: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast("success", "Prediction updated successfully!");
      console.log("Prediction updated successfully!");
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["predictions"]);
    },
  });
}

// API methods

export const getTotalPredictionPoints = async (email: string) => {
  const response = await axios.get<GetPredictionPointsViewModel>(
    `${BASE_URL}/predictions?email=${email}`
  );
  return response.data.points;
};

export const getAllApprovedPredictions = async (
  page: number,
  itemsPerPage: number,
  email: string
) => {
  const response = await axios.get<GetAllUnapprovedPredictionsViewModel>(
    `${BASE_URL}/predictions/approved?page=${page}&itemsPerPage=${itemsPerPage}&email=${email}`
  );
  return response.data;
};

export const getAllVotedPredictionsByUser = async (
  page: number,
  itemsPerPage: number,
  email: string
) => {
  const response = await axios.get<GetAllVotePredictionsViewModel>(
    `${BASE_URL}/predictions/votedByUser?page=${page}&itemsPerPage=${itemsPerPage}&email=${email}`
  );
  const result = response.data;

  return result;
};

export const getAllUnapprovedPredictions = async (
  page: number,
  itemsPerPage: number
) => {
  const response = await axios.get<GetAllUnapprovedPredictionsViewModel>(
    `${BASE_URL}/predictions/unapproved?page=${page}&itemsPerPage=${itemsPerPage}`
  );
  return response.data;
};

export const createVotePrediction = async (
  inputModel: CreateVotePredictionInputModel
) => {
  const response = await axios.post(
    `${BASE_URL}/predictions/vote/${inputModel._id}`,
    {
      answer: inputModel.answer,
      email: inputModel.email,
    }
  );
  const result = response.data;

  return result;
};

export const verifyVotedPrediction = async (
  inputModel: VerifyPredictionInputModel
) => {
  await axios.post<GetReceivedPointsViewModel>(
    `${BASE_URL}/predictions/verify/${inputModel.votePredictionId}?email=${inputModel.email}`
  );
};

export const createPrediction = async (
  inputModel: CreatePredictionInputModel
) => {
  await axios.post(`${BASE_URL}/predictions`, inputModel);
};

export const approvePrediction = async (id: string) => {
  await axios.patch(`${BASE_URL}/predictions/approve/${id}`);
};

export const deletePrediction = async (id: string) => {
  await axios.delete(`${BASE_URL}/predictions/${id}`);
};

export const updatePrediction = async (
  inputModel: UpdatePredictionInputModel
) => {
  await axios.patch(`${BASE_URL}/predictions/${inputModel._id}`, inputModel);
};
