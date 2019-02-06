import * as React from 'react';
import { PlayerButton, ButtonType } from './PlayerButton';
import { INote } from '../functionality/Notes';
import { Audio } from '../functionality/Audio';
import './Player.css';
import { Home, TiltLeft, TiltRight } from './Icons';

export interface IProfile {
    keyName: string;
    notes: INote[];

    volume: number;
    
    highlightNoteName: string;
}

interface IProps {
    exit: () => void;
    profiles: IProfile[];
}

interface IState extends IProfile {
    altProfile: boolean;
}

export class Player extends React.Component<IProps, IState> {
    private audio = new Audio();

    constructor(props: IProps) {
        super(props);
        this.state = {
            ...props.profiles[0],
            altProfile: false,
        };
    }

    private tiltListener = (e: DeviceOrientationEvent) => this.updateTilt(e);

    async componentDidMount() {
        this.audio.setVolume(this.state.volume); // TODO: change volume when configuration changes
         
        if (this.props.profiles.length > 1 && (window as any).DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', this.tiltListener);
        }
    }

    componentWillUnmount() {
        this.audio.stopAll();
         
        if (this.props.profiles.length > 1) {
            window.removeEventListener('deviceorientation', this.tiltListener);
        }
    }

    private updateTilt(e: DeviceOrientationEvent) {
        if (e.beta === null) {
            return;
        }

        // if showing first set and tilted right, switch to second set
        if (this.state.altProfile) {
            if (e.beta < 0) {
                this.setState({
                    ...this.props.profiles[0],
                    altProfile: false,
                });
            }
        }
        else {
            if (e.beta > 0) {
                this.setState({
                    ...this.props.profiles[1],
                    altProfile: true,
                });
            }
        }
    }

    render() {
        const backClicked = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            this.props.exit();
        };

        const noteButtons = this.renderNoteButtons(this.state.notes);

        const classes = this.state.altProfile
            ? 'player player--altProfile'
            : 'player';

        const tiltMessage = this.props.profiles.length < 2
            ? <div className="player__tilt" />
            : this.state.altProfile
                ? <div className="player__tilt"><div className="player__tiltMessage1"><TiltLeft /> Tilt left</div><div>for {this.props.profiles[0].keyName}</div></div>
                : <div className="player__tilt"><div className="player__tiltMessage1"><TiltRight />Tilt right</div><div>for {this.props.profiles[1].keyName}</div></div>

        return (
            <div className={classes}>
                {noteButtons}

                <div className="player__key">{this.state.keyName}</div>

                <a
                    className="player__back"
                    href="#"
                    onClick={backClicked}
                >
                    <Home /> Go back
                </a>

                {tiltMessage}
            </div>
        );
    }

    static buttonOrder = [4, 3, 2, 1, 0, 9, 8, 7, 6, 5, 14, 13, 12, 11, 10, 19, 18, 17, 16, 15];

    private renderNoteButtons(notes: INote[]) {
        return notes.map((note, index) => {
            const start = () => this.audio.start(index, note.frequency);
            const stop = () => this.audio.stop(index);

            const type = note.name === this.state.highlightNoteName
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
                altProfile={this.state.altProfile}
            />
        });
    }
}