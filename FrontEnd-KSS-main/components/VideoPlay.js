import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { findDOMNode } from 'react-dom';
import screenfull from 'screenfull';
import styles from '../styles/videoPlay.module.css';

export default ({ url, autoplay }) => {
  const playerRef = useRef(null);
  const [isPlay, setPlay] = useState(!!autoplay);
  const [currentSeek, setCurrentSeek] = useState(0);
  const togglePlay = () => setPlay(!isPlay);

  const onClickFullscreen = () => {
    screenfull.request(findDOMNode(playerRef?.current));
  };
  return (
    <div className="h-full w-full">
      <ReactPlayer
        ref={playerRef}
        playing={isPlay}
        url={url}
        autoplay={autoplay}
        width={'100%'}
        height={'auto'}
        onProgress={(event) => setCurrentSeek(event.playedSeconds)}
      />
      <div className="flex justify-center items-center mt-5 pb-5 w-full">
        <img
          src={
            isPlay
              ? '/images/common/pause-btn.svg'
              : '/images/common/play-btn.svg'
          }
          alt="play-icon"
          className="mr-3 md:mr-10 cursor-pointer"
          onClick={togglePlay}
        />
        <div className="grow">
          <input
            className={styles.inputRange}
            type="range"
            min={0}
            max={Math.ceil(playerRef?.current?.getDuration())}
            value={currentSeek}
            onInput={(event) => {
              setCurrentSeek(event.target.value);
              playerRef?.current?.seekTo(event.target.value);
            }}
          />
        </div>
        <img
          src="/images/common/full-screen-btn.svg"
          alt="play-icon"
          className="ml-3 md:ml-10 cursor-pointer hidden md:block"
          onClick={onClickFullscreen}
        />
      </div>
    </div>
  );
};
