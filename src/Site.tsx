import React, { Component } from 'react';
import logo from './logo.svg';
import './Site.css';

interface IProps {
    play: () => void;
}

export class Site extends Component<IProps, {}> {
    render() {
        const playClicked = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            this.props.play();
        };

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
                </header>
            </div>
        );
    }
}