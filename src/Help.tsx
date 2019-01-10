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
                        <li>Hold your phone in two hands, with the {mouthEdge} edge facing you.</li>
                        <li>Use both thumbs to push the keys on the screen.</li>
                        <li>That's it. Make some music!</li>
                    </ol>
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