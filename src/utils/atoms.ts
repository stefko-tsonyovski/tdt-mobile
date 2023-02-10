import { atom } from "jotai";

export type Item = {
  text: string;
  value: string;
  from: string;
  to: string;
};

export const selectedWeekAtom = atom<Item>({
  text: "GW1",
  value: "63a0343ad7fba86bf211d965",
  from: "2022-12-29",
  to: "2023-01-08",
});
