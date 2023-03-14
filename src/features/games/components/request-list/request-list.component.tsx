import React from "react";
import { FC, useContext } from "react";
import { FlatList } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { useUnapprovedByLeague } from "../../../../services/requests/requests.service";
import { RequestCard } from "../request-card/request-card.component";
import { ListHeading } from "../voted-prediction-list/voted-prediction-list.styles";
import Spinner from "react-native-loading-spinner-overlay";

export type RequestListProps = {
  leagueId: string;
};

export const RequestList: FC<RequestListProps> = ({ leagueId }) => {
  const { user } = useContext(AuthenticationContext);

  const { data: requestsData, isLoading: isLoadingRequests } =
    useUnapprovedByLeague(leagueId, user.email);

  return (
    <>
      {isLoadingRequests ? (
        <Spinner
          visible={true}
          textContent={"This may take a while..."}
          textStyle={{ color: colors.text.inverse }}
        />
      ) : (
        <>
          <ListHeading variant="body">UNAPPROVED REQUESTS</ListHeading>
          {requestsData?.requests.length ? (
            requestsData.requests.map((request) => (
              <Spacer key={request._id} position="top" size="large">
                <RequestCard request={request} />
              </Spacer>
            ))
          ) : (
            <Spacer position="top" size="large">
              <Text
                style={{ color: colors.bg.primary, textAlign: "center" }}
                variant="body"
              >
                NO UNAPPROVED REQUESTS!
              </Text>
            </Spacer>
          )}
        </>
      )}
    </>
  );
};
