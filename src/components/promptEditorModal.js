import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export function PromptEditorModal({ title, description, value, onChange, onClose, placeholder }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return createPortal(
    <div className="prompt-overlay" role="presentation" onMouseDown={onClose}>
      <section className="prompt-modal" role="dialog" aria-modal="true" aria-labelledby="prompt-modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="prompt-modal-header">
          <div><span className="eyebrow">Node configuration</span><h2 id="prompt-modal-title">{title}</h2><p>{description}</p></div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Close editor">×</button>
        </div>
        <textarea autoFocus className="prompt-editor nodrag" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
        <div className="prompt-modal-footer"><span>Use <code>{'{{variable}}'}</code> to create an input handle.</span><button className="modal-done" type="button" onClick={onClose}>Done</button></div>
      </section>
    </div>,
    document.body,
  );
}

export function EmailEditorModal({ values, onChange, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return createPortal(
    <div className="prompt-overlay" role="presentation" onMouseDown={onClose}>
      <section className="prompt-modal" role="dialog" aria-modal="true" aria-labelledby="email-modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="prompt-modal-header">
          <div><span className="eyebrow">Node configuration</span><h2 id="email-modal-title">Configure email</h2><p>Set the details for the message this node will send.</p></div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Close editor">×</button>
        </div>
        <div className="email-editor">
          <label>Recipient<input className="nodrag" type="email" value={values.recipient} onChange={(event) => onChange('recipient', event.target.value)} placeholder="name@example.com" /></label>
          <label>Subject<input className="nodrag" value={values.subject} onChange={(event) => onChange('subject', event.target.value)} placeholder="Email subject" /></label>
          <label>Body<textarea className="nodrag" value={values.body} onChange={(event) => onChange('body', event.target.value)} placeholder="Write your message…" /></label>
        </div>
        <div className="prompt-modal-footer"><span>Use <code>{'{{variable}}'}</code> to insert dynamic values.</span><button className="modal-done" type="button" onClick={onClose}>Done</button></div>
      </section>
    </div>,
    document.body,
  );
}

export function ResultViewerModal({ nodeName, message, onClose }) {
  return createPortal(
    <div className="prompt-overlay" role="presentation" onMouseDown={onClose}>
      <section className="prompt-modal result-modal" role="dialog" aria-modal="true" aria-labelledby="result-modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="prompt-modal-header">
          <div><span className="eyebrow">Latest run</span><h2 id="result-modal-title">Output result</h2><p>Response from <strong>{nodeName}</strong></p></div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Close result">×</button>
        </div>
        <div className="modal-result-content">{message}</div>
        <div className="prompt-modal-footer"><span>Results are available until the page is refreshed.</span><button className="modal-done" type="button" onClick={onClose}>Done</button></div>
      </section>
    </div>,
    document.body,
  );
}
