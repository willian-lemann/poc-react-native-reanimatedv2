import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

import Animated from "react-native-reanimated";

export const Container = styled(SafeAreaView)`
  flex: 1;
  justify-content: space-between;
`;

export const AnimatedSquare = styled(Animated.View)`
  background-color: #8257e6;
  height: 200px;
  width: 300px;
  border-radius: 70px;
`;

export const Button = styled.TouchableOpacity`
  margin-bottom: 100px;
  align-self: center;
  background-color: #8257e6;
  padding: 0 10px;
  border-radius: 70px;
  width: 200px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonLabel = styled.Text`
  font-size: 18px;
  color: white;
`;
