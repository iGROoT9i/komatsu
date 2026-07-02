import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import StepCard from '../components/StepCard';
import VideoModal from '../components/VideoModal';
import './GuideView.css';

const stepsData = [
  {
    number: 1,
    title: "Desempaquetado y inspección",
    description: "Abrir la caja sellada. Verificar que el bloque \"Check-Clean\", las botellas de muestra y las mangueras estén en buen estado.",
    imageUrl: "/images/step1.webp"
  },
  {
    number: 2,
    title: "Limpiado exterior de la válvula de muestra",
    description: "Utilizando un paño limpio, limpiar el exterior de la válvula Minimess en la excavadora Pc360LC-11. Luego retirar el capuchón protector.",
    imageUrl: "/images/step2.webp"
  },
  {
    number: 3,
    title: "Acople de Manguera Intermedia",
    description: "Conectar la Manguera de Interconexión (Minimess) entre la válvula de la máquina y la entrada del colector prototipo.",
    imageUrl: "/images/step3.webp"
  },
  {
    number: 4,
    title: "Extracción de Purga",
    description: "Gire manivela a POSICIÓN A (izquierda) para purgar flujo. Llene frasco de descarte usando la manguera de purga dedicada.",
    imageUrl: "/images/step4.webp"
  },
  {
    number: 5,
    title: "Cambio de mangueras",
    description: "Desconectar manguera de purga usada. Conectar una manguera de muestra limpia y dedicada para la toma de muestra KOWA.",
    imageUrl: "/images/step5.webp"
  },
  {
    number: 6,
    title: "Extracción de muestra KOWA",
    description: "Gire a POSICIÓN B (derecha) para capturar Muestra KOWA. Use la manguera de muestra limpia y dedicada.",
    imageUrl: "/images/step6.webp"
  },
  {
    number: 7,
    title: "Desconexión y sellado",
    description: "Desenrosque y tape inmediatamente el Frasco B (Muestra) con su sello de seguridad.",
    imageUrl: "/images/step7.webp"
  }
];

const GuideView = () => {
  const navigate = useNavigate();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <Header />
      <div className="page-content guide-container">
        <h1 className="guide-title">
          Asistente Digital de <span className="guide-subtitle">Muestreo: Guía Rápida</span>
        </h1>
        
        <div className="steps-list">
          {stepsData.map((step) => (
            <StepCard 
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              imageUrl={step.imageUrl}
            />
          ))}
        </div>

        <div className="help-section">
          <h2 className="help-title">📺 ¿Tienes dudas con el proceso?</h2>
          <button 
            className="btn-video"
            onClick={() => setIsVideoOpen(true)}
          >
            ▶ Ver Video Instructivo
          </button>
        </div>

        <button 
          className="btn-primary"
          onClick={() => navigate('/register')}
        >
          📝 REGISTRAR MUESTRA KOWA
        </button>

        <VideoModal 
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
          videoId="HrWSTCRvwtY"
        />
      </div>
    </>
  );
};

export default GuideView;
