import { Container, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { getUnits } from '@/lib/api/units';
import { UnitsContainer } from '../components/units/UnitsContainer';

export default async function HomePage() {
  const units = await getUnits();

  return (
    <main>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
          <Link href="/add" passHref style={{ textDecoration: 'none' }}>
            <Button variant="contained" startIcon={<AddIcon />}>
              Create Unit
            </Button>
          </Link>
        </Box>
        
        <UnitsContainer initialUnits={units} />
      </Container>
    </main>
  );
}
