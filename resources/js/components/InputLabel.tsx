type Props = {
    value?: string;
    className?: string;
    children?: React.ReactNode;
    htmlFor?: string;
};

export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}: Props) {
    return (
        <label
            {...props}
            className={`block text-sm font-medium text-gray-700 ${className}`}
        >
            {value ?? children}
        </label>
    );
}