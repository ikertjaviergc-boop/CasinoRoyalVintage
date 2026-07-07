import React, { useState, useEffect } from 'react';

const Ruleta = ({ saldo, setSaldo }) => {
  const numerosRojos = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  
  const [tipoApuesta, setTipoApuesta] = useState('numero');
  const [valorApuesta, setValorApuesta] = useState('');
  const [montoApuesta, setMontoApuesta] = useState(100);
  
  const [girando, setGirando] = useState(false);
  const [numeroGanador, setNumeroGanador] = useState(null);
  const [colorGanador, setColorGanador] = useState('');
  const [efectoNumero, setEfectoNumero] = useState(0);

  useEffect(() => {
    let intervalo;
    if (girando) {
      intervalo = setInterval(() => {
        setEfectoNumero(Math.floor(Math.random() * 37));
      }, 70);
    }
    return () => clearInterval(intervalo);
  }, [girando]);

  const obtenerColor = (num) => {
    if (num === 0) return '#0f6b32';
    return numerosRojos.includes(num) ? '#b22222' : '#1a1a1a';
  };

  const lanzarRuleta = () => {
    if (valorApuesta === '' || valorApuesta === null) {
      alert('Por favor, seleccione una opción en el tapete de apuestas.');
      return;
    }
    if (montoApuesta > saldo || montoApuesta <= 0) {
      alert('Monto de apuesta inválido o saldo insuficiente.');
      return;
    }

    setSaldo(prev => prev - montoApuesta);
    setGirando(true);
    setNumeroGanador(null);

    setTimeout(() => {
      const resultadoNum = Math.floor(Math.random() * 37);
      const resultadoColor = resultadoNum === 0 ? 'verde' : numerosRojos.includes(resultadoNum) ? 'rojo' : 'negro';
      
      // PASO 1: Frenamos la animación y pintamos de inmediato el resultado real en la interfaz
      setGirando(false);
      setNumeroGanador(resultadoNum);
      setColorGanador(resultadoColor);

      // PASO 2: Le damos un respiro de 100ms para asegurar que el DOM dibuje el número definitivo antes del alert
      setTimeout(() => {
        evaluarPremio(resultadoNum, resultadoColor);
      }, 100);

    }, 2500);
  };

  const evaluarPremio = (num, color) => {
    let gano = false;
    let multiplicador = 0;

    if (tipoApuesta === 'numero' && Number(valorApuesta) === num) {
      gano = true;
      multiplicador = 36;
    } else if (tipoApuesta === 'color' && valorApuesta === color) {
      gano = true;
      multiplicador = 2;
    } else if (tipoApuesta === 'paridad' && num !== 0) {
      const esPar = num % 2 === 0;
      if ((valorApuesta === 'par' && esPar) || (valorApuesta === 'impar' && !esPar)) {
        gano = true;
        multiplicador = 2;
      }
    } else if (tipoApuesta === 'mitad' && num !== 0) {
      if ((valorApuesta === '1-18' && num <= 18) || (valorApuesta === '19-36' && num >= 19)) {
        gano = true;
        multiplicador = 2;
      }
    }

    if (gano) {
      const premio = montoApuesta * multiplicador;
      setSaldo(prev => prev + premio);
      alert(`🎉 ¡LA BOLA CAYÓ EN EL ${num} (${color.toUpperCase()})! Ganaste $${premio} fichas.`);
    } else {
      alert(`❌ LA BOLA CAYÓ EN EL ${num} (${color.toUpperCase()}). La casa gana.`);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(180deg, #165333, #0d331f)',
      border: '10px solid #3d2314',
      borderRadius: '8px',
      padding: '2rem',
      maxWidth: '800px',
      margin: '2rem auto',
      color: '#fff',
      boxShadow: '0 10px 25px rgba(0,0,0,0.6)'
    }}>
      <h2 style={{ textAlign: 'center', color: '#ffd700', textShadow: '2px 2px 4px #000' }}>🎡 MESA DE RULETA FRANCESA 🎡</h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
        <div style={{
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          border: '8px solid #ffd700',
          background: girando ? obtenerColor(efectoNumero) : (numeroGanador !== null ? obtenerColor(numeroGanador) : '#222'),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
          fontWeight: 'bold',
          boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
          textShadow: '2px 2px 4px #000',
          transition: 'background-color 0.1s ease'
        }}>
          {girando ? efectoNumero : (numeroGanador !== null ? numeroGanador : '🎰')}
        </div>
      </div>

      {!girando && (
        <div style={{ backgroundColor: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
          <div>
            <label style={{ color: '#ffd700', marginRight: '0.5rem', fontWeight: 'bold' }}>Tipo de Apuesta:</label>
            <select 
              value={tipoApuesta} 
              onChange={(e) => { setTipoApuesta(e.target.value); setValorApuesta(''); }}
              style={{ padding: '0.4rem', backgroundColor: '#111', color: '#fff', border: '1px solid #ffd700' }}
            >
              <option value="numero">Número Pleno (35 a 1)</option>
              <option value="color">Color (1 a 1)</option>
              <option value="paridad">Par / Impar (1 a 1)</option>
              <option value="mitad">Mitades (1 a 1)</option>
            </select>
          </div>

          <div>
            <label style={{ color: '#ffd700', marginRight: '0.5rem', fontWeight: 'bold' }}>Tu Elección:</label>
            
            {tipoApuesta === 'numero' && (
              <input 
                type="number" min="0" max="36" placeholder="0-36"
                value={valorApuesta}
                onChange={(e) => setValorApuesta(Math.min(36, Math.max(0, Number(e.target.value))))}
                style={{ width: '70px', padding: '0.4rem', backgroundColor: '#111', color: '#fff', border: '1px solid #ffd700' }}
              />
            )}

            {tipoApuesta === 'color' && (
              <select value={valorApuesta} onChange={(e) => setValorApuesta(e.target.value)} style={{ padding: '0.4rem', backgroundColor: '#111', color: '#fff', border: '1px solid #ffd700' }}>
                <option value="" disabled>-- Color --</option>
                <option value="rojo">🔴 Rojo</option>
                <option value="negro">⚫ Negro</option>
              </select>
            )}

            {tipoApuesta === 'paridad' && (
              <select value={valorApuesta} onChange={(e) => setValorApuesta(e.target.value)} style={{ padding: '0.4rem', backgroundColor: '#111', color: '#fff', border: '1px solid #ffd700' }}>
                <option value="" disabled>-- Paridad --</option>
                <option value="par">Par</option>
                <option value="impar">Impar</option>
              </select>
            )}

            {tipoApuesta === 'mitad' && (
              <select value={valorApuesta} onChange={(e) => setValorApuesta(e.target.value)} style={{ padding: '0.4rem', backgroundColor: '#111', color: '#fff', border: '1px solid #ffd700' }}>
                <option value="" disabled>-- Rangos --</option>
                <option value="1-18">Falta (1-18)</option>
                <option value="19-36">Pasa (19-36)</option>
              </select>
            )}
          </div>

          <div>
            <label style={{ color: '#ffd700', marginRight: '0.5rem', fontWeight: 'bold' }}>Fichas ($):</label>
            <input 
              type="number" value={montoApuesta} 
              onChange={(e) => setMontoApuesta(Math.max(1, Number(e.target.value)))}
              style={{ width: '80px', padding: '0.4rem', backgroundColor: '#111', color: '#fff', border: '1px solid #ffd700' }}
            />
          </div>

          <button onClick={lanzarRuleta} style={{ padding: '0.6rem 1.5rem', backgroundColor: '#ffd700', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '3px', textTransform: 'uppercase' }}>
            ¡Girar Ruleta!
          </button>
        </div>
      )}

      {girando && <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#ffd700' }}>La bola está girando en el cilindro... ¡No va más!</p>}

      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4px', backgroundColor: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ gridColumn: 'span 12', background: '#0f6b32', textAlign: 'center', padding: '4px', fontWeight: 'bold', borderRadius: '2px', fontSize: '0.85rem' }}>0</div>
        {Array.from({ length: 36 }, (_, i) => i + 1).map(num => (
          <div key={num} style={{
            background: obtenerColor(num),
            textAlign: 'center',
            padding: '6px 0',
            fontWeight: 'bold',
            borderRadius: '2px',
            fontSize: '0.8rem',
            border: valorApuesta !== '' && tipoApuesta === 'numero' && Number(valorApuesta) === num ? '2px solid #ffd700' : 'none'
          }}>
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ruleta;