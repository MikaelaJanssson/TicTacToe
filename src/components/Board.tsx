import Cell from "./Cell";
import { useGameContext } from "../context/GameContext";

interface BoardProps {
  size: number;
}

// Board visar själva spelplanen
export default function Board({ size }: BoardProps) {
  const { board, handleClick, winner } = useGameContext();
  // Hämta data från Context

  return (
    <div
      className="board"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
    >
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell} // Vad som finns i rutan (X, O eller null)
          onClick={() => handleClick(index)} // Vad som händer när man klickar
          disabled={!!winner} // Stäng av klick om spelet är slut
        />
      ))}
    </div>
  );
}
