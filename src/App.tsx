import React, { Component } from 'react';
import { Player } from './Player';
import { Site } from './Site';
import { IScale, scales } from './Notes';

interface IState {
    playing: boolean;
    scale: IScale;
}

class App extends Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        
        this.state = {
            playing: false,
            scale: scales[0],
        };
    }

    render() {
        if (this.state.playing) {
            const exit = () => this.setState({ playing: false });
            return <Player exit={exit} notes={this.state.scale.notes} />
        }
        else {
            const play = () => this.setState({ playing: true });
            return <Site play={play} />
        }
    }
}

export default App;
