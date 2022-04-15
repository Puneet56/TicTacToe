import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Cross = () => {
	return (
		<View style={styles.cross}>
			<View style={styles.crossLine}></View>
			<View style={[styles.crossLine, styles.crossLineReverse]}></View>
		</View>
	);
};

export default Cross;

const styles = StyleSheet.create({
	cross: {
		width: 70,
		height: 70,
		alignItems: "center",
		justifyContent: "center",
	},
	crossLine: {
		position: "absolute",
		width: 10,
		height: 80,
		backgroundColor: "#fff",
		transform: [{ rotate: "45deg" }],
	},
	crossLineReverse: {
		transform: [{ rotate: "-45deg" }],
	},
});
