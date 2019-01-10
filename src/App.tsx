import React, { Component } from 'react';
import { Player } from './Player';
import { Site } from './Site';
import { IScale, scales } from './Notes';
import { Help } from './Help';

interface IState {
    playing: boolean;
    helping: boolean;
    scale: IScale;
    volume: number;
}

class App extends Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        
        // load saved settings, if present
        let scale = scales[0];

        const savedScale = sessionStorage.getItem('scale');
        if (savedScale !== null) {
            const match = scales.filter(s => s.name === savedScale);
            if (match.length > 0) {
                scale = match[0];
            }
        }

        let vol = 0.1;
        const savedVol = sessionStorage.getItem('volume');
        if (savedVol !== null) {
            const value = parseFloat(savedVol);
            if (value >= 0 && value <= 1) {
                vol = value;
            }
        }

        this.state = {
            playing: false,
            helping: false,
            scale: scale,
            volume: vol,
        };
    }

    render() {
        if (this.state.helping) {
            const back = () => this.setState({ playing: false, helping: false });

            return <Help
                back={back}
            />
        }
        else if (this.state.playing) {
            const exit = () => this.setState({ playing: false });

            return <Player
                exit={exit}
                notes={this.state.scale.notes}
                volume={this.state.volume}
            />
        }
        else {
            const play = () => this.setState({ playing: true, helping: false });
            const help = () => this.setState({ playing: false, helping: true });

            const setScale = (scale: IScale) => {
                sessionStorage.setItem('scale', scale.name);
                this.setState({ scale: scale });
            };

            const setVolume = (vol: number) => {
                sessionStorage.setItem('volume', vol.toString());
                this.setState({ volume: vol });
            };

            return <Site
                help={help}
                play={play}

                selectedScale={this.state.scale}
                selectScale={setScale}

                volume={this.state.volume}
                setVolume={setVolume}
            />
        }
    }
}

export default App;
