import { INote } from "./Notes";

//const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;

interface INoteOscillator {
    oscillator: OscillatorNode;
    gain: GainNode;
}

export class Audio {
    private readonly audioCtx: AudioContext;
    private readonly gain: GainNode;
    private oscillators: { [key:number]: INoteOscillator; } = {};

    constructor() {
        this.audioCtx = new AudioContext();
        this.gain = this.audioCtx.createGain();
        this.gain.connect(this.audioCtx.destination);
    }

    public setVolume(volume: number) {
        this.gain.gain.setValueAtTime(volume, this.audioCtx.currentTime);
    }

    public start(key: number, frequency: number) {
        let noteOscillator = this.oscillators[key];

        if (noteOscillator !== undefined) {
            // already playing, cannot play more
            return;
        }

        const oscillator = this.audioCtx.createOscillator();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);
        oscillator.start();

        const noteGain = this.audioCtx.createGain();        
        oscillator.connect(noteGain);

        noteGain.connect(this.gain)
        this.oscillators[key] = {
            oscillator: oscillator,
            gain: noteGain,
        };
    }

    public stop(key: number) {
        const noteOscillator = this.oscillators[key];

        if (noteOscillator === undefined) {
            // not playing this frequency, nothing to stop
            return;
        }

        delete this.oscillators[key];
        this.stopOscillator(noteOscillator);
    }

    public stopAll() {
        for (let key in this.oscillators) {
            const noteOscillator = this.oscillators[key];
            this.stopOscillator(noteOscillator);
        }

        this.oscillators = {};
    }

    private stopOscillator(noteOscillator: INoteOscillator) {
        // fade out, to avoid a "pop" from the sudden cutoff
        const gain = noteOscillator.gain.gain;
        gain.setValueAtTime(gain.value, this.audioCtx.currentTime); 
        noteOscillator.gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.03);

        setTimeout(() => {
            noteOscillator.oscillator.stop();
            noteOscillator.gain.disconnect(this.gain);
        }, 25);
    }
}