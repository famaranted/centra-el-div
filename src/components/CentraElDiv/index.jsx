import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Distractor from './distractor';

const CentraElDiv = () => {
  const [time, setTime] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [success, setSuccess] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  // Timer effect
  useEffect(() => {
    let timer;
    if (isRunning && !success) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, success]);

  const startTimer = () => {
    setTime(0);
    setAttempts(0);
    setSuccess(false);
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  // Verificar si el div está centrado
  const checkSolution = () => {
    const targetDiv = document.getElementById('elDiv');
    if (!targetDiv) return false;
    
    const rect = targetDiv.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const centerX = windowWidth / 2;
    const centerY = windowHeight / 2;
    
    const divCenterX = rect.left + rect.width / 2;
    const divCenterY = rect.top + rect.height / 2;
    
    const margin = 5; // Margen de error permitido
    
    return (
      Math.abs(divCenterX - centerX) < margin && 
      Math.abs(divCenterY - centerY) < margin
    );
  };

  // Manejar la verificación
  const handleVerify = () => {
    setAttempts(prev => prev + 1);
    
    if (checkSolution()) {
      setSuccess(true);
      alert(`¡Felicidades! Lo lograste en ${time} segundos con ${attempts + 1} intentos`);
    } else {
      alert('Aún no está perfectamente centrado. ¡Sigue intentando!');
    }
  };

  // Formatear tiempo
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.desafioContainer}>
      <Distractor />
      
      <div className={styles.gameInfo}>
        <div>Tiempo: {formatTime(time)}</div>
        <div>Intentos: {attempts}</div>
        <button 
          className={styles.verifyButton} 
          onClick={handleVerify}
          disabled={success}
        >
          VERIFICAR SOLUCIÓN
        </button>
        {isRunning ? (
          <button className={styles.startButton} onClick={stopTimer}>
            PARAR
          </button>
        ) : (
          <button className={styles.startButton} onClick={startTimer}>
            EMPEZAR
          </button>
        )}
      </div>

      <div className={styles.contenedorPrincipal}>
        <div className={styles.marcoDecorativo}>
          <div className={styles.contenedorIntermedio}>
            <div className={styles.contenedorEngañoso}>
              <div id="elDiv" className={styles.target}>
                ¡CÉNTRAME!
              </div>
            </div>
          </div>
        </div>
      </div>

      {success && (
        <div className={styles.successOverlay}>
          <h1>¡FELICIDADES!</h1>
          <p>Has dominado el arte de centrar divs</p>
        </div>
      )}
    </div>
  );
};

export default CentraElDiv;