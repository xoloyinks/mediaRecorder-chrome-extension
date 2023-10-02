import React, { useState } from 'react'
import logo from "./images/logo.svg"
import {AiOutlineSetting} from "react-icons/ai"
import {ImCancelCircle} from "react-icons/im"
import {FiCopy,FiMonitor } from "react-icons/fi"
import {BsCameraVideo} from "react-icons/bs"
import {PiMicrophone} from "react-icons/pi"

import {ReactMediaRecorder} from "react-media-recorder"
import { useReactMediaRecorder } from 'react-media-recorder'

import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { type } from '@testing-library/user-event/dist/type'


const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#100A42',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#100A42',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#100A42',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));


  
  
 

export default function Extension() {


function startRecording(mediaStream) {
  var options = {mimeType: 'video/webm;codecs=vp9'};
  var mediaRecorder = new MediaRecorder(mediaStream, options);

  var chunks = [];
  const videoElement = document.createElement('video');
    document.body.appendChild(videoElement);

    mediaRecorder.start();

    mediaRecorder.onstart = async () => {
      var endpointUrl = "https://pear-uninterested-caterpillar.cyclic.cloud/start-record/";
      await fetch(endpointUrl,{
        method: 'POST',
        }).then(response => response.json())
        .then(response => console.log(JSON.stringify(response)));

    }

    mediaRecorder.ondataavailable = (event) => {
      if(event.data.size > 0){
        const chunkBlob = new Blob([event.data], { type: 'video/webm' });
        chunks.push(event.data);
        console.log("data available");
        // Send the chunk to the server
        sendChunkToServer(chunkBlob);
        
      }
    };

    async function sendChunkToServer(chunkBlob) {
      // Send the chunk to the server

      // var endpointUrl = "https://pear-uninterested-caterpillar.cyclic.cloud/video-chunks";
      // await fetch(endpointUrl, {
      //   method: 'POST',
      //   // headers: "Access-Control-Allow-Origin : *",
      //   body: JSON.stringify({"videoUrl": "2", "blob": chunkBlob}),
      // })
      // .then(response => response.json())
      // .catch(error => {
      //   console.error('Error sending chunk to server:', error);
      // });
      console.log("chunkBlob : " + chunkBlob);
    }

  mediaRecorder.onstop = () => {
    const recordedBlob = new Blob(chunks, { type: 'video/webm' });
    console.log(recordedBlob);
    const videoUrl = URL.createObjectURL(recordedBlob);
    videoElement.src = videoUrl;
    videoElement.controls = true;
    videoElement.play();

    // Display the recorded video
    const videoContainer = document.getElementById('video-container');
    videoContainer.appendChild(videoElement);
  };
}


const constraints = { audio: true, video: {
  mediaSource: 'screen',
  width: { max: 1920 },
  height: { max: 1080 },
  frameRate: { max: 30 },
}, };

const stream = () => {
  navigator.mediaDevices.getDisplayMedia(constraints)
  .then((mediaStream) => {
    // Call the startRecording function with the obtained MediaStream
    startRecording(mediaStream);

  })
  .catch((error) => {
    console.error('Error accessing user media:', error);
  });
}

  return (
   <>
         <section className='min-w-[300px] overflow-x-visible text-primary float-right mx-5 min-h-[439px] px-[20px] py-[22px]'>
            <div className='flex items-center justify-between text-4xl '>
                <div className='flex items-center gap-2 text-primary'>
                    <img src={logo} alt="logo" className='w-[28px] h-[28px]' />
                    <span className='text-lg logo-text'>HelpMeOut</span>
                </div>
                <div className='flex items-center gap-4 text-lg'>
                    <span>
                        <AiOutlineSetting />
                    </span>
                    <span className='opacity-25'><ImCancelCircle /></span>
                </div>
            </div>

            <div className='w-[90%] text-[14px] mt-2 leading-5'>
                This extension helps you record and share help videos with ease.
            </div>

            <div className='flex items-center py-3 my-3 justify-evenly text-primary'>
                <div className="flex flex-col items-center gap-2 cursor-pointer opacity-40">
                    <span className='text-4xl'><FiMonitor/></span>
                    <span className='font-semibold text-md'>Full screen</span>
                </div>
                <div className='flex flex-col items-center gap-2 cursor-pointer'>
                    <span className='text-4xl'><FiCopy/></span>
                    <span className='font-semibold text-md'>Current Tab</span>
                </div>
            </div>

            <div className='flex items-center justify-between py-2 pl-2 pr-4 border-2 border-primary rounded-2xl'>
              <div className='flex items-center gap-2'>
                <span className='text-2xl'><BsCameraVideo /></span>
                <span className='font-semibold text-md'>Camera</span>
              </div>
            <FormControlLabel
                control={<IOSSwitch className="mx-0" defaultChecked={true} />}
                className='mr-0'
            />
            </div>

            <div className='flex items-center justify-between py-2 pl-2 pr-4 mt-5 border-2 border-primary rounded-2xl'>
              <div className='flex items-center gap-2'>
                <span className='text-2xl'><PiMicrophone /></span>
                <span className='font-semibold text-md'>Audio</span>
              </div>
              <FormControlLabel
                  control={<IOSSwitch className="mx-0" defaultChecked={true} />}
                  className='mr-0'
              />
            </div>

            {/* <video src={videoUrl} autoPlay controls></video> */}

            <button  onClick={stream} id='record' className='w-full py-4 mt-5 text-white text-md rounded-2xl bg-primary '>
              Start Recording
            </button>
            <div id='video-container'></div>
        </section>
   </>
  )
}
