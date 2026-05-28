import React, { useState } from "react";
import axios, { AxiosError } from "axios";

const CSVUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a CSV file");
      return;
    }

    // Optional: limit file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File is too large (max 5MB)");
      return;
    }

    setLoading(true);
    setProgress(0);
    setError("");
    setDownloadUrl("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:4000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          const percent = Math.round(
            (event.loaded * 100) / (event.total ?? 1)
          );
          setProgress(percent);
        },
      });

      setDownloadUrl(`http://localhost:4000${res.data.downloadUrl}`);
    } catch (err: unknown) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ error: string }>;
        setError(axiosErr.response?.data?.error || "Upload failed");
      } else {
        setError("Upload failed");
      }
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300">
      <h2 className="text-2xl font-bold text-white text-center mb-6 animate-pulse">
        Upload Your Sales CSV
      </h2>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
        file:rounded-lg file:border-0 file:text-sm file:font-semibold
        file:bg-white file:text-indigo-600 hover:file:bg-indigo-100"
      />

      {error && <p className="text-red-300 mb-2 text-center">{error}</p>}

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className={`w-full py-2 px-4 rounded-lg bg-white text-indigo-600 font-semibold
        hover:bg-indigo-100 transition-colors duration-200 disabled:bg-gray-400`}
      >
        {loading ? `Uploading... ${progress}%` : "Upload CSV"}
      </button>

      {/* Progress Bar */}
      {loading && (
        <div className="w-full bg-gray-300 rounded-full h-3 mt-3 overflow-hidden">
          <div
            className="bg-green-400 h-3 rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* Download Link */}
      {downloadUrl && (
        <div className="mt-6 text-center">
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-indigo-600 font-bold py-2 px-6 rounded-full shadow-lg hover:bg-indigo-50 transform hover:scale-105 transition-all duration-300 animate-bounce"
          >
            Download Processed CSV
          </a>
        </div>
      )}
    </div>
  );
};

export default CSVUploader;
