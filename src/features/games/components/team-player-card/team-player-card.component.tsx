import { Text } from "../../../../components/typography/text.component";
import { PlayerInTeam } from "../../../../services/players/players.service";
import { FC } from "react";
import { View } from "react-native";
import { colors } from "../../../../infrastructure/theme/colors";
import { Avatar, Button } from "react-native-paper";
import { Spacer } from "../../../../components/spacer/spacer.component";

export type TeamPlayerCardProps = {
  player: PlayerInTeam;
  index: number;
};

export const TeamPlayerCard: FC<TeamPlayerCardProps> = ({ player, index }) => {
  return (
    <View
      style={{
        height: 150,
        width: 150,
        backgroundColor: colors.ui.card,
        padding: 5,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={{ flexGrow: 1 }} variant="body">
          {index}
        </Text>
        <Button
          style={{ flexGrow: 1 }}
          mode="contained"
          color={colors.bg.primary}
        >
          {player.pointsWon}PT
        </Button>
      </View>
      <Spacer position="top" size="medium">
        <View style={{ alignItems: "center" }}>
          <Avatar.Image
            style={{
              backgroundColor: colors.ui.card,
              borderWidth: 2,
              borderColor: colors.bg.primary,
            }}
            size={70}
            source={{ uri: player.imageUrl }}
          />
        </View>
      </Spacer>
      <Text style={{ textAlign: "center", fontSize: 20 }} variant="body">
        {player.name.split(" ")[1]}
      </Text>
    </View>
  );
};
