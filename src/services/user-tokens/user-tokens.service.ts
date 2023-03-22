import axios, { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { BASE_URL } from "../../utils/constants";
import { showToast } from "../../utils/notifications";
import { ErrorResponse } from "../players/players.service";

export type SubscribeForPushNotificationsInputModel = {
  email: string;
  token: string;
};

// React Query hooks

export function useSubscribeForPushNotifications() {
  const queryClient = useQueryClient();

  return useMutation(subscribeForPushNotifications, {
    onMutate: () => {
      console.log(
        "useSubscribeForPushNotifications: onMutate hook was triggered"
      );
    },
    onSuccess: () => {
      console.log("You successfully subscribed for push notifications!");
    },
    onError: (error: AxiosError) => {
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["userTokens"]);
    },
  });
}

// API methods

export const subscribeForPushNotifications = async (
  inputModel: SubscribeForPushNotificationsInputModel
) => {
  await axios.post(`${BASE_URL}/userTokens`, inputModel);
};
