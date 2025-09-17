import Cell from "./Cell";

// Typen för en spelare kan vara "X" eller "O"
type Player = "X" | "O";

// Definierar vilken data Board-komponenten behöver få utifrån
interface BoardProps {
  board: (Player | null)[]; // En array med 9 element ("X", "O" eller null)
  onCellClick: (index: number) => void; // En funktion som körs när man klickar på en cell
  disabled: boolean; // Om true = spelet är slut
  size: number;
}

// Själva Board-komponenten som tar emot props
export default function Board({
  board,
  onCellClick,
  disabled,
  size,
}: BoardProps) {
  return (
    // Ett div-element som håller alla celler
    // gridTemplateColumns gör att brädet får rätt antal kolumner (t.ex. 3 för 3x3)
    <div
      className="board"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
    >
      {/* Loopar igenom varje cell i brädet och renderar en Cell-komponent */}
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          onClick={() => onCellClick(index)}
          disabled={disabled} // Om true kan man inte klicka längre
        />
      ))}
    </div>
  );
}
