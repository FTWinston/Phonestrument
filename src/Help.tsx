import React, { Component } from 'react';

interface IProps {
    back: () => void;
}

export class Help extends Component<IProps, {}> {
    render() {
        const backClicked = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            this.props.back();
        };

        return (
            <div className="site site--help">
                <header className="site__header">
                    <p>
                        How to play
                    </p>
                </header>

                <div className="site__help">
                    Here's some basic insructions on how to hold your phone in the intended way while playing....<br/>
                    If another way works better for you, do that instead!
                    <ol>
                        <li>Hold your phone in "portrait" oreientation, using two hands, with the bottom edge facing you.</li>
                        <li>Use both thumbs to push the keys on the screen.</li>
                        <li>That's it. Make some music!</li>
                    </ol>
                </div>
                
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