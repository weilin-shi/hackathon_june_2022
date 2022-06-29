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
  const [muted, setMuted] = useState(false);
  const [input, setInput] = useState("");
  const [tapToPlay, setTapToPlay] = useState(true);
  const [videoVis, setVideoVis] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="flex justify-center">
      <div className="w-96">
        <div className="my-10 flex">
          <input
            type="text"
            className="flex-1 text-slate-600 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-400 focus:ring-slate-400 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Video Link"
          />
          <button
            className="button ml-4 font-bold"
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
        {videoSRC && (
          <div className="grid grid-cols-3 grid-rows-3">
            {!videoVis && (
              <Carousel images={images} />
            )}
            {videoVis && (
              <video
                ref={videoRef}
                className="main-video"
                src={videoSRC}
                muted={muted}
                loop={false}
                onEnded={() => {
                  setVideoVis(false);
                }}
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
      <div className="w-96 ml-10">
        <div className="mt-20 p-2 rounded-lg bg-slate-50">
          <label className="cursor-pointer">
            <input
              type="checkbox"
              className="mr-2"
              checked={muted}
              onChange={(e) => setMuted(e.target.checked)}
            />
            {`${muted ? "Unmute" : "Mute"} Video`}
          </label>
          <h3 className="my-4">Image Preview:</h3>
          <div className="max-h-80 overflow-auto">
            {images.map((src) => (
              <div key={src} className="border border-2 mb-2">
                <img src={src} alt="image preview" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
