import * as React from 'react';
import { IScale, IScaleType } from '../functionality/Scales';
import logo from './logo.svg';
import './Home.css';
import { ProfileSettings } from './ProfileSettings';

interface IProps {
    play: () => void;
    help: () => void;
    
    useSplitProfile: boolean;
    setUseSplitProfile: (use: boolean) => void;

    scaleType: IScaleType;
    scaleType2: IScaleType;
    selectScaleType: (scaleType: IScaleType, isAlt: boolean) => void;

    scale: IScale;
    scale2: IScale;
    selectScale: (scale: IScale, isAlt: boolean) => void;

    octave: number;
    octave2: number;
    setOctave: (octave: number, isAlt: boolean) => void;

    volume: number;
    volume2: number;
    setVolume: (vol: number, isAlt: boolean) => void;
}

export class Home extends React.Component<IProps, {}> {
    render() {
        const helpClicked = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            this.props.help();
        };

        const playClicked = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            this.props.play();
        };

        const selectPrimaryScaleType = (scaleType: IScaleType) => this.props.selectScaleType(scaleType, false);
        const selectPrimaryScale = (scale: IScale) => this.props.selectScale(scale, false);
        const setPrimaryOctave = (octave: number) => this.props.setOctave(octave, false);
        const setPrimaryVolume = (volume: number) => this.props.setVolume(volume, false);

        const switchSplitProfile = (e: React.ChangeEvent<HTMLInputElement>) => this.props.setUseSplitProfile(e.target.checked);

        const selectAlternateScaleType = (scaleType: IScaleType) => this.props.selectScaleType(scaleType, true);
        const selectAlternateScale = (scale: IScale) => this.props.selectScale(scale, true);
        const setAlternateOctave = (octave: number) => this.props.setOctave(octave, true);
        const setAlternateVolume = (volume: number) => this.props.setVolume(volume, true);

        const alternateSettings = this.props.useSplitProfile
            ? <ProfileSettings
                isAlternate={true}
                scaleType={this.props.scaleType2}
                scale={this.props.scale2}
                octave={this.props.octave2}
                volume={this.props.volume2}

                selectScaleType={selectAlternateScaleType}
                selectScale={selectAlternateScale}
                setOctave={setAlternateOctave}
                setVolume={setAlternateVolume}
            />
            : undefined;

        return (
            <div className="site">
                <header className="site__header">
                    <h2 className="site__title">Thumbophone</h2>
                    <img src={logo} className="site__logo" alt="logo" />
                    <p>
                        Use your phone as a musical instrument!
                    </p>
                </header>

                <div className="site__links">
                    <a
                        className="site__link"
                        href="#"
                        onClick={helpClicked}
                    >
                        Instructions
                    </a>
                    
                    <a
                        className="site__link site__link--primary"
                        href="#"
                        onClick={playClicked}
                    >
                        Play now
                    </a>
                </div>

                <ProfileSettings
                    isAlternate={false}
                    scaleType={this.props.scaleType}
                    scale={this.props.scale}
                    octave={this.props.octave}
                    volume={this.props.volume}

                    selectScaleType={selectPrimaryScaleType}
                    selectScale={selectPrimaryScale}
                    setOctave={setPrimaryOctave}
                    setVolume={setPrimaryVolume}
                />

                <label className="site__useAlt">
                    Tilt screen for alternate configuration
                    <input
                        type="checkbox"
                        checked={this.props.useSplitProfile}
                        onChange={switchSplitProfile}
                    />
                </label>

                {alternateSettings}
            </div>
        );
    }
}