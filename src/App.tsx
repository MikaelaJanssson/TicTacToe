import { useState } from "react";
import "./index.css";

// Typ för spelare:  "X" eller "O"
type Player = "X" | "O";

export default function TicTacToe() {
  const size = 3; // Brädet är 3x3

  // State för brädet: en array med 9 element (3x3), varje cell kan vara "X", "O" eller null
  const [board, setBoard] = useState<(Player | null)[]>(
    Array(size * size).fill(null)
  );

  // State för aktuell spelare: börjar alltid med "X"
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");

  // State för vinnare: kan vara "X", "O", "Tie" (oavgjort) eller null om spelet pågår
  const [winner, setWinner] = useState<Player | "Tie" | null>(null);

  // alla olika vinstkombinationer (rader, kolumner och diagonaler)
  const winPatterns = [
    [0, 1, 2], // första raden
    [3, 4, 5], // andra raden
    [6, 7, 8], // tredje raden
    [0, 3, 6], // första kolumnen
    [1, 4, 7], // andra kolumnen
    [2, 5, 8], // tredje kolumnen
    [0, 4, 8], // diagonal vänster-till-höger
    [2, 4, 6], // diagonal höger-till-vänster
  ];

  // Funktion som kollar om någon har vunnit eller om spelet är oavgjort
  const checkWinner = (newBoard: (Player | null)[]): Player | "Tie" | null => {
    // Kolla först om X eller O har vunnit
    for (const player of ["X", "O"] as Player[]) {
      // some = minst ett mönster matchar
      // every = alla index i mönstret matchar spelaren
      if (
        winPatterns.some((pattern) =>
          pattern.every((i) => newBoard[i] === player)
        )
      ) {
        return player; // returnerar vinnaren
      }
    }

    // Om alla celler är fyllda och ingen vinnare = oavgjort
    if (newBoard.every((cell) => cell !== null)) return "Tie";

    // else: ingen vinnare än
    return null;
  };

  // Funktion som körs när man klickar på en cell
  const handleClick = (index: number) => {
    // Om cellen redan är fylld eller spelet är slut → inget händer
    if (board[index] !== null || winner) return;

    // Skapa en kopia av brädet
    const newBoard = [...board];
    newBoard[index] = currentPlayer; // sätt X eller O

    // Kolla om spelet har en vinnare efter detta drag
    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result); // sätt vinnare eller "Tie"
    } else {
      // Byt spelare till nästa tur
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }

    // Uppdatera brädet i state
    setBoard(newBoard);
  };

  // Funktion för att starta om spelet
  const resetGame = () => {
    setBoard(Array(size * size).fill(null)); // töm brädet
    setCurrentPlayer("X"); // X börjar alltid
    setWinner(null); // nollställ vinnare
  };

  // Visa status
  const statusMessage = winner
    ? winner === "Tie"
      ? "Spelet slutade oavgjort!"
      : `🎉 ${winner} vann! 🎉`
    : `Nästa tur: ${currentPlayer}`;

  return (
    <div className="container">
      {/* Rubrik */}
      <h1>Tic-Tac-Toe</h1>
      <p>React | Vite | Typescript</p>

      {/* Starta om-knapp */}
      <button onClick={resetGame}>Starta om</button>

      {/* Statusfält som visar vinnare, oavgjort eller nästa tur */}
      <div className="status">{statusMessage}</div>

      {/* Spelbrädet */}
      <div
        className="board"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }} // 3 kolumner
      >
        {/* Rendera varje cell */}
        {board.map((cell, index) => (
          <button
            key={index} // unik key för React
            className={`cell ${cell === "X" ? "x" : cell === "O" ? "o" : ""}`} // CSS-klass beroende på innehåll
            onClick={() => handleClick(index)} // klickhantering
            disabled={!!winner} // lås brädet om spelet är slut
          >
            {cell} {/* Visa X eller O */}
          </button>
        ))}
      </div>
    </div>
  );
}
