import React from 'react';

const DemoCard = ({ data, title }) => (
  <div style={{
    border: '1px solid black',
    borderRadius: '10px',
    display: 'inline-block',
    margin: '10px',
    padding: '10px'
  }}>
    <h1>
      {title}
    </h1>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

export default DemoCard;