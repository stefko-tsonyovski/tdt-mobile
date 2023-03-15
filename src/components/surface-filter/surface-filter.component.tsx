import { useAtom } from "jotai";
import React from "react";
import { Chip, Colors } from "react-native-paper";
import { selectedSurfaceAtom } from "../../utils/atoms";
import { Spacer } from "../spacer/spacer.component";
import { Text } from "../typography/text.component";

const surfaces = [
  "all",
  "outdoor hard",
  "outdoor clay",
  "outdoor grass",
  "indoor hard",
];
export const SurfaceFilter = () => {
  const [surface, setSurface] = useAtom(selectedSurfaceAtom);

  return (
    <>
      {surfaces.map((s, index) => {
        return (
          <Spacer position="bottom" size="small" key={s + index}>
            {s === surface ? (
              <Chip
                style={{ backgroundColor: Colors.blue300 }}
                textStyle={{ textAlign: "center", width: "100%" }}
                mode="outlined"
                onPress={() => setSurface(s)}
              >
                <Text variant="body">{s}</Text>
              </Chip>
            ) : (
              <Chip
                textStyle={{ textAlign: "center", width: "100%" }}
                mode="outlined"
                onPress={() => setSurface(s)}
              >
                <Text variant="body">{s}</Text>
              </Chip>
            )}
          </Spacer>
        );
      })}
    </>
  );
};
