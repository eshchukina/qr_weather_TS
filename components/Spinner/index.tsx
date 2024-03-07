import React from "react";
import { View, Image, ImageSourcePropType } from "react-native";

interface SpinnerProps {
  source: ImageSourcePropType;
}

import styles from "./styles";

const Spinner: React.FC<SpinnerProps> = ({ source }) => {
  return (
    <View style={styles.loadingContainer}>
      <Image source={source} style={styles.spinnerImage} />
    </View>
  );
};

export default Spinner;
