import React from "react";
import CSVUploader from "./components/CSVUploader";
import './index.css';
function App() {
  return (
    <div>
      <h1 className="text-3xl text-center mt-6 font-bold">
        Sales CSV Processor
      </h1>
      <CSVUploader />
    </div>
  );
}

export default App;
