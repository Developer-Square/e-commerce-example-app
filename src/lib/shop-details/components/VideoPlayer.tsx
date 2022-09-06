/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable global-require */
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = () => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <div className="video-container relative w-full md:flex md:justify-center">
      {!showVideo ? (
        <>
          <img
            src="/assets/images/shop-details/product-big-4.png"
            alt="item display"
            className="w-full md:w-auto"
          />
          <FontAwesomeIcon
            icon={faCirclePlay}
            className="play !h-20 cursor-pointer text-[#fff]"
            onClick={() => setShowVideo(true)}
          />
        </>
      ) : (
        <ReactPlayer
          url={
            'https://res.cloudinary.com/ryansimageupload/video/upload/v1662272297/product_big_5_video_sxz060.mp4'
          }
          playing={true}
          controls={true}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
