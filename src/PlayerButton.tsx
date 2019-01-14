import React, { PureComponent } from 'react';

export enum ButtonType {
    Note,
    HighlightNote,
    OctaveDown,
    OctaveUp,
}

interface IProps {
    text: string;
    octave?: number;
    
    type: ButtonType;
    enabled?: boolean;
    isLeft?: boolean;
    isTop?: boolean;
    height?: number;

    start: () => void;
    stop: () => void;

    keycode: number;
}

interface IState {
    active: boolean;
}

export class PlayerButton extends PureComponent<IProps, IState> {
    private readonly keydown = (e: KeyboardEvent) => {
        if (e.which === this.props.keycode) {
            e.preventDefault();
            this.setState({
                active: true,
            });
            
            if (this.props.enabled === false) {
                return;
            }

            this.props.start();
        }
    };
    
    private readonly keyup = (e: KeyboardEvent) => {
        if (e.which === this.props.keycode) {
            e.preventDefault();
            this.setState({
                active: false,
            });
            
            if (this.props.enabled === false) {
                return;
            }

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
                
                if (this.props.enabled !== false) {
                    this.props.start();
                }
            };

        const touchEnd = () => {
                this.setState({
                    active: false,
                });

                if (this.props.enabled !== false) {
                    this.props.stop();
                }
            };

        let classes = this.state.active
            ? 'player__button player__button--active'
            : 'player__button';

        if (this.props.enabled === false) {
            classes += ' player__button--disabled';
        }

        if (this.props.type == ButtonType.Note || this.props.type == ButtonType.HighlightNote) {
            classes += this.props.isLeft
                ? ' player__button--left'
                : ' player__button--right';

            if (this.props.isTop) {
                classes += ' player__button--top';
            }
        }

        switch (this.props.type) {
            case ButtonType.HighlightNote:
                classes += ' player__button--highlight';
                break;
            case ButtonType.OctaveDown:
                classes += ' player__button--octaveDown';
                break;
            case ButtonType.OctaveUp:
                classes += ' player__button--octaveUp';
                break;
        }

        const octave = this.props.octave === undefined
            ? undefined
            : <sub>{this.props.octave}</sub>

        const style = this.props.height === undefined
            ? undefined
            : {
                height: `${this.props.height}vh`,
            };

        return (
            <div
                className={classes}
                style={style}
                onTouchStart={touchStart}
                onTouchEnd={touchEnd}
                onTouchCancel={touchEnd}
            >
                {this.props.text}{octave}
            </div>
        );
    }
}