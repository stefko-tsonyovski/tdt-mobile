import { useQuery, useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../utils/constants";

export type GetBracketPointsViewModel = {
  bracketPoints: number;
};

// React Query hooks

export function useGetTotal(email: string) {
  return useQuery(["picks", email], () => getTotalBracketPoints(email));
}

// API methods

export const getTotalBracketPoints = async (email: string) => {
  const response = await axios.get<GetBracketPointsViewModel>(
    `${BASE_URL}/picks/calculateTotal?email=${email}`
  );

  return response.data.bracketPoints;
};
