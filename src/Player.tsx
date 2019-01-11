import React, { Component } from 'react';
import { PlayerButton, ButtonType } from './PlayerButton';
import { INote } from './Notes';
import './Player.css';
import { Audio } from './Audio';

interface IProps {
    exit: () => void;

    keyName: string;
    mainNotes: INote[];
    highNotes: INote[];
    lowNotes: INote[];

    volume: number;

    buttonLength: number;
    buttonSpacing: number;
    leftButtonOffset: number;
    rightButtonOffset: number;
}

interface IState {
    notes: INote[];
}

export class Player extends Component<IProps, IState> {
    private audio = new Audio();

    constructor(props: IProps) {
        super(props);

        this.state = {
            notes: props.mainNotes,
        };
    }

    componentDidMount() {
        this.audio.setVolume(this.props.volume);

        if (!(document as any).fullscreenElement) {
            document.documentElement.requestFullscreen();
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

        const notes = this.state.notes.map((note, index) => {
            const start = () => this.audio.start(index, note.frequency);
            const stop = () => this.audio.stop(index);

            const type = index === 0 || index === 9
                ? ButtonType.ExtraNote
                : ButtonType.Note;
        
            return <PlayerButton
                key={index}
                keycode={index == 9 ? 48 : index + 49}
                text={note.name}
                octave={note.octave}
                start={start}
                stop={stop}
                isLeft={index < 5}
                isTop={index === 4 || index === 9}
                type={type}
            />
        });
        
        const startUp = () => {
            this.setState({ notes: this.props.highNotes });
        }

        const startDown = () => {
            this.setState({ notes: this.props.lowNotes });
        }
        
        const stopUpDown = () => {
            this.setState({ notes: this.props.mainNotes });
        };

        return (
            <div className="player">
                <div className="player__notes">
                    {notes}
                </div>

                <div className="player__middle">
                    <div className="player__key">{this.props.keyName}</div>

                    <a
                        className="player__back"
                        href="#"
                        onClick={backClicked}
                    >
                        go back
                    </a>

                    <div className="player__spacer" />

                    <PlayerButton
                        keycode={16}
                        text="Octave Up"
                        start={startUp}
                        stop={stopUpDown}
                        type={ButtonType.OctaveUp}
                    />

                    <PlayerButton
                        keycode={17}
                        text="Octave Down"
                        start={startDown}
                        stop={stopUpDown}
                        type={ButtonType.OctaveDown}
                    />
                </div>
            </div>
        );
    }
}