import React, { Component } from 'react';
import { Player } from './Player';
import { Site } from './Site';
import { IScale, scaleTypes, IScaleType } from './Scales';
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

    scaleType: IScaleType;
    scale: IScale;
    octave: number;
    volume: number;
}

const scaleTypeVarName = 'scaleType';
const scaleNoteVarName = 'scaleNote';
const octaveVarName = 'octave';
const volumeVarName = 'volume';

class App extends Component<{}, IState> {
    constructor(props: {}) {
        super(props);

        let scaleType = scaleTypes[0];
        const savedScaleType = sessionStorage.getItem(scaleTypeVarName);
        if (savedScaleType !== null) {
            const match = scaleTypes.filter(s => s.name === savedScaleType);
            if (match.length > 0) {
                scaleType = match[0];
            }
        }
        
        // load saved settings, if present
        let scale = scaleType.scales.filter(s => s.name === 'C')[0];
        const savedScale = sessionStorage.getItem(scaleNoteVarName);
        if (savedScale !== null) {
            const match = scaleType.scales.filter(s => s.name === savedScale);
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

        this.state = {
            display: Display.Home,
            scaleType: scaleType,
            scale: scale,
            octave: octave,
            volume: vol,
        };
    }

    render() {
        if (this.state.display === Display.Help) {
            const back = () => this.setState({ display: Display.Home });

            return <Help
                back={back}
            />
        }
        else if (this.state.display === Display.Play) {
            const exit = () => this.setState({ display: Display.Home });

            const octaves = [1, 2, 3, 4, 5, 6, 7]
                .map(octave => determineNotes(this.state.scale, this.state.scaleType, octave));
            
            let tonicButtonIndices: number[];

            if (this.state.scaleType.displayNoteBeforeTonic) {
                tonicButtonIndices = [ 1 ];

                if (this.state.scale.notes.length < 9) {
                    tonicButtonIndices.push(this.state.scale.notes.length + 1);
                }
            }
            else {
                tonicButtonIndices = [ 0 ];

                if (this.state.scale.notes.length < 10) {
                    tonicButtonIndices.push(this.state.scale.notes.length);
                }
            }

            const keyName = `${this.state.scale.name} ${this.state.scaleType.name}`;

            return <Player
                exit={exit}
                keyName={keyName}
                highlightButtons={tonicButtonIndices}
                octaves={octaves}
                initialScale={this.state.octave}
                volume={this.state.volume}
            />
        }
        else {
            const play = () => this.setState({ display: Display.Play });
            const help = () => this.setState({ display: Display.Help });

            const setScaleType = (scaleType: IScaleType) => {
                const scaleIndex = this.state.scaleType.scales.indexOf(this.state.scale);
                const newScale = scaleIndex >= 0 && scaleIndex < scaleType.scales.length
                    ? scaleType.scales[scaleIndex]
                    : scaleType.scales[0];

                sessionStorage.setItem(scaleTypeVarName, scaleType.name);

                this.setState({
                    scaleType: scaleType,
                    scale: newScale,
                });
            };

            const setScale = (scale: IScale) => {
                sessionStorage.setItem(scaleNoteVarName, scale.name);
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

            return <Site
                help={help}
                play={play}

                scaleType={this.state.scaleType}
                selectScaleType={setScaleType}

                scale={this.state.scale}
                selectScale={setScale}

                octave={this.state.octave}
                setOctave={setOctave}

                volume={this.state.volume}
                setVolume={setVolume}
            />
        }
    }
}

export default App;
