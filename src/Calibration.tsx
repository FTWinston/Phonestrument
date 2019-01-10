import React, { Component } from 'react';
import './Calibration.css';

interface IProps {
    finish: (buttonSizes: number[], buttonOffsets: number[]) => void;
}

interface IState {
    numTouches: number;
}

interface ITouch {
    x: number;
    y: number;
}

export class Calibration extends Component<IProps, IState> {
    private timer: NodeJS.Timer | undefined;

    constructor(props: IProps) {
        super(props);

        this.state = {
            numTouches: 0,
        };
    }

    componentDidMount() {
        if (!(document as any).fullscreenElement) {
            document.documentElement.requestFullscreen();
        }
    }

    componentWillUnmount() {
        if (document.exitFullscreen && (document as any).fullscreenElement) {
            document.exitFullscreen();
        }
    }

    render() {
        const classes = `calibration calibration--num${this.state.numTouches}`;

        const text = this.state.numTouches > 0
            ? <p>{this.state.numTouches}</p>
            : <p>Hold the phone in position, and touch the screen with all 8 fingers in the positions that are most comfortable.
                <br/><br/>    
                Keep all 8 fingers touching the screen until the phone vibrates. Buttons will be placed where you put your fingers.
            </p>

        const touchChange = (e: React.TouchEvent) => {
            this.setState({
                numTouches: e.touches.length,
            });

            if (e.touches.length === 8) {
                const touches: ITouch[] = [];
                for (let i = 0; i<e.touches.length; i++) {
                    touches.push({
                        x: e.touches[i].pageX,
                        y: e.touches[i].pageY,
                    })
                }

                setTimeout(() => this.checkCalibration(touches), 3000);
            }
            else if (this.timer !== undefined) {
                clearTimeout(this.timer);
                this.timer = undefined;
            }
        };


        return <div
            className={classes}
            onTouchStart={touchChange}
            onTouchEnd={touchChange}
            onTouchCancel={touchChange}
        >
            {text}
        </div>
    }

    private checkCalibration(touches: ITouch[]) {
        if (this.state.numTouches !== 8) {
            return;
        }

        // separate touches into left 4 and right 4, and get their Y values, in view height units
        touches.sort((a,b) => (a.x > b.x) ? 1 : ((b.x > a.x) ? -1 : 0));

        const leftHalf = touches
            .slice(0, 4)
            .map(t => t.y * 100 / window.innerHeight)
            .sort();

        const rightHalf = touches
            .slice(4)
            .map(t => t.y * 100 / window.innerHeight)
            .sort();

        // decide where the midpoints between these buttons should be
        const leftEdges = [
            window.innerHeight,
            (leftHalf[3] + leftHalf[2]) / 2,
            (leftHalf[2] + leftHalf[1]) / 2,
            (leftHalf[1] + leftHalf[0]) / 2,
            0
        ];

        const rightEdges = [
            window.innerHeight,
            (rightHalf[3] + rightHalf[2]) / 2,
            (rightHalf[2] + rightHalf[1]) / 2,
            (rightHalf[1] + rightHalf[0]) / 2,
            0
        ];

        // then have the button heights match the distance between those
        const sizes = [
            leftEdges[1] - leftEdges[0],
            leftEdges[2] - leftEdges[1],
            leftEdges[3] - leftEdges[2],
            leftEdges[4] - leftEdges[3],

            rightEdges[1] - rightEdges[0],
            rightEdges[2] - rightEdges[1],
            rightEdges[3] - rightEdges[2],
            rightEdges[4] - rightEdges[3],
        ];

        // TODO: include some spacing, if we can!
        const offsets = [
            0, 0, 0, 0, 0, 0, 0, 0
        ];

        window.navigator.vibrate(100);

        this.props.finish(sizes, offsets);
    }
}