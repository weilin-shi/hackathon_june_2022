import { useState, useRef } from "react";

const src =
  "http://a9f15b20f9fca46e2b655ffd55f6be3d-914171737.us-west-2.elb.amazonaws.com:7700/thumbnail?token=aHR0cHM6Ly9jZG4ubGlmdG9mZi5pby9jdXN0b21lcnMvNjA5NmZjOTc1YS92aWRlb3MvbW9iaWxlL2EwOTllMDkyZDUwZDIzNDBhMWY3Lm1wNA==&path=thumbnail_temp/thumbnail3708990603/aHR0cHM6Ly9jZG4ubGlmdG9mZi5pby9jdXN0b21lcnMvNjA5NmZjOTc1YS92aWRlb3MvbW9iaWxlL2EwOTllMDkyZDUwZDIzNDBhMWY3Lm1wNA==_5.png";

function App() {
  const [tapToPlay, setTapToPlay] = useState(true);
  const [videoVis, setVideoVis] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="mx-auto w-96">
      <div className="my-10 flex">
        <input
          type="text"
          className="flex-1 text-slate-600 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-400 focus:ring-slate-400 outline-none"
        />
        <button className="button ml-4">Generate</button>
      </div>
      <div className="grid grid-cols-3 grid-rows-3">
        <img src={src} className="endcard" alt="logo" />
        {videoVis && (
          <video
            ref={videoRef}
            className="main-video"
            src="https://cdn-lb.vungle.com/zen/VungleBrandV2Portrait-720x1280-Q2.mp4"
            muted
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
    </div>
  );
}

export default App;
