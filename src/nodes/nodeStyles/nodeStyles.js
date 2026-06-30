// nodeStyles.js

import { styled, alpha, darken } from '@mui/material/styles';

export const StyledNodeBox = styled('div')({
  position: 'relative',
  borderRadius: 14,
  paddingTop: 20,
  paddingBottom: 16,
  paddingLeft: 16,
  paddingRight: 16,
  minWidth: 220,
  backgroundColor: '#ffffff',     
  border: '1px solid #ececec',
  overflow: 'hidden',             
  transition: '0.2s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
  },
});

export const NodeTitle = styled('div')({
  fontWeight: 700,
  fontSize: '0.95rem',
  marginBottom: 10,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

export const NodeBody = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  '& input, & textarea': {
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: 6,
  },
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
    boxShadow: `0 4px 16px 0 ${alpha(color, 0.18)}, 0 1px 3px 0 ${alpha(color, 0.1)}`,
    borderTop: `5px solid ${color}`,
  };
}

export function getTitleColor(color) {
  return darken(color, 0.25); 
}