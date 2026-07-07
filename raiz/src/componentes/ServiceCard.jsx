import React from 'react';

const ServiceCard = ({ title, description }) => {
  return (
    <div style={{ 
      background: 'linear-gradient(145deg, #23150d, #3d2314)', // Madera pulida
      border: '3px solid #ffd700', // Alambre/borde de oro
      borderRadius: '6px', 
      padding: '2rem', 
      width: '260px', 
      boxShadow: '0 8px 16px rgba(0,0,0,0.6)', 
      textAlign: 'center',
      color: '#fff'
    }}>
      <h3 style={{ color: '#ffd700', margin: '0 0 1rem 0', fontSize: '1.4rem', textShadow: '1px 1px 3px #000' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.95rem', color: '#dfdfdf', lineHeight: '1.4', fontStyle: 'italic' }}>
        {description}
      </p>
      <button style={{
        marginTop: '1.5rem',
        padding: '0.5rem 1.2rem',
        backgroundColor: '#0f4026',
        color: '#ffd700',
        border: '1px solid #ffd700',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}>
        Entrar a Jugar
      </button>
    </div>
  );
};

export default ServiceCard;