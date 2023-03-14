import React, { useContext } from "react";
import styled from "styled-components/native";

import { List, Avatar } from "react-native-paper";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { colors } from "../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { View } from "react-native";

const TransparentSafeArea = styled(SafeArea)`
  background-color: transparent;
`;
const SettingsBackground = styled.ImageBackground.attrs({
  source: {
    uri: "https://res.cloudinary.com/dcvkhhwth/image/upload/v1678829465/background-image_uk9slf.png",
  },
})`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
  background-color: rgba(255, 255, 255, 0.4);
`;
const AvatarContainer = styled.View`
  align-items: center;
`;

export const SettingsScreen = () => {
  const { onLogout, user } = useContext(AuthenticationContext);
  return (
    <SettingsBackground>
      <TransparentSafeArea>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <AvatarContainer>
            <Avatar.Icon
              style={{ backgroundColor: colors.bg.primary }}
              size={180}
              icon="human"
            />
          </AvatarContainer>

          <List.Section>
            <Spacer position="top" size="small" children={undefined} />
            <SettingsItem
              title="Logout"
              left={(props) => (
                <List.Icon
                  {...props}
                  color={colors.ui.secondary}
                  icon="exit-to-app"
                />
              )}
              onPress={onLogout}
            />
          </List.Section>
        </View>
      </TransparentSafeArea>
    </SettingsBackground>
  );
};
