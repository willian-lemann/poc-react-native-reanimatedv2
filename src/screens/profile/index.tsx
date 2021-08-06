import React from "react";
import { useNavigation } from "@react-navigation/native";

import {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import {
  Container,
  AnimatedHeader,
  NextIcon,
  AnimatedAvatar,
  Name,
  AnimatedList,
  ListTile,
} from "./styles";

export const Profile = () => {
  const navigation = useNavigation();

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 180],
        [300, 120],
        Extrapolate.CLAMP
      ),
    };
  });

  const avatarStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [100, 150],
        [1, 0],
        Extrapolate.CLAMP
      ),
      transform: [
        {
          translateY: interpolate(scrollY.value, [0, 150], [0, -50]),
        },
      ],
    };
  });

  return (
    <Container>
      <AnimatedHeader style={headerStyle}>
        <NextIcon
          name="arrow-right"
          size={38}
          color="#fff"
          onPress={() => navigation.navigate("Drag")}
        />
        <AnimatedAvatar
          style={avatarStyle}
          source={{ uri: "https://github.com/willian-lemann.png" }}
        />

        <Name>Willian Leman Rocha</Name>
      </AnimatedHeader>

      <AnimatedList onScroll={scrollHandler} scrollEventThrottle={16}>
        <ListTile>test12312312e1</ListTile>
        <ListTile>teste</ListTile>
        <ListTile>teste</ListTile>
        <ListTile>teste</ListTile>
        <ListTile>teste</ListTile>
        <ListTile>teste</ListTile>
        <ListTile>teste</ListTile>
        <ListTile>teste</ListTile>
        <ListTile>teste</ListTile>
        <ListTile>teste</ListTile>
        <ListTile>teste</ListTile>
        <ListTile>teste</ListTile>
        <ListTile>teste</ListTile>
      </AnimatedList>
    </Container>
  );
};
