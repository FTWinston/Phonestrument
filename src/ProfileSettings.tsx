import React, { Component } from 'react';
import { IScale, scaleTypes, IScaleType } from './Scales';
import './Site.css';

interface IProps {
    isAlternate: boolean;

    scaleType: IScaleType;
    selectScaleType: (scaleType: IScaleType) => void;

    scale: IScale;
    selectScale: (scale: IScale) => void;

    octave: number;
    setOctave: (octave: number) => void;

    volume: number;
    setVolume: (vol: number) => void;
}

export class ProfileSettings extends Component<IProps, {}> {
    render() {
        const selectedScaleTypeIndex = scaleTypes.indexOf(this.props.scaleType);
        const selectedScaleNoteIndex = this.props.scaleType.scales.indexOf(this.props.scale);

        const scaleTypeOptions = scaleTypes.map((scaleType, index) => <option key={index} value={index.toString()}>{scaleType.name}</option>);
        const scaleNoteOptions = this.props.scaleType.scales.map((scale, index) => <option key={index} value={index.toString()}>{scale.name}</option>);

        const selectScaleType = (e: React.ChangeEvent<HTMLSelectElement>) => this.props.selectScaleType(scaleTypes[e.target.selectedIndex],);
        const selectScale = (e: React.ChangeEvent<HTMLSelectElement>) => this.props.selectScale(this.props.scaleType.scales[e.target.selectedIndex]);
        const setOctave = (e: React.ChangeEvent<HTMLInputElement>) => this.props.setOctave(parseInt(e.target.value));
        const setVolume = (e: React.ChangeEvent<HTMLInputElement>) => this.props.setVolume(parseFloat(e.target.value));

        const classes = this.props.isAlternate
            ? 'site__options site__options--alternate'
            : 'site__options';

        return (
            <div className={classes}>
            
                <label className="site__option">
                    <span className="site__label">Scale</span>
                    <select
                        className="site__value"
                        value={selectedScaleTypeIndex.toString()}
                        onChange={selectScaleType}
                    >
                        {scaleTypeOptions}
                    </select>
                </label>

                <label className="site__option">
                    <span className="site__label">Tonic</span>
                    <select
                        className="site__value"
                        value={selectedScaleNoteIndex.toString()}
                        onChange={selectScale}
                    >
                        {scaleNoteOptions}
                    </select>
                </label>

                <label className="site__option">
                    <span className="site__label">Octave</span>
                    <input
                        className="site__value"
                        type="range"
                        min="1"
                        max="6"
                        step="1"
                        value={this.props.octave}
                        onChange={setOctave}
                    />
                </label>

                <label className="site__option">
                    <span className="site__label">Volume</span>
                    <input
                        className="site__value"
                        type="range"
                        min="0"
                        max="1"
                        step="0.025"
                        value={this.props.volume}
                        onChange={setVolume}
                    />
                </label>
            </div>
        );
    }
}