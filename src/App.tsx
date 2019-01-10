import React, { Component } from 'react';
import { Player } from './Player';
import { Site } from './Site';
import { IScale, scales } from './Notes';
import { Help } from './Help';

interface IState {
    playing: boolean;
    helping: boolean;
    scale: IScale;
}

class App extends Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        
        this.state = {
            playing: false,
            helping: false,
            scale: scales[0],
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
            />
        }
        else {
            const play = () => this.setState({ playing: true, helping: false });
            const help = () => this.setState({ playing: false, helping: true });
            const setScale = (scale: IScale) => { console.log('selected scale', scale); this.setState({ scale: scale }) };

            return <Site
                help={help}
                play={play}
                selectedScale={this.state.scale}
                selectScale={setScale}
            />
        }
    }
}

export default App;
