import React, { PureComponent } from 'react';

interface IProps {
    pitch: number;
    text: string;
}

export class NoteButton extends PureComponent<IProps, {}> {
    render() {
        const touchStart = (e: React.TouchEvent<HTMLDivElement>) => {
            console.log(`playing at ${this.props.pitch} Hz`);
        };

        const touchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
            console.log(`stopping ${this.props.pitch} Hz`);
        };

        return (
            <div
                className="player__note"
                onTouchStart={touchStart}
                onTouchEnd={touchEnd}
                onTouchCancel={touchEnd}
            >
                {this.props.text}
            </div>
        );
    }
}