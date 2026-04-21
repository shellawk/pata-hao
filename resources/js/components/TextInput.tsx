import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const TextInput = React.forwardRef<HTMLInputElement, Props>(
    ({ className = '', ...props }, ref) => {
        return (
            <input
                {...props}
                ref={ref}
                className={
                    'border-gray-300 focus:border-[#0a3d62] focus:ring-[#0a3d62] rounded-lg shadow-sm ' +
                    className
                }
            />
        );
    }
);

export default TextInput;