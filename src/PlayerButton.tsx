import React, { PureComponent } from 'react';

export enum ButtonType {
    Note,
    HighlightNote,
}

interface IProps {
    text: string;
    octave: number;
    
    orderNum?: number;
    type: ButtonType;
    enabled?: boolean;
    isLeft?: boolean;
    isRight?: boolean;    
    isTop?: boolean;

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

export class PlayerButton extends PureComponent<IProps, IState> {
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
                
                if (this.props.enabled !== false) {
                    this.props.start();
                }
            };

        const touchEnd = () => {
                this.setState({
                    active: false,
                    text: this.props.text,
                    octave: this.props.octave,
                    altProfile: this.props.altProfile,
                });

                if (this.props.enabled !== false) {
                    this.props.stop();
                }
            };

        let classes = 'player__button';
        
        if (this.state.active) {
            classes += ' player__button--active';
        }

        if (this.state.altProfile) {
            classes += ' player__button--altProfile';
        }

        if (this.props.enabled === false) {
            classes += ' player__button--disabled';
        }

        if (this.props.type == ButtonType.Note || this.props.type == ButtonType.HighlightNote) {
            if (this.props.isLeft) {
                classes += ' player__button--left';
            }
            if (this.props.isRight) {
                classes += ' player__button--right';
            }
            if (this.props.isTop) {
                classes += ' player__button--top';
            }
        }

        switch (this.props.type) {
            case ButtonType.HighlightNote:
                classes += ' player__button--highlight';
                break;
        }

        const style = this.props.orderNum === undefined
            ? undefined
            : {
                order: this.props.orderNum,
            };

        return (
            <div
                className={classes}
                style={style}
                onTouchStart={touchStart}
                onTouchEnd={touchEnd}
                onTouchCancel={touchEnd}
            >
                {this.state.text}<sub>{this.state.octave}</sub>
            </div>
        );
    }
}