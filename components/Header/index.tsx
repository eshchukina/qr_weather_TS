import React, { useState } from "react";
import { Image } from "react-native";
import { Button } from "@ant-design/react-native";
import ModalWindow from "../ModalWindow";
import AntIcon from "react-native-vector-icons/AntDesign";

import styles from "./styles";

interface HeaderProps {
  scannedData: string;
}

const Header: React.FC<HeaderProps> = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleToggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <Image
        source={require("../../assets/images/qr_logoText.png")}
        style={styles.logoContainer}
      />
      <Button
        type="ghost"
        style={styles.buttonContainerHeader}
        onPress={handleToggleModal}
      >
        <AntIcon name="bars" size={30} color="#faedcd" />
      </Button>
      <ModalWindow visible={modalVisible} onClose={handleToggleModal} />
    </>
  );
};

export default Header;
