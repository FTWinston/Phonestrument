import * as React from 'react';
import { PlayerButton } from './PlayerButton';
import { INote } from '../functionality/Notes';
import { Audio } from '../functionality/Audio';
import './Player.css';
import { Configure, VolumeDown, VolumeUp, KeyUp, KeyDown, OctaveDown, OctaveUp, SwitchAlt, SwitchPrimary } from './Icons';
import { IVoice } from '../functionality/Voices';

export interface IProfile {
    keyName: string;
    notes: Array<INote[]>;

    volume: number;
    
    voice: IVoice;
    
    highlightNoteName: string;
}

interface IProps {
    goHome: () => void;
    configure: () => void;
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

    async componentDidMount() {
        this.audio.setVolume(this.state.volume);
        this.audio.setVoice(this.state.voice);
    }

    componentWillUnmount() {
        this.audio.stopAll();
    }

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        if (prevState.volume !== this.state.volume) {
            this.audio.setVolume(this.state.volume);
        }

        if (prevState.voice !== this.state.voice) {
            this.audio.setVoice(this.state.voice);
        }
    }

    render() {
        const configClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            this.props.configure();
        };

        const noteRows = this.state.notes.map((row, index) => (
            <div className="player__noteRow" key={index}>
                {this.renderNoteButtons(row)}
            </div>
        ))

        let classes = this.state.altProfile
            ? 'player player--altProfile'
            : 'player';

        classes += ` player--${this.state.notes.length}rows`;

        const profileToggle = this.props.profiles.length < 2
            ? undefined
            : this.state.altProfile
                ? (
                    <button className="playerSetting__button playerSetting__button--alt" onClick={() => this.setState({ ...this.props.profiles[0], altProfile: false })}>
                        <SwitchPrimary />
                    </button>
                )
                : (
                    <button className="playerSetting__button playerSetting__button--alt" onClick={() => this.setState({ ...this.props.profiles[1], altProfile: true })}>
                        <SwitchAlt />
                    </button>
                )

        return (
            <div className={classes}>
                <div className="player__settings">
                    <div className="playerSetting">
                        <div className="playerSetting__name">Octave</div>
                        <button className="playerSetting__button">
                            <OctaveUp />
                        </button>
                        <button className="playerSetting__button">
                            <OctaveDown />
                        </button>
                    </div>

                    <div className="playerSetting">
                        <div className="playerSetting__name">Volume</div>
                        <button className="playerSetting__button">
                            <VolumeUp />
                        </button>
                        <button className="playerSetting__button">
                            <VolumeDown />
                        </button>
                    </div>

                    <div className="playerSetting">
                        <div className="playerSetting__name">{this.state.keyName}</div>
                        <button className="playerSetting__button">
                            <KeyUp />
                        </button>
                        <button className="playerSetting__button">
                            <KeyDown />
                        </button>
                    </div>

                    <div className="playerSetting">
                        <div className="playerSetting__name">Configure</div>
                        
                        <button className="playerSetting__button" onClick={configClicked}>
                            <Configure />
                        </button>

                        {profileToggle}
                    </div>
                </div>
                
                <div className="player__notes">
                    {noteRows}
                </div>
            </div>
        );
    }

    private renderNoteButtons(notes: INote[]) {
        return notes.map((note, index) => {
            const start = () => this.audio.start(index, note.frequency);
            const stop = () => this.audio.stop(index);
    
            return <PlayerButton
                key={index}
                text={note.name}
                octave={note.octave}
                start={start}
                stop={stop}
                highlight={note.name === this.state.highlightNoteName}
                altProfile={this.state.altProfile}
            />
        });
    }
}