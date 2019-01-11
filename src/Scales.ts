import { C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B } from './Notes';

export interface IScale {
    name: string;
    notes: number[];
}

export const scales: IScale[] = [
    {
        name: 'C Major',
        notes: [ C, D, E, F, G, A, B ],
    },
    {
        name: 'D Major',
        notes: [ D, E, Gb, G, A, B, Db ],
    },
    {
        name: 'E Major',
        notes: [ E, Gb, Ab, A, B, Db, Eb ],
    },
    {
        name: 'F Major',
        notes: [ F, G, A, Bb, C, D, E ],
    },
    {
        name: 'G Major',
        notes: [ G, A, B, C, D, E, Gb ],
    },
    {
        name: 'A Major',
        notes: [ A, B, Db, D, E, Gb, Ab ],
    },
    {
        name: 'B Major',
        notes: [ B, Db, Eb, E, Gb, Ab, Bb ],
    },
];