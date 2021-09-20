import React from 'react';

function EndpointLocation() {
  console.log('EndpointLocation');
  return (
    <h1
      style={{
        margin: 0,
        lineHeight: 1.15,
        fontSize: '4rem',
        textAlign: 'center',
      }}
    >
      GraphQL endpoint is located{' '}
      <a
        href="/api/graphql"
        style={{
          color: '#0070f3',
          textDecoration: 'none',
        }}
      >
        here
      </a>
    </h1>
  );
}

export default EndpointLocation;
