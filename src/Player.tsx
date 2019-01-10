import React, { Component } from 'react';
import { NoteButton } from './NoteButton';
import { INote } from './Notes';
import './Player.css';
import { Audio } from './Audio';

interface IProps {
    exit: () => void;
    notes: INote[];
}

export class Player extends Component<IProps, {}> {
    private audio = new Audio();

    componentDidMount() {
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
                start={start}
                stop={stop}
            />
        });

        return (
            <div className="player">
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