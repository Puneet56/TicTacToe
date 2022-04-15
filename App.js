import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground, Pressable, TouchableOpacity, Alert } from "react-native";
import bg from "./assets/bg.jpeg";
import Cross from "./Components/Cross";
import Circle from "./Components/Circle";

export default function App() {
	const [map, setMap] = useState([
		["", "", ""], //0th row
		["", "", ""], //1st row
		["", "", ""], //2nd row
	]);

	const [turn, setTurn] = useState("X");

	const reset = () => {
		setMap([
			["", "", ""], //0th row
			["", "", ""], //1st row
			["", "", ""], //2nd row
		]);
	};

	const handleMove = (row, col) => {
		if (map[row][col] !== "") {
			Alert.alert("Invalid Move");
			return;
		}
		const newMap = [...map];
		newMap[row][col] = turn;
		setMap(newMap);
		setTurn(turn === "X" ? "O" : "X");
		// reset();
		if (checkWinner(newMap)) {
			console.warn("PASSED");
			Alert.alert(`${turn} won!`);
		}
	};

	const checkWinner = (map) => {};

	return (
		<View style={styles.container}>
			<ImageBackground source={bg} style={styles.bg} resizeMode="contain">
				<View style={styles.map}>
					{map.map((row, rowIndex) => {
						return (
							<View style={styles.row} key={rowIndex}>
								{row.map((unit, unitIndex) => {
									return (
										<Pressable onPress={() => handleMove(rowIndex, unitIndex)} key={unitIndex} style={styles.unit}>
											{unit === "X" && <Cross />}
											{unit === "O" && <Circle />}
											{unit === "" && <Text>{""}</Text>}
										</Pressable>
									);
								})}
							</View>
						);
					})}
				</View>
			</ImageBackground>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		fontSize: 50,
		fontWeight: "bold",
		color: "#fff",
	},
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#242d34",
	},
	bg: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 15,
	},
	map: {
		width: "80%",
		aspectRatio: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		alignItems: "center",
		// borderWidth: 1,
		// borderColor: "#fff",
	},
	row: {
		width: "100%",
		height: "33.33%",
		flexDirection: "row",
		flexWrap: "wrap",
	},
	unit: {
		zIndex: 0.5,
		marginTop: 12,
		alignItems: "center",
		justifyContent: "center",
		width: "33.3%",
		aspectRatio: 1,
		// borderWidth: 1,
		// borderColor: "#fff",
	},
});
