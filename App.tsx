import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Font from "expo-font";
import { Provider as PaperProvider } from 'react-native-paper'; 
import { NavigationContainer } from '@react-navigation/native'; 
import RootNavigator from './components/RootNavigator';
import Spinner from './components/Spinner';
interface Props {}

const App: React.FC<Props> = () => {
  const [theme, setTheme] = useState<any>(null);
  const [currentTheme, setCurrentTheme] = useState<any>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  const changeTheme = (theme: any, currentTheme: any) => {
    setTheme(theme);
    setCurrentTheme(currentTheme);
  };

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          first: require("./assets/fonts/Sarabun-Regular.ttf"),
          second: require("./assets/fonts/Satisfy-Regular.ttf"),
        });
        setIsReady(true);
      } catch (error) {
        console.error("Error loading fonts:", error);
      }
    }
    loadFonts();
  }, []);

  if (!isReady) {
    return <Spinner source={require("./assets/images/qr_spinner.gif")} />;
  }

  return (
    <PaperProvider theme={theme}>

        <RootNavigator  />

    </PaperProvider>
  );
};

export default App;
