import * as React from 'react';
import { Player, IProfile } from './Player';
import { Home } from './Home';
import { IScale, scaleTypes, IScaleType } from '../functionality/Scales';
import { Help } from './Help';
import { octaves } from '../functionality/Notes';
import { determineNotes } from '../functionality/determineNotes';
import './App.css';
import { Configuration } from './Configuration';
import { IVoice, voices } from '../functionality/Voices';

enum Display {
    Home,
    Help,
    Play,
    Config,
}

interface IState {
    display: Display;
    installPrompt?: Event;

    scaleType: IScaleType;
    scale: IScale;
    octave: number;
    volume: number;
    voice: IVoice;

    useSplitProfile: boolean;

    scaleType2: IScaleType;
    scale2: IScale;
    octave2: number;
    volume2: number;
    voice2: IVoice;
}

const splitVarName = 'useSplit';
const scaleTypeVarName = 'scaleType', scaleType2VarName = 'scaleType2';
const scaleNoteVarName = 'scaleNote', scaleNote2VarName = 'scaleNote2';
const octaveVarName = 'octave', octave2VarName = 'octave2';
const volumeVarName = 'volume', volume2VarName = 'volume2';
const voiceVarName = 'voice', voice2VarName = 'voice2';
const playedBeforeVarName = 'hasPlayedBefore';

class App extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);

        // load saved settings, if present
        const scaleType = this.loadScaleType(scaleTypeVarName);
        const scaleType2 = this.loadScaleType(scaleType2VarName);

        this.state = {
            display: localStorage.getItem(playedBeforeVarName) === null ? Display.Home : Display.Play,

            scaleType: scaleType,
            scale: this.loadScale(scaleType, scaleNoteVarName),
            octave: this.loadOctave(octaveVarName),
            volume: this.loadVolume(volumeVarName),
            voice: this.loadVoice(voiceVarName),

            useSplitProfile: this.loadUseSplit(splitVarName),

            scaleType2: scaleType2,
            scale2: this.loadScale(scaleType2, scaleNote2VarName),
            octave2: this.loadOctave(octave2VarName),
            volume2: this.loadVolume(volume2VarName),
            voice2: this.loadVoice(voice2VarName),
        };
    }

    componentDidMount() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.setState({
                installPrompt: e,
            });
        });

        window.addEventListener('appinstalled', (evt) => {
            this.setState({
                installPrompt: undefined,
            });
        });
    }

    private loadScaleType(sessionVarName: string) {
        const savedScaleType = localStorage.getItem(sessionVarName);

        if (savedScaleType !== null) {
            const match = scaleTypes.filter(s => s.name === savedScaleType);
            if (match.length > 0) {
                return match[0];
            }
        }

        return scaleTypes[0];
    }

    private loadScale(scaleType: IScaleType, sessionVarName: string) {
        const savedScale = localStorage.getItem(sessionVarName);

        if (savedScale !== null) {
            const match = scaleType.scales.filter(s => s.name === savedScale);
            if (match.length > 0) {
                return match[0];
            }
        }
        
        return scaleType.scales.filter(s => s.name === 'C')[0];
    }

    private loadOctave(sessionVarName: string) {
        const savedOctave = localStorage.getItem(sessionVarName);

        if (savedOctave !== null) {
            const value = parseInt(savedOctave);
            if (value >= 0 && value < octaves.length) {
                return value;
            }
        }

        return 4;
    }

    private loadVolume(sessionVarName: string) {
        const savedVol = localStorage.getItem(sessionVarName);

        if (savedVol !== null) {
            const value = parseFloat(savedVol);
            if (value >= 0 && value <= 1) {
                return value;
            }
        }

        return 0.1;
    }

    private loadVoice(sessionVarName: string) {
        const savedVoiceName = localStorage.getItem(sessionVarName);

        if (savedVoiceName !== null) {
            const voice = voices.find(v => v.name === savedVoiceName);
            
            if (voice !== undefined) {
                return voice;
            }
        }

        return voices[0];
    }

    private loadUseSplit(sessionVarName: string) {
        return localStorage.getItem(sessionVarName) === 'true';
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
            const configure = () => this.setState({ display: Display.Config });

            const profiles: IProfile[] = [
                {
                    notes: [
                        determineNotes(this.state.scale, this.state.scaleType, this.state.octave),
                        determineNotes(this.state.scale, this.state.scaleType, this.state.octave + 1)
                    ],
                    highlightNoteName: this.state.scale.name,
                    keyName: `${this.state.scale.name} ${this.state.scaleType.name}`,
                    volume: this.state.volume,
                    voice: this.state.voice,
                }
            ];

            if (this.state.useSplitProfile) {
                profiles.push({
                    notes: [
                        determineNotes(this.state.scale2, this.state.scaleType2, this.state.octave2),
                        determineNotes(this.state.scale2, this.state.scaleType2, this.state.octave2 + 1)
                    ],
                    highlightNoteName: this.state.scale2.name,
                    keyName: `${this.state.scale2.name} ${this.state.scaleType2.name}`,
                    volume: this.state.volume2,
                    voice: this.state.voice2,
                });
            }

            return <Player
                goHome={exit}
                configure={configure}
                profiles={profiles}
            />
        }
        else if (this.state.display === Display.Config) {
            const play = () => {
                localStorage.setItem(playedBeforeVarName, 'true');
                this.setState({ display: Display.Play });
            };
            const back = () => this.setState({ display: Display.Home });

            const install = this.state.installPrompt === undefined
                ? undefined
                : () => (this.state.installPrompt as any).prompt();

            const setScaleType = (scaleType: IScaleType, isAlt: boolean) => {
                const scaleIndex = this.state.scaleType.scales.indexOf(isAlt ? this.state.scale2 : this.state.scale);
                const newScale = scaleIndex >= 0 && scaleIndex < scaleType.scales.length
                    ? scaleType.scales[scaleIndex]
                    : scaleType.scales[0];

                if (isAlt) {
                    localStorage.setItem(scaleType2VarName, scaleType.name);

                    this.setState({
                        scaleType2: scaleType,
                        scale2: newScale,
                    });
                }
                else {
                    localStorage.setItem(scaleTypeVarName, scaleType.name);

                    this.setState({
                        scaleType: scaleType,
                        scale: newScale,
                    });
                }
            };

            const setScale = (scale: IScale, isAlt: boolean) => {
                if (isAlt) {
                    localStorage.setItem(scaleNote2VarName, scale.name);
                    this.setState({ scale2: scale });
                }
                else {
                    localStorage.setItem(scaleNoteVarName, scale.name);
                    this.setState({ scale: scale });
                }
            };

            const setOctave = (octave: number, isAlt: boolean) => {
                if (isAlt) {
                    localStorage.setItem(octave2VarName, octave.toString());
                    this.setState({ octave2: octave });
                }
                else {
                    localStorage.setItem(octaveVarName, octave.toString());
                    this.setState({ octave: octave });
                }
            };

            const setVolume = (vol: number, isAlt: boolean) => {
                if (isAlt) {
                    localStorage.setItem(volume2VarName, vol.toString());
                    this.setState({ volume2: vol });
                }
                else {
                    localStorage.setItem(volumeVarName, vol.toString());
                    this.setState({ volume: vol });
                }
            };

            const setVoice = (voice: IVoice, isAlt: boolean) => {
                if (isAlt) {
                    localStorage.setItem(voice2VarName, voice.name);
                    this.setState({ voice2: voice });
                }
                else {
                    localStorage.setItem(voiceVarName, voice.name);
                    this.setState({ voice: voice });
                }
            };

            const setSplit = (useSplit: boolean) => {
                localStorage.setItem(splitVarName, useSplit.toString());
                this.setState({ useSplitProfile: useSplit });
            }

            return <Configuration
                play={play}
                back={back}
                install={install}

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

                voice={this.state.voice}
                voice2={this.state.voice2}
                setVoice={setVoice}
            />
        }
        else {
            const play = () => {
                localStorage.setItem(playedBeforeVarName, 'true');
                this.setState({ display: Display.Play });
            };
            const configure = () => this.setState({ display: Display.Config });
            const help = () => this.setState({ display: Display.Help });

            return <Home
                help={help}
                play={play}
                configure={configure}
            />
        }
    }
}

export default App;
