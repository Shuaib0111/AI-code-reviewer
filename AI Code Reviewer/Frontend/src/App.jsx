import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "./App.css"; // Make sure this is imported

function App() {
  const [code, setCode] = useState(`function fetchData() {
  return 1 + 1;
}`);

  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => prism.highlightAll(), 0);
  }, [code]);

  const reviewCode = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/ai/get-review", { code });
      if (res) {
        setReview(res.data);
      } else {
        alert("No input given");
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-container">
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              border: "2px solid #ddd",
              borderRadius: "5px",
              minHeight: "10vh",
              overflowY: "auto",
              width: "100%",
              color: "wheat",
              backgroundColor: "black",
              outline: "none",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          />
        </div>
        <div className="review" onClick={reviewCode}>
          Review
        </div>
      </div>
      <div className="right">
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
            <p className="loader-text">Analyzing...</p>
          </div>
        ) : (
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        )}
      </div>
    </main>
  );
}

export default App;
