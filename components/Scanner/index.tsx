import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Button } from "@ant-design/react-native";
import { CameraView, useCameraPermissions } from "expo-camera/next";
import styles from "./styles";

interface ScannerProps {
  onBarCodeScanned: (data: { data: string }) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onBarCodeScanned }) => {
  const [facing, setFacing] = useState<"front" | "back">("back");
  const [permission, askPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    askPermission();
  }, []);

  if (!permission) {
    return <Text>Requesting camera permission</Text>;
  }

  if (!permission.granted) {
    return <Text>No access to camera</Text>;
  }

  function toggleCameraFacing(): void {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleBarCodeScanned = ({ data }: { data: string }): void => {
    if (!scanned) {
      setScanned(true);
      onBarCodeScanned({ data });
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={handleBarCodeScanned}
      >
        <View style={styles.buttonContainer}>
          <Button style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </Button>
        </View>
      </CameraView>
    </View>
  );
};

export default Scanner;
