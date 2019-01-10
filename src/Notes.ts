export interface INote {
    name: string;
    frequency: number;
}

export interface IScale {
    name: string;
    notes: INote[];
}

const C0 = { name: 'C0', frequency: 16.35, };
const Db0 = { name: 'D♭0', frequency: 17.32, };
const D0 = { name: 'D0', frequency: 18.35, };
const Eb0 = { name: 'E♭0', frequency: 19.45, };
const E0 = { name: 'E0', frequency: 20.6, };
const F0 = { name: 'F0', frequency: 21.83, };
const Gb0 = { name: 'G♭0', frequency: 23.12, };
const G0 = { name: 'G0', frequency: 24.5, };
const Ab0 = { name: 'A♭0', frequency: 25.96, };
const A0 = { name: 'A0', frequency: 27.5, };
const Bb0 = { name: 'B♭0', frequency: 29.14, };
const B0 = { name: 'B0', frequency: 30.87, };

const C1 = { name: 'C1', frequency: 32.7, };
const Db1 = { name: 'D♭1', frequency: 34.65, };
const D1 = { name: 'D1', frequency: 36.71, };
const Eb1 = { name: 'E♭1', frequency: 38.89, };
const E1 = { name: 'E1', frequency: 41.2, };
const F1 = { name: 'F1', frequency: 43.65, };
const Gb1 = { name: 'G♭1', frequency: 46.25, };
const G1 = { name: 'G1', frequency: 49, };
const Ab1 = { name: 'A♭1', frequency: 51.91, };
const A1 = { name: 'A1', frequency: 55, };
const Bb1 = { name: 'B♭1', frequency: 58.27, };
const B1 = { name: 'B1', frequency: 61.74, };
const C2 = { name: 'C2', frequency: 65.41, };
const Db2 = { name: 'D♭2', frequency: 69.3, };
const D2 = { name: 'D2', frequency: 73.42, };
const Eb2 = { name: 'E♭2', frequency: 77.78, };
const E2 = { name: 'E2', frequency: 82.41, };
const F2 = { name: 'F2', frequency: 87.31, };
const Gb2 = { name: 'G♭2', frequency: 92.5, };
const G2 = { name: 'G2', frequency: 98, };
const Ab2 = { name: 'A♭2', frequency: 103.83, };
const A2 = { name: 'A2', frequency: 110, };
const Bb2 = { name: 'B♭2', frequency: 116.54, };
const B2 = { name: 'B2', frequency: 123.47, };
const C3 = { name: 'C3', frequency: 130.81, };
const Db3 = { name: 'D♭3', frequency: 138.59, };
const D3 = { name: 'D3', frequency: 146.83, };
const Eb3 = { name: 'E♭3', frequency: 155.56, };
const E3 = { name: 'E3', frequency: 164.81, };
const F3 = { name: 'F3', frequency: 174.61, };
const Gb3 = { name: 'G♭3', frequency: 185, };
const G3 = { name: 'G3', frequency: 196, };
const Ab3 = { name: 'A♭3', frequency: 207.65, };
const A3 = { name: 'A3', frequency: 220, };
const Bb3 = { name: 'B♭3', frequency: 233.08, };
const B3 = { name: 'B3', frequency: 246.94, };
const C4 = { name: 'C4', frequency: 261.63, };
const Db4 = { name: 'D♭4', frequency: 277.18, };
const D4 = { name: 'D4', frequency: 293.66, };
const Eb4 = { name: 'E♭4', frequency: 311.13, };
const E4 = { name: 'E4', frequency: 329.63, };
const F4 = { name: 'F4', frequency: 349.23, };
const Gb4 = { name: 'G♭4', frequency: 369.99, };
const G4 = { name: 'G4', frequency: 392, };
const Ab4 = { name: 'A♭4', frequency: 415.3, };
const A4 = { name: 'A4', frequency: 440, };
const Bb4 = { name: 'B♭4', frequency: 466.16, };
const B4 = { name: 'B4', frequency: 493.88, };
const C5 = { name: 'C5', frequency: 523.25, };
const Db5 = { name: 'D♭5', frequency: 554.37, };
const D5 = { name: 'D5', frequency: 587.33, };
const Eb5 = { name: 'E♭5', frequency: 622.25, };
const E5 = { name: 'E5', frequency: 659.25, };
const F5 = { name: 'F5', frequency: 698.46, };
const Gb5 = { name: 'G♭5', frequency: 739.99, };
const G5 = { name: 'G5', frequency: 783.99, };
const Ab5 = { name: 'A♭5', frequency: 830.61, };
const A5 = { name: 'A5', frequency: 880, };
const Bb5 = { name: 'B♭5', frequency: 932.33, };
const B5 = { name: 'B5', frequency: 987.77, };
const C6 = { name: 'C6', frequency: 1046.5, };
const Db6 = { name: 'D♭6', frequency: 1108.73, };
const D6 = { name: 'D6', frequency: 1174.66, };
const Eb6 = { name: 'E♭6', frequency: 1244.51, };
const E6 = { name: 'E6', frequency: 1318.51, };
const F6 = { name: 'F6', frequency: 1396.91, };
const Gb6 = { name: 'G♭6', frequency: 1479.98, };
const G6 = { name: 'G6', frequency: 1567.98, };
const Ab6 = { name: 'A♭6', frequency: 1661.22, };
const A6 = { name: 'A6', frequency: 1760, };
const Bb6 = { name: 'B♭6', frequency: 1864.66, };
const B6 = { name: 'B6', frequency: 1975.53, };
const C7 = { name: 'C7', frequency: 2093, };
const Db7 = { name: 'D♭7', frequency: 2217.46, };
const D7 = { name: 'D7', frequency: 2349.32, };
const Eb7 = { name: 'E♭7', frequency: 2489.02, };
const E7 = { name: 'E7', frequency: 2637.02, };
const F7 = { name: 'F7', frequency: 2793.83, };
const Gb7 = { name: 'G♭7', frequency: 2959.96, };
const G7 = { name: 'G7', frequency: 3135.96, };
const Ab7 = { name: 'A♭7', frequency: 3322.44, };
const A7 = { name: 'A7', frequency: 3520, };
const Bb7 = { name: 'B♭7', frequency: 3729.31, };
const B7 = { name: 'B7', frequency: 3951.07, };
const C8 = { name: 'C8', frequency: 4186.01, };
const Db8 = { name: 'D♭8', frequency: 4434.92, };
const D8 = { name: 'D8', frequency: 4698.63, };
const Eb8 = { name: 'E♭8', frequency: 4978.03, };
const E8 = { name: 'E8', frequency: 5274.04, };
const F8 = { name: 'F8', frequency: 5587.65, };
const Gb8 = { name: 'G♭8', frequency: 5919.91, };
const G8 = { name: 'G8', frequency: 6271.93, };
const Ab8 = { name: 'A♭8', frequency: 6644.88, };
const A8 = { name: 'A8', frequency: 7040, };
const Bb8 = { name: 'B♭8', frequency: 7458.62, };
const B8 = { name: 'B8', frequency: 7902.13, };


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