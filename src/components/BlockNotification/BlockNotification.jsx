import React, { useRef, useEffect } from 'react';
import './BlockNotification.scss';

const BlockNotification = ({ message, timeout }) => {
    const [show, setShow] = React.useState(true);
    const [transparency, setTransparency] = React.useState(100);

    const timerRef = useRef(null);
    const animationTimerRef = useRef(null);

    useEffect(() => {
        clearTimeout(timerRef.current);
        clearInterval(animationTimerRef.current);

        setShow(true);
        setTransparency(100);

        timerRef.current = setTimeout(() => {
            setShow(false);
        }, timeout);

        animationTimerRef.current = setInterval(() => {
            setTransparency((prevTransparency) => {
                if (prevTransparency === 0) {
                    clearInterval(animationTimerRef.current);
                }
                return Math.max(prevTransparency - 1, 0);
            });
        }, timeout / 100);

        return () => {
            clearTimeout(timerRef.current);
            clearInterval(animationTimerRef.current);
        };
    }, [message, timeout]);

    return (
        <>
            {show && (
                <div
                    className="block-notification"
                    style={{ opacity: transparency / 100 }}
                >
                    <span className="block-notification-message">{message}</span>
                </div>
            )}
        </>
    );
};

export default BlockNotification;
