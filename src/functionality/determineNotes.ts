import { octaves } from './Notes';
import { IScale, IScaleType } from './Scales';

export function determineNotes(scale: IScale, scaleType: IScaleType, mainOctave: number) {
    const noteIndices = [
        ...scale.notes,
        scale.notes[0],
    ];

    let iOctave = mainOctave;
    let lastNoteIndex = -1;

    return noteIndices.map(noteIndex => {
        if (noteIndex < lastNoteIndex && iOctave < octaves.length - 1) {
            iOctave ++;
        }

        lastNoteIndex = noteIndex;

        return octaves[iOctave][noteIndex];
    });
}