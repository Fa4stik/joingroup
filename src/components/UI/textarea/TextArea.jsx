import React, {useEffect, useRef} from 'react';
import './TextArea.scss';
import autosize from 'autosize';

const TextArea = ({placeholder, ...props}) => {
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            autosize(textareaRef.current);
        }
        return () => {
            if (textareaRef.current) {
                autosize.destroy(textareaRef.current);
            }
        };
    }, []);

    return (
        <textarea
            className="textArea"
            placeholder={placeholder}
            ref={textareaRef}
            {...props}
            style={{
                ...props.style,
                resize: 'none',
                overflow: 'hidden',
            }}
        />
    );
};

export default TextArea;