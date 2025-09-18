import { createContext, useContext } from "react";

type Player = "X" | "O";

// Här beskriver vi vad som ska finnas i vårt Context
//  All "speldata" som vi vill kunna dela mellan komponenter
interface GameContextType {
  board: (Player | null)[]; // Spelplanen (array med X, O eller null)
  currentPlayer: Player; // Vems tur det är
  winner: Player | "Tie" | null; // Vinnaren (eller "Tie" om oavgjort)
  handleClick: (index: number) => void; // När man klickar på en ruta
  resetGame: () => void; // Funktion för att starta om spelet
}

//  Context-objektet
export const GameContext = createContext<GameContextType | null>(null);

// hjälpfunktion för att använda Context på ett enklare sätt
export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error(
      "useGameContext must be used inside a GameContext.Provider"
    );
  }
  return context;
}
