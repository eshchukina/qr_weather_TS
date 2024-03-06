import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Grid, Icon, Button } from '@ant-design/react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Scanner from "../Scanner";
import AntIcon from "react-native-vector-icons/AntDesign";



import Header from "../Header";
import styles from "./styles";

interface Props {
  navigation: any; 
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [showScanner, setShowScanner] = useState<boolean>(false);
  const [scannedData, setScannedData] = useState<string>("");
  const [scannedSaveData, setScannedSaveData] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const savedDataJSON = await AsyncStorage.getItem("scannedSaveData");
      if (savedDataJSON) {
        const savedDataArray = JSON.parse(savedDataJSON);
        setScannedSaveData(savedDataArray);
      }
    };
    fetchData();
  }, []);

  const handleToggleScanner = () => {
    setShowScanner(!showScanner);
  };

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScannedData(data);
    let updatedData = [...new Set([...scannedSaveData, data])];
    updatedData = updatedData.slice(-10);
    setScannedSaveData(updatedData);
    await AsyncStorage.setItem("scannedSaveData", JSON.stringify(updatedData));
    setShowScanner(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Header scannedData={scannedData} />
      </View>
      <View style={styles.containerItem}>
        <Text style={styles.dataText}>
          Press the QR code image and scan the location:
        </Text>
        {showScanner ? (
          <>
            <View style={styles.cameraContainer}>
              <Scanner onBarCodeScanned={handleBarCodeScanned} />
            </View>
          </>
        ) : (
          <TouchableOpacity onPress={handleToggleScanner}>
            <Text style={styles.qrImage}>

              <AntIcon name="qrcode" size={300} color="#fff1f2" />,
            </Text>
          </TouchableOpacity>
        )}
        {scannedData !== "" && (
          <View style={styles.dataTextContainer}>
            <Text style={styles.dataText}>
              Location: {scannedData}
           
              <AntIcon name="pushpin" size={30} color="#edbabc" />
            </Text>
          </View>
        )}

        {showScanner ? (
          <>
            <Button
              // title="Cancel"
              onPress={handleToggleScanner}
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonContainerText}>
            
                <AntIcon name="close" size={30} color="#bb7b85" />
              </Text>
            </Button>
          </>
        ) : (
          <Button
            style={styles.buttonContainer}
            onPress={() =>
              navigation.navigate("WeatherScreen", { scannedData })
            }
          >
            <Text style={styles.buttonContainerText}>Get the weather</Text>
          </Button>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
