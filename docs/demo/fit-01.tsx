import React from 'react';
// @ts-ignore
import Image from '@pansy/react-image';

export default () => {
  return (
    <div style={{ width: 200, height: 300 }}>
      <Image.Fit
        src="https://aip.bdstatic.com/portal-pc-node/dist/1588235213450/images/technology/face/detect/demo-card-1.jpg"
      />
    </div>
  )
}
