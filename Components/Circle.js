import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Circle = () => {
	return <View style={styles.circle} />;
};

export default Circle;

const styles = StyleSheet.create({
	circle: {
		width: 70,
		height: 70,
		borderRadius: 50,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 10,
		borderColor: "#fff",
	},
});
