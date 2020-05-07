import React, { Component, CSSProperties } from 'react';
import FitImage from './fit';

export interface ImageProps {
  prefixCls?: string;
  className?: string;
  wrapClassName?: string;
  style?: CSSProperties;
  src?: string;
}

interface ImageState {
  loaded: boolean;
  size?: {
    width: number;
    height: number;
  };
}

class Image extends Component<ImageProps, ImageState> {
  public imageRef: HTMLImageElement | null = null;

  static Fit: typeof FitImage;

  constructor(props: ImageProps) {
    super(props);
    this.state = {
      loaded: false,
      size: undefined,
    };
  }

  saveImageRef = (node: HTMLImageElement): void => {
    this.imageRef = node;
  }

  render() {
    return (
      <div>
        <div>
          <img ref={this.saveImageRef} />
        </div>
      </div>
    )
  }

}

export default Image;
