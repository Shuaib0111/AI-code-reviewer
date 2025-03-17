import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function App() {
  const [code, setCode] = useState(`function fetchData() {
  return 1 + 1;
}`);

  const [review, setReview] = useState("");

  useEffect(() => {
    setTimeout(() => prism.highlightAll(), 0);
  }, [code]);

  const reviewCode = async () => {
    try {
      const res = await axios.post("http://localhost:8000/ai/get-review", { code });
      if (res) {
        setReview(res.data);
      } else {
        alert("No input given");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <main>
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
        <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
      </div>
    </main>
  );
}

export default App;
