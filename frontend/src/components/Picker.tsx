const chars = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

export default function Picker(
  { value, setter }: { value: number, setter: (value: number) => void }
) {
  return (
    <div className="tile">
      <button
        type="button"
        onClick={() => {
          setter((value + 1 + 26) % 26);
        }}
      >
        ▲
      </button>
      <div
        className="letter"
        style={{
          fontSize: "15rem",
        }}
      >
        {chars[value]}
      </div>
      <button
        type="button"
        onClick={() => {
          setter((value - 1 + 26) % 26);
        }}
      >
        ▼
      </button>
    </div>
  );
}