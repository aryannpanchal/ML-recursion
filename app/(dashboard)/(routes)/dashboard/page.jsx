"use client"
import { useState } from "react";
import Header from '@/components/Header'
import HeaderMobile from '@/components/HeaderMobile'
import Footer from '@/components/Footer'

const DashboardPage = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [socialMedia, setSocialMedia] = useState("");
  const [videoFormat, setVideoFormat] = useState("mp4");
  const [isUploading, setIsUploading] = useState(false);  // Upload state
  const [uploadProgress, setUploadProgress] = useState(0); // Progress percentage

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSocialMediaChange = (e) => {
    setSocialMedia(e.target.value);
  };

  const handleVideoFormatChange = (e) => {
    setVideoFormat(e.target.value);
  };

  const handleUpload = (file) => {
    // Simulate video upload process with progress
    const total = 100;
    let progress = 0;

    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);

      if (progress >= total) {
        clearInterval(interval);
        setIsUploading(false);
        alert("Video uploaded successfully!");
      }
    }, 500);

    // Simulate upload delay
    setIsUploading(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile || !socialMedia) {
      alert("Please fill out all fields!");
      return;
    }

    // Start the upload simulation
    handleUpload(videoFile);

    // You can integrate actual API here to upload the file to server/local storage
    // const formData = new FormData();
    // formData.append("video", videoFile);
    // formData.append("socialMedia", socialMedia);
    // formData.append("videoFormat", videoFormat);
    // await fetch("/api/upload", { method: "POST", body: formData });
  };

  return (
    <div>
      <Header />
      <HeaderMobile />
      <section>
        <div className="mt-44">
          <h1 className="text-black font-semibold laptop:text-4xl mobile:text-3xl text-center">Nice, you are in.</h1>
          <h2 className="mt-6 text-black font-thin laptop:text-3xl mobile:text-2xl text-center">Upload your video to continue</h2>
        </div>

        {/* Video Upload Form */}
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg mt-8">
          <form onSubmit={handleSubmit}>
            {/* Video File Input */}
            <div className="mb-4">
              <label className="block text-lg font-medium" htmlFor="video">
                Choose your video file
              </label>
              <input
                type="file"
                id="video"
                name="video"
                accept="video/*"
                onChange={handleVideoChange}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            {/* Social Media Selection */}
            <div className="mb-4">
              <label className="block text-lg font-medium">Select Social Media Platform</label>
              <select
                value={socialMedia}
                onChange={handleSocialMediaChange}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                required
              >
                <option value="">Select a platform</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="facebook">Facebook</option>
                <option value="twitter">Twitter</option>
              </select>
            </div>

            {/* Video Format Selection */}
            <div className="mb-6">
              <label className="block text-lg font-medium">Choose Video Format</label>
              <div className="flex gap-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="mp4"
                    name="videoFormat"
                    value="mp4"
                    checked={videoFormat === "mp4"}
                    onChange={handleVideoFormatChange}
                    className="mr-2"
                  />
                  <label htmlFor="mp4" className="text-lg">MP4</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="mkv"
                    name="videoFormat"
                    value="mkv"
                    checked={videoFormat === "mkv"}
                    onChange={handleVideoFormatChange}
                    className="mr-2"
                  />
                  <label htmlFor="mkv" className="text-lg">MKV</label>
                </div>
              </div>
            </div>

            {/* Process Video Button */}
            <div className="mb-4 text-center">
              <button
                type="submit"
                className="px-6 py-3 text-white bg-blue-900 rounded-md hover:bg-blue-900 transition"
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Process Video"}
              </button>
            </div>

            {/* Loading Animation / Progress Bar */}
            {isUploading && (
              <div className="text-center mt-4">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-blue-900 rounded-full"></div>
                <div className="mt-2 text-lg text-blue-900">{`Uploading... ${uploadProgress}%`}</div>
              </div>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DashboardPage;
