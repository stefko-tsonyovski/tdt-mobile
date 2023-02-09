import { useQuery, useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../utils/constants";

export type GetTeamPointsViewModel = {
  points: number;
};

// React Query hooks

export function useGetTotal(email: string) {
  return useQuery(["team", email], () => getTotalPoints(email));
}

// API methods

export const getTotalPoints = async (email: string) => {
  const response = await axios.get<GetTeamPointsViewModel>(
    `${BASE_URL}/players/calculateTotal?email=${email}`
  );
  return response.data.points;
};
