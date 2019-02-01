import React, { Component } from 'react';
import { PlayerButton, ButtonType } from './PlayerButton';
import { INote } from './Notes';
import './Player.css';
import { Audio } from './Audio';

interface IProps {
    exit: () => void;

    keyName: string;
    octaves: INote[][];

    volume: number;
    
    highlightNoteName: string;
}

interface IState {
    noteColumns: INote[][];
}

export class Player extends Component<IProps, IState> {
    private audio = new Audio();

    constructor(props: IProps) {
        super(props);

        let midPoint = Math.ceil(props.octaves[0].length / 2);
        const lowFirst = props.octaves[0].slice(0, midPoint);
        const lowSecond = props.octaves[0].slice(midPoint);

        midPoint = Math.ceil(props.octaves[1].length / 2);
        const upperFirst = props.octaves[1].slice(0, midPoint);
        const upperSecond = props.octaves[1].slice(midPoint);

        this.state = {
            noteColumns: [
                lowFirst,
                upperFirst,
                upperSecond,
                lowSecond,
            ]
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

        const noteColumns = this.state.noteColumns.map((col, i) => {
            const buttons = this.renderNoteButtons(col, i === 0, i === 3);

            return <div className="player__notes" key={i}>
                {buttons}
            </div>
        });

        return (
            <div className="player">
                {noteColumns}

                <div className="player__middle">
                    <div className="player__key">{this.props.keyName}</div>

                    <a
                        className="player__back"
                        href="#"
                        onClick={backClicked}
                    >
                        Go back
                    </a>
                </div>
            </div>
        );
    }

    private renderNoteButtons(notes: INote[], isLeft: boolean, isRight: boolean) {
        const noteHeight = notes.length == 5
            ? undefined : 100 / notes.length;

        return notes.map((note, index) => {
            const start = () => this.audio.start(index, note.frequency);
            const stop = () => this.audio.stop(index);

            const type = note.name === this.props.highlightNoteName
                ? ButtonType.HighlightNote
                : ButtonType.Note;
        
            return <PlayerButton
                key={index}
                text={note.name}
                octave={note.octave}
                start={start}
                stop={stop}
                isLeft={isLeft}
                isRight={isRight}
                isTop={index === notes.length - 1}
                type={type}
                height={noteHeight}
            />
        });
    }
}