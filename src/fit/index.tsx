import React, { CSSProperties, Component } from 'react';
import loadImage from '../utils/load-image';
import isModern from '../utils/is-modern';
import '../styles/fit.less';

interface FitImageProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  src: string;
  fit?: 'auto' | 'contain' | 'cover';
  background?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

interface FitImageState {
  status: States;
}

enum States {
  PENDING = 0,
  LOADING = 1,
  LOADED = 2,
  DEAD = 3
}

class FitImage extends Component<FitImageProps, FitImageState> {

  static defaultProps: Partial<FitImageProps> = {
    prefixCls: 'pansy-fit-image',
    fit: 'contain',
    background: true
  }

  constructor(props: FitImageProps) {
    super(props);
    this.state = {
      status: States.PENDING
    }
  }

  componentDidMount() {
    this._loadImage();
  }

  componentDidUpdate(props) {
    if (this.props.src !== props.src) {
      this._loadImage();
    }
  }

  async _loadImage() {
    this.setState({
      status: States.LOADING
    })

    try {
      await loadImage(this.props.src)
    } catch(err) {
      this._onLoadError()
    }

    this._onLoadSuccess()
  }

  _onLoadError() {
    this.setState({
      status: States.DEAD
    })

    this.props?.onError?.()
  }

  _onLoadSuccess() {
    this.setState({
      status: States.LOADED
    })

    this.props?.onLoad?.()
  }

  _getClassName(background: boolean): string {
    const { prefixCls, className, fit } = this.props;

    return [
      prefixCls,
      className,
      background ? `${prefixCls}-background` : null,
      `${prefixCls}-${fit}`
    ].filter(item => item).join(' ').trim();
  }

  render() {
    const { src, background } = this.props;

    if ( !background && isModern ) {
      return <img src={src} className={this._getClassName(false)} />
    }

    return (
      <div
        style={Object.assign({}, this.props.style, {backgroundImage: `url(${this.props.src})`})}
        className={this._getClassName(true)} />
    )
  }
}

export default FitImage;
