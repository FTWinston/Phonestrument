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

    // add the "first" note onto the end, up an octive
    let noteIndex = scale.notes[0];
    if (noteIndex < lastNoteIndex) {
        octaveOffset ++;
    }
    lastNoteIndex = noteIndex;
    scaleNotes.push(octaves[octave + octaveOffset][noteIndex]);

    // and add the "second" note onto the end, too
    noteIndex = scale.notes[1];
    if (noteIndex < lastNoteIndex) {
        octaveOffset ++;
    }
    scaleNotes.push(octaves[octave + octaveOffset][noteIndex]);

    // and now put the last note onto the beginning, down an octave
    noteIndex = scale.notes[scale.notes.length - 1];
    const firstNoteIndex = scale.notes[0];
    octaveOffset = noteIndex > firstNoteIndex ? -1 : 0;
    scaleNotes.unshift(octaves[octave + octaveOffset][noteIndex]);

    return scaleNotes;
}