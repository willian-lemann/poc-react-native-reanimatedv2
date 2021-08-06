import styled from "styled-components/native";
import Animated from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";

export const Container = styled.View``;

export const AnimatedHeader = styled(Animated.View)`
  height: 300px;
  background-color: #8257e6;
  padding: 30px 0px;
  justify-content: flex-end;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
`;

export const NextIcon = styled(MaterialIcons)`
  align-self: flex-end;
`;

export const AnimatedAvatar = styled(Animated.Image)`
  height: 140px;
  width: 140px;
  border-radius: 70px;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const Name = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-top: 16px;
  color: #ffffff;
`;

export const AnimatedList = styled(Animated.ScrollView).attrs((base) => ({
  ...base,
  contentContainerStyle: {
    paddingTop: 300,
  },
}))`
  z-index: -1;
`;

export const ListTile = styled.Text`
  padding: 20px;
  font-size: 18px;
`;
