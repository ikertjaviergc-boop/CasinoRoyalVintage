import React, { useState, useEffect } from 'react';

const CarreraCaballos = ({ saldo, setSaldo }) => {
  const caballosIniciales = [
    { id: 1, nombre: 'Rayo Caoba', color: '#8B4513', posicion: 0, emoji: '🐎' },
    { id: 2, nombre: 'Furia de Oro', color: '#FFD700', posicion: 0, emoji: '🐎' },
    { id: 3, nombre: 'Alba Elegante', color: '#FFFFFF', posicion: 0, emoji: '🐎' },
    { id: 4, nombre: 'Azabache', color: '#2F4F4F', posicion: 0, emoji: '🐎' },
  ];

  const [caballos, setCaballos] = useState(caballosIniciales);
  const [caballoSeleccionado, setCaballoSeleccionado] = useState(null);
  const [montoApuesta, setMontoApuesta] = useState(100);
  const [enCarrera, setEnCarrera] = useState(false);
  const [ganador, setGanador] = useState(null);

  useEffect(() => {
    let intervalo;
    if (enCarrera) {
      intervalo = setInterval(() => {
        setCaballos((prevCaballos) => {
          const nuevosCaballos = prevCaballos.map((caballo) => {
            const nuevoAvance = caballo.posicion + Math.floor(Math.random() * 6) + 1;
            return { ...caballo, posicion: Math.min(nuevoAvance, 100) };
          });

          const alguienGano = nuevosCaballos.find(c => c.posicion >= 100);
          if (alguienGano) {
            clearInterval(intervalo);
            setEnCarrera(false);
            setGanador(alguienGano);
            
            // Usamos un pequeño delay idéntico al de la ruleta para que la interfaz se actualice completamente antes del alert
            setTimeout(() => {
              evaluarResultado(alguienGano);
            }, 100);
          }

          return nuevosCaballos;
        });
      }, 100);
    }
    return () => clearInterval(intervalo);
  }, [enCarrera]);

  const iniciarCarrera = () => {
    if (!caballoSeleccionado) {
      alert('Por favor, elija un caballo antes de comenzar.');
      return;
    }
    if (montoApuesta > saldo || montoApuesta <= 0) {
      alert('Monto de apuesta inválido o saldo insuficiente.');
      return;
    }

    setSaldo(prev => prev - montoApuesta);
    setCaballos(caballosIniciales);
    setGanador(null);
    setEnCarrera(true);
  };

  // Corrección aquí: Ahora recibe el objeto completo del caballo que cruzó la meta
  const evaluarResultado = (caballoGanador) => {
    if (caballoGanador.id === caballoSeleccionado) {
      const premio = montoApuesta * 3;
      setSaldo(prev => prev + premio);
      alert(`🎉 ¡Excelente elección! Tu caballo ganó. Recibes $${premio} fichas.`);
    } else {
      // Si perdiste, ahora te revela de forma explícita el nombre del corcel victorioso
      alert(`❌ Suerte para la próxima carrera. El ganador fue "${caballoGanador.nombre}". Tu caballo quedó rezagado.`);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(180deg, #1a3c22, #0d2414)',
      border: '8px solid #3d2314',
      borderRadius: '6px',
      padding: '2rem',
      maxWidth: '750px',
      margin: '2rem auto',
      color: '#fff',
      boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
    }}>
      <h2 style={{ textAlign: 'center', color: '#ffd700', textShadow: '2px 2px 4px #000' }}>🏇 HIPÓDROMO REAL VINTAGE 🏇</h2>
      
      {!enCarrera && (
        <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-around', alignItems: 'center' }}>
          <div>
            <label style={{ marginRight: '0.5rem', fontWeight: 'bold', color: '#ffd700' }}>Selecciona tu Corcel:</label>
            <select 
              onChange={(e) => setCaballoSeleccionado(Number(e.target.value))} 
              defaultValue=""
              style={{ padding: '0.4rem', backgroundColor: '#111', color: '#fff', border: '1px solid #ffd700' }}
            >
              <option value="" disabled>-- Elegir --</option>
              {caballosIniciales.map(c => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ marginRight: '0.5rem', fontWeight: 'bold', color: '#ffd700' }}>Apuesta ($):</label>
            <input 
              type="number" 
              value={montoApuesta} 
              onChange={(e) => setMontoApuesta(Math.max(1, Number(e.target.value)))} 
              style={{ width: '80px', padding: '0.4rem', backgroundColor: '#111', color: '#fff', border: '1px solid #ffd700' }}
            />
          </div>

          <button onClick={iniciarCarrera} style={{ padding: '0.6rem 1.5rem', backgroundColor: '#ffd700', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '3px' }}>
            ¡INICIAR CARRERA!
          </button>
        </div>
      )}

      <div style={{ background: '#2c5e3b', padding: '1rem', borderRadius: '4px', border: '2px solid #ffd700', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {caballos.map((caballo) => (
          <div key={caballo.id} style={{ borderBottom: '1px dashed #fff', paddingBottom: '0.4rem', position: 'relative' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: caballoSeleccionado === caballo.id ? '#ffd700' : '#ddd' }}>
              {caballo.nombre} {caballoSeleccionado === caballo.id ? '⭐' : ''}
            </span>
            <div style={{ backgroundColor: '#15361e', height: '30px', borderRadius: '15px', position: 'relative', marginTop: '0.2rem' }}>
              <div style={{ 
                position: 'absolute', 
                left: `${caballo.posicion}%`, 
                transform: 'translateX(-100%)',
                fontSize: '1.6rem', 
                transition: 'left 0.1s linear',
                lineHeight: '30px'
              }}>
                {caballo.emoji}
              </div>
              <div style={{ position: 'absolute', right: '10px', top: 0, bottom: 0, width: '4px', backgroundColor: '#ffd700' }} />
            </div>
          </div>
        ))}
      </div>

      {ganador && (
        <div style={{ marginTop: '1.5rem', textAlign: 'center', backgroundColor: '#ffd700', color: '#000', padding: '0.8rem', borderRadius: '4px', fontWeight: 'bold', fontSize: '1.2rem' }}>
          🏆 GANADOR: ¡{ganador.nombre.toUpperCase()}! 🏆
        </div>
      )}
    </div>
  );
};

export default CarreraCaballos;