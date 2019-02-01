import { octaves } from './Notes';
import { IScale, IScaleType } from './Scales';

export function determineNotes(scale: IScale, scaleType: IScaleType, mainOctave: number) {
    let lastNoteIndex = -1;

    // Add a full scale of notes
    let iOctave = mainOctave;
    const scaleNotes = scale.notes.map(noteIndex => {
        if (noteIndex < lastNoteIndex && iOctave < octaves.length - 1) {
            iOctave ++;
        }

        lastNoteIndex = noteIndex;

        return octaves[iOctave][noteIndex];
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
        let iOctaveNote = scale.notes[iScaleNote];
        if (iOctaveNote < lastNoteIndex && iOctave < octaves.length - 2) {
            iOctave ++;
        }
        lastNoteIndex = iOctaveNote;
        scaleNotes.push(octaves[iOctave][iOctaveNote]);    
    }

    // Add notes to the beginning, before the "main" octave
    lastNoteIndex = scale.notes[0];
    iOctave = mainOctave;
    iScaleNote = scale.notes.length;
    for (let i = 0; i < numToAddToStart; i++) {
        iScaleNote--;
        if (iScaleNote < 0) {
            iScaleNote = scale.notes.length - 1;
        }
        let iOctaveNote = scale.notes[iScaleNote];
        if (iOctaveNote > lastNoteIndex && iOctave > 0) {
            iOctave --;
        }
        lastNoteIndex = iOctaveNote;
        scaleNotes.unshift(octaves[iOctave][iOctaveNote]);    
    }

    return scaleNotes;
}