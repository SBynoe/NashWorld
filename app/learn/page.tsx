'use client';
import React, { useState, useEffect, useRef } from 'react';
import Listener from "../../components/MicListener";



export default function Learn() {
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedAudioInput, setSelectedAudioInput] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);


  useEffect(() => {
    const getAudioDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputs = devices.filter((device) => device.kind === 'audioinput');
        setAudioDevices(audioInputs);
      } catch (error) {
        console.error('Error enumerating devices:', error);
      }
    };

    getAudioDevices();
  }, []);


  const handleAudioInputChange = async (deviceId: string) => {
    console.log('handleAudioInputChange called with deviceId:', deviceId);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId },
      });
      console.log('Successfully got new audio stream for device:', deviceId);

      if (audioRef.current) {
        audioRef.current.srcObject = stream;
        console.log('Audio element updated with new stream');
      }
      setSelectedAudioInput(deviceId);
      console.log('Selected audio input updated to:', deviceId);
    } catch (error) {
      console.error('Error getting user media:', error);
    }
  };

  return (
    <div>
      <Listener />


      {/* <audio ref={audioRef} controls autoPlay /> */}
      <select
        value={selectedAudioInput || ''}
        onChange={(e) => handleAudioInputChange(e.target.value)}
      >
        <option value="" disabled>Select Audio Input</option>
        {audioDevices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Microphone ${device.deviceId.slice(-4)}`}
          </option>
        ))}
      </select>
    </div>
  );
}
