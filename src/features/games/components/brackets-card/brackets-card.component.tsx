import React, { FC, useContext } from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { Bracket } from "../../../../services/brackets/brackets.service";
import {
  CreatePickInputModel,
  Pick,
  useCreatePick,
  useVerifyPick,
} from "../../../../services/picks/picks.service";
import {
  BracketCardContainer,
  BracketName,
  BracketPlayersContainer,
  PlayerContainer,
  PlayerText,
  VerifyContainer,
} from "../brackets-container/brackets-card.styles";

export type BracketsCardProps = {
  bracket: Bracket;
  picks: Pick[];
};

export const BracketsCard: FC<BracketsCardProps> = ({ bracket, picks }) => {
  const { user } = useContext(AuthenticationContext);
  const { homePlayer, awayPlayer } = bracket;

  const { mutate: createPick } = useCreatePick();
  const { mutate: verifyPick } = useVerifyPick();

  const handleCreatePick = (inputModel: CreatePickInputModel) => {
    createPick(inputModel);
  };

  return (
    <>
      <View>
        <BracketName variant="body">{bracket.name}</BracketName>
        <BracketCardContainer>
          <Spacer position="left" size="xxl">
            <View></View>
          </Spacer>
          <BracketPlayersContainer>
            <PlayerContainer>
              <PlayerText player={homePlayer} bracket={bracket} variant="body">
                {homePlayer && homePlayer.name}
                {homePlayer && `(${homePlayer.ranking})`}
              </PlayerText>
              <View>
                {picks.some((p) => p.bracketId === bracket._id) ? (
                  picks.some((p) => p.playerId === homePlayer.id) ? (
                    <IconButton icon="check" color={colors.bg.primary} />
                  ) : (
                    <IconButton icon="radiobox-blank" disabled />
                  )
                ) : (
                  homePlayer && (
                    <IconButton
                      icon="radiobox-blank"
                      onPress={() =>
                        handleCreatePick({
                          bracketId: bracket._id,
                          playerId: Number(homePlayer.id),
                          email: user.email,
                        })
                      }
                    />
                  )
                )}
              </View>
            </PlayerContainer>
            <PlayerContainer>
              <PlayerText player={awayPlayer} bracket={bracket} variant="body">
                {awayPlayer && awayPlayer.name}
                {awayPlayer && `(${awayPlayer.ranking})`}
              </PlayerText>
              {picks.some((p) => p.bracketId === bracket._id) ? (
                picks.some((p) => p.playerId === awayPlayer.id) ? (
                  <IconButton icon="check" color={colors.bg.primary} />
                ) : (
                  <IconButton icon="radiobox-blank" disabled />
                )
              ) : (
                awayPlayer && (
                  <IconButton
                    icon="radiobox-blank"
                    onPress={() =>
                      handleCreatePick({
                        bracketId: bracket._id,
                        playerId: Number(awayPlayer.id),
                        email: user.email,
                      })
                    }
                  />
                )
              )}
            </PlayerContainer>
          </BracketPlayersContainer>
          <VerifyContainer>
            {!picks?.find((p) => p.bracketId === bracket._id)?.isVerified && (
              <IconButton
                onPress={() =>
                  verifyPick({ bracketId: bracket._id, email: user.email })
                }
                icon="alert-circle-check-outline"
                color={colors.bg.primary}
              />
            )}
          </VerifyContainer>
        </BracketCardContainer>
      </View>
    </>
  );
};
