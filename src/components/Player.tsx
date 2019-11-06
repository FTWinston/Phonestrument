import * as React from 'react';
import { PlayerButton } from './PlayerButton';
import { INote } from '../functionality/Notes';
import { Audio } from '../functionality/Audio';
import './Player.css';
import { Configure, VolumeDown, VolumeUp, KeyUp, KeyDown, OctaveDown, OctaveUp, SwitchAlt, SwitchPrimary } from './Icons';
import { IVoice } from '../functionality/Voices';
import { useEffect, useMemo, useState } from 'react';

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

export const Player: React.FunctionComponent<IProps> = props => {
    const audio = useMemo(() => new Audio(), []);

    const [profile, setProfile] = useState(props.profiles[0]);
    
    /*
    const [volume, setVolume] = useState(profile.volume);

    const [voice, setVoice] = useState(profile.voice);
    */

    useEffect(() => {
        return () => audio.stopAll();
    }, []);

    useEffect(() => {
        audio.setVolume(profile.volume);
        audio.setVoice(profile.voice);
    }, [profile]);
    
    const configClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        props.configure();
    };

    const noteRows = profile.notes.map((row, index) => (
        <div className="player__noteRow" key={index}>
            {renderNoteButtons(audio, row)}
        </div>
    ))

    const altProfile = profile !== props.profiles[0];

    let classes = altProfile
        ? 'player player--altProfile'
        : 'player';

    classes += ` player--${profile.notes.length}rows`;

    const profileToggle = props.profiles.length < 2
        ? undefined
        : altProfile
            ? (
                <button className="playerSetting__button playerSetting__button--alt" onClick={() => setProfile(props.profiles[0])}>
                    <SwitchPrimary />
                </button>
            )
            : (
                <button className="playerSetting__button playerSetting__button--alt" onClick={() => setProfile(props.profiles[1])}>
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
                    <div className="playerSetting__name">{profile.keyName}</div>
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

function renderNoteButtons(audio: Audio, notes: INote[]) {
    return notes.map((note, index) => {
        const start = () => audio.start(index, note.frequency);
        const stop = () => audio.stop(index);

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