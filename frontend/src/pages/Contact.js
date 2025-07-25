import React from 'react';

const Contact = () => {
  return (
    <div className="contact-container contact-card-flex">
      <div className="page-title-box">
        <h2 className="page-title">Contact Us</h2>
      </div>
      <div className="contact-info-card">
        <div className="contact-icon-col">
          <span style={{ fontSize: 38, color: '#fca311', marginRight: 18, display: 'block', marginBottom: 12 }}>📍</span>
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 20, color: '#22223b', marginBottom: 4 }}>DeliverDeli Restaurant</div>
          <div style={{ color: '#444', fontSize: 16, marginBottom: 2 }}>Connaught Place, New Delhi, 110001</div>
          <div style={{ color: '#444', fontSize: 16, marginBottom: 2 }}>Phone: <a href="tel:+911234567890" style={{ color: '#fca311', fontWeight: 600, textDecoration: 'none' }}>+91 12345 67890</a></div>
          <div style={{ color: '#444', fontSize: 16, marginBottom: 2 }}>Email: <a href="mailto:support@deliverdeli.com" style={{ color: '#fca311', fontWeight: 600, textDecoration: 'none' }}>support@deliverdeli.com</a></div>
        </div>
      </div>
      <div className="contact-map-card" style={{ maxWidth: '100%', margin: '0 auto' }}>
        <iframe
          title="DeliverDeli Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.031839442784!2d77.216721315083!3d28.6328089824197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd1e5a1b1b1b%3A0x1b1b1b1b1b1b1b1b!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001%2C%20India!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
          width="100%"
          height="420"
          style={{ border: 0, borderRadius: 16, boxShadow: '0 4px 24px rgba(34,34,59,0.13)' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact; 