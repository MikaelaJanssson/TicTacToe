interface ResetButtonProps {
  onReset: () => void;
}

export default function ResetButton({ onReset }: ResetButtonProps) {
  return <button onClick={onReset}>Starta om</button>;
}
