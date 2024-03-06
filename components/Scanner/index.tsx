import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";

import styles from "../HomeScreen/styles";

interface ScannerProps {
  onBarCodeScanned: ({ data }: { data: string }) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onBarCodeScanned }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = (result: BarCodeScannerResult) => {
    if (result.data) {
      onBarCodeScanned({ data: result.data });
    }
  };

  if (hasPermission === null) {
    return <Text style={styles.dataText}>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text style={styles.dataText}>No access to camera</Text>;
  }

  return (
    <View style={styles.cameraContainer}>
      <BarCodeScanner
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        onBarCodeScanned={handleBarCodeScanned}
        style={styles.camera}
      />
    </View>
  );
};

export default Scanner;
