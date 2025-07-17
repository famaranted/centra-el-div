import React from 'react';

const Distractor = () => {
  return (
    <div style={{ 
      position: 'absolute', 
      top: '50%', 
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: '#001f3f',
      color: 'white',
      padding: '20px',
      borderRadius: '8px',
      zIndex: 100,
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
      textAlign: 'center'
    }}>
      <h2>¡Cuidado!</h2>
      <p>Este NO es el div que debes centrar</p>
      <p>Sigue buscando el div rojo</p>
    </div>
  );
};

export default Distractor;