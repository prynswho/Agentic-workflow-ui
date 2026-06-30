// draggableNode.js




const baseStyle = {
    cursor: 'grab',
  minWidth: '90px',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  borderRadius: '10px',
  backgroundColor: '#1C2536',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow:
    '0 2px 8px 0 rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)',
  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  userSelect: 'none',
  };
  
export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={baseStyle} 
        draggable
      >
          <span style={{ color: '#fff' }}>{label}</span>
      </div>
    );
  };
  