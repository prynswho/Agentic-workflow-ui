// nodeStyles.js

import { styled, alpha } from '@mui/material/styles';

export const StyledNodeBox = styled('div')({
  position: 'relative',
  borderRadius: 12,
  padding: '16px',
  minWidth: 230,
  backgroundColor: 'var(--node-bg)',
  border: '1px solid var(--node-border)',
  overflow: 'visible',
  color: 'var(--node-text)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    borderColor: 'var(--node-accent)',
  },
  '& input, & select, & textarea': {
    width: '100%', boxSizing: 'border-box', borderRadius: 7, border: '1px solid var(--node-field-border)',
    padding: '8px 9px', background: 'var(--node-field-bg)', color: 'var(--node-text)', font: 'inherit', fontSize: '0.78rem', outline: 'none',
  },
  '& input:focus, & select:focus, & textarea:focus': { borderColor: 'var(--node-accent)', boxShadow: '0 0 0 3px var(--node-glow)' },
  '& textarea': { minHeight: 58, resize: 'vertical' },
  '& input::placeholder, & textarea::placeholder': { color: 'var(--node-muted)' },
  '& .react-flow__handle': { width: 10, height: 10, border: '2px solid var(--node-bg)', background: 'var(--node-accent)' },
});

export const NodeTitle = styled('div')({
  fontWeight: 700,
  fontSize: '0.86rem',
  letterSpacing: '-0.01em',
  marginBottom: 12,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const NodeBody = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 9,
});


export const AccentDot = styled('span')(({ color }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: color,
  flexShrink: 0,
}));

export function getAccentStyle(color) {
  return {
    '--node-accent': color,
    '--node-glow': alpha(color, 0.16),
    boxShadow: `0 12px 26px ${alpha(color, 0.12)}, 0 2px 5px rgba(15, 23, 42, 0.08)`,
    borderTop: `3px solid ${color}`,
  };
}
