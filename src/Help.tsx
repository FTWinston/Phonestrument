import React, { Component } from 'react';

interface IProps {
    back: () => void;
    flip: boolean;
}

export class Help extends Component<IProps, {}> {
    render() {
        const backClicked = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            this.props.back();
        };

        const mouthEdge = this.props.flip ? 'top' : 'bottom';

        return (
            <div className="site site--help">
                <header className="site__header">
                    <p>
                        How to play
                    </p>
                </header>

                <p>
                    To play your phone properly, follow these instructions after you click <em>play</em>...
                    <ol className="site__help">
                        <li>Hold your phone with the screen facing upwards.</li>
                        <li>Press the {mouthEdge} edge of the phone against your lips.</li>
                        <li>Rest the phone on your thumbs, with the fingers of each hand along the edges of the phone, so they can all touch the screen.</li>
                        <li>Push keys and make music!</li>
                    </ol>
                    If the buttons don't fit your hands easily, try calibrating.
                </p>
                
                <div className="site__links">
                    <a
                        className="site__link"
                        href="#"
                        onClick={backClicked}
                    >
                        Go back
                    </a>
                </div>
            </div>
        );
    }
}