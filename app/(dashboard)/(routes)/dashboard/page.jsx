"use client";
import Header from "@/components/Header";
import HeaderMobile from "@/components/HeaderMobile";
import { useState, useEffect } from "react";

const Page = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [platform, setPlatform] = useState("YouTube");
  const [outputVideo, setOutputVideo] = useState(null);
  const [processing, setProcessing] = useState(false);

  const PLATFORM_SETTINGS = {
    YouTube: "3840x2160",
    InstagramFeed: "1080x1350",
    InstagramStories: "1080x1920",
    Twitter: "1920x1200",
    TikTok: "1080x1920",
    Facebook: "3840x2160",
  };

  // Fetch the latest processed video when the page loads
  useEffect(() => {
    const fetchLatestVideo = async () => {
      try {
        let response = await fetch("http://127.0.0.1:8000/latest_video/");
        let result = await response.json();
        if (result.latest_video) {
          setOutputVideo(`http://127.0.0.1:8000/processed/${result.latest_video}`);
        }
      } catch (error) {
        console.error("Error fetching latest video:", error);
      }
    };
    fetchLatestVideo();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a video");

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("resolution", PLATFORM_SETTINGS[platform]);

    setProcessing(true);

    try {
      let response = await fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        body: formData,
      });

      let result = await response.json();
      if (result.processed_video) {
        setOutputVideo(`http://127.0.0.1:8000/processed/${result.processed_video}`);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <Header />
      <HeaderMobile />
      <div className="mt-44 min-h-full py-44 flex flex-col items-center justify-center bg-gray-900 text-white">
        <h1 className="text-3xl font-bold mb-6">🎥 AI-Powered Video Converter</h1>

        <input type="file" accept="video/*" onChange={handleFileChange} className="mb-4" />
        
        <select className="mb-4 p-2 text-black" onChange={(e) => setPlatform(e.target.value)}>
          {Object.keys(PLATFORM_SETTINGS).map((platform) => (
            <option key={platform} value={platform}>{platform}</option>
          ))}
        </select>

        <button
          onClick={handleUpload}
          disabled={!selectedFile || processing}
          className="bg-blue-500 px-4 py-2 rounded disabled:bg-gray-500"
        >
          {processing ? "Processing..." : "Convert Video"}
        </button>

        {outputVideo && (
          <div className="mt-6 flex flex-col items-center">
            <h2 className="text-lg font-semibold">Processed Video:</h2>
            <video src={outputVideo} controls className="mt-2 w-full max-w-lg border border-gray-500 rounded-lg shadow-lg" />
            <p className="mt-2 text-sm text-gray-400 break-all">🔗 Video URL: {outputVideo}</p>
            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href = outputVideo;
                link.download = "processed_video.mp4";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              ⬇ Download Video
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
