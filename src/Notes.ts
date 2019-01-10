export interface INote {
    pitch: number;
    name: string;
}

export interface IScale {
    name: string;
    notes: INote[];
}

const c1 = { name: 'C', pitch: 1000, };
const d1 = { name: 'D', pitch: 2000, };
const e1 = { name: 'E', pitch: 3000, };
const f1 = { name: 'F', pitch: 4000, };
const g1 = { name: 'G', pitch: 5000, };
const a1 = { name: 'A', pitch: 6000, };
const b1 = { name: 'B', pitch: 7000, };
const c2 = { name: 'C', pitch: 8000, };

export const scales: IScale[] = [
    {
        name: 'C Major',
        notes: [ c1, d1, e1, f1, g1, a1, b1, c2 ],
    },
];