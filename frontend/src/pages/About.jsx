import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

function About() {
    return (
        <>
            <Navbar />
            <div className="container py-5" style={{ minHeight: '60vh' }}>
                <h1>About Us</h1>
                <p>
                    Volunteer Disaster Relief System helps volunteers, donors and disaster
                    management teams coordinate relief efforts.
                </p>
            </div>
            <Footer />
        </>
    );
}

export default About;