import React, { FC } from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import { colors } from "../../../../infrastructure/theme/colors";
import { Bracket } from "../../../../services/brackets/brackets.service";
import { Pick } from "../../../../services/picks/picks.service";

export type BracketsCardProps = {
  bracket: Bracket;
  picks: Pick[];
};

export const BracketsCard: FC<BracketsCardProps> = ({ bracket, picks }) => {
  const { homePlayer, awayPlayer } = bracket;

  return (
    <>
      <View>
        <Text style={{ textAlign: "center", fontSize: 20 }} variant="body">
          {bracket.name}
        </Text>
        <View
          style={{
            backgroundColor: colors.bg.bracket,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Spacer position="left" size="xxl">
            <View></View>
          </Spacer>
          <View style={{ flexGrow: 1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight:
                    homePlayer && homePlayer.id === bracket.winnerId
                      ? "bold"
                      : "normal",
                }}
                variant="body"
              >
                {homePlayer && homePlayer.name}
                {homePlayer && `(${homePlayer.ranking})`}
              </Text>
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
                      // onClick={() =>
                      //   handleCreatePick({
                      //     bracketId: bracket._id,
                      //     playerId: Number(homePlayer.id),
                      //   })
                      // }
                    />
                  )
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight:
                    awayPlayer && awayPlayer.id === bracket.winnerId
                      ? "bold"
                      : "normal",
                }}
                variant="body"
              >
                {awayPlayer && awayPlayer.name}
                {awayPlayer && `(${awayPlayer.ranking})`}
              </Text>
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
                    // onClick={() =>
                    //   handleCreatePick({
                    //     bracketId: bracket._id,
                    //     playerId: Number(awayPlayer.id),
                    //   })
                    // }
                  />
                )
              )}
            </View>
          </View>
          <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
            {!picks?.find((p) => p.bracketId === bracket._id)?.isVerified && (
              <IconButton
                icon="alert-circle-check-outline"
                color={colors.bg.primary}
              />
            )}
          </View>
        </View>
      </View>
    </>
  );
};
