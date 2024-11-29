import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    // Get the backend URL from the environment variable
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    try {
      // Use the backendUrl in the axios post request
      const response = await axios.post(`${backendUrl}/upload`, formData);
      setAnalysis(response.data.analysis);
    } catch (err) {
      alert("Error analyzing resume");
    }
  };

  return (
    <div className="App">
      <h1>AI Resume & Career Coach</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept=".pdf" />
        <button type="submit">Analyze Resume</button>
      </form>
      {analysis && (
        <div>
          <h2>Resume Analysis:</h2>
          <p>{analysis}</p>
        </div>
      )}
    </div>
  );
}

export default App;
