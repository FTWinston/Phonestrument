import React, { Component } from 'react';
import { IScale, scales } from './Notes';
import logo from './logo.svg';
import './Site.css';

interface IProps {
    play: () => void;
    help: () => void;
    selectedScale: IScale;
    selectScale: (scale: IScale) => void;
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

        return (
            <div className="site">
                <header className="site__header">
                    <img src={logo} className="site__logo" alt="logo" />
                    <p>
                        Use your phone like a musical instrument!
                    </p>
                </header>

                <div className="site__links">
                    <a
                        className="site__link"
                        href="#"
                        onClick={helpClicked}
                    >
                        Learn how
                    </a>
                    
                    <a
                        className="site__link"
                        href="#"
                        onClick={playClicked}
                    >
                        Play now
                    </a>
                </div>

                <div className="site__options">
                    <select
                        className="site__scale"
                        value={selectedScaleIndex.toString()}
                        onChange={selectScale}
                    >
                        {scaleOptions}
                    </select>
                </div>
            </div>
        );
    }
}