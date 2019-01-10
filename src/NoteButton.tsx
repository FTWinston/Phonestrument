import React, { PureComponent } from 'react';

interface IProps {
    text: string;
    octave: number;
    
    isLeft: boolean;
    height: number;
    topMargin: number;

    start: () => void;
    stop: () => void;

    keycode: number;
}

interface IState {
    active: boolean;
}

export class NoteButton extends PureComponent<IProps, IState> {
    private readonly keydown = (e: KeyboardEvent) => {
        if (e.which === this.props.keycode) {    
            this.setState({
                active: true,
            });
            this.props.start();
        }
    };
    private readonly keyup = (e: KeyboardEvent) => {
        if (e.which === this.props.keycode) {    
            this.setState({
                active: false,
            });
            this.props.stop();
        }
    };

    constructor(props: IProps) {
        super(props);

        this.state = {
            active: false,
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keydown);
        document.addEventListener('keyup', this.keyup);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keydown);
        document.removeEventListener('keyup', this.keyup);
    }

    render() {
        const touchStart = () => {
            this.setState({
                active: true,
            });
            this.props.start();
        };

        const touchEnd = () => {
            this.setState({
                active: false,
            });
            this.props.stop();
        };

        let classes = this.state.active
            ? 'player__note player__note--active'
            : 'player__note';

        classes += this.props.isLeft
            ? ' player__note--left'
            : ' player__note--right'

        const style = {
            height: `${this.props.height}vh`,
            marginTop: `${this.props.topMargin}vh`,
        };

        return (
            <div
                className={classes}
                style={style}
                onTouchStart={touchStart}
                onTouchEnd={touchEnd}
                onTouchCancel={touchEnd}
            >
                {this.props.text}<sub>{this.props.octave}</sub>
            </div>
        );
    }
}