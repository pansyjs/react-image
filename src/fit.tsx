import React, { CSSProperties, Component, createRef } from 'react';

interface ImageInfo {
  width?: number;
  height?: number;
  ratio: number;
}

interface FitImageProps {
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
  private image  = createRef<HTMLImageElement>();

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
    const image = this.image.current as HTMLImageElement;
    window.addEventListener('resize', this.handleResize);

    image.addEventListener('load', () => {
      const { width, height } = image;
      const ratio = width / height;

      this.setState({
        imageInfo: {
          width,
          height,
          ratio: ratio > 1 ? ratio - 1 : ratio
        }
      });

      setTimeout(() => {
        this.handleResize();
      }, 0);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  getContainerDims() {
    const { clientHeight, clientWidth } = this.container.current;

    return {
      containerWidth: clientWidth,
      containerHeight: clientHeight,
    };
  }

  handleResize = () => {
    const {
      imageInfo: { ratio, width, height }
    } = this.state;

    console.log(this.state.imageInfo);

    if (ratio) {
      const { containerWidth, containerHeight } = this.getContainerDims();
      let containerRatio = containerWidth / containerHeight;
      containerRatio = containerRatio > 1 ? containerRatio - 1 : containerRatio;

      const widthRatio = width / containerWidth;
      const heightRatio = height / containerWidth;

      // 宽度充满
      if (widthRatio > heightRatio) {
        const imageWidth = containerWidth;
        const imageHeight = imageWidth * ratio;
        const top = (containerHeight - imageHeight) / 2;

        this.setState({
          width: containerWidth,
          height: imageHeight,
          top,
          left: 0
        });

        return;
      }

      if (widthRatio < heightRatio) {
        const imageHeight = containerHeight;
        const imageWidth = imageHeight * ratio;
        const left = (containerWidth - imageWidth) / 2;

        this.setState({
          width: containerWidth,
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
    const { className, style, src } = this.props;
    const { imageInfo, ...rest } = this.state;

    return (
      <div
        className={className}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          background: '#F5F5F5',
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
