import { Container } from '@mui/material';
import AddUnitForm from '@/components/units/AddUnitForm';

export default function AddUnitPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <AddUnitForm />
    </Container>
  );
} 