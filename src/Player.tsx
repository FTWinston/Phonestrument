import React, { Component } from 'react';
import { PlayerButton, ButtonType } from './PlayerButton';
import { INote } from './Notes';
import './Player.css';
import { Audio } from './Audio';

interface IProps {
    exit: () => void;

    keyName: string;
    octaves: INote[][];
    initialScale: number;

    volume: number;
    
    highlightButtons: number[];
}

interface IState {
    notes: INote[];
}

export class Player extends Component<IProps, IState> {
    private audio = new Audio();

    constructor(props: IProps) {
        super(props);

        this.state = {
            notes: props.octaves[props.initialScale],
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

        const noteHeight = this.state.notes.length == 10
            ? undefined : 100 / Math.ceil(this.state.notes.length / 2);

        const lastLeft = this.state.notes.length / 2 - 1;

        const notes = this.state.notes.map((note, index) => {
            const start = () => this.audio.start(index, note.frequency);
            const stop = () => this.audio.stop(index);

            const type = this.props.highlightButtons.indexOf(index) === -1
                ? ButtonType.Note
                : ButtonType.HighlightNote;
        
            return <PlayerButton
                key={index}
                keycode={index == 9 ? 48 : index + 49}
                text={note.name}
                octave={note.octave}
                start={start}
                stop={stop}
                isLeft={index <= lastLeft}
                isTop={index === lastLeft || index === this.state.notes.length - 1}
                type={type}
                height={noteHeight}
            />
        });

        const currentIndex = this.props.octaves.indexOf(this.state.notes);

        const octaveUp = () => {
            this.setState({ notes: this.props.octaves[currentIndex + 1] });
        }

        const octaveDown = () => {
            this.setState({ notes: this.props.octaves[currentIndex - 1] });
        }
        
        const doNothing = () => { };

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
                        Go back
                    </a>

                    <div className="player__spacer" />

                    <PlayerButton
                        keycode={16}
                        text="Octave Up"
                        start={octaveUp}
                        stop={doNothing}
                        type={ButtonType.OctaveUp}
                        enabled={currentIndex < this.props.octaves.length - 1}
                    />

                    <PlayerButton
                        keycode={17}
                        text="Octave Down"
                        start={octaveDown}
                        stop={doNothing}
                        type={ButtonType.OctaveDown}
                        enabled={currentIndex > 0}
                    />
                </div>
            </div>
        );
    }
}