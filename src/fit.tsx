import React, { CSSProperties, Component, createRef } from 'react';

interface ImageInfo {
  width?: number;
  height?: number;
  ratio: number;
}

interface FitImageProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  src: string;
}

interface FitImageState {
  imageInfo: ImageInfo;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
}

class FitImage extends Component<FitImageProps, FitImageState> {
  private container = createRef<HTMLDivElement>();
  private image = createRef<HTMLImageElement>();

  static defaultProps: Partial<FitImageProps> = {
    prefixCls: 'pansy-fit-image'
  }

  constructor(props: FitImageProps) {
    super(props);
    this.state = {
      imageInfo: {
        ratio: 0,
        width: 0,
        height: 0
      }
    }
  }

  componentDidMount() {
    this._loadImage();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillReceiveProps(props) {
    if (this.props.src !== props.src) {
      this._loadImage();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  _loadImage = () => {
    const image = this.image.current as HTMLImageElement;

    image.addEventListener('load', () => {
      const { width, height } = image;
      const ratio = width / height;

      this.setState({
        imageInfo: {
          width,
          height,
          ratio: ratio
        }
      });

      this.handleResize();
    });
  }

  getContainerDims() {
    const { clientHeight, clientWidth } = this.container.current;

    return {
      containerWidth: clientWidth,
      containerHeight: clientHeight,
    };
  }

  getWidthHeight = (length: number, ratio: number): number => {
    return ratio > 1 ? length / ratio : length * ratio;
  }

  handleResize = () => {
    const {
      imageInfo: { ratio, width, height }
    } = this.state;

    if (ratio) {
      const { containerWidth, containerHeight } = this.getContainerDims();
      const widthRatio = width / containerWidth;
      const heightRatio = height / containerWidth;

      // 宽度充满
      if (widthRatio > heightRatio) {
        const imageWidth = containerWidth;
        const imageHeight = this.getWidthHeight(containerWidth, ratio);
        const top = (containerHeight - imageHeight) / 2;

        this.setState({
          width: imageWidth,
          height: imageHeight,
          top,
          left: 0
        });

        return;
      }

      if (widthRatio < heightRatio) {
        const imageHeight = containerHeight;
        const imageWidth = this.getWidthHeight(containerHeight, ratio);
        const left = (containerWidth - imageWidth) / 2;

        this.setState({
          width: imageWidth,
          height: imageHeight,
          top: 0,
          left
        });

        return;
      }

      if (widthRatio === heightRatio) {
        this.setState({
          width: containerWidth,
          height: containerHeight,
          top: 0,
          left: 0
        });
      }
    }
  }

  render() {
    const { prefixCls, className, style, src } = this.props;
    const { imageInfo, ...rest } = this.state;

    const cls = [prefixCls, className];

    return (
      <div
        className={cls.join(' ').trim()}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          background: '#F5F5F5',
          display: 'inline-block',
          ...style
        }}
        ref={this.container}
      >
        <img
          src={src}
          style={{
            position: 'absolute',
            ...rest
          }}
          ref={this.image}
        />
      </div>
    )
  }
}

export default FitImage;
