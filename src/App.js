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
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

    try {
      // Make sure the backendUrl is available
      if (!backendUrl) {
        alert("Backend URL is not defined!");
        return;
      }

      // Use the backendUrl and apiKey in the axios post request
      const response = await axios.post(
        `${backendUrl}/upload`, 
        formData, 
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,  // Include the OpenAI API Key in the request headers
            'Content-Type': 'multipart/form-data', // Important for file uploads
          }
        }
      );
      setAnalysis(response.data.analysis);
    } catch (err) {
      console.error(err);
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
