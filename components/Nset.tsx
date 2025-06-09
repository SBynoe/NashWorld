//nashville system ear training
"use client";

import { useState } from "react";
import { nashvilleMap } from "utils/NashvilleMap";
import { keyMap } from "utils/KeyMap";
import * as Tone from "tone";

//Vars
let randomNote;
let correctNum = ""; //correct numbers
let isSubmit = false;
const allKeys = ["C", "D", "E", "F", "G", "A", "B"];

export default function Nset() {
  const [keySignature, setKeySignature] = useState<string>("C");
  const [notes, setNotes] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [round, setRound] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");

  // Helper: Play a sequence of notes
  const playNotes = async (noteSequence: string[]) => {
    const synth = new Tone.Synth().toDestination();
    await Tone.start();
    for (const note of noteSequence) {
      synth.triggerAttackRelease(note, "8n");
      await new Promise((res) => setTimeout(res, 600));
    }
  };

  //Start the round
  const startRound = () => {
    isSubmit = false;
    correctNum = "";

    const avNotes = keyMap(keySignature) || [];

    const selectedNotes = Array.from({ length: 3 }, () => {
      randomNote = avNotes[Math.floor(Math.random() * avNotes.length)];
      console.log(randomNote);
      correctNum += nashvilleMap(randomNote, keySignature);
      return `${randomNote}4`;
    });
    //setNotes(selectedNotes);
    setUserInput("");
    setFeedback("");
    playNotes(selectedNotes);
  };

  // Check user input
  const checkAnswer = () => {
    while (!isSubmit) {
      if (correctNum === userInput.trim()) {
        setScore((prev) => prev + 1);
        setFeedback("✅ Correct!");
        isSubmit = true;
      } else if (correctNum === userInput.replace(/\s/g, "")) {
        setScore((prev) => prev + 1);
        setFeedback("✅ Correct!");
        isSubmit = true;
      } else {
        setFeedback(`❌ Incorrect. Correct answer: ${correctNum}`);
        console.log("Correct: " + correctNum);
        isSubmit = true;
      }
      correctNum = "";
      setRound((prev) => prev + 1);
      isSubmit = true;
    }
    
  };

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">
        Nashville System Ear Training
      </h1>

      {/* Key Dropdown */}
      <div className="flex items-center gap-3">
        <label htmlFor="key-select" className="font-semibold">
          Key:
        </label>
        <select
          id="key-select"
          value={keySignature}
          onChange={(e) => setKeySignature(e.target.value)}
          className="p-2 rounded border border-gray-300"
        >
          {allKeys.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      {/* Start Button */}
      <button
        onClick={startRound}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        ▶️ Start Round
      </button>

      {/* User Input */}
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter number system (e.g., 1 3 5)"
        className="w-full p-2 border rounded border-gray-300"
      />

      <button
        onClick={checkAnswer}
        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
      >
        ✅ Submit Answer
      </button>

      {/* Feedback */}
      {feedback && <div className="text-lg font-medium">{feedback}</div>}

      {/* Score */}
      <div className="text-gray-700">
        <p>
          Score: {score} / {round}
        </p>
      </div>
    </main>
  );
}
