import * as N from './Notes';

export interface IScale {
    name: string;
    notes: N.INote[];
}

export const scales: IScale[] = [
    {
        name: 'C Major',
        notes: [ N.B3, N.C4, N.D4, N.E4, N.F4, N.G4, N.A4, N.B4, N.C5, N.D5 ],
    },
    {
        name: 'D Major',
        notes: [ N.Db4, N.D4, N.E4, N.Gb4, N.G4, N.A4, N.B4, N.Db5, N.D5, N.E5 ],
    },
    {
        name: 'E Major',
        notes: [ N.Eb4, N.E4, N.Gb4, N.Ab4, N.A4, N.B4, N.Db5, N.Eb5, N.E5, N.Gb5 ],
    },
    {
        name: 'F Major',
        notes: [ N.E4, N.F4, N.G4, N.A4, N.Bb4, N.C5, N.D5, N.E5, N.F5, N.G5 ],
    },
    {
        name: 'G Major',
        notes: [ N.Gb4, N.G4, N.A4, N.B4, N.C5, N.D5, N.E5, N.Gb5, N.G5, N.A5 ],
    },
    {
        name: 'A Major',
        notes: [ N.Ab4, N.A4, N.B4, N.Db5, N.D5, N.E5, N.Gb5, N.Ab5, N.A5, N.B5 ],
    },
    {
        name: 'B Major',
        notes: [ N.Bb4, N.B4, N.Db5, N.Eb5, N.E5, N.Gb5, N.Ab5, N.Bb5, N.B5, N.Db6 ],
    },
];