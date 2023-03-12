import React from "react";
import { View, Text } from "react-native";
import RNModal from "react-native-modal";
import styles from "../styles/styles";

export const Modal = ({
  isVisible,
  children,
  ...props
}) => {
  return (
    <RNModal
      isVisible={isVisible}
      animationInTiming={1000}
      animationOutTiming={1000}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      {...props}>
      {children}
    </RNModal>
  );
};

const ModalContainer = ({ children }) => (
  <View style={styles.modalContainer}>{children}</View>
);

const ModalHeader = ({ title }) => (
  <View style={styles.modalHeader}>
    <Text style={styles.header}>{title}</Text>
  </View>
);

const ModalBody = ({ children }) => (
  <View style={styles.body}>{children}</View>
);

const ModalFooter = ({ children }) => (
  <View style={styles.footer}>{children}</View>
);

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#ffffff",
//     borderRadius: 25,
//     borderWidth: 1,
//     borderColor: "#000",
//     borderStyle: "solid",
//   },
//   header: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     paddingTop: 10,
//     textAlign: "center",
//     fontSize: 24,
//   },
//   body: {
//     justifyContent: "center",
//     paddingHorizontal: 15,
//     minHeight: 100,
//   },
//   footer: {
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 10,
//     flexDirection: "row",
//   },
// });

Modal.Header = ModalHeader;
Modal.Container = ModalContainer;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;