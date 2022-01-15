import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';
import { EventNodeWrapper } from './styles';

export default memo(({ data, isConnectable }) => {
  console.log(data)
  const { label } = data
  return (
    <>
      <EventNodeWrapper>
      <Handle
        type="target"
        position="left"
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div className="content">
        <span>{label}</span>
      </div>
      <Handle
        type="source"
        position="right"
        isConnectable={isConnectable}
      />
      </EventNodeWrapper>

    </>
  );
});
