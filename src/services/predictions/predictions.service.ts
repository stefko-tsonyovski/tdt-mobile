import { useQuery, useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../utils/constants";

export type GetPredictionPointsViewModel = {
  points: number;
};

// React Query hooks

export function useGetTotal(email: string) {
  return useQuery(["predictions", email], () =>
    getTotalPredictionPoints(email)
  );
}

// API methods

export const getTotalPredictionPoints = async (email: string) => {
  const response = await axios.get<GetPredictionPointsViewModel>(
    `${BASE_URL}/predictions?email=${email}`
  );
  return response.data.points;
};
