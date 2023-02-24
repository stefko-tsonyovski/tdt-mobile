import axios, { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { BASE_URL } from "../../utils/constants";
import { showToast } from "../../utils/notifications";
import { ErrorResponse } from "../players/players.service";

export type League = {
  _id: string;
  name: string;
  points: number;
  creatorId: string;
  position: number;
};

export type GetTop200ViewModel = {
  leagues: League[];
};

export type CreateLeagueInputModel = {
  name: string;
  email: string;
};

export type UpdateLeagueInputModel = {
  _id: string;
  creatorId: string;
  points: number;
} & CreateLeagueInputModel;

export type KickMemberInputModel = {
  leagueId: string;
  memberId: string;
  email: string;
};

export type DeleteLeagueInputModel = {
  leagueId: string;
  email: string;
};

export type LeaveLeagueInputModel = {} & DeleteLeagueInputModel;

export type UpdateLeaguePointsInputModel = {} & DeleteLeagueInputModel;

// React Query hooks

export function useTop200(searchTerm: string, enabled: boolean) {
  return useQuery(
    ["leagues", searchTerm, enabled],
    () => getTop200Leagues(searchTerm),
    {
      enabled: enabled,
    }
  );
}

export function useSingleLeague(leagueId: string) {
  return useQuery(["leagues", leagueId], () => getLeague(leagueId));
}

export function useCreateLeague() {
  const queryClient = useQueryClient();

  return useMutation(createLeague, {
    onMutate: () => {
      console.log("useCreateLeague: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast("success", "New league was added!");
      console.log("New league was added!");
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["leagues"]);
    },
  });
}

export function useUpdateLeague() {
  const queryClient = useQueryClient();

  return useMutation(updateLeague, {
    onMutate: () => {
      console.log("useUpdateLeague: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast("success", "A league was updated!");
      console.log("A league was updated!");
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["leagues"]);
    },
  });
}

export function useDeleteLeague() {
  const queryClient = useQueryClient();

  return useMutation(deleteLeague, {
    onMutate: () => {
      console.log("useDeleteLeague: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast("success", "A league was deleted!");
      console.log("A league was deleted!");
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["leagues"]);
    },
  });
}

export function useLeaveLeague() {
  const queryClient = useQueryClient();

  return useMutation(leaveLeague, {
    onMutate: () => {
      console.log("useLeaveLeague: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast("success", "You left this league!");
      console.log("You left this league!");
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["leagues"]);
    },
  });
}

export function useUpdatePoints() {
  const queryClient = useQueryClient();

  return useMutation(updatePoints, {
    onMutate: () => {
      console.log("useUpdatePoints: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast("success", "You updated league points successfully!");
      console.log("You updated league points successfully!");
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["leagues"]);
    },
  });
}

export function useKickMember() {
  const queryClient = useQueryClient();

  return useMutation(kickMember, {
    onMutate: () => {
      console.log("useKickMember: onMutate hook was triggered");
    },
    onSuccess: () => {
      showToast("success", "You kicked this player from your league!");
      console.log("You kicked this player from your league!");
    },
    onError: (error: AxiosError) => {
      showToast("error", (error.response?.data as ErrorResponse).msg);
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
}

// API methods

export const getTop200Leagues = async (searchTerm: string) => {
  const response = await axios.get<GetTop200ViewModel>(
    `${BASE_URL}/leagues?searchTerm=${searchTerm}`
  );
  return response.data;
};

export const getLeague = async (leagueId: string) => {
  const response = await axios.get<UpdateLeagueInputModel>(
    `${BASE_URL}/leagues/${leagueId}`
  );
  return response.data;
};

export const createLeague = async (inputModel: CreateLeagueInputModel) => {
  await axios.post(`${BASE_URL}/leagues`, inputModel);
};

export const updateLeague = async (inputModel: UpdateLeagueInputModel) => {
  await axios.patch(`${BASE_URL}/leagues/${inputModel._id}`, inputModel);
};

export const deleteLeague = async (inputModel: DeleteLeagueInputModel) => {
  await axios.delete(
    `${BASE_URL}/leagues/${inputModel.leagueId}?email=${inputModel.email}`
  );
};

export const leaveLeague = async (inputModel: LeaveLeagueInputModel) => {
  await axios.patch(
    `${BASE_URL}/leagues/leave/${inputModel.leagueId}?email=${inputModel.email}`
  );
};

export const updatePoints = async (
  inputModel: UpdateLeaguePointsInputModel
) => {
  await axios.patch(
    `${BASE_URL}/leagues/updatePoints/${inputModel.leagueId}?email=${inputModel.email}`
  );
};

export const kickMember = async (inputModel: KickMemberInputModel) => {
  const { memberId, leagueId, email } = inputModel;

  await axios.patch(
    `${BASE_URL}/leagues/kick?memberId=${memberId}&leagueId=${leagueId}&email=${email}`
  );
};
