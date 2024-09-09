import React from 'react';
import './Fswarning.css';

export default function Fswarning() {
  const whatsappNumber = '7667267787';
  const message = 'Hello, I have a query.';

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fswarning">
      <i className="phone-icon"></i>
      <div>
        <strong>WhatsApp Us</strong> on This Number If Any Query: 
        <span className="phone-number">{whatsappNumber}</span>
      </div>
      <button className="whatsapp-button" onClick={handleWhatsAppClick}>
        WhatsApp Us
      </button>
    </div>
  );
}
