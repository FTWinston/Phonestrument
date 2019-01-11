import { octaves } from './Notes';
import { IScale } from './Scales';

export function determineNotes(scale: IScale, octave: number) {
    let lastNoteIndex = -1;
    let octaveOffset = 0;

    const scaleNotes = scale.notes.map(noteIndex => {
        if (noteIndex < lastNoteIndex) {
            octaveOffset ++;
        }

        lastNoteIndex = noteIndex;

        return octaves[octave + octaveOffset][noteIndex];
    });

    let numToAddToStart: number;

    switch (scale.notes.length) {
        case 6:
        case 7:
        case 8:
            numToAddToStart = 1;
            break;
        default:
            numToAddToStart = 0;
            break;
    }
    
    const numToAddToEnd = 10 - scale.notes.length - numToAddToStart;

    for (let iToCopy = 0; iToCopy < numToAddToEnd; iToCopy++) {
        let noteIndex = scale.notes[iToCopy];
        if (noteIndex < lastNoteIndex) {
            octaveOffset ++;
        }
        lastNoteIndex = noteIndex;
        scaleNotes.push(octaves[octave + octaveOffset][noteIndex]);    
    }

    if (numToAddToStart > 0) {
        // and now put the last note onto the beginning, down an octave
        const noteIndex = scale.notes[scale.notes.length - 1];
        const firstNoteIndex = scale.notes[0];
        octaveOffset = noteIndex > firstNoteIndex ? -1 : 0;
        scaleNotes.unshift(octaves[octave + octaveOffset][noteIndex]);
    }

    return scaleNotes;
}