import { useEffect, useState } from "react";
import Picker from "./Picker";



export default function NamePicker({ setter }: { setter: (name: string) => void }) {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);

  useEffect(() => {
    setter(`${a}${b}${c}`);
  }, [a, b, c])

  return (
    <div className="name-picker" style={{ display: "flex", fontFamily: "monospace" }}>
      <Picker value={a} setter={setA} />
      <Picker value={b} setter={setB} />
      <Picker value={c} setter={setC} />
    </div>
  );
}
