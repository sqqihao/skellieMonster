import React from 'react';
import './StatBar.css';

function StartBar( { percentage } ) {
    return (
      <div className="box">
        <div className="filler" style={{ width: `${percentage}%` }} />
      </div>
    )
};

export default StartBar;
