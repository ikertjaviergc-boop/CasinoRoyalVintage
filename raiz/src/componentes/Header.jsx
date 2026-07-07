import React from 'react';

const Header = ({ setVistaActual }) => {
  return (
    <header style={{ 
      background: 'linear-gradient(180deg, #111, #222)', 
      padding: '1.5rem 2rem', 
      color: '#ffd700', 
      display: 'flex', 
      justify: 'space-between', 
      alignItems: 'center',
      borderBottom: '4px solid #3d2314',
      boxShadow: '0 5px 15px rgba(0,0,0,0.8)'
    }}>
      <h1 style={{ margin: 0, fontSize: '2.2rem', letterSpacing: '2px', textShadow: '2px 2px 5px #000, 0 0 10px #ffea79' }}>
        ♣️ CASINO ROYAL VINTAGE 🎲
      </h1>
      <nav>
        <button 
          onClick={() => setVistaActual('salon')} 
          style={{ background: 'none', border: 'none', color: '#ffd700', margin: '0 1rem', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Salón
        </button>
        <button 
          onClick={() => setVistaActual('juegos')} 
          style={{ background: 'none', border: 'none', color: '#ffd700', margin: '0 1rem', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Mesas
        </button>
        {/* NUEVO BOTÓN BANCO */}
        <button 
          onClick={() => setVistaActual('banco')} 
          style={{ background: 'none', border: 'none', color: '#ffd700', margin: '0 1rem', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', fontFamily: 'inherit'}}
        >
          Banco
        </button>
      </nav>
    </header>
  );
};

export default Header;