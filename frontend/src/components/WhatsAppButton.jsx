'use client';

import { useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const WhatsAppButton = () => {
  const phoneNumber = '919919624703'; // Replace with your number
  const message = 'ka ho kk ka karata haya ';

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Optional: Remove scrollbar on mount, if you want
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflowX = '';
    };
  }, []);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        fontSize: '60px',
        color: '#25D366',
        zIndex: 1000,
        textDecoration: 'none',

        maxWidth: 'calc(100vw - 40px)',
        maxHeight: 'calc(100vh - 40px)',
        overflow_y: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <i
        className="fab fa-whatsapp"
      ></i>
    </a>

  );
};

export default WhatsAppButton;
