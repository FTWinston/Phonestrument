import React, { Component } from 'react';
import { Player } from './Player';
import { Site } from './Site';
import { IScale, scales } from './Notes';
import { Help } from './Help';
import { Calibration } from './Calibration';

enum Display {
    Home,
    Help,
    Play,
    Calibration,
}

interface IState {
    display: Display;

    scale: IScale;
    volume: number;
    flip: boolean;

    buttonSizes: number[];
    buttonOffsets: number[];
}

const scaleVarName = 'scale';
const volumeVarName = 'volume';
const flipVarName = 'flip';
const buttonOffsetsVarName = 'buttonOffsets';
const buttonSizesVarName = 'buttonSizes';

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

        let buttonSizes = [20, 20, 20, 20, 20, 20, 20, 20];
        const savedButtonSize = sessionStorage.getItem(buttonSizesVarName);
        if (savedButtonSize !== null) {
            buttonSizes = JSON.parse(savedButtonSize);
        }

        let buttonOffsets = [3, 3, 3, 3, 6, 3, 3, 3];
        const savedButtonOffsets = sessionStorage.getItem(buttonOffsetsVarName);
        if (savedButtonOffsets !== null) {
            buttonOffsets = JSON.parse(savedButtonOffsets);
        }

        this.state = {
            display: Display.Home,
            scale: scale,
            volume: vol,
            flip: flip,
            buttonSizes: buttonSizes,
            buttonOffsets: buttonOffsets,
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
        else if (this.state.display === Display.Calibration) {
            const calibrate = (buttonSizes: number[], buttonOffsets: number[]) => {
                sessionStorage.setItem(buttonSizesVarName, JSON.stringify(buttonSizes));
                sessionStorage.setItem(buttonOffsetsVarName, JSON.stringify(buttonOffsets));

                this.setState({
                    buttonSizes: buttonSizes,
                    buttonOffsets: buttonOffsets,
                    display: Display.Play, // jump straight to playing
                });
            };
            
            return <Calibration
                finish={calibrate}
            />
        }
        else {
            const play = () => this.setState({ display: Display.Play });
            const help = () => this.setState({ display: Display.Help });
            const calibrate = () => this.setState({ display: Display.Calibration });

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
                calibrate={calibrate}

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
