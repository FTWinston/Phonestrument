import { octaves } from './Notes';
import { IScale, IScaleType } from './Scales';

export function determineNotes(scale: IScale, scaleType: IScaleType, octave: number) {
    let lastNoteIndex = -1;
    let octaveOffset = 0;

    const scaleNotes = scale.notes.map(noteIndex => {
        if (noteIndex < lastNoteIndex) {
            octaveOffset ++;
        }

        lastNoteIndex = noteIndex;

        return octaves[octave + octaveOffset][noteIndex];
    });
    
    const numToAddToEnd = scaleType.displayNoteBeforeTonic
        ? 9 - scale.notes.length
        : 10 - scale.notes.length;

    for (let iToCopy = 0; iToCopy < numToAddToEnd; iToCopy++) {
        let noteIndex = scale.notes[iToCopy];
        if (noteIndex < lastNoteIndex) {
            octaveOffset ++;
        }
        lastNoteIndex = noteIndex;
        scaleNotes.push(octaves[octave + octaveOffset][noteIndex]);    
    }

    if (scaleType.displayNoteBeforeTonic) {
        // put the last note onto the beginning, down an octave
        const noteIndex = scale.notes[scale.notes.length - 1];
        const firstNoteIndex = scale.notes[0];
        octaveOffset = noteIndex > firstNoteIndex ? -1 : 0;
        scaleNotes.unshift(octaves[octave + octaveOffset][noteIndex]);
    }

    return scaleNotes;
}