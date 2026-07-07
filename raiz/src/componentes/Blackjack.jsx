import React, { useState, useEffect } from 'react';

// Generador de baraja clásica de 52 cartas
const crearBaraja = () => {
  const pintas = ['♦️', '♥️', '♣️', '♠️'];
  const valores = [
    { nombre: 'A', valor: 11 }, { nombre: '2', valor: 2 }, { nombre: '3', valor: 3 },
    { nombre: '4', valor: 4 }, { nombre: '5', valor: 5 }, { nombre: '6', valor: 6 },
    { nombre: '7', valor: 7 }, { nombre: '8', valor: 8 }, { nombre: '9', valor: 9 },
    { nombre: '10', valor: 10 }, { nombre: 'J', valor: 10 }, { nombre: 'Q', valor: 10 },
    { nombre: 'K', valor: 10 }
  ];

  let baraja = [];
  for (let pinta of pintas) {
    for (let v of valores) {
      baraja.push({ ...v, pinta });
    }
  }
  // Mezclar baraja usando el algoritmo Fisher-Yates
  return baraja.sort(() => Math.random() - 0.5);
};

// Función para calcular el puntaje total manejando de forma inteligente la dualidad del As (1 u 11)
const calcularPuntaje = (mano) => {
  let total = mano.reduce((acc, carta) => acc + carta.valor, 0);
  let ases = mano.filter(carta => carta.nombre === 'A').length;

  while (total > 21 && ases > 0) {
    total -= 10;
    ases -= 1;
  }
  return total;
};

const Blackjack = ({ saldo, setSaldo }) => {
  const [baraja, setBaraja] = useState([]);
  const [manoJugador, setManoJugador] = useState([]);
  const [manoCrupier, setManoCrupier] = useState([]);
  const [montoApuesta, setMontoApuesta] = useState(100);
  
  const [enJuego, setEnJuego] = useState(false);
  const [turnoCrupier, setTurnoCrupier] = useState(false);
  const [mensajeFinal, setMensajeFinal] = useState('');

  const iniciarPartida = () => {
    if (montoApuesta > saldo || montoApuesta <= 0) {
      alert('Monto de apuesta inválido o saldo insuficiente.');
      return;
    }

    setSaldo(prev => prev - montoApuesta);
    const nuevaBaraja = crearBaraja();
    
    // Repartir cartas iniciales (2 al jugador, 2 al crupier)
    const j1 = nuevaBaraja.pop();
    const c1 = nuevaBaraja.pop();
    const j2 = nuevaBaraja.pop();
    const c2 = nuevaBaraja.pop();

    setManoJugador([j1, j2]);
    setCrupierManoInicial([c1, c2]);
    setBaraja(nuevaBaraja);
    
    setMensajeFinal('');
    setTurnoCrupier(false);
    setEnJuego(true);
  };

  // Estado auxiliar para no mutar directo
  const setCrupierManoInicial = (cartas) => setManoCrupier(cartas);

  const pedirCarta = () => {
    if (!enJuego) return;

    const nuevaBaraja = [...baraja];
    const nuevaCarta = nuevaBaraja.pop();
    const nuevaMano = [...manoJugador, nuevaCarta];

    setManoJugador(nuevaMano);
    setBaraja(nuevaBaraja);

    // Si el jugador se pasa de 21 al pedir, pierde inmediatamente
    if (calcularPuntaje(nuevaMano) > 21) {
      setEnJuego(false);
      setMensajeFinal('❌ Te pasaste de 21. ¡La casa gana!');
    }
  };

  const plantarse = () => {
    if (!enJuego) return;
    setEnJuego(false);
    setTurnoCrupier(true);
  };

  // Lógica de IA del crupier (Se ejecuta de forma automática al plantarse el jugador)
  useEffect(() => {
    if (turnoCrupier) {
      const puntajeCrupier = calcularPuntaje(manoCrupier);
      const puntajeJugador = calcularPuntaje(manoJugador);

      // Regla del casino: El crupier pide carta obligatoriamente si tiene menos de 17 puntos
      if (puntajeCrupier < 17) {
        setTimeout(() => {
          const nuevaBaraja = [...baraja];
          const nuevaCarta = nuevaBaraja.pop();
          setManoCrupier([...manoCrupier, nuevaCarta]);
          setBaraja(nuevaBaraja);
        }, 800); // Pequeño delay para darle suspenso visual al juego
      } else {
        // El crupier se planta, evaluamos quién ganó la mano
        setTurnoCrupier(false);
        setTimeout(() => {
          evaluarGanador(puntajeJugador, puntajeCrupier);
        }, 100);
      }
    }
  }, [turnoCrupier, manoCrupier]);

  const evaluarGanador = (pJugador, pCrupier) => {
    if (pCrupier > 21) {
      const premio = montoApuesta * 2;
      setSaldo(prev => prev + premio);
      alert(`🎉 ¡El crupier se pasó de 21! Ganaste la mano. Recibes $${premio} fichas.`);
      setMensajeFinal('🎉 ¡Ganaste! El crupier se excedió.');
    } else if (pJugador > pCrupier) {
      const premio = montoApuesta * 2;
      setSaldo(prev => prev + premio);
      alert(`🎉 ¡Excelente! Tienes ${pJugador} contra ${pCrupier} del crupier. ¡Ganaste $${premio} fichas!`);
      setMensajeFinal('🎉 ¡Ganaste la mano!');
    } else if (pJugador < pCrupier) {
      alert(`❌ Perdiste. El crupier tiene ${pCrupier} frente a tus ${pJugador} puntos.`);
      setMensajeFinal('❌ La casa gana.');
    } else {
      // Empate: Se devuelven las fichas apostadas
      setSaldo(prev => prev + montoApuesta);
      alert(`🤝 Empate a ${pJugador} puntos. Recuperas tus $${montoApuesta} fichas.`);
      setMensajeFinal('🤝 Empate (Push).');
    }
  };

  const pJugador = calcularPuntaje(manoJugador);
  const pCrupierVis = (enJuego && manoCrupier.length > 0) ? manoCrupier[0].valor : calcularPuntaje(manoCrupier);

  return (
    <div style={{
      background: 'linear-gradient(180deg, #0b4028, #052416)', // Paño verde oscuro de mesa clásica
      border: '10px solid #3d2314', // Borde de madera gruesa
      borderRadius: '10px',
      padding: '2rem',
      maxWidth: '650px',
      margin: '2rem auto',
      color: '#fff',
      boxShadow: '0 10px 30px rgba(0,0,0,0.8), inset 0 0 30px rgba(0,0,0,0.5)',
      textAlign: 'center'
    }}>
      <h2 style={{ color: '#ffd700', textShadow: '2px 2px 4px #000', margin: '0 0 1.5rem 0' }}>🃏 MESA DE BLACKJACK 21 🃏</h2>

      {/* SECCIÓN: MANO DEL CRUPIER */}
      <div style={{ marginBottom: '2rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '6px' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#ffca28' }}> Mano del Crupier (Puntaje visible: {pCrupierVis})</h4>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', minHeight: '90px', alignItems: 'center' }}>
          {manoCrupier.map((carta, index) => (
            <div key={index} style={{
              width: '65px',
              height: '90px',
              backgroundColor: (enJuego && index === 1) ? '#2c3e50' : '#fff', // Carta boca abajo si el juego sigue activo
              color: (enJuego && index === 1) ? '#fff' : (['♦️', '♥️'].includes(carta.pinta) ? '#b22222' : '#000'),
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '4px',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
              border: (enJuego && index === 1) ? '2px solid #ffd700' : 'none'
            }}>
              {enJuego && index === 1 ? (
                <div style={{ margin: 'auto', fontSize: '1.5rem' }}>👑</div>
              ) : (
                <>
                  <div style={{ textAlign: 'left' }}>{carta.nombre}</div>
                  <div style={{ fontSize: '1.6rem', textAlign: 'center' }}>{carta.pinta}</div>
                  <div style={{ textAlign: 'right' }}>{carta.nombre}</div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN: MANO DEL JUGADOR */}
      <div style={{ marginBottom: '1.5rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '6px' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#2ecc71' }}>Tu Mano (Puntaje: {pJugador})</h4>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', minHeight: '90px', alignItems: 'center' }}>
          {manoJugador.map((carta, index) => (
            <div key={index} style={{
              width: '65px',
              height: '90px',
              backgroundColor: '#fff',
              color: ['♦️', '♥️'].includes(carta.pinta) ? '#b22222' : '#000',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '4px',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}>
              <div style={{ textAlign: 'left' }}>{carta.nombre}</div>
              <div style={{ fontSize: '1.6rem', textAlign: 'center' }}>{carta.pinta}</div>
              <div style={{ textAlign: 'right' }}>{carta.nombre}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PANEL DE CONTROL / ACCIONES */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
        {!enJuego && !turnoCrupier ? (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', padding: '0.8rem', borderRadius: '4px' }}>
            <div>
              <label style={{ color: '#ffd700', marginRight: '0.5rem', fontWeight: 'bold' }}>Apuesta:</label>
              <input 
                type="number" value={montoApuesta}
                onChange={(e) => setMontoApuesta(Math.max(1, Number(e.target.value)))}
                style={{ width: '80px', padding: '0.4rem', backgroundColor: '#000', color: '#fff', border: '1px solid #ffd700', borderRadius: '4px', textAlign: 'center' }}
              />
            </div>
            <button onClick={iniciarPartida} style={{ padding: '0.6rem 1.5rem', backgroundColor: '#ffd700', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px', textTransform: 'uppercase' }}>
              Repartir Cartas
            </button>
          </div>
        ) : (
          <>
            <button onClick={pedirCarta} disabled={turnoCrupier} style={{ padding: '0.7rem 1.5rem', backgroundColor: '#3498db', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}>
              🃏 Pedir Carta (Hit)
            </button>
            <button onClick={plantarse} disabled={turnoCrupier} style={{ padding: '0.7rem 1.5rem', backgroundColor: '#e67e22', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}>
              🛑 Plantarse (Stand)
            </button>
          </>
        )}
      </div>

      {/* Letrero Informativo de Estado de la Partida */}
      {mensajeFinal && (
        <div style={{ marginTop: '1.5rem', fontSize: '1.2rem', fontWeight: 'bold', color: '#ffd700', padding: '0.5rem', border: '1px dashed #ffd700', borderRadius: '4px', backgroundColor: 'rgba(0,0,0,0.3)' }}>
          {mensajeFinal}
        </div>
      )}
      {turnoCrupier && <p style={{ fontStyle: 'italic', color: '#aaa', marginTop: '1rem' }}>El crupier está evaluando su mano y tomando cartas...</p>}
    </div>
  );
};

export default Blackjack;