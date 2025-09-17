// Typen för en spelare kan bara vara "X" eller "O"
type Player = "X" | "O";

// Definierar vilka data Cell-komponenten behöver
interface CellProps {
  value: Player | null; // Vad som står i rutan: "X", "O" eller null (tom ruta)
  onClick: () => void; // En funktion som körs när man klickar på rutan
  disabled: boolean; // Om true = knappen är låst (när spelet är slut)
}

// Själva Cell-komponenten
export default function Cell({ value, onClick, disabled }: CellProps) {
  return (
    <button
      // CSS-klasser för att ge olika färger beroende på om rutan är X, O eller tom
      className={`cell ${value === "X" ? "x" : value === "O" ? "o" : ""}`}
      // När man klickar på knappen körs onClick-funktionen
      onClick={onClick}
      // Om spelet är slut (disabled = true) så går det inte att klicka
      disabled={disabled}
    >
      {/* Här visas innehållet i rutan: "X", "O" eller tomt om null */}
      {value}
    </button>
  );
}
