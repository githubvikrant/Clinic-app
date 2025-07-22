'use client';

import { useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const WhatsAppButton = () => {
  const phoneNumber = '919472060190';
  const message = 'ka ho kk ka karata haya';

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

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
      className="fixed bottom-5 right-5 text-[60px] text-[#25D366] z-[1000] no-underline max-w-[calc(100vw-40px)] max-h-[calc(100vh-40px)] box-border overflow-x-hidden"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
};

export default WhatsAppButton;
