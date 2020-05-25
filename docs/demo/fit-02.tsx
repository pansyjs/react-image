import React, { FC } from 'react';
// @ts-ignore
import Image from '@pansy/react-image';

const Example: FC = () => {
  return (
    <div style={{ width: 300, height: 200 }}>
      <Image.Fit
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589203931745&di=97c716bb81bf61f79a694c14a10ce3dd&imgtype=0&src=http%3A%2F%2Fwww.qnsb.com%2Ffzepaper%2Fsite1%2Fqnsb%2Fres%2F1%2F1%2F2008-01%2F29%2FB14%2Fres04_attpic_brief.jpg"
      />
    </div>
  )
}

export default Example;

