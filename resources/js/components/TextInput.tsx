import React, { useEffect, useRef } from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    isFocused?: boolean;
};

const TextInput = React.forwardRef<HTMLInputElement, Props>(
    ({ isFocused = false, className = '', ...props }, ref) => {
        const localRef = useRef<HTMLInputElement>(null);

        useEffect(() => {
            if (isFocused && localRef.current) {
                localRef.current.focus();
            }
        }, [isFocused]);

        return (
            <input
                {...props}
                ref={(el) => {
                    localRef.current = el;
                    if (typeof ref === 'function') ref(el);
                    else if (ref) ref.current = el;
                }}
                className={
                    'border-gray-300 focus:border-[#0a3d62] focus:ring-[#0a3d62] rounded-lg shadow-sm ' +
                    className
                }
            />
        );
    }
);

export default TextInput;