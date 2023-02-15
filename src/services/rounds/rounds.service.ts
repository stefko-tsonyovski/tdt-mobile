import axios from "axios";
import { useQuery } from "react-query";
import { BASE_URL } from "../../utils/constants";

export type Round = {
  _id: string;
  name: string;
};

export type GetAllRoundsViewModel = {
  rounds: Round[];
};

// React Query hooks

export function useAllRounds() {
  return useQuery(["rounds"], () => getAllRounds());
}

// API methods

export const getAllRounds = async () => {
  const response = await axios.get<GetAllRoundsViewModel>(`${BASE_URL}/rounds`);
  const result = response.data;

  return result;
};
