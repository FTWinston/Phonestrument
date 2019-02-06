import * as React from 'react';

interface IProps {
    back: () => void;
}

export class Help extends React.Component<IProps, {}> {
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
                    <p>
                        The thumbophone is intended to be played on a mobile phone or similar-sized device, held in two hands.
                        Use your left thumb for the keys on the left-hand side of the screen, and your right thumb for the keys on the right.
                    </p>
                    <p>
                        The thumbophone <em>does not</em> give you access to all notes; it only lets you use notes in the selected scale. (However you can select a chromatic scale if you wish.)
                        This is similar to how most harmonicas work, except with the thumbophone, you can quickly change the scale.
                    </p>
                    <p>
                        When you first start playing, it's easiest if you ignore the smaller buttons on the outermost columns, and just use the central two columns of buttons.
                        Once you feel comfortable with these, move on to using the outer buttons as needed.
                    </p>
                    <p>
                        For advanced users, you can enable an "alternate" configuration and tilt your phone left/right to switch between configurations while playing.
                        This can be quite offputting for new players.
                    </p>
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