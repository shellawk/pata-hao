import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}: Props) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={
                `px-4 py-2 rounded-lg font-semibold transition bg-[#0a3d62] text-white hover:opacity-90 disabled:opacity-50 ` +
                className
            }
        >
            {children}
        </button>
    );
}