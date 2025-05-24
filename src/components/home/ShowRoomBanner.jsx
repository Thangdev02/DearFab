import React from 'react';

const ShowroomBanner = () => {
    return (
        <div className="">
            <video
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative' }}
                autoPlay
                muted
                loop
            >
                <source src="https://videos.pexels.com/video-files/4621690/4621690-uhd_2732_1440_25fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
                posit</video>

        </div>
    );
};

export default ShowroomBanner;