import { useState } from "react";
import { GameContext } from "../context/GameContext";
import Board from "./Board";
import Status from "./Status";
import ResetButton from "./ResetButton";

type Player = "X" | "O";

export default function Game() {
  const size = 3; //  brädet (3x3)

  // State: spelplanen
  const [board, setBoard] = useState<(Player | null)[]>(
    Array(size * size).fill(null)
  );

  // State: vem som ska spela just nu
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");

  // State: vinnaren (eller "Tie")
  const [winner, setWinner] = useState<Player | "Tie" | null>(null);

  // Alla möjliga vinstmönster (rader, kolumner, diagonaler)
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Funktion som kollar om någon har vunnit
  const checkWinner = (newBoard: (Player | null)[]): Player | "Tie" | null => {
    for (const player of ["X", "O"] as Player[]) {
      if (
        winPatterns.some((pattern) =>
          pattern.every((i) => newBoard[i] === player)
        )
      ) {
        return player;
      }
    }
    if (newBoard.every((cell) => cell !== null)) return "Tie"; // Oavgjort
    return null;
  };

  // När en spelare klickar på en ruta
  const handleClick = (index: number) => {
    if (board[index] !== null || winner) return; // Stoppa om rutan är upptagen eller spelet redan är slut
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    const result = checkWinner(newBoard); // Kolla om någon vann
    setBoard(newBoard); // Uppdatera brädet
    if (result) {
      setWinner(result); // Om någon vann eller oavgjort - sätt vinnaren
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X"); // Byt spelare
    }
  };

  // Starta om spelet
  const resetGame = () => {
    setBoard(Array(size * size).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  // statusmeddelande
  const statusMessage = winner
    ? winner === "Tie"
      ? "The game ended in a tie!"
      : `🎉 ${winner} wins! 🎉`
    : `Next turn: ${currentPlayer}`;

  return (
    // Här skickar vi vidare all speldata till våra barn-komponenter via Context
    <GameContext.Provider
      value={{ board, currentPlayer, winner, handleClick, resetGame }}
    >
      <ResetButton />
      <Status message={statusMessage} />
      <Board size={size} />
    </GameContext.Provider>
  );
}
