import React, { useState, useEffect } from 'react';

const Tragamonedas = ({ saldo, setSaldo }) => {
  const simbolos = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎', '✨'];

  const [rodillos, setRodillos] = useState(['🎰', '🎰', '🎰']);
  const [girando, setGirando] = useState(false);
  const [montoApuesta, setMontoApuesta] = useState(100);

  // Animación del giro veloz de los rodillos
  useEffect(() => {
    let intervalo;
    if (girando) {
      intervalo = setInterval(() => {
        setRodillos([
          simbolos[Math.floor(Math.random() * simbolos.length)],
          simbolos[Math.floor(Math.random() * simbolos.length)],
          simbolos[Math.floor(Math.random() * simbolos.length)]
        ]);
      }, 80);
    }
    return () => clearInterval(intervalo);
  }, [girando]);

  const jalarPalanca = () => {
    if (montoApuesta > saldo || montoApuesta <= 0) {
      alert('Monto de apuesta inválido o saldo insuficiente.');
      return;
    }

    // Cobrar apuesta e iniciar giro
    setSaldo(prev => prev - montoApuesta);
    setGirando(true);

    // Detener la máquina tras 2 segundos
    setTimeout(() => {
      const resultadoFinal = [
        simbolos[Math.floor(Math.random() * simbolos.length)],
        simbolos[Math.floor(Math.random() * simbolos.length)],
        simbolos[Math.floor(Math.random() * simbolos.length)]
      ];

      setGirando(false);
      setRodillos(resultadoFinal);

      // Esperar un instante para que el usuario vea el resultado antes del alert
      setTimeout(() => {
        evaluarResultado(resultadoFinal);
      }, 100);

    }, 2000);
  };

  const evaluarResultado = (resultado) => {
    const [r1, r2, r3] = resultado;

    // CASO 1: JACKPOT (Tres destellos de la suerte)
    if (r1 === '✨' && r2 === '✨' && r3 === '✨') {
      const premio = montoApuesta * 30;
      setSaldo(prev => prev + premio);
      alert(`👑 ¡💥 JACKPOT SUPREMO 💥! Los astros se alinearon. ¡Ganaste $${premio} fichas!`);
    }
    // CASO 2: Tres iguales normales
    else if (r1 === r2 && r2 === r3) {
      const premio = montoApuesta * 10;
      setSaldo(prev => prev + premio);
      alert(`🎉 ¡TRIPLE COMBINACIÓN! Tres "${r1}" en línea. Ganaste $${premio} fichas.`);
    }
    // CASO 3: Doble combinación (Par de símbolos iguales)
    else if (r1 === r2 || r2 === r3 || r1 === r3) {
      const premio = montoApuesta * 2;
      setSaldo(prev => prev + premio);
      alert(`✨ ¡Buena jugada! Doble combinación detectada. Recuperas y duplicas: $${premio} fichas.`);
    }
    // CASO 4: Pérdida
    else {
      alert('❌ Nada por aquí. Jala la palanca de nuevo, la suerte está al caer.');
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(180deg, #b22222, #5a0f0f)', // Rojo carmesí de máquina clásica
      border: '10px solid #ffd700', // Bordes dorados brillantes
      borderRadius: '12px',
      padding: '2.5rem 1.5rem',
      maxWidth: '550px',
      margin: '2rem auto',
      color: '#fff',
      boxShadow: '0 12px 30px rgba(0,0,0,0.8), 0 0 20px #ffd700',
      textAlign: 'center'
    }}>
      <h2 style={{ color: '#ffd700', textShadow: '2px 2px 4px #000', margin: '0 0 1.5rem 0', letterSpacing: '1px' }}>
        🎰 FRUTAS DE ORO SLOTS 🎰
      </h2>

      {/* Pantalla de los Rodillos */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1.5rem',
        background: 'linear-gradient(180deg, #111, #222)',
        padding: '2rem',
        borderRadius: '8px',
        border: '4px solid #3d2314',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.9)',
        marginBottom: '2rem'
      }}>
        {rodillos.map((simbolo, index) => (
          <div key={index} style={{
            width: '90px',
            height: '90px',
            backgroundColor: '#fff',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3.5rem',
            boxShadow: '0 4px 8px rgba(0,0,0,0.5), inset 0 0 10px rgba(0,0,0,0.2)',
            transform: girando ? 'scale(0.95)' : 'scale(1)',
            transition: 'transform 0.1s ease'
          }}>
            {simbolo}
          </div>
        ))}
      </div>

      {/* Panel de Control de Apuestas */}
      {!girando && (
        <div style={{
          backgroundColor: 'rgba(0,0,0,0.4)',
          padding: '1rem',
          borderRadius: '6px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.5rem',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div>
            <label style={{ color: '#ffd700', fontWeight: 'bold', marginRight: '0.5rem' }}>Apuesta:</label>
            <input 
              type="number" 
              value={montoApuesta} 
              onChange={(e) => setMontoApuesta(Math.max(1, Number(e.target.value)))}
              style={{ width: '90px', padding: '0.4rem', backgroundColor: '#000', color: '#fff', border: '1px solid #ffd700', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold' }}
            />
          </div>

          <button 
            onClick={jalarPalanca} 
            style={{
              padding: '0.7rem 2rem',
              backgroundColor: '#ffd700',
              color: '#000',
              border: 'none',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              cursor: 'pointer',
              borderRadius: '4px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              textTransform: 'uppercase'
            }}
          >
            🕹️ Jalar Palanca
          </button>
        </div>
      )}

      {girando && (
        <p style={{ color: '#ffd700', fontStyle: 'italic', margin: '1rem 0', fontSize: '1.1rem', animation: 'pulse 1s infinite' }}>
          ✨ ¡Los rodillos están girando! ✨
        </p>
      )}

      {/* Tabla de Premios Breve */}
      <div style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#ddd', borderTop: '1px dashed rgba(255,255,255,0.2)', paddingTop: '1rem' }}>
        <p style={{ margin: '3px 0' }}>✨ ✨ ✨ = <strong>JACKPOT (x30)</strong></p>
        <p style={{ margin: '3px 0' }}>🔔 🔔 🔔 = <strong>Triple Igual (x10)</strong></p>
        <p style={{ margin: '3px 0' }}>🍒 🍒 🍇 = <strong>Doble Igual (x2)</strong></p>
      </div>
    </div>
  );
};

export default Tragamonedas;