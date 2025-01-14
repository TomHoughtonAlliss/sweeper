const chars = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

export default function Picker(
  { value, setter }: { value: number, setter: (value: number) => void }
) {
  return (
    <div className="tile">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button
        type="button"
        style={{ width: '95%' }}
        onClick={() => {
        setter((value - 1 + 26) % 26);
        }}
      >
        ▲
      </button>
      <div
        className="letter"
        style={{
        fontSize: "15rem",
        width: '100%',
        textAlign: 'center'
        }}
      >
        {chars[value]}
      </div>
      <button
        type="button"
        style={{ width: '95%' }}
        onClick={() => {
        setter((value + 1 + 26) % 26);
        }}
      >
        ▼
      </button>
      </div>
    </div>
  );
}