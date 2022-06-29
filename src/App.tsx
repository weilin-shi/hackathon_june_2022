import { useState, useRef } from "react";
import axios from "axios";
import Carousel from "./carousel";

const baseURL =
  "http://a9f15b20f9fca46e2b655ffd55f6be3d-914171737.us-west-2.elb.amazonaws.com:7700/thumbnail?token=";
const tailURL = "&is_upload=false";
const imageURLBase =
  "http://a9f15b20f9fca46e2b655ffd55f6be3d-914171737.us-west-2.elb.amazonaws.com:7700/thumbnail?path=";

function App() {
  const [images, setImages] = useState<string[]>([]);
  const [videoSRC, setVideoSrc] = useState("");
  const [input, setInput] = useState("");
  const [tapToPlay, setTapToPlay] = useState(true);
  const [videoVis, setVideoVis] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="my-10 max-w-2xl flex items-center">
        <input
          type="text"
          className="flex-1 text-slate-600 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-400 focus:ring-slate-400 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Video Link"
        />
        <button
          className="button ml-4 font-bold py-1.5"
          disabled={input.trim() === ""}
          onClick={() => {
            setVideoSrc(input);
            setVideoVis(true);
            setTapToPlay(true);
            setInput("");
            const uri = `${baseURL}${btoa(input)}${tailURL}`;
            axios
              .get(uri)
              .then((result) => {
                const imgLinks = result.data.Thumbnails as string[];
                // setImgSrc(imageURLBase + imgLinks[imgLinks.length - 1]);
                setImages(imgLinks.map((link) => imageURLBase + link));
              })
              .catch(console.error);
          }}
        >
          Generate
        </button>
      </div>
      <div className="flex">
        <div className="text-center mr-4">
          <h3 className="mb-4">Original Video</h3>
          {videoSRC && (
            <video className="" src={videoSRC} loop={false} controls></video>
          )}
        </div>
        <div className="text-center">
          <h3 className="mb-4">Final Effect</h3>
          {videoSRC && (
            <div className="grid grid-cols-3 grid-rows-3">
              {!videoVis && <Carousel images={images} />}
              {videoVis && (
                <video
                  ref={videoRef}
                  className="main-video"
                  src={videoSRC}
                  loop={false}
                  onEnded={() => {
                    setVideoVis(false);
                  }}
                  controls
                ></video>
              )}
              {tapToPlay && (
                <div
                  className="tap-to-play w-full h-full relative flex items-center justify-center backdrop-opacity-80 bg-slate-50/80"
                  onClick={() => {
                    setTapToPlay(false);
                    videoRef.current!.play();
                  }}
                >
                  <div className="text-6xl font-bold">Tap to Play</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="">
        <div className="mt-10 p-2 rounded-lg bg-slate-50">
          {images.length > 0 && <h3 className="my-4">Image Preview:</h3>}
          <div className="flex">
            {images.map((src) => (
              <div key={src} className="border border-2 mb-2 mr-2">
                <img src={src} alt="image preview" className="max-h-60" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
