// submit.js
import Button from '@mui/material/Button';
import { useState ,useEffect} from 'react';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import { useStore } from "./store";
import axios from 'axios';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null); 

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/pipelines/parse', { nodes, edges });
      setLoading(false);

      const val = `nodes_number: ${response.data.num_nodes}  edges number: ${response.data.num_edges}  is_dag: ${response.data.is_dag}`;
      setAlertInfo({ severity: 'success', title: 'Success', message: val });
    } catch (error) {
      setLoading(false);
      setAlertInfo({ severity: 'error', title: 'Error', message: 'Request failed' });
    }
  };

  useEffect(() => {
  if (alertInfo) {
    const timer = setTimeout(() => setAlertInfo(null), 3500);
    return () => clearTimeout(timer);
  }
}, [alertInfo]);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        {alertInfo && (
        <Alert severity={alertInfo.severity}>
          <AlertTitle>{alertInfo.title}</AlertTitle>
          {alertInfo.message}
        </Alert>
      )}
      <Button
        onClick={handleSubmit}
        loading={loading}
        loadingPosition="end"
        variant="contained"
        sx={{
          borderRadius: 2,
          padding: '12px 24px',
          '&:hover': { color: 'black' },
        }}
      >
        Submit
      </Button>
    </div>
  );
};