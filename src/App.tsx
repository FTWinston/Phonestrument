import React, { Component } from 'react';
import { Player, IProfile } from './Player';
import { Site } from './Site';
import { IScale, scaleTypes, IScaleType } from './Scales';
import { Help } from './Help';
import { octaves } from './Notes';
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

    useSplitProfile: boolean;

    scaleType2: IScaleType;
    scale2: IScale;
    octave2: number;
    volume2: number;
}

const splitVarName = 'useSplit';
const scaleTypeVarName = 'scaleType', scaleType2VarName = 'scaleType2';
const scaleNoteVarName = 'scaleNote', scaleNote2VarName = 'scaleNote2';
const octaveVarName = 'octave', octave2VarName = 'octave2';
const volumeVarName = 'volume', volume2VarName = 'volume2';
const playedBeforeVarName = 'hasPlayedBefore';

class App extends Component<{}, IState> {
    constructor(props: {}) {
        super(props);

        // load saved settings, if present
        const scaleType = this.loadScaleType(scaleTypeVarName);
        const scaleType2 = this.loadScaleType(scaleType2VarName);

        this.state = {
            display: sessionStorage.getItem(playedBeforeVarName) === null ? Display.Home : Display.Play,

            scaleType: scaleType,
            scale: this.loadScale(scaleType, scaleNoteVarName),
            octave: this.loadOctave(octaveVarName),
            volume: this.loadVolume(volumeVarName),

            useSplitProfile: this.loadUseSplit(splitVarName),

            scaleType2: scaleType2,
            scale2: this.loadScale(scaleType2, scaleNote2VarName),
            octave2: this.loadOctave(octave2VarName),
            volume2: this.loadVolume(volume2VarName),
        };
    }

    private loadScaleType(sessionVarName: string) {
        const savedScaleType = sessionStorage.getItem(sessionVarName);

        if (savedScaleType !== null) {
            const match = scaleTypes.filter(s => s.name === savedScaleType);
            if (match.length > 0) {
                return match[0];
            }
        }

        return scaleTypes[0];
    }

    private loadScale(scaleType: IScaleType, sessionVarName: string) {
        const savedScale = sessionStorage.getItem(sessionVarName);

        if (savedScale !== null) {
            const match = scaleType.scales.filter(s => s.name === savedScale);
            if (match.length > 0) {
                return match[0];
            }
        }
        
        return scaleType.scales.filter(s => s.name === 'C')[0];
    }

    private loadOctave(sessionVarName: string) {
        const savedOctave = sessionStorage.getItem(sessionVarName);

        if (savedOctave !== null) {
            const value = parseInt(savedOctave);
            if (value >= 0 && value < octaves.length) {
                return value;
            }
        }

        return 4;
    }

    private loadVolume(sessionVarName: string) {
        const savedVol = sessionStorage.getItem(sessionVarName);

        if (savedVol !== null) {
            const value = parseFloat(savedVol);
            if (value >= 0 && value <= 1) {
                return value;
            }
        }
        return 0.1;
    }

    private loadUseSplit(sessionVarName: string) {
        return sessionStorage.getItem(sessionVarName) === 'true';
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

            const profiles: IProfile[] = [
                {
                    notes: determineNotes(this.state.scale, this.state.scaleType, this.state.octave),
                    highlightNoteName: this.state.scale.name,
                    keyName: `${this.state.scale.name} ${this.state.scaleType.name}`,
                    volume: this.state.volume,
                }
            ];

            if (this.state.useSplitProfile) {
                profiles.push({
                        notes: determineNotes(this.state.scale2, this.state.scaleType2, this.state.octave2),
                        highlightNoteName: this.state.scale2.name,
                        keyName: `${this.state.scale2.name} ${this.state.scaleType2.name}`,
                        volume: this.state.volume2,
                });
            }

            return <Player
                exit={exit}
                profiles={profiles}
            />
        }
        else {
            const play = () => {
                sessionStorage.setItem(playedBeforeVarName, 'true');
                this.setState({ display: Display.Play });
            };
            const help = () => this.setState({ display: Display.Help });

            const setScaleType = (scaleType: IScaleType, isAlt: boolean) => {
                const scaleIndex = this.state.scaleType.scales.indexOf(isAlt ? this.state.scale2 : this.state.scale);
                const newScale = scaleIndex >= 0 && scaleIndex < scaleType.scales.length
                    ? scaleType.scales[scaleIndex]
                    : scaleType.scales[0];

                if (isAlt) {
                    sessionStorage.setItem(scaleType2VarName, scaleType.name);

                    this.setState({
                        scaleType2: scaleType,
                        scale2: newScale,
                    });
                }
                else {
                    sessionStorage.setItem(scaleTypeVarName, scaleType.name);

                    this.setState({
                        scaleType: scaleType,
                        scale: newScale,
                    });
                }
            };

            const setScale = (scale: IScale, isAlt: boolean) => {
                if (isAlt) {
                    sessionStorage.setItem(scaleNote2VarName, scale.name);
                    this.setState({ scale2: scale });
                }
                else {
                    sessionStorage.setItem(scaleNoteVarName, scale.name);
                    this.setState({ scale: scale });
                }
            };

            const setOctave = (octave: number, isAlt: boolean) => {
                if (isAlt) {
                    sessionStorage.setItem(octave2VarName, octave.toString());
                    this.setState({ octave2: octave });
                }
                else {
                    sessionStorage.setItem(octaveVarName, octave.toString());
                    this.setState({ octave: octave });
                }
            };

            const setVolume = (vol: number, isAlt: boolean) => {
                if (isAlt) {
                    sessionStorage.setItem(volume2VarName, vol.toString());
                    this.setState({ volume2: vol });
                }
                else {
                    sessionStorage.setItem(volumeVarName, vol.toString());
                    this.setState({ volume: vol });
                }
            };

            const setSplit = (useSplit: boolean) => {
                sessionStorage.setItem(splitVarName, useSplit.toString());
                this.setState({ useSplitProfile: useSplit });
            }

            return <Site
                help={help}
                play={play}

                useSplitProfile={this.state.useSplitProfile}
                setUseSplitProfile={setSplit}

                scaleType={this.state.scaleType}
                scaleType2={this.state.scaleType2}
                selectScaleType={setScaleType}

                scale={this.state.scale}
                scale2={this.state.scale2}
                selectScale={setScale}

                octave={this.state.octave}
                octave2={this.state.octave2}
                setOctave={setOctave}

                volume={this.state.volume}
                volume2={this.state.volume2}
                setVolume={setVolume}
            />
        }
    }
}

export default App;
