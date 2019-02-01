import React, { Component } from 'react';
import { PlayerButton, ButtonType } from './PlayerButton';
import { INote } from './Notes';
import './Player.css';
import { Audio } from './Audio';

interface IProps {
    exit: () => void;

    keyName: string;
    noteSets: INote[][];

    volume: number;
    
    highlightNoteName: string;
}

interface IState {
    notes: INote[];
    frontBackTilt: number | null;
    leftRightTilt: number | null;
}

export class Player extends Component<IProps, IState> {
    private audio = new Audio();

    constructor(props: IProps) {
        super(props);
        this.state = {
            notes: props.noteSets[0],
            frontBackTilt: null,
            leftRightTilt: null,
        };
    }

    async componentDidMount() {
        this.audio.setVolume(this.props.volume);

        if (!(document as any).fullscreenElement) {
            await document.documentElement.requestFullscreen();
            
            if (screen && screen.orientation && screen.orientation.lock) {
                await screen.orientation.lock('landscape'); // This causes an error in desktop Chrome, but never mind
            }
        }

        if ((window as any).DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', e => {
                this.setState({
                    frontBackTilt: e.beta,
                    leftRightTilt: e.gamma,
                });
            })
        }
    }

    componentWillUnmount() {
        this.audio.stopAll();

        if (document.exitFullscreen && (document as any).fullscreenElement) {
            document.exitFullscreen();
        }
    }

    componentDidUpdate(prevProps: IProps, prevState: {}) {
        if (this.props.volume !== prevProps.volume) {
            this.audio.setVolume(this.props.volume);
        }
    }

    render() {
        const backClicked = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            this.props.exit();
        };

        const noteButtons = this.renderNoteButtons(this.state.notes);

        return (
            <div className="player">
                {noteButtons}

                <div className="player__middle">
                    <div className="player__key">{this.props.keyName}</div>

                    <a
                        className="player__back"
                        href="#"
                        onClick={backClicked}
                    >
                        Go back
                    </a>

                    <div className="player__tilt">
                        front-back tilt: {this.state.frontBackTilt}
                    </div>

                    <div className="player__tilt">
                        left-right tilt: {this.state.leftRightTilt}
                    </div>
                </div>
            </div>
        );
    }

    static buttonOrder = [4, 3, 2, 1, 0, 9, 8, 7, 6, 5, 14, 13, 12, 11, 10, 19, 18, 17, 16, 15];

    private renderNoteButtons(notes: INote[]) {
        return notes.map((note, index) => {
            const start = () => this.audio.start(index, note.frequency);
            const stop = () => this.audio.stop(index);

            const type = note.name === this.props.highlightNoteName
                ? ButtonType.HighlightNote
                : ButtonType.Note;
        
            const order = index < Player.buttonOrder.length
                ? Player.buttonOrder[index]
                : undefined;

            return <PlayerButton
                key={index}
                text={note.name}
                octave={note.octave}
                orderNum={order}
                start={start}
                stop={stop}
                isLeft={index < 5}
                isRight={index >= 15}
                isTop={index % 5 === 4}
                type={type}
            />
        });
    }
}