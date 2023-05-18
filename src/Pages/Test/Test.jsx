import React, { useState } from 'react';
import './Test.scss';

const MyComponent = () => {
    const handleDownload = () => {
        const urls = [
            'http://www.basketballassotion.space/Files/Pictures/1.jpg',
            'http://www.basketballassotion.space/Files/Pictures/2.jpg'
        ];

        urls.forEach((url, index) => {
            fetch(url)
                .then(response => response.blob())
                .then(blob => {
                    const imageUrl = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = imageUrl;
                    link.download = `image_${index+1}.jpg`; // File name for download

                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    URL.revokeObjectURL(imageUrl);
                });
        });
    };

    return (
        <div className="check">
            <button onClick={handleDownload}>Скачать изображение</button>
        </div>
    );
}

export default MyComponent;
