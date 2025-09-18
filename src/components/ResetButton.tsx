import { useGameContext } from "../context/GameContext";

export default function ResetButton() {
  const { resetGame } = useGameContext();

  return <button onClick={resetGame}>Restart</button>;
}
