import React, { useState, useEffect } from "react";
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

	useEffect(() => {
		checkWinner();
		noWinner();
	}, [map]);

	const reset = () => {
		setMap([
			["", "", ""], //0th row
			["", "", ""], //1st row
			["", "", ""], //2nd row
		]);
	};

	const handleMove = (row, col) => {
		if (map[row][col] !== "") {
			Alert.alert("Invalid Move", "This position is already taken");
			return;
		}
		const newMap = [...map];
		newMap[row][col] = turn;
		setMap(newMap);
		setTurn(turn === "X" ? "O" : "X");
	};

	const checkWinner = () => {
		for (let i = 0; i < 3; i++) {
			if (map[i][0] === map[i][1] && map[i][1] === map[i][2] && map[i][0] !== "") {
				gameWonMessage(map[i][0]);
				return true;
			}
		}
		for (let i = 0; i < 3; i++) {
			if (map[0][i] === map[1][i] && map[1][i] === map[2][i] && map[0][i] !== "") {
				gameWonMessage(map[0][i]);
				return true;
			}
		}
		if (map[0][0] === map[1][1] && map[1][1] === map[2][2] && map[0][0] !== "") {
			gameWonMessage(map[0][0]);
			return true;
		}
		if (map[0][2] === map[1][1] && map[1][1] === map[2][0] && map[0][2] !== "") {
			gameWonMessage(map[0][2]);
			return true;
		}
		return false;
	};

	const gameWonMessage = (player) => {
		Alert.alert("Hurray", `${player} won!`, [
			{
				text: "Play Again",
				onPress: () => reset(),
			},
		]);
	};

	const noWinner = () => {
		let count = 0;
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (map[i][j] !== "") {
					count++;
				}
			}
		}
		if (count === 9) {
			Alert.alert("No Winner", "Game is a draw", [
				{
					text: "Play Again",
					onPress: () => reset(),
				},
			]);
		}
	};

	const minMax = (map, player) => {
		let score = {};
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (map[i][j] === "") {
					map[i][j] = player;
					if (checkWinner(map)) {
						score[`${i}${j}`] = 1;
					} else {
						score[`${i}${j}`] = -1;
					}
					map[i][j] = "";
				}
			}
		}
		return score;
	};

	const minimax = (map, player) => {
		let bestScore = -Infinity;
		let bestMove = null;
		let score = minMax(map, player);
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (score[`${i}${j}`] > bestScore) {
					bestScore = score[`${i}${j}`];
					bestMove = { i, j };
				}
			}
		}
		return bestMove;
	};

	const aiMove = () => {
		let move = minimax(map, turn);
		handleMove(move.i, move.j);
	};

	return (
		<View style={styles.container}>
			<View style={styles.headingContainer}>
				<Text style={styles.gameTitle}>Tic Tac Toe</Text>
				<Text style={styles.currentTurn}>Current Turn: {turn}</Text>
			</View>
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
	headingContainer: {
		position: "absolute",
		top: 80,
		left: 0,
		right: 0,
		zIndex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 10,
	},
	gameTitle: {
		fontSize: 30,
		fontWeight: "bold",
		color: "#fff",
	},
	currentTurn: {
		fontSize: 30,
		fontWeight: "bold",
		color: "#fff",
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
