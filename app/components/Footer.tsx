// src/components/Footer.tsx

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
        <div className="footer-content">
            <section className="contact-section">
                <h2>Contact</h2>
                <p>For inquiries, email us at <a href="mailto:LouMBB@louisville.edu">LouMBB@louisville.edu</a></p>
            </section>
            <section className="news-updates">
                <h2>Recent Game Analysis</h2>
                {/* Populate with the latest news and updates about the team */}
                <p>Check out the analysis from our recent game against XYZ University.</p>
            </section>
            <section className="upcoming-events">
                <h2>Upcoming Events</h2>
                <p>Join us for a live analysis session on 12th November.</p>
            </section>
            <section className="subscribe-updates">
                <h2>Subscribe for Updates</h2>
                <p>Stay updated with the latest analytics and team news. Subscribe now!</p>
            </section>
        </div>
    </footer>
  );
};

export default Footer;
