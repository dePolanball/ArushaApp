export default function BackButton() {
  return (
    <button onClick={() => window.history.back()}>
      ← Back
    </button>
  );
}
