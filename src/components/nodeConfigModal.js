import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export function NodeConfigModal({ title, description, fields, values, onChange, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return createPortal(
    <div className="prompt-overlay" role="presentation" onMouseDown={onClose}>
      <section className="prompt-modal" role="dialog" aria-modal="true" aria-labelledby="node-config-modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="prompt-modal-header">
          <div><span className="eyebrow">Node configuration</span><h2 id="node-config-modal-title">{title}</h2><p>{description}</p></div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Close configuration">×</button>
        </div>
        <div className="node-config-form">
          {fields.map((field) => (
            <label key={field.name}>
              {field.label}
              {field.type === 'select' ? (
                <select className="nodrag" value={values[field.name] ?? ''} onChange={(event) => onChange(field.name, event.target.value)}>
                  {field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea className="nodrag" value={values[field.name] ?? ''} onChange={(event) => onChange(field.name, event.target.value)} placeholder={field.placeholder} />
              ) : (
                <input className="nodrag" type={field.type || 'text'} min={field.min} value={values[field.name] ?? ''} onChange={(event) => onChange(field.name, event.target.value)} placeholder={field.placeholder} />
              )}
              {field.hint && <span className="node-config-hint">{field.hint}</span>}
            </label>
          ))}
        </div>
        <div className="prompt-modal-footer"><span>These settings are sent with this node when the flow runs.</span><button className="modal-done" type="button" onClick={onClose}>Done</button></div>
      </section>
    </div>,
    document.body,
  );
}
