import React from 'react';

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: '#0a0a0a', 
      color: '#777', 
      textAlign: 'center', 
      padding: '1.2rem', 
      position: 'fixed', 
      width: '100%', 
      bottom: 0, 
      left: 0,
      borderTop: '2px solid #3d2314',
      fontSize: '0.85rem'
    }}>
      <p style={{ margin: 0, letterSpacing: '1px' }}>
        &copy; 2026 CASINO ROYAL. Juegue con responsabilidad. Sólo para mayores de 18 años. 🎩✨
      </p>
    </footer>
  );
};

export default Footer;