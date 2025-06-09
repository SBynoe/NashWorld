// utils/pitchDetection.ts

type Note = {
  note: string; // e.g., "C", "D#", "E"
  freq: number;
  octave: number;
};

export function getNoteNameFromFrequency(freq: number): string | null {
  // A reasonable range for bass guitar: E1 (~41 Hz) to G3 (~196 Hz)
  const baseFrequencies = [
    { note: 'C', semitone: 0 },
    { note: 'C#', semitone: 1 },
    { note: 'D', semitone: 2 },
    { note: 'D#', semitone: 3 },
    { note: 'E', semitone: 4 },
    { note: 'F', semitone: 5 },
    { note: 'F#', semitone: 6 },
    { note: 'G', semitone: 7 },
    { note: 'G#', semitone: 8 },
    { note: 'A', semitone: 9 },
    { note: 'A#', semitone: 10 },
    { note: 'B', semitone: 11 },
  ];

  // Generate notes from C1 (~32.70 Hz) to C4 (~261.63 Hz)
  const allNotes: Note[] = [];
  for (let octave = 0; octave <= 6; octave++) {
    for (const base of baseFrequencies) {
      const noteFreq = 16.35 * Math.pow(2, octave + base.semitone / 12); // C0 = 16.35 Hz
      if (noteFreq >= 30 && noteFreq <= 300) {
        allNotes.push({
          note: `${base.note}${octave}`,
          freq: noteFreq,
          octave,
        });
      }
    }
  }

  // Find closest note
  const closest = allNotes.reduce((prev, curr) =>
    Math.abs(curr.freq - freq) < Math.abs(prev.freq - freq) ? curr : prev
  );

  return closest.note.replace(/[0-9]/g, ''); // Remove octave number
}
