import { C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B } from './Notes';

export interface IScale {
    name: string;
    notes: number[];
}

export interface IScaleType {
    name: string;
    scales: IScale[];
}

export const scaleTypes: IScaleType[] =
[
    {
        name: 'Major',
        scales: [
            {
                name: 'A♭',
                notes: [ Ab, Bb, C, Db, Eb, F, G ],
            },
            {
                name: 'A',
                notes: [ A, B, Db, D, E, Gb, Ab ],
            },
            {
                name: 'B♭',
                notes: [ Bb, C, D, Eb, F, G, A ],
            },
            {
                name: 'B',
                notes: [ B, Db, Eb, E, Gb, Ab, Bb ],
            },
            {
                name: 'C',
                notes: [ C, D, E, F, G, A, B ],
            },
            {
                name: 'D♭',
                notes: [ Db, Eb, F, Gb, Ab, Bb, C ],
            },
            {
                name: 'D',
                notes: [ D, E, Gb, G, A, B, Db ],
            },
            {
                name: 'E♭',
                notes: [ Eb, F, G, Ab, Bb, C, D ],
            },
            {
                name: 'E',
                notes: [ E, Gb, Ab, A, B, Db, Eb ],
            },
            {
                name: 'F',
                notes: [ F, G, A, Bb, C, D, E ],
            },
            {
                name: 'G♭',
                notes: [ Gb, Ab, Bb, B, Db, Eb, F ],
            },
            {
                name: 'G',
                notes: [ G, A, B, C, D, E, Gb ],
            },
        ]
    },
    {
        name: 'Natural Minor',
        scales: [
            {
                name: 'A♭',
                notes: [Ab, Bb, B, Db, Eb, E, Gb, Ab ],
            },
            {
                name: 'A',
                notes: [A, B, C, D, E, F, G ],
            },
            {
                name: 'B♭',
                notes: [Bb, C, Db, Eb, F, Gb, Ab, Bb ],
            },
            {
                name: 'B',
                notes: [B, Db, D, E, Gb, G, A ],
            },
            {
                name: 'C',
                notes: [C, D, Eb, F, G, Ab, Bb ],
            },
            {
                name: 'D♭',
                notes: [Db, Eb, E, Gb, Ab, A, B, Db ],
            },
            {
                name: 'D',
                notes: [D, E, F, G, A, Bb, C ],
            },
            {
                name: 'E♭',
                notes: [Eb, F, Gb, Ab, Bb, B, Db, Eb ],
            },
            {
                name: 'E',
                notes: [E, Gb, G, A, B, C, D ],
            },
            {
                name: 'F',
                notes: [F, G, Ab, Bb, C, Db, Eb ],
            },
            {
                name: 'G♭',
                notes: [Gb, Ab, A, B, Db, D, E, Gb ],
            },
            {
                name: 'G',
                notes: [G, A, Bb, C, D, Eb, F ],
            },
        ]
    },
    {
        name: 'Melodic Minor',
        scales: [
            {
                name: 'A♭',
                notes: [Ab, Bb, B, Db, Eb, F, G ],
            },
            {
                name: 'A',
                notes: [A, B, C, D, E, Gb, Ab ],
            },
            {
                name: 'B♭',
                notes: [Bb, C, Db, Eb, F, G, A ],
            },
            {
                name: 'B',
                notes: [B, Db, D, E, Gb, Ab, Bb ],
            },
            {
                name: 'C',
                notes: [C, D, Eb, F, G, A, B ],
            },
            {
                name: 'D♭',
                notes: [Db, Eb, E, Gb, Ab, Bb, C ],
            },
            {
                name: 'D',
                notes: [D, E, F, G, A, B, Db ],
            },
            {
                name: 'E♭',
                notes: [Eb, F, Gb, Ab, Bb, C, D ],
            },
            {
                name: 'E',
                notes: [E, Gb, G, A, B, Db, Eb ],
            },
            {
                name: 'F',
                notes: [F, G, Ab, Bb, C, D, E ],
            },
            {
                name: 'G♭',
                notes: [Gb, Ab, A, B, Db, Eb, F ],
            },
            {
                name: 'G',
                notes: [G, A, Bb, C, D, E, Gb ],
            },
        ]
    },
    {
        name: 'Harmonic Minor',
        scales: [
            {
                name: 'A♭',
                notes: [Ab, Bb, B, Db, Eb, E, G ],
            },
            {
                name: 'A',
                notes: [A, B, C, D, E, F, Ab ],
            },
            {
                name: 'B♭',
                notes: [Bb, C, Db, Eb, F, Gb, A ],
            },
            {
                name: 'B',
                notes: [B, Db, D, E, Gb, G, Bb ],
            },
            {
                name: 'C',
                notes: [C, D, Eb, F, G, Ab, B ],
            },
            {
                name: 'D♭',
                notes: [Db, Eb, E, Gb, Ab, A, C ],
            },
            {
                name: 'D',
                notes: [D, E, F, G, A, Bb, Db ],
            },
            {
                name: 'E♭',
                notes: [Eb, F, Gb, Ab, Bb, B, D ],
            },
            {
                name: 'E',
                notes: [E, Gb, G, A, B, C, Eb ],
            },
            {
                name: 'F',
                notes: [F, G, Ab, Bb, C, Db, E ],
            },
            {
                name: 'G♭',
                notes: [Gb, Ab, A, B, Db, D, F ],
            },
            {
                name: 'G',
                notes: [G, A, Bb, C, D, Eb, Gb ],
            },
        ]
    },
    {
        name: 'Minor Pentatonic',
        scales: [
            {
                name: 'Ab',
                notes: [ Ab, B, Db, Eb, Gb ],
            },
            {
                name: 'A',
                notes: [ A, C, D, E, G ],
            },
            {
                name: 'Bb',
                notes: [ Bb, Db, Eb, F, Ab ],
            },
            {
                name: 'B',
                notes: [ B, D, E, Gb, A ],
            },
            {
                name: 'C',
                notes: [ C, Eb, F, G, Bb ],
            },
            {
                name: 'Db',
                notes: [ Db, E, Gb, Ab, B ],
            },
            {
                name: 'D',
                notes: [ D, F, G, A, C ],
            },
            {
                name: 'Eb',
                notes: [ Eb, Gb, Ab, Bb, Db ],
            },
            {
                name: 'E',
                notes: [ E, G, A, B, D ],
            },
            {
                name: 'F',
                notes: [ F, Ab, Bb, C, Eb ],
            },
            {
                name: 'Gb',
                notes: [ Gb, A, B, Db, E ],
            },
            {
                name: 'G',
                notes: [ G, Bb, C, D, F ],
            },
        ]
    },
    {
        name: 'Major Pentatonic',
        scales: [
            {
                name: 'A♭',
                notes: [Ab, Bb, C, Eb, F ],
            },
            {
                name: 'A',
                notes: [A, B, Db, E, Gb ],
            },
            {
                name: 'B♭',
                notes: [Bb, C, D, F, G ],
            },
            {
                name: 'B',
                notes: [B, Db, Eb, Gb, Ab ],
            },
            {
                name: 'C',
                notes: [C, D, E, G, A ],
            },
            {
                name: 'D♭',
                notes: [Db, Eb, F, Ab, Bb ],
            },
            {
                name: 'D',
                notes: [D, E, Gb, A, B ],
            },
            {
                name: 'E♭',
                notes: [Eb, F, G, Bb, C ],
            },
            {
                name: 'E',
                notes: [E, Gb, Ab, B, Db ],
            },
            {
                name: 'F',
                notes: [F, G, A, C, D ],
            },
            {
                name: 'G♭',
                notes: [Gb, Ab, Bb, Db, Eb ],
            },
            {
                name: 'G',
                notes: [G, A, B, D, E ],
            },
        ]
    },
    {
        name: 'Minor Pentatonic Blues',
        scales: [
            {
                name: 'A♭',
                notes: [Ab, B, Db, D, Eb, Gb ],
            },
            {
                name: 'A',
                notes: [A, C, D, Eb, E, G ],
            },
            {
                name: 'B♭',
                notes: [Bb, Db, Eb, E, F, Ab ],
            },
            {
                name: 'B',
                notes: [B, D, E, F, Gb, A ],
            },
            {
                name: 'C',
                notes: [C, Eb, F, Gb, G, Bb ],
            },
            {
                name: 'D♭',
                notes: [Db, E, Gb, G, Ab, B ],
            },
            {
                name: 'D',
                notes: [D, F, G, Ab, A, C ],
            },
            {
                name: 'E♭',
                notes: [Eb, Gb, Ab, A, Bb, Db ],
            },
            {
                name: 'E',
                notes: [E, G, A, Bb, B, D ],
            },
            {
                name: 'F',
                notes: [F, Ab, Bb, B, C, Eb ],
            },
            {
                name: 'G♭',
                notes: [Gb, A, B, C, Db, E ],
            },
            {
                name: 'G',
                notes: [G, Bb, C, Db, D, F ],
            },
        ]
    },
    {
        name: 'Major Pentatonic Blues',
        scales: [
            {
                name: 'A♭',
                notes: [Ab, Bb, B, C, Eb, F ],
            },
            {
                name: 'A',
                notes: [A, B, C, Db, E, Gb ],
            },
            {
                name: 'B♭',
                notes: [Bb, C, Db, D, F, G ],
            },
            {
                name: 'B',
                notes: [B, Db, D, Eb, Gb, Ab ],
            },
            {
                name: 'C',
                notes: [C, D, Eb, E, G, A ],
            },
            {
                name: 'D♭',
                notes: [Db, Eb, E, F, Ab, Bb ],
            },
            {
                name: 'D',
                notes: [D, E, F, Gb, A, B ],
            },
            {
                name: 'E♭',
                notes: [Eb, F, Gb, G, Bb, C ],
            },
            {
                name: 'E',
                notes: [E, Gb, G, Ab, B, Db ],
            },
            {
                name: 'F',
                notes: [F, G, Ab, A, C, D ],
            },
            {
                name: 'G♭',
                notes: [Gb, Ab, A, Bb, Db, Eb ],
            },
            {
                name: 'G',
                notes: [G, A, Bb, B, D, E ],
            },
        ]
    },
    {
        name: 'Major Bebop',
        scales: [
            {
                name: 'A♭',
                notes: [Ab, Bb, C, Db, Eb, E, F, G ],
            },
            {
                name: 'A',
                notes: [A, B, Db, D, E, F, Gb, Ab ],
            },
            {
                name: 'B♭',
                notes: [Bb, C, D, Eb, F, Gb, G, A ],
            },
            {
                name: 'B',
                notes: [B, Db, Eb, E, Gb, G, Ab, Bb ],
            },
            {
                name: 'C',
                notes: [C, D, E, F, G, Ab, A, B ],
            },
            {
                name: 'D♭',
                notes: [Db, Eb, F, Gb, Ab, A, Bb, C ],
            },
            {
                name: 'D',
                notes: [D, E, Gb, G, A, Bb, B, Db ],
            },
            {
                name: 'E♭',
                notes: [Eb, F, G, Ab, Bb, B, C, D ],
            },
            {
                name: 'E',
                notes: [E, Gb, Ab, A, B, C, Db, Eb ],
            },
            {
                name: 'F',
                notes: [F, G, A, Bb, C, Db, D, E ],
            },
            {
                name: 'G♭',
                notes: [Gb, Ab, Bb, B, Db, D, Eb, F ],
            },
            {
                name: 'G',
                notes: [G, A, B, C, D, Eb, E, Gb ],
            },
        ]
    },
    {
        name: 'Minor Bebop scales',
        scales: [
            {
                name: 'A♭',
                notes: [Ab, Bb, B, C, Db, Eb, F, Gb ],
            },
            {
                name: 'A',
                notes: [A, B, C, Db, D, E, Gb, G ],
            },
            {
                name: 'B♭',
                notes: [Bb, C, Db, D, Eb, F, G, Ab ],
            },
            {
                name: 'B',
                notes: [B, Db, D, Eb, E, Gb, Ab, A ],
            },
            {
                name: 'C',
                notes: [C, D, Eb, E, F, G, A, Bb ],
            },
            {
                name: 'D♭',
                notes: [Db, Eb, E, F, Gb, Ab, Bb, B ],
            },
            {
                name: 'D',
                notes: [D, E, F, Gb, G, A, B, C ],
            },
            {
                name: 'E♭',
                notes: [Eb, F, Gb, G, Ab, Bb, C, Db ],
            },
            {
                name: 'E',
                notes: [E, Gb, G, Ab, A, B, Db, D ],
            },
            {
                name: 'F',
                notes: [F, G, Ab, A, Bb, C, D, Eb ],
            },
            {
                name: 'G♭',
                notes: [Gb, Ab, A, Bb, B, Db, Eb, E ],
            },
            {
                name: 'G',
                notes: [G, A, Bb, B, C, D, E, F ],
            },
        ]
    },
    {
        name: 'Super Locrian',
        scales: [
            {
                name: 'C',
                notes: [C, Db, Eb, E, Gb, Ab, Bb ],
            },
            {
                name: 'D♭',
                notes: [Db, D, E, F, G, A, B ],
            },
            {
                name: 'D',
                notes: [D, Eb, F, Gb, Ab, Bb, C ],
            },
            {
                name: 'E♭',
                notes: [Eb, E, Gb, G, A, B, Db ],
            },
            {
                name: 'E',
                notes: [E, F, G, Ab, Bb, C, D ],
            },
            {
                name: 'F',
                notes: [F, Gb, Ab, A, B, Db, Eb ],
            },
            {
                name: 'G♭',
                notes: [Gb, G, A, Bb, C, D, E ],
            },
            {
                name: 'G',
                notes: [G, Ab, Bb, B, Db, Eb, F ],
            },
            {
                name: 'A♭',
                notes: [Ab, A, B, C, D, E, Gb ],
            },
            {
                name: 'A',
                notes: [A, Bb, C, Db, Eb, F, G ],
            },
            {
                name: 'B♭',
                notes: [Bb, B, Db, D, E, Gb, Ab ],
            },
            {
                name: 'B',
                notes: [B, C, D, Eb, F, G, A ],
            },
        ]
    },
];