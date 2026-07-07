import React, { useState } from 'react';
import Header from './componentes/Header';
import Hero from './componentes/Hero';
import ServiceCard from './componentes/ServiceCard';
import Footer from './componentes/Footer';
import Login from './componentes/Login';
import CarreraCaballos from './componentes/CarreraCaballos';
import Ruleta from './componentes/Ruleta';
import Tragamonedas from './componentes/Tragamonedas';
import Banco from './componentes/Banco'; // Importamos el Banco
import Blackjack from './componentes/Blackjack';

function App() {
  const [user, setUser] = useState(null);
  const [saldo, setSaldo] = useState(1000);
  const [deuda, setDeuda] = useState(0); // NUEVO ESTADO: Deuda inicial en 0
  const [vistaActual, setVistaActual] = useState('salon'); // 'salon', 'juegos', o 'banco'
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);

  const services = [
    { id: 'caballos', title: "🏇 Carrera de Caballos", description: "Elige tu corcel en el Hipódromo Real Vintage y multiplica tus fichas." },
    { id: 'ruleta', title: "🎡 Ruleta de la Fortuna", description: "Apuesta al mítico rojo o negro en el gran cilindro francés." },
    { id: 'tragamonedas', title: "🎰 Tragamonedas", description: "Prueba tu suerte en la máquina clásica de frutas de oro (Próximamente)." },
    { id: 'blackjack', title: "🃏 Blackjack 21", description: "Enfréntate al crupier cara a cara en el tapete de fieltro (Próximamente)." }
  ];

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const cambiarVista = (vista) => {
    setVistaActual(vista);
    setJuegoSeleccionado(null);
  };

  // Ajustado: Ahora si se queda en 0, no hay regalos automáticos. Debe ir al banco.
  const jugarSuerte = () => {
    if (saldo < 100) {
      alert("❌ ¡Te quedaste sin fichas! Dirígete al 'Banco de Fichas' en el menú superior para pedir un préstamo y seguir jugando.");
      return;
    }
    const costoApuesta = 100;
    const gano = Math.random() > 0.5;
    if (gano) {
      setSaldo(prevSaldo => prevSaldo - costoApuesta + 250);
      alert("🎉 ¡Ganaste! +$250 en fichas");
    } else {
      setSaldo(prevSaldo => prevSaldo - costoApuesta);
      alert("❌ Suerte para la próxima. -$100 en fichas");
    }
  };

  return (
    <div style={{ 
      fontFamily: "'Georgia', 'Times New Roman', serif", 
      margin: 0, 
      padding: 0, 
      boxSizing: 'border-box', 
      backgroundColor: '#121212', 
      minHeight: '100vh', 
      paddingBottom: '80px',
      color: '#eaeaea'
    }}>
      <Header setVistaActual={cambiarVista} />
      
      {!user ? (
        <div style={{ padding: '3rem 1rem' }}>
          <Login onLoginSuccess={handleLoginSuccess} />
        </div>
      ) : (
        <>
          {/* Barra VIP Dinámica con Visualización de Deuda */}
          <div style={{ 
            background: 'linear-gradient(145deg, #2c1d11, #1a100a)', 
            color: '#ffd700', 
            padding: '1rem 2rem', 
            display: 'flex', 
            justify: 'space-between', 
            alignItems: 'center', 
            borderBottom: '3px solid #ffd700', 
            boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
          }}>
            <h3 style={{ margin: 0, letterSpacing: '1px', textShadow: '1px 1px 2px black' }}>
              🎩 SALÓN VIP: {user.nombre.toUpperCase()} {user.apellido.toUpperCase()}
            </h3>
            
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              {deuda > 0 && (
                <div style={{ color: '#ff6b6b', fontWeight: 'bold', fontSize: '1rem', border: '1px dashed #ff6b6b', padding: '0.4rem 1rem', borderRadius: '4px' }}>
                  DEUDA: -${deuda}
                </div>
              )}
              <div style={{ 
                background: 'linear-gradient(145deg, #0f4026, #072415)', 
                color: '#ffd700', 
                padding: '0.6rem 1.5rem', 
                borderRadius: '5px', 
                fontWeight: 'bold', 
                fontSize: '1.2rem',
                border: '2px solid #ffd700',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.6)'
              }}>
                FICHAS: ${saldo}
              </div>
            </div>
          </div>

          {/* RENDERS CONDICIONALES */}
          
          {/* 1. VISTA SALÓN */}
          {vistaActual === 'salon' && (
            <>
              <Hero />
              <div style={{ 
                textAlign: 'center', 
                margin: '3rem auto', 
                maxWidth: '800px',
                padding: '2rem',
                background: 'linear-gradient(180deg, #165333, #0d331f)', 
                border: '12px solid #3d2314', 
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.7), inset 0 0 20px rgba(0,0,0,0.6)'
              }}>
                <h2 style={{ color: '#ffd700', fontSize: '2rem', margin: '0 0 0.5rem 0', textShadow: '2px 2px 4px #000' }}>
                  ✨ GRAN SALÓN DE LA FORTUNA ✨
                </h2>
                <p style={{ color: '#fff', fontStyle: 'italic', marginBottom: '1.5rem' }}>Haga sus apuestas, señoritas y caballeros.</p>
                <button onClick={jugarSuerte} style={{ 
                  padding: '1.2rem 2.5rem', 
                  fontSize: '1.3rem', 
                  background: 'linear-gradient(145deg, #b22222, #7a1515)', 
                  color: '#ffd700', 
                  border: '2px solid #ffd700', 
                  borderRadius: '4px', 
                  cursor: 'pointer', 
                  fontWeight: 'bold',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.5)'
                }}>
                  🎰 LANZAR APUESTA RAPIDA ($100)
                </button>
              </div>

              <main style={{ padding: '0 2rem 3rem 2rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                {services.map((service) => (
                  <div key={service.id} onClick={() => { setVistaActual('juegos'); setJuegoSeleccionado(service.id); }} style={{ cursor: 'pointer' }}>
                    <ServiceCard title={service.title} description={service.description} />
                  </div>
                ))}
              </main>
            </>
          )}

          {/* 2. VISTA MESAS / JUEGOS */}
          {vistaActual === 'juegos' && (
            <div style={{ padding: '2rem 1rem' }}>
              {juegoSeleccionado === null ? (
                <>
                  <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ color: '#ffd700', textShadow: '2px 2px 4px #000' }}>🎰 SELECCIONE SU MESA DE JUEGO 🎰</h2>
                  </div>
                  <main style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    {services.map((service) => (
                      <div key={service.id} onClick={() => setJuegoSeleccionado(service.id)} style={{ cursor: 'pointer' }}>
                        <ServiceCard title={service.title} description={service.description} />
                      </div>
                    ))}
                  </main>
                </>
              ) : (
                /* Si ya seleccionó un juego, renderiza el componente activo */
                <div>
                  {juegoSeleccionado === 'caballos' && (
                    <CarreraCaballos saldo={saldo} setSaldo={setSaldo} />
                  )}
                  
                  {juegoSeleccionado === 'ruleta' && (
                    <Ruleta saldo={saldo} setSaldo={setSaldo} />
                  )}

                  {juegoSeleccionado === 'tragamonedas' && (
                    <Tragamonedas saldo={saldo} setSaldo={setSaldo} />
                  )}
                  
                  {/* CAMBIO AQUÍ: Renderizar el Blackjack real */}
                  {juegoSeleccionado === 'blackjack' && (
                    <Blackjack saldo={saldo} setSaldo={setSaldo} />
                  )}

                  {/* Botón para volver al catálogo de juegos */}
                  <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <button 
                      onClick={() => setJuegoSeleccionado(null)} 
                      style={{ padding: '0.6rem 1.5rem', backgroundColor: '#333', color: '#ffd700', border: '1px solid #ffd700', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}
                    >
                      ↩ Volver a Selección de Mesas
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. VISTA BANCO CENTRAL */}
          {vistaActual === 'banco' && (
            <div style={{ padding: '2rem 1rem' }}>
              <Banco saldo={saldo} setSaldo={setSaldo} deuda={deuda} setDeuda={setDeuda} />
            </div>
          )}
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;