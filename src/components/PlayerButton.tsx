import * as React from 'react';

interface IProps {
    text: string;
    octave: number;
    
    highlight?: boolean;
    altProfile: boolean;

    start: () => void;
    stop: () => void;
}

interface IState {
    active: boolean;
    text: string;
    octave: number;
    altProfile: boolean; // keep this in the state so buttons "remember" what they were while pressed when the profile switches
}

export class PlayerButton extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            active: false,
            text: props.text,
            octave: props.octave,
            altProfile: props.altProfile,
        };
    }

    componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.altProfile !== this.props.altProfile && !this.state.active) {
            this.setState({
                text: nextProps.text,
                octave: nextProps.octave,
                altProfile: nextProps.altProfile,
            });
        }
    }

    render() {
        const touchStart = () => {
                this.setState({
                    active: true,
                    text: this.props.text,
                    octave: this.props.octave,
                    altProfile: this.props.altProfile,
                });
                
                this.props.start();
            };

        const touchEnd = () => {
                this.setState({
                    active: false,
                    text: this.props.text,
                    octave: this.props.octave,
                    altProfile: this.props.altProfile,
                });

                this.props.stop();
            };

        let classes = 'player__button';
        
        if (this.state.active) {
            classes += ' player__button--active';
        }

        if (this.state.altProfile) {
            classes += ' player__button--altProfile';
        }

        if (this.props.highlight) {
            classes += ' player__button--highlight';
        }

        return (
            <div
                className={classes}
                onTouchStart={touchStart}
                onTouchEnd={touchEnd}
                onTouchCancel={touchEnd}
            >
                {this.state.text}<sub>{this.state.octave}</sub>
            </div>
        );
    }
}