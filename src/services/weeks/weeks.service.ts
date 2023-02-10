import { useQuery } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export type Week = {
  _id: string;
  name: string;
  from: string;
  to: string;
};

export type GetAllWeeksViewModel = {
  weeks: Week[];
};

export type GetWeekViewModel = {
  week: Week;
};

export type CountdownViewModel = {
  countdownDays: number;
  countdownHours: number;
  countdownMinutes: number;
  countdownSeconds: number;
};

// React Query hooks

export function useWeeks() {
  return useQuery(["weeks"], getAllWeeks);
}

export function useWeekByCurrentDate() {
  return useQuery(["week"], getWeekByCurrentDate);
}

export function useCountdown(weekId: string) {
  return useQuery(["countdown", weekId], () => getCountdown(weekId));
}

// API methods

export const getAllWeeks = async () => {
  const response = await axios.get<GetAllWeeksViewModel>(`${BASE_URL}/weeks`);
  const result = response.data;

  return result;
};

export const getWeekByCurrentDate = async () => {
  const response = await axios.get<GetWeekViewModel>(
    `${BASE_URL}/weeks/byCurrentDate`
  );
  const result = response.data;

  return result;
};

export const getCountdown = async (weekId: string) => {
  const response = await axios.get<CountdownViewModel>(
    `${BASE_URL}/weeks/countdown?weekId=${weekId}`
  );
  const result = response.data;

  return result;
};
