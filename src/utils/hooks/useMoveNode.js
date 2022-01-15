import React, { useState, useEffect } from 'react'


import {updateFirebase } from '../firebase'
export const useMoveNode = () => {

  const logNode = (node) => {
    console.log('log node', node)

    updateFirebase('nodes', node.id, node)
  }


  return { logNode }
}
            // (collectionId, contentId, content)

  // const [playerState, setPlayerState] = useState({
  //   isPlaying: true,
  //   progress: 0,
  //   speed: 1,
  //   isMuted: true,
  // });

  // const togglePlay = () => {
  //   setPlayerState({
  //     ...playerState,
  //     isPlaying: !playerState.isPlaying,
  //   });
  // }
  // useEffect(() => {
  //   playerState.isPlaying
  //     ? videoElement.current.play()
  //     : videoElement.current.pause();
  // }, [playerState.isPlaying, videoElement]);

  // const handleOnTimeUpdate = () => {
  //   const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100;
  //   setPlayerState({
  //     ...playerState,
  //     progress,
  //   });
  // }

  // const handleVideoProgress = (event) => {
  //   const manualChange = Number(event.target.value);
  //   videoElement.current.currentTime = (videoElement.current.duration / 100) * manualChange;
  //   setPlayerState({
  //     ...playerState,
  //     progress: manualChange,
  //   });
  // }
  // useEffect(() => {
  //   // playerState.progress === 100
  //   // ? console.log('vid finished')
  //   // : console.log(playerState.progress)
  // }, [playerState.progress, videoElement]);

  // const handleVideoSpeed = (event) => {
  //   const speed = Number(event.target.value);
  //   videoElement.current.playbackRate = speed;
  //   setPlayerState({
  //     ...playerState,
  //     speed,
  //   });
  // }

  // const toggleMute = () => {
  //   setPlayerState({
  //     ...playerState,
  //     isMuted: !playerState.isMuted,
  //   });
  // }
  // useEffect(() => {
  //   playerState.isMuted
  //     ? (videoElement.current.muted = true)
  //     : (videoElement.current.muted = false);
  // }, [playerState.isMuted, videoElement]);

  // const handleVideoRestart = () => {
  //   const manualChange = 0;
  //   videoElement.current.currentTime = (videoElement.current.duration / 100) * manualChange;
  //   setPlayerState({
  //     ...playerState,
  //     progress: manualChange,
  //     isPlaying: true
  //   });
  //   videoElement.current.play()
  // };

  // return {
  //   playerState,
  //   togglePlay,
  //   handleOnTimeUpdate,
  //   handleVideoProgress,
  //   handleVideoSpeed,
  //   toggleMute,
  //   handleVideoRestart,
  // };
// };
