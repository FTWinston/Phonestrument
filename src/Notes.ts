export interface INote {
    name: string;
    frequency: number;
    octave: number;
}

export const C = 0, Db = 1, D = 2, Eb = 3, E = 4, F = 5, Gb = 6, G = 7, Ab = 8, A = 9, Bb = 10, B = 11;

export const octaves = [
    [
        { name: 'C', frequency: 16.35, octave: 0, },
        { name: 'D♭', frequency: 17.32, octave: 0, },
        { name: 'D', frequency: 18.35, octave: 0, },
        { name: 'E♭', frequency: 19.45, octave: 0, },
        { name: 'E', frequency: 20.6, octave: 0, },
        { name: 'F', frequency: 21.83, octave: 0, },
        { name: 'G♭', frequency: 23.12, octave: 0, },
        { name: 'G', frequency: 24.5, octave: 0, },
        { name: 'A♭', frequency: 25.96, octave: 0, },
        { name: 'A', frequency: 27.5, octave: 0, },
        { name: 'B♭', frequency: 29.14, octave: 0, },
        { name: 'B', frequency: 30.87, octave: 0, },
    ],

    [
        { name: 'C', frequency: 32.7, octave: 1, },
        { name: 'D♭', frequency: 34.65, octave: 1, },
        { name: 'D', frequency: 36.71, octave: 1, },
        { name: 'E♭', frequency: 38.89, octave: 1, },
        { name: 'E', frequency: 41.2, octave: 1, },
        { name: 'F', frequency: 43.65, octave: 1, },
        { name: 'G♭', frequency: 46.25, octave: 1, },
        { name: 'G', frequency: 49, octave: 1, },
        { name: 'A♭', frequency: 51.91, octave: 1, },
        { name: 'A', frequency: 55, octave: 1, },
        { name: 'B♭', frequency: 58.27, octave: 1, },
        { name: 'B', frequency: 61.74, octave: 1, },
    ],

    [
        { name: 'C', frequency: 65.41, octave: 2, },
        { name: 'D♭', frequency: 69.3, octave: 2, },
        { name: 'D', frequency: 73.42, octave: 2, },
        { name: 'E♭', frequency: 77.78, octave: 2, },
        { name: 'E', frequency: 82.41, octave: 2, },
        { name: 'F', frequency: 87.31, octave: 2, },
        { name: 'G♭', frequency: 92.5, octave: 2, },
        { name: 'G', frequency: 98, octave: 2, },
        { name: 'A♭', frequency: 103.83, octave: 2, },
        { name: 'A', frequency: 110, octave: 2, },
        { name: 'B♭', frequency: 116.54, octave: 2, },
        { name: 'B', frequency: 123.47, octave: 2, },
    ],

    [
        { name: 'C', frequency: 130.81, octave: 3, },
        { name: 'D♭', frequency: 138.59, octave: 3, },
        { name: 'D', frequency: 146.83, octave: 3, },
        { name: 'E♭', frequency: 155.56, octave: 3, },
        { name: 'E', frequency: 164.81, octave: 3, },
        { name: 'F', frequency: 174.61, octave: 3, },
        { name: 'G♭', frequency: 185, octave: 3, },
        { name: 'G', frequency: 196, octave: 3, },
        { name: 'A♭', frequency: 207.65, octave: 3, },
        { name: 'A', frequency: 220, octave: 3, },
        { name: 'B♭', frequency: 233.08, octave: 3, },
        { name: 'B', frequency: 246.94, octave: 3, },
    ],

    [
        { name: 'C', frequency: 261.63, octave: 4, },
        { name: 'D♭', frequency: 277.18, octave: 4, },
        { name: 'D', frequency: 293.66, octave: 4, },
        { name: 'E♭', frequency: 311.13, octave: 4, },
        { name: 'E', frequency: 329.63, octave: 4, },
        { name: 'F', frequency: 349.23, octave: 4, },
        { name: 'G♭', frequency: 369.99, octave: 4, },
        { name: 'G', frequency: 392, octave: 4, },
        { name: 'A♭', frequency: 415.3, octave: 4, },
        { name: 'A', frequency: 440, octave: 4, },
        { name: 'B♭', frequency: 466.16, octave: 4, },
        { name: 'B', frequency: 493.88, octave: 4, },
    ],

    [
        { name: 'C', frequency: 523.25, octave: 5, },
        { name: 'D♭', frequency: 554.37, octave: 5, },
        { name: 'D', frequency: 587.33, octave: 5, },
        { name: 'E♭', frequency: 622.25, octave: 5, },
        { name: 'E', frequency: 659.25, octave: 5, },
        { name: 'F', frequency: 698.46, octave: 5, },
        { name: 'G♭', frequency: 739.99, octave: 5, },
        { name: 'G', frequency: 783.99, octave: 5, },
        { name: 'A♭', frequency: 830.61, octave: 5, },
        { name: 'A', frequency: 880, octave: 5, },
        { name: 'B♭', frequency: 932.33, octave: 5, },
        { name: 'B', frequency: 987.77, octave: 5, },
    ],

    [
        { name: 'C', frequency: 1046.5, octave: 6, },
        { name: 'D♭', frequency: 1108.73, octave: 6, },
        { name: 'D', frequency: 1174.66, octave: 6, },
        { name: 'E♭', frequency: 1244.51, octave: 6, },
        { name: 'E', frequency: 1318.51, octave: 6, },
        { name: 'F', frequency: 1396.91, octave: 6, },
        { name: 'G♭', frequency: 1479.98, octave: 6, },
        { name: 'G', frequency: 1567.98, octave: 6, },
        { name: 'A♭', frequency: 1661.22, octave: 6, },
        { name: 'A', frequency: 1760, octave: 6, },
        { name: 'B♭', frequency: 1864.66, octave: 6, },
        { name: 'B', frequency: 1975.53, octave: 6, },
    ],

    [
        { name: 'C', frequency: 2093, octave: 7, },
        { name: 'D♭', frequency: 2217.46, octave: 7, },
        { name: 'D', frequency: 2349.32, octave: 7, },
        { name: 'E♭', frequency: 2489.02, octave: 7, },
        { name: 'E', frequency: 2637.02, octave: 7, },
        { name: 'F', frequency: 2793.83, octave: 7, },
        { name: 'G♭', frequency: 2959.96, octave: 7, },
        { name: 'G', frequency: 3135.96, octave: 7, },
        { name: 'A♭', frequency: 3322.44, octave: 7, },
        { name: 'A', frequency: 3520, octave: 7, },
        { name: 'B♭', frequency: 3729.31, octave: 7, },
        { name: 'B', frequency: 3951.07, octave: 7, },
    ],

    [
        { name: 'C', frequency: 4186.01, octave: 8, },
        { name: 'D♭', frequency: 4434.92, octave: 8, },
        { name: 'D', frequency: 4698.63, octave: 8, },
        { name: 'E♭', frequency: 4978.03, octave: 8, },
        { name: 'E', frequency: 5274.04, octave: 8, },
        { name: 'F', frequency: 5587.65, octave: 8, },
        { name: 'G♭', frequency: 5919.91, octave: 8, },
        { name: 'G', frequency: 6271.93, octave: 8, },
        { name: 'A♭', frequency: 6644.88, octave: 8, },
        { name: 'A', frequency: 7040, octave: 8, },
        { name: 'B♭', frequency: 7458.62, octave: 8, },
        { name: 'B', frequency: 7902.13, octave: 8, },
    ]
];