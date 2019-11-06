import * as React from 'react';
import logo from './logo.svg';
import './Home.css';
import { Help, Play, Configure } from './Icons';

interface IProps {
    play: () => void;
    configure: () => void;
    help: () => void;
}

export const Home: React.FunctionComponent<IProps> = props => {
    const helpClicked = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        props.help();
    };

    const playClicked = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        props.play();
    };

    const configureClicked = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        props.configure();
    };

    return (
        <div className="site site--home">
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
                    <Help /> Instructions
                </a>
                
                <a
                    className="site__link"
                    href="#"
                    onClick={configureClicked}
                >
                    <Configure /> Configure
                </a>

                <a
                    className="site__link site__link--primary"
                    href="#"
                    onClick={playClicked}
                >
                    <Play /> Play now
                </a>
            </div>
        </div>
    );
}