import React, { FC } from "react";
import styled, { useTheme } from "styled-components/native";

const sizeVariant = {
  small: 1,
  medium: 2,
  large: 3,
  xl: 4,
  xxl: 5,
};

const positionVariant = {
  top: "marginTop",
  left: "marginLeft",
  right: "marginRight",
  bottom: "marginBottom",
};

const getVariant = (
  position: "top" | "left" | "right" | "bottom",
  size: "small" | "medium" | "large" | "xl" | "xxl",
  theme: any
) => {
  const sizeIndex = sizeVariant[size];
  const property = positionVariant[position];
  const value = theme.space[sizeIndex];

  return `${property}:${value}`;
};

export type SpacerViewProps = {
  variant: string;
};

const SpacerView = styled.View<SpacerViewProps>`
  ${({ variant }) => variant};
`;

export type SpacerProps = {
  position: "top" | "left" | "right" | "bottom";
  size: "small" | "medium" | "large" | "xl" | "xxl";
  children: JSX.Element | undefined;
};

export const Spacer: FC<SpacerProps> = ({
  position = "top",
  size = "small",
  children,
}) => {
  const theme = useTheme();
  const variant = getVariant(position, size, theme);
  return <SpacerView variant={variant}>{children}</SpacerView>;
};

Spacer.defaultProps = {
  position: "top",
  size: "small",
};
