import { useState } from "react";

import Board from "./Board";
import Status from "./Status";
import ResetButton from "./ResetButton";

type Player = "X" | "O";

export default function Game() {
  const size = 3;

  // board = array med 9 celler (för 3x3), varje cell kan vara "X", "O" eller null
  const [board, setBoard] = useState<(Player | null)[]>(
    Array(size * size).fill(null)
  );

  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");

  // Vinnaren av spelet (kan vara "X", "O", "Tie" (oavgjort) eller null om spelet pågår)
  const [winner, setWinner] = useState<Player | "Tie" | null>(null);

  // Alla möjliga vinstmönster (rader, kolumner och diagonaler)
  const winPatterns = [
    [0, 1, 2], // Rad 1
    [3, 4, 5], // Rad 2
    [6, 7, 8], // Rad 3
    [0, 3, 6], // Kolumn 1
    [1, 4, 7], // Kolumn 2
    [2, 5, 8], // Kolumn 3
    [0, 4, 8], // Diagonal \
    [2, 4, 6], // Diagonal /
  ];

  // Funktion som kollar om någon har vunnit eller om det är oavgjort
  const checkWinner = (newBoard: (Player | null)[]): Player | "Tie" | null => {
    // Kolla först om "X" eller "O" har vunnit
    for (const player of ["X", "O"] as Player[]) {
      if (
        winPatterns.some((pattern) =>
          pattern.every((i) => newBoard[i] === player)
        )
      ) {
        return player; // Returnera vinnaren om ett mönster stämmer
      }
    }

    // Om alla celler är fyllda och ingen vann → oavgjort
    if (newBoard.every((cell) => cell !== null)) return "Tie";

    // Annars är spelet inte slut än
    return null;
  };

  // Funktion som körs när man klickar på en ruta
  const handleClick = (index: number) => {
    // Om rutan redan är fylld eller om spelet är slut → gör inget
    if (board[index] !== null || winner) return;

    // Skapa en kopia av brädet (man får inte ändra state direkt i React)
    const newBoard = [...board];

    // Sätt "X" eller "O" i den valda rutan
    newBoard[index] = currentPlayer;

    // Kolla om någon har vunnit efter draget
    const result = checkWinner(newBoard);

    // Uppdatera brädet i state
    setBoard(newBoard);

    if (result) {
      // Om det finns en vinnare eller oavgjort → uppdatera winner
      setWinner(result);
    } else {
      // Om spelet fortsätter → byt spelare
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  // Funktion för att starta om spelet
  const resetGame = () => {
    setBoard(Array(size * size).fill(null)); // Töm brädet
    setCurrentPlayer("X"); // "X" börjar alltid
    setWinner(null); // Ingen vinnare från början
  };

  // Statusmeddelandet som visas ovanför brädet
  const statusMessage = winner
    ? winner === "Tie"
      ? "Spelet slutade oavgjort!"
      : `🎉 ${winner} vann! 🎉`
    : `Nästa tur: ${currentPlayer}`;

  // Det som faktiskt visas på sidan
  return (
    <>
      {/* Knapp för att starta om spelet */}
      <ResetButton onReset={resetGame} />

      {/* Statusfält som visar tur eller vinnare */}
      <Status message={statusMessage} />

      {/* Själva spelbrädet (Board-komponenten) */}
      <Board
        board={board}
        onCellClick={handleClick}
        disabled={!!winner} // Lås brädet om spelet är slut
        size={size}
      />
    </>
  );
}
