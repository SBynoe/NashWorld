type KeyMap = Record<string, string[]>;

const allKey: KeyMap = {
    "C": ["C", "D", "E", "F", "G", "A", "B",],
    "D": ["D", "E", "F#", "G", "A", "B", "C#",],
    "E": ["E", "F#", "G", "A", "B", "C#", "D#"],
    "F": ["F", "G", "A", "Bb", "C", "D", "E",],
    "G": ["G", "A", "B", "C",  "D", "E", "F#",],
    "A": ["A", "B", "C#", "D", "E", "F#", "G#", ],
    "B": ["B", "C#", "D#", "E", "F#", "G#", "A#", ],


}

export function keyMap (key: string): string[] | null{
    return allKey[key] || null;
}