import React, { Component } from 'react';
import { IScale, scaleTypes, IScaleType } from './Scales';
import logo from './logo.svg';
import './Site.css';

interface IProps {
    play: () => void;
    help: () => void;
    
    scaleType: IScaleType;
    selectScaleType: (scaleType: IScaleType) => void;

    scale: IScale;
    selectScale: (scale: IScale) => void;

    octave: number;
    setOctave: (octave: number) => void;

    volume: number;
    setVolume: (vol: number) => void;
}

export class Site extends Component<IProps, {}> {
    render() {
        const helpClicked = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            this.props.help();
        };

        const playClicked = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            this.props.play();
        };

        const selectedScaleTypeIndex = scaleTypes.indexOf(this.props.scaleType);
        const selectedScaleNoteIndex = this.props.scaleType.scales.indexOf(this.props.scale);

        const scaleTypeOptions = scaleTypes.map((scaleType, index) => <option key={index} value={index.toString()}>{scaleType.name}</option>);
        const scaleNoteOptions = this.props.scaleType.scales.map((scale, index) => <option key={index} value={index.toString()}>{scale.name}</option>);

        const selectScaleType = (e: React.ChangeEvent<HTMLSelectElement>) => this.props.selectScaleType(scaleTypes[e.target.selectedIndex]);
        const selectScale = (e: React.ChangeEvent<HTMLSelectElement>) => this.props.selectScale(this.props.scaleType.scales[e.target.selectedIndex]);
        const setOctave = (e: React.ChangeEvent<HTMLInputElement>) => this.props.setOctave(parseInt(e.target.value));
        const setVolume = (e: React.ChangeEvent<HTMLInputElement>) => this.props.setVolume(parseFloat(e.target.value));

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

                <div className="site__options">
                
                    <label className="site__option">
                        <span className="site__label">Scale</span>
                        <select
                            className="site__value"
                            value={selectedScaleTypeIndex.toString()}
                            onChange={selectScaleType}
                        >
                            {scaleTypeOptions}
                        </select>
                    </label>

                    <label className="site__option">
                        <span className="site__label">Tonic</span>
                        <select
                            className="site__value"
                            value={selectedScaleNoteIndex.toString()}
                            onChange={selectScale}
                        >
                            {scaleNoteOptions}
                        </select>
                    </label>

                    <label className="site__option">
                        <span className="site__label">Octave</span>
                        <input
                            className="site__value"
                            type="range"
                            min="1"
                            max="6"
                            step="1"
                            value={this.props.octave}
                            onChange={setOctave}
                        />
                    </label>

                    <label className="site__option">
                        <span className="site__label">Volume</span>
                        <input
                            className="site__value"
                            type="range"
                            min="0"
                            max="1"
                            step="0.025"
                            value={this.props.volume}
                            onChange={setVolume}
                        />
                    </label>
                </div>
            </div>
        );
    }
}