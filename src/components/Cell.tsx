type Player = "X" | "O";

interface CellProps {
  value: Player | null; // X, O eller null
  onClick: () => void; // Vad som ska hända vid klick
  disabled: boolean;
}

// Cell = en enskild ruta i brädet
export default function Cell({ value, onClick, disabled }: CellProps) {
  return (
    <button
      className={`cell ${value === "X" ? "x" : value === "O" ? "o" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
}
