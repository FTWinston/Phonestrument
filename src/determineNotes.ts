import { octaves } from './Notes';
import { IScale, IScaleType } from './Scales';

export function determineNotes(scale: IScale, scaleType: IScaleType, octave: number) {
    let lastNoteIndex = -1;
    let octaveOffset = 0;

    // Add a full scale of notes
    const scaleNotes = scale.notes.map(noteIndex => {
        if (noteIndex < lastNoteIndex && octave + octaveOffset < octaves.length - 1) {
            octaveOffset ++;
        }

        lastNoteIndex = noteIndex;

        return octaves[octave + octaveOffset][noteIndex];
    });
    
    const numToAddToStart = scaleType.notesBeforeTonic;
    const numToAddToEnd = 20 - numToAddToStart - scale.notes.length;

    // Add notes to the end, after the "main" octave
    let iScaleNote = -1;
    for (let i = 0; i < numToAddToEnd; i++) {
        iScaleNote++;
        if (iScaleNote >= scale.notes.length) {
            iScaleNote = 0;
        }
        let noteIndex = scale.notes[iScaleNote];
        if (noteIndex < lastNoteIndex && octave + octaveOffset < octaves.length - 1) {
            octaveOffset ++;
        }
        lastNoteIndex = noteIndex;
        scaleNotes.push(octaves[octave + octaveOffset][noteIndex]);    
    }

    // Add notes to the beginning, before the "main" octave
    lastNoteIndex = 0;
    octaveOffset = 0;
    iScaleNote = scale.notes.length;
    for (let i = 0; i < numToAddToStart; i++) {
        iScaleNote--;
        if (iScaleNote < 0) {
            iScaleNote = scale.notes.length - 1;
        }
        let noteIndex = scale.notes[iScaleNote];
        if (noteIndex > lastNoteIndex && octave - octaveOffset >= 0) {
            octaveOffset --;
        }
        lastNoteIndex = noteIndex;
        scaleNotes.unshift(octaves[octave + octaveOffset][noteIndex]);    
    }

    return scaleNotes;
}