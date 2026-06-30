import {Handle,Position} from 'reactflow'
import { NodeTitle,StyledNodeBox , NodeBody, getAccentStyle,getTitleColor,AccentDot} from '../nodes/nodeStyles/nodeStyles'

export function NodeGenerator({ title, inputs, children, outputs, accentColor = '#888888'  }) {

    return (
        <StyledNodeBox style={getAccentStyle(accentColor)}>
            <NodeTitle style={{ color: getTitleColor(accentColor) }}>
                <AccentDot color={accentColor} />
                {title}
            </NodeTitle>
            {inputs.map((hand, index) => <Handle
                key={hand.id}
                type="target"
                position={Position.Left}
                id={hand.id}
                style={{ top: `${((index + 1) / (inputs.length + 1)) * 100}%` }}
            />)}
            <NodeBody>
                {children}
            </NodeBody>
            {outputs.map((out, index) => <Handle
                key={out.id}
                type="source"
                position={Position.Right}
                id={out.id}
                style={{ top: `${((index + 1) / (outputs.length + 1)) * 100}%` }}
            />)}
        </StyledNodeBox>
    )

}