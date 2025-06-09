// utils/noteNormalizer.ts

const enharmonicMap: Record<string, string> = {
    "C#": "Db",
    "D#": "Eb",
    "F#": "Gb",
    "G#": "Ab",
    "A#": "Bb",
  };
  
  const flatPreferredKeys = ["F", "Bb", "Eb", "Ab", "Db", "Gb", "Cb"];
  
  export function normalizeNoteToKey(note: string, key: string): string {
    if (!note.includes("#")) return note;
  
    if (flatPreferredKeys.includes(key)) {
      return enharmonicMap[note] ?? note;
    }
  
    return note;
  }
  