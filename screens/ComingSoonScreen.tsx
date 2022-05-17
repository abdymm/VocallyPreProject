import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";

export default function ComingSoonScreen() {
  return (
    <View style={styles.container}>
      <Text>Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
