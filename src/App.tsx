import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState("");

  const analyzeSentiment = async () => {
    const response = await fetch("http://localhost:8000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    setSentiment(data.sentiment);
  };

  return (
    <div>
      <h2>감정 분석</h2>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={analyzeSentiment}>분석하기</button>
      {sentiment && <p>결과: {sentiment}</p>}
    </div>
  );
}

export default App;
