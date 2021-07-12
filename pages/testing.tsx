import React, { useState } from 'react';

export default function ShowButtonHover() {
  const [style, setStyle] = useState({ display: 'none' });

  return (
    <div className="App">
      <h2>Hidden Button in the box. Move mouse in the box</h2>
      <div
        style={{ border: '1px solid gray', width: 300, height: 300, padding: 10, margin: 100 }}
        onMouseEnter={(e) => {
          setStyle({ display: 'block' });
        }}
        onMouseLeave={(e) => {
          setStyle({ display: 'none' });
        }}>
        <div style={style}>
          <div className="relative mx-2">
            <div className="bg-black text-white text-xs rounded py-1 px-4 right-0 bottom-full">
              Tooltip center
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
