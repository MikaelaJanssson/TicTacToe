interface StatusProps {
  message: string;
}

export default function Status({ message }: StatusProps) {
  return <div className="status">{message}</div>;
}
