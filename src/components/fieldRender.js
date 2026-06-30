import { useRef } from "react";


export function fieldRender(field, value, onChange) {
    if (field.type === 'select') {
        return (
            <select value={value} onChange={(e) => onChange(e.target.value)}>
                {field.options.map((i) => (
                    <option key={i} value={i}>
                        {i}
                    </option>
                ))}
            </select>
        )
    };

    if (field.type === 'textarea') {
        return <AutoResizeTextBox value={value} onChange={onChange} placeholder={field.label} />;
    }
    return (
        <input
            type={field.type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}

export function AutoResizeTextBox({ value, onChange, placeholder }) {
    const textRefArea = useRef(null);

    const handleChange = (e) => {
        onChange(e.target.value);
        textRefArea.current.style.height = 'auto';
        textRefArea.current.style.height = textRefArea.current.scrollHeight + 'px';
    }

    return (
        <textarea
            ref={textRefArea}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
        //add style maybe
        />
    )
}
