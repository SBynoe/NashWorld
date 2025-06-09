'use client';

import { useEffect, useRef, useState } from 'react';
import { PitchDetector } from 'pitchy';
import { getNoteNameFromFrequency } from '../utils/pitchDetection';
import { nashvilleMap } from '../utils/NashvilleMap';
import { normalizeNoteToKey } from '../utils/normalizeNoteToKey';

const keys = ['C','C#','Db', 'D', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

export default function MicListener() {
  const [frequency, setFrequency] = useState<number | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [nashvilleNumber, setNashvilleNumber] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string>('C');

  const detectorRef = useRef<ReturnType<typeof PitchDetector.forFloat32Array> | null>(null);
  const inputRef = useRef<Float32Array | null>(null);

  useEffect(() => {
    const runPitchDetection = async () => {
      const audioContext = new AudioContext();
      const analyserNode = audioContext.createAnalyser();
      analyserNode.fftSize = 2048;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContext.createMediaStreamSource(stream).connect(analyserNode);

      detectorRef.current = PitchDetector.forFloat32Array(analyserNode.fftSize);
      inputRef.current = new Float32Array(analyserNode.fftSize);

      const detect = () => {
        if (!detectorRef.current || !inputRef.current) return;

        analyserNode.getFloatTimeDomainData(inputRef.current);
        const [pitch, clarity] = detectorRef.current.findPitch(inputRef.current, audioContext.sampleRate);

        if (clarity > 0.9 && pitch > 30 && pitch < 300) {
          const roundedPitch = Math.round(pitch * 10) / 10;
          setFrequency(roundedPitch);
        
          const rawNote = getNoteNameFromFrequency(pitch); // e.g., "A#"
          if (!rawNote) {
            setNote(null);
            setNashvilleNumber(null);
            return;
          }
        
          const normalizedNote = normalizeNoteToKey(rawNote, selectedKey); // e.g., "Bb" if key is F
          
          setNote(normalizedNote);
        
          const number = nashvilleMap(normalizedNote, selectedKey);
          setNashvilleNumber(number?.toString() ?? null);
        }
        

        requestAnimationFrame(detect);
      };

      detect();
    };
    

    runPitchDetection();
  }, [selectedKey]);

  return (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold mb-4">Live Note Detection</h2>

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {keys.map((key) => (
          <button
            key={key}
            className={`px-4 py-2 rounded transition font-medium ${
              selectedKey === key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => setSelectedKey(key)}
          >
            {key} Major
          </button>
        ))}
      </div>

      <div className="text-lg">
        <p>Selected Key: {selectedKey} Major</p>
        <p>Frequency: {frequency ? `${frequency} Hz` : 'Listening...'}</p>
        <p>Note: {note ?? 'Detecting...'}</p>
        <p>Nashville Number: {note ? nashvilleMap(note, selectedKey) ?? '—' : '—'}</p>
        </div>
    </div>
  );
}
