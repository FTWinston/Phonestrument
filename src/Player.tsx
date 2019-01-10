import React, { Component } from 'react';
import { NoteButton } from './NoteButton';
import { INote } from './Notes';
import './Player.css';
import { Audio } from './Audio';

interface IProps {
    exit: () => void;
    notes: INote[];
    volume: number;
    flip: boolean;
}

export class Player extends Component<IProps, {}> {
    private audio = new Audio();

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

        const notes = this.props.notes.map((note, index) => {
            const start = () => this.audio.start(note.frequency);
            const stop = () => this.audio.stop(note.frequency);

            return <NoteButton
                key={index}
                keycode={index + 49}
                text={note.name}
                octave={note.octave}
                start={start}
                stop={stop}
            />
        });

        const classes = this.props.flip
            ? 'player player--flipped'
            : 'player';

        return (
            <div className={classes}>
                <div className="player__notes">
                    {notes}
                </div>

                <a
                    className="player__back"
                    href="#"
                    onClick={backClicked}
                >
                    go back
                </a>
            </div>
        );
    }
}