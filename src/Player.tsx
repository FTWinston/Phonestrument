import React, { Component } from 'react';
import { NoteButton } from './NoteButton';
import { INote } from './Notes';
import './Player.css';

interface IProps {
    exit: () => void;
    notes: INote[];
}

export class Player extends Component<IProps, {}> {
    componentDidMount() {
        if (!(document as any).fullscreenElement) {
            document.documentElement.requestFullscreen();
        }
    }

    componentWillUnmount() {
        if (document.exitFullscreen && (document as any).fullscreenElement) {
            document.exitFullscreen();
        }
    }

    render() {
        const backClicked = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            this.props.exit();
        };

        const notes = this.props.notes.map((note, index) =>
            <NoteButton
                key={index}
                pitch={note.pitch}
                text={note.name}
            />
        );

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