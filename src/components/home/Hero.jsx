import React, { useEffect, useRef } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import videoSrc from '../../assets/RecycleBN.mp4';

function Hero() {
    const contentRef = useRef(null);

    useEffect(() => {
        ScrollReveal().reveal(contentRef.current, {
            delay: 200,
            duration: 1000,
            origin: 'bottom',
            distance: '50px',
            easing: 'ease-in-out',
            reset: false,
        });
    }, []);

    return (
        <div
            className="reveal text-center position-relative"
            style={{
                minHeight: '800px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                width: '100%',
            }}
        >
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: -1,
                }}
            >
                <source src="https://videos.pexels.com/video-files/4622325/4622325-uhd_2732_1440_25fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 0,
                }}
            />

            {/* Content with scroll reveal */}
            <div ref={contentRef} style={{ position: 'relative', zIndex: 1 }}>
                <h1 className="display-3">Vải ơi!</h1>
                <p style={{fontSize: '2rem'}} >Tranh ghép vải làm từ vải tái chế</p>
                {/* <Button as={Link} to="/products" variant="success" size="lg">Mua ngay</Button> */}
            </div>
        </div>
    );
}

export default Hero;
