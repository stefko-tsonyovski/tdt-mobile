import React, { FC, useContext, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  IconButton,
  Modal,
  Portal,
  Button,
  Divider,
  ProgressBar,
} from "react-native-paper";
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
} from "./brackets-card.styles";

export type BracketsCardProps = {
  bracket: Bracket;
  picks: Pick[];
};

export const BracketsCard: FC<BracketsCardProps> = ({ bracket, picks }) => {
  const { user } = useContext(AuthenticationContext);
  const { homePlayer, awayPlayer } = bracket;

  const { mutate: createPick } = useCreatePick();
  const { mutate: verifyPick } = useVerifyPick();

  const [visible, setVisible] = useState(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleCreatePick = (inputModel: CreatePickInputModel) => {
    createPick(inputModel);
  };

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
          style={{ padding: 20 }}
        >
          <Text style={{ fontSize: 20 }} variant="body">
            Votes ({bracket.homeVotes + bracket.awayVotes})
          </Text>

          <Spacer position="top" size="large">
            <View></View>
          </Spacer>

          <Divider style={{ height: 3 }} />

          <Spacer position="top" size="large">
            <View></View>
          </Spacer>

          <Text style={{ fontSize: 20 }} variant="body">
            {bracket.homePlayer
              ? bracket.homePlayer.name + ` (${bracket.homeVotes})`
              : "No home player!"}
          </Text>

          <Spacer position="top" size="medium">
            <View></View>
          </Spacer>

          <ProgressBar
            style={{ height: 7, borderRadius: 10 }}
            progress={
              bracket.homeVotes + bracket.awayVotes > 0
                ? bracket.homeVotes / (bracket.homeVotes + bracket.awayVotes)
                : 0
            }
            color={colors.bg.primary}
          />

          <Spacer position="top" size="large">
            <View></View>
          </Spacer>

          <Text style={{ fontSize: 20 }} variant="body">
            {bracket.awayPlayer
              ? bracket.awayPlayer.name + ` (${bracket.awayVotes})`
              : "No away player!"}
          </Text>

          <Spacer position="top" size="medium">
            <View></View>
          </Spacer>

          <ProgressBar
            style={{ height: 7, borderRadius: 10 }}
            progress={
              bracket.homeVotes + bracket.awayVotes > 0
                ? bracket.awayVotes / (bracket.homeVotes + bracket.awayVotes)
                : 0
            }
            color={colors.bg.secondary}
          />

          <Spacer position="top" size="large">
            <View></View>
          </Spacer>

          <Button
            onPress={hideModal}
            style={{ alignItems: "flex-end" }}
            color={colors.bg.secondary}
          >
            Close
          </Button>
        </Modal>
      </Portal>
      <TouchableOpacity onPress={showModal}>
        <View>
          <BracketName variant="body">{bracket.name}</BracketName>
          <BracketCardContainer>
            <Spacer position="left" size="xxl">
              <View></View>
            </Spacer>
            <BracketPlayersContainer>
              <PlayerContainer>
                <PlayerText
                  player={homePlayer}
                  bracket={bracket}
                  variant="body"
                >
                  {homePlayer ? homePlayer.name : "No home player"}
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
                <PlayerText
                  player={awayPlayer}
                  bracket={bracket}
                  variant="body"
                >
                  {awayPlayer ? awayPlayer.name : "No away player"}
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
      </TouchableOpacity>
    </>
  );
};
