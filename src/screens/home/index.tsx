import React, { useEffect } from "react";
import { RouteProp } from "@react-navigation/native";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

import heroImage from "../../assets/hero.png";

import { Container, AnimatedText, AnimatedImage } from "./styles";

export const Home = ({ navigation }: any) => {
  const titlePosition = useSharedValue(100);
  const imageScale = useSharedValue(0.5);

  useEffect(() => {
    imageScale.value = withTiming(
      1,
      {
        duration: 1000,
      },
      () => {
        titlePosition.value = withTiming(0, {
          duration: 1000,
          easing: Easing.bounce,
        });
      }
    );

    setTimeout(() => {
      navigation.navigate("Profile");
    }, 3000);
  }, []);

  const titleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: titlePosition.value,
        },
      ],
      opacity: interpolate(titlePosition.value, [100, 0], [0, 1]),
    };
  });

  const heroStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: imageScale.value,
        },
      ],
    };
  });

  return (
    <Container>
      <AnimatedImage source={heroImage} style={heroStyle} />
      <AnimatedText style={titleStyle}>Welcome to ninder</AnimatedText>
    </Container>
  );
};
