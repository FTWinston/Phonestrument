export interface INote {
    name: string;
    frequency: number;
    octave: number;
}

export interface IScale {
    name: string;
    notes: INote[];
}

const C0 = { name: 'C', frequency: 16.35, octave: 0, };
const Db0 = { name: 'D♭', frequency: 17.32, octave: 0, };
const D0 = { name: 'D', frequency: 18.35, octave: 0, };
const Eb0 = { name: 'E♭', frequency: 19.45, octave: 0, };
const E0 = { name: 'E', frequency: 20.6, octave: 0, };
const F0 = { name: 'F', frequency: 21.83, octave: 0, };
const Gb0 = { name: 'G♭', frequency: 23.12, octave: 0, };
const G0 = { name: 'G', frequency: 24.5, octave: 0, };
const Ab0 = { name: 'A♭', frequency: 25.96, octave: 0, };
const A0 = { name: 'A', frequency: 27.5, octave: 0, };
const Bb0 = { name: 'B♭', frequency: 29.14, octave: 0, };
const B0 = { name: 'B', frequency: 30.87, octave: 0, };

const C1 = { name: 'C', frequency: 32.7, octave: 1, };
const Db1 = { name: 'D♭', frequency: 34.65, octave: 1, };
const D1 = { name: 'D', frequency: 36.71, octave: 1, };
const Eb1 = { name: 'E♭', frequency: 38.89, octave: 1, };
const E1 = { name: 'E', frequency: 41.2, octave: 1, };
const F1 = { name: 'F', frequency: 43.65, octave: 1, };
const Gb1 = { name: 'G♭', frequency: 46.25, octave: 1, };
const G1 = { name: 'G', frequency: 49, octave: 1, };
const Ab1 = { name: 'A♭', frequency: 51.91, octave: 1, };
const A1 = { name: 'A', frequency: 55, octave: 1, };
const Bb1 = { name: 'B♭', frequency: 58.27, octave: 1, };
const B1 = { name: 'B', frequency: 61.74, octave: 1, };

const C2 = { name: 'C', frequency: 65.41, octave: 2, };
const Db2 = { name: 'D♭', frequency: 69.3, octave: 2, };
const D2 = { name: 'D', frequency: 73.42, octave: 2, };
const Eb2 = { name: 'E♭', frequency: 77.78, octave: 2, };
const E2 = { name: 'E', frequency: 82.41, octave: 2, };
const F2 = { name: 'F', frequency: 87.31, octave: 2, };
const Gb2 = { name: 'G♭', frequency: 92.5, octave: 2, };
const G2 = { name: 'G', frequency: 98, octave: 2, };
const Ab2 = { name: 'A♭', frequency: 103.83, octave: 2, };
const A2 = { name: 'A', frequency: 110, octave: 2, };
const Bb2 = { name: 'B♭', frequency: 116.54, octave: 2, };
const B2 = { name: 'B', frequency: 123.47, octave: 2, };

const C3 = { name: 'C', frequency: 130.81, octave: 3, };
const Db3 = { name: 'D♭', frequency: 138.59, octave: 3, };
const D3 = { name: 'D', frequency: 146.83, octave: 3, };
const Eb3 = { name: 'E♭', frequency: 155.56, octave: 3, };
const E3 = { name: 'E', frequency: 164.81, octave: 3, };
const F3 = { name: 'F', frequency: 174.61, octave: 3, };
const Gb3 = { name: 'G♭', frequency: 185, octave: 3, };
const G3 = { name: 'G', frequency: 196, octave: 3, };
const Ab3 = { name: 'A♭', frequency: 207.65, octave: 3, };
const A3 = { name: 'A', frequency: 220, octave: 3, };
const Bb3 = { name: 'B♭', frequency: 233.08, octave: 3, };
const B3 = { name: 'B', frequency: 246.94, octave: 3, };

const C4 = { name: 'C', frequency: 261.63, octave: 4, };
const Db4 = { name: 'D♭', frequency: 277.18, octave: 4, };
const D4 = { name: 'D', frequency: 293.66, octave: 4, };
const Eb4 = { name: 'E♭', frequency: 311.13, octave: 4, };
const E4 = { name: 'E', frequency: 329.63, octave: 4, };
const F4 = { name: 'F', frequency: 349.23, octave: 4, };
const Gb4 = { name: 'G♭', frequency: 369.99, octave: 4, };
const G4 = { name: 'G', frequency: 392, octave: 4, };
const Ab4 = { name: 'A♭', frequency: 415.3, octave: 4, };
const A4 = { name: 'A', frequency: 440, octave: 4, };
const Bb4 = { name: 'B♭', frequency: 466.16, octave: 4, };
const B4 = { name: 'B', frequency: 493.88, octave: 4, };

const C5 = { name: 'C', frequency: 523.25, octave: 5, };
const Db5 = { name: 'D♭', frequency: 554.37, octave: 5, };
const D5 = { name: 'D', frequency: 587.33, octave: 5, };
const Eb5 = { name: 'E♭', frequency: 622.25, octave: 5, };
const E5 = { name: 'E', frequency: 659.25, octave: 5, };
const F5 = { name: 'F', frequency: 698.46, octave: 5, };
const Gb5 = { name: 'G♭', frequency: 739.99, octave: 5, };
const G5 = { name: 'G', frequency: 783.99, octave: 5, };
const Ab5 = { name: 'A♭', frequency: 830.61, octave: 5, };
const A5 = { name: 'A', frequency: 880, octave: 5, };
const Bb5 = { name: 'B♭', frequency: 932.33, octave: 5, };
const B5 = { name: 'B', frequency: 987.77, octave: 5, };

const C6 = { name: 'C', frequency: 1046.5, octave: 6, };
const Db6 = { name: 'D♭', frequency: 1108.73, octave: 6, };
const D6 = { name: 'D', frequency: 1174.66, octave: 6, };
const Eb6 = { name: 'E♭', frequency: 1244.51, octave: 6, };
const E6 = { name: 'E', frequency: 1318.51, octave: 6, };
const F6 = { name: 'F', frequency: 1396.91, octave: 6, };
const Gb6 = { name: 'G♭', frequency: 1479.98, octave: 6, };
const G6 = { name: 'G', frequency: 1567.98, octave: 6, };
const Ab6 = { name: 'A♭', frequency: 1661.22, octave: 6, };
const A6 = { name: 'A', frequency: 1760, octave: 6, };
const Bb6 = { name: 'B♭', frequency: 1864.66, octave: 6, };
const B6 = { name: 'B', frequency: 1975.53, octave: 6, };

const C7 = { name: 'C', frequency: 2093, octave: 7, };
const Db7 = { name: 'D♭', frequency: 2217.46, octave: 7, };
const D7 = { name: 'D', frequency: 2349.32, octave: 7, };
const Eb7 = { name: 'E♭', frequency: 2489.02, octave: 7, };
const E7 = { name: 'E', frequency: 2637.02, octave: 7, };
const F7 = { name: 'F', frequency: 2793.83, octave: 7, };
const Gb7 = { name: 'G♭', frequency: 2959.96, octave: 7, };
const G7 = { name: 'G', frequency: 3135.96, octave: 7, };
const Ab7 = { name: 'A♭', frequency: 3322.44, octave: 7, };
const A7 = { name: 'A', frequency: 3520, octave: 7, };
const Bb7 = { name: 'B♭', frequency: 3729.31, octave: 7, };
const B7 = { name: 'B', frequency: 3951.07, octave: 7, };

const C8 = { name: 'C', frequency: 4186.01, octave: 8, };
const Db8 = { name: 'D♭', frequency: 4434.92, octave: 8, };
const D8 = { name: 'D', frequency: 4698.63, octave: 8, };
const Eb8 = { name: 'E♭', frequency: 4978.03, octave: 8, };
const E8 = { name: 'E', frequency: 5274.04, octave: 8, };
const F8 = { name: 'F', frequency: 5587.65, octave: 8, };
const Gb8 = { name: 'G♭', frequency: 5919.91, octave: 8, };
const G8 = { name: 'G', frequency: 6271.93, octave: 8, };
const Ab8 = { name: 'A♭', frequency: 6644.88, octave: 8, };
const A8 = { name: 'A', frequency: 7040, octave: 8, };
const Bb8 = { name: 'B♭', frequency: 7458.62, octave: 8, };
const B8 = { name: 'B', frequency: 7902.13, octave: 8, };


export const scales: IScale[] = [
    {
        name: 'C Major',
        notes: [ C4, D4, E4, F4, G4, A4, B4, C5 ],
    },
    {
        name: 'D Major',
        notes: [ D4, E4, Gb4, G4, A4, B4, Db5, D5 ],
    },
    {
        name: 'E Major',
        notes: [ E4, Gb4, Ab4, A4, B4, Db5, Eb5, E5 ],
    },
    {
        name: 'F Major',
        notes: [ F4, G4, A4, Bb4, C5, D5, E5, F5 ],
    },
    {
        name: 'G Major',
        notes: [ G4, A4, B4, C5, D5, E5, Gb5, G5 ],
    },
    {
        name: 'A Major',
        notes: [ A4, B4, Db5, D5, E5, Gb5, Ab5, A5 ],
    },
    {
        name: 'B Major',
        notes: [ B4, Db5, Eb5, E5, Gb5, Ab5, Bb5, B5 ],
    },
];