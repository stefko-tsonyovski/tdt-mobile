import { useQuery } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export type UserWeek = {
  _id: string;
  userId: string;
  weekId: string;
  balls: number;
  balance: number;
  points: number;
  createdAt: string;
  updatedAt: string;
};

export type GetUserWeekViewModel = {
  userWeek: UserWeek;
};

// React Query Hooks

export function useUserWeek(weekId: string, email: string) {
  return useQuery(["team", "substitutions", weekId, email], () =>
    getUserWeek(weekId, email)
  );
}

// API methods

export const getUserWeek = async (weekId: string, email: string) => {
  const response = await axios.get<GetUserWeekViewModel>(
    `${BASE_URL}/userWeeks/${weekId}?email=${email}`
  );
  const result = response.data;

  return result;
};
