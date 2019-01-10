import React, { Component } from 'react';
import { Player } from './Player';
import { Site } from './Site';
import { IScale, scales } from './Scales';
import { Help } from './Help';

enum Display {
    Home,
    Help,
    Play,
}

interface IState {
    display: Display;

    scale: IScale;
    volume: number;
    flip: boolean;
}

const scaleVarName = 'scale';
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

            return <Player
                exit={exit}
                notes={this.state.scale.notes}
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

                volume={this.state.volume}
                setVolume={setVolume}

                flip={this.state.flip}
                setFlip={setFlip}
            />
        }
    }
}

export default App;
