import React, { FC } from 'react';
// @ts-ignore
import Image from '@pansy/react-image';

const Example: FC = () => {
  return (
    <Image.Fit
      style={{ width: 168, height: 104.7 }}
      src="https://aip.bdstatic.com/portal-pc-node/dist/1588235213450/images/technology/face/detect/demo-card-1.jpg"
    />
  )
}

export default Example;

