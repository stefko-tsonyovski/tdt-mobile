import styled from "styled-components/native";

const defaultTextStyles = (theme: any) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const body = (theme: any) => `
    font-size: ${theme.fontSizes.body};
`;

const hint = (theme: any) => `
    font-size: ${theme.fontSizes.body};
`;

const error = (theme: any) => `
    color: ${theme.colors.text.error};
`;

const inverse = (theme: any) => `
    color: ${theme.colors.text.inverse};
    font-size: ${theme.fontSizes.body};
`;

const caption = (theme: any) => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
`;

const label = (theme: any) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.medium};
`;

// position
const center = (theme: any) => `
  text-align: center;
`;

const right = (theme: any) => `
text-align: right;
`;

const left = (theme: any) => `
text-align: left;
`;

const variants = {
  body,
  label,
  caption,
  error,
  hint,
  inverse,
};

const textAligns = {
  center,
  right,
  left,
};

export type TextProps = {
  variant?: "body" | "label" | "caption" | "error" | "hint" | "inverse";
  textAlign?: "center" | "right" | "left";
};

export const Text = styled.Text<TextProps>`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant = "body", theme }) => variants[variant](theme)}
  ${({ textAlign = "left", theme }) => textAligns[textAlign](theme)}
`;

Text.defaultProps = {
  variant: "body",
  textAlign: "left",
};
