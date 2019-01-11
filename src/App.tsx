import React, { Component } from 'react';
import { Player } from './Player';
import { Site } from './Site';
import { IScale, scales } from './Scales';
import { Help } from './Help';
import { INote, octaves } from './Notes';
import { determineNotes } from './determineNotes';

enum Display {
    Home,
    Help,
    Play,
}

interface IState {
    display: Display;

    scale: IScale;
    octave: number;
    volume: number;
    flip: boolean;
}

const scaleVarName = 'scale';
const octaveVarName = 'octave';
const volumeVarName = 'volume';
const flipVarName = 'flip';

class App extends Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        
        // load saved settings, if present
        let scale = scales[0];
        const savedScale = sessionStorage.getItem(scaleVarName);
        if (savedScale !== null) {
            const match = scales.filter(s => s.name === savedScale);
            if (match.length > 0) {
                scale = match[0];
            }
        }

        let octave = 4;
        const savedOctave = sessionStorage.getItem(octaveVarName);
        if (savedOctave !== null) {
            const value = parseInt(savedOctave);
            if (value >= 0 && value < octaves.length) {
                octave = value;
            }
        }

        let vol = 0.1;
        const savedVol = sessionStorage.getItem(volumeVarName);
        if (savedVol !== null) {
            const value = parseFloat(savedVol);
            if (value >= 0 && value <= 1) {
                vol = value;
            }
        }

        let flip = false;
        if (sessionStorage.getItem(flipVarName) === '1') {
            flip = true;
        }

        this.state = {
            display: Display.Home,
            scale: scale,
            octave: octave,
            volume: vol,
            flip: flip,
        };
    }

    render() {
        if (this.state.display === Display.Help) {
            const back = () => this.setState({ display: Display.Home });

            return <Help
                back={back}
                flip={this.state.flip}
            />
        }
        else if (this.state.display === Display.Play) {
            const exit = () => this.setState({ display: Display.Home });

            const mainNotes = determineNotes(this.state.scale, this.state.octave);
            const highNotes = determineNotes(this.state.scale, this.state.octave + 1);
            const lowNotes = determineNotes(this.state.scale, this.state.octave - 1);

            return <Player
                exit={exit}
                mainNotes={mainNotes}
                highNotes={highNotes}
                lowNotes={lowNotes}
                volume={this.state.volume}
                flip={this.state.flip}
                buttonLength={20}
                buttonSpacing={3}
                leftButtonOffset={3}
                rightButtonOffset={6}
            />
        }
        else {
            const play = () => this.setState({ display: Display.Play });
            const help = () => this.setState({ display: Display.Help });

            const setScale = (scale: IScale) => {
                sessionStorage.setItem(scaleVarName, scale.name);
                this.setState({ scale: scale });
            };

            const setOctave = (octave: number) => {
                sessionStorage.setItem(octaveVarName, octave.toString());
                this.setState({ octave: octave });
            };

            const setVolume = (vol: number) => {
                sessionStorage.setItem(volumeVarName, vol.toString());
                this.setState({ volume: vol });
            };

            const setFlip = (flip: boolean) => {
                sessionStorage.setItem(flipVarName, flip ? '1' : '0');
                this.setState({ flip: flip });
            };

            return <Site
                help={help}
                play={play}

                selectedScale={this.state.scale}
                selectScale={setScale}

                octave={this.state.octave}
                setOctave={setOctave}

                volume={this.state.volume}
                setVolume={setVolume}

                flip={this.state.flip}
                setFlip={setFlip}
            />
        }
    }
}

export default App;
