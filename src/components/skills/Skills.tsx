import './Skills.css'
import { GraphCanvas } from 'reagraph';

const nodes = [
  {
    id: '1',
    label: '1'
  },
  {
    id: '2',
    label: '2'
  }
];

const edges = [
  {
    source: '1',
    target: '2',
    id: '1-2',
    label: '1-2'
  },
  {
    source: '2',
    target: '1',
    id: '2-1',
    label: '2-1'
  }
];

export default function Skills() {
  return (
    <div className='rectangle'>
      <GraphCanvas
        nodes={nodes}
        edges={edges}
        contextMenu={({ data, onClose }) => (
          <div
      
          >
            <h1>{data.label}</h1>
            <button onClick={onClose}>Close Menu</button>
          </div>
        )}
      />
    </div>

  );
}