import React from "react";
import { useState } from "react";
import { Dimensions } from "react-native";
import {
  PanGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";

import {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { Container, AnimatedSquare, Button, ButtonLabel } from "./styles";

export const Drag = () => {
  const [loop, setLoop] = useState(false);
  const [squareDimesions, setSquareDimensions] = useState({
    height: 0,
    width: 0,
  });

  const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

  const centerWidth = screenWidth / 2 - 150;
  const centerHeight = screenHeight / 2 - 150;

  const xPosition = useSharedValue(centerWidth);
  const yPosition = useSharedValue(centerHeight);
  const rotation = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(event, context: any) {
      context.xPosition = xPosition.value;
      context.yPosition = yPosition.value;
    },

    onActive({ translationX, translationY }, context: any) {
      const totalXPosition = context.xPosition + translationX;
      const totalYPosition = context.yPosition + translationY;

      const rightSideWall = screenWidth - squareDimesions.width;
      const bottomSideWall = screenHeight - squareDimesions.height;
      const leftSideWall = 0;
      const topSideWall = 0;

      const hasTouchLeftSide = totalXPosition < leftSideWall;
      const hasTouchRightSide = totalXPosition >= rightSideWall;
      const hasTouchTopSide = totalYPosition < topSideWall;
      const hasTouchBottomSide = totalYPosition > bottomSideWall;

      const hasTouchTopRightCorner = hasTouchRightSide && hasTouchTopSide;
      const hasTouchTopLeftCorner = hasTouchLeftSide && hasTouchTopSide;
      const hasTouchBottomLeftCorner = hasTouchLeftSide && hasTouchBottomSide;
      const hasTouchBottomRightCorner = hasTouchBottomSide && hasTouchRightSide;

      if (hasTouchTopRightCorner) {
        xPosition.value = rightSideWall;
        yPosition.value = topSideWall;
        return;
      }

      if (hasTouchBottomRightCorner) {
        xPosition.value = rightSideWall;
        yPosition.value = bottomSideWall;
        return;
      }

      if (hasTouchTopLeftCorner) {
        xPosition.value = leftSideWall;
        yPosition.value = topSideWall;
        return;
      }

      if (hasTouchBottomLeftCorner) {
        xPosition.value = leftSideWall;
        yPosition.value = bottomSideWall;
        return;
      }

      if (hasTouchRightSide) {
        xPosition.value = rightSideWall;
        yPosition.value = totalYPosition;

        return;
      }

      if (hasTouchLeftSide) {
        xPosition.value = leftSideWall;
        yPosition.value = totalYPosition;

        if (hasTouchTopSide) {
          xPosition.value = leftSideWall;
          yPosition.value = topSideWall;
        }

        if (hasTouchBottomSide) {
          xPosition.value = leftSideWall;
          yPosition.value = bottomSideWall;
        }
        return;
      }

      if (hasTouchBottomSide) {
        yPosition.value = screenHeight - squareDimesions.height;
        xPosition.value = totalXPosition;
        return;
      }

      if (hasTouchTopSide) {
        yPosition.value = topSideWall;
        xPosition.value = totalXPosition;
        return;
      }

      xPosition.value = totalXPosition;
      yPosition.value = totalYPosition;
    },

    onEnd() {
      yPosition.value = withSpring(centerHeight);
      xPosition.value = withSpring(centerWidth);
    },
  });

  const animatedSquareStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
        {
          translateX: xPosition.value,
        },
        {
          translateY: yPosition.value,
        },
      ],
    };
  });

  function buttonAnimate() {
    rotation.value = withSpring(loop ? 30 : -30);
    setLoop(!loop);
  }

  return (
    <Container>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <AnimatedSquare
          style={animatedSquareStyle}
          onLayout={({ nativeEvent: { layout } }) =>
            setSquareDimensions({ height: layout.height, width: layout.width })
          }
        />
      </PanGestureHandler>

      <Button delayPressOut={100} activeOpacity={0.8} onPress={buttonAnimate}>
        <ButtonLabel>Rotate</ButtonLabel>
      </Button>
    </Container>
  );
};
