import React, { Component } from 'react';
import { IScale, scales } from './Notes';
import logo from './logo.svg';
import './Site.css';

interface IProps {
    play: () => void;
    selectedScale: IScale;
    selectScale: (scale: IScale) => void;
}

export class Site extends Component<IProps, {}> {
    render() {
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

                    <div className="site__links">
                        <a
                            className="site__link"
                            href="https://reactjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
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

                    <select
                        className="site__scale"
                        value={selectedScaleIndex.toString()}
                        onChange={selectScale}
                    >
                        {scaleOptions}
                    </select>
                </header>
            </div>
        );
    }
}