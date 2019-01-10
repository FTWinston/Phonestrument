import React, { Component } from 'react';
import { IScale, scales } from './Scales';
import logo from './logo.svg';
import './Site.css';

interface IProps {
    play: () => void;
    help: () => void;
    
    selectedScale: IScale;
    selectScale: (scale: IScale) => void;

    volume: number;
    setVolume: (vol: number) => void;

    flip: boolean;
    setFlip: (flip: boolean) => void;
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

        const selectedScaleIndex = scales.indexOf(this.props.selectedScale);
        const scaleOptions = scales.map((scale, index) => <option key={index} value={index.toString()}>{scale.name}</option>);
        const selectScale = (e: React.ChangeEvent<HTMLSelectElement>) => this.props.selectScale(scales[e.target.selectedIndex]);
        const setVolume = (e: React.ChangeEvent<HTMLInputElement>) => this.props.setVolume(parseFloat(e.target.value));
        const setFlip = (e: React.ChangeEvent<HTMLInputElement>) => this.props.setFlip(e.target.checked);

        return (
            <div className="site">
                <header className="site__header">
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
                        <span className="site__label">Key</span>
                        <select
                            className="site__value"
                            value={selectedScaleIndex.toString()}
                            onChange={selectScale}
                        >
                            {scaleOptions}
                        </select>
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

                    <label className="site__option">
                        <span className="site__label">Flip screen</span>
                        <input
                            className="site__value"
                            type="checkbox"
                            checked={this.props.flip}
                            onChange={setFlip}
                        />
                    </label>
                </div>
            </div>
        );
    }
}