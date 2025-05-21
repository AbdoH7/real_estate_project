import { Container, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import UnitsList from '@/components/units/UnitsList';
import { getUnits } from '@/lib/api/units';

export default async function HomePage() {
  const units = await getUnits();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
        <Link href="/add" passHref style={{ textDecoration: 'none' }}>
          <Button variant="contained" startIcon={<AddIcon />}>
            Create Unit
          </Button>
        </Link>
      </Box>
      
      <UnitsList units={units} />
    </Container>
  );
}
