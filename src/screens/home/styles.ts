import styled from "styled-components/native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = styled(SafeAreaView)`
  background-color: #13131a;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const AnimatedText = styled(Animated.Text)`
  font-size: 30px;
  color: white;
`;

export const AnimatedImage = styled(Animated.Image)`
  height: 200px;
  width: 288px;
  margin-bottom: 40px;
`;
