import { connectionSource } from './config/typeorm';

import { Developer } from './developer/entities/developer.entity';
import { Project } from './project/entities/project.entity';
import { Unit } from './unit/entities/unit.entity';

async function seed() {
  console.log('Connected to DB');

  const developerRepo = connectionSource.getRepository(Developer);
  const projectRepo = connectionSource.getRepository(Project);
  const unitRepo = connectionSource.getRepository(Unit);

  const developerCount = await developerRepo.count();

  let developers: Developer[] = [];

  if (developerCount === 0) {
    developers = developerRepo.create([
      {
        name: 'TMG',
        description: 'DEVELOPING INTEGRATED CITIES & COMMUNITIES.',
        website: 'https://talaatmoustafa.com/',
      },
      {
        name: 'SODIC ',
        description: 'High-rise A distinguished 25-year track record. SODIC is a leading developer on the outskirts of Greater Cairo and the North Coast, with a distinguished 25-year track record of developing exceptional residential, commercial, and retail projects.',
        website: 'https://developments.sodic.com/',
      },
    ]);
    developers = await developerRepo.save(developers);
    console.log('Developers seeded');
  } else {
    developers = await developerRepo.find();
    console.log('Developers already exist, skipping...');
  }

  let projects: Project[] = [];
  const projectCount = await projectRepo.count();
  if (projectCount === 0) {
    projects = projectRepo.create([
      {
        name: 'Madinaty',
        description: 'A fully integrated city by TMG',
        website: 'https://madinaty.com/',
        developer: developers.find((d) => d.name === 'TMG'),
      },
      {
        name: 'Al Rehab',
        description: 'Another major project by TMG',
        website: 'https://alrehabcity.com/',
        developer: developers.find((d) => d.name === 'TMG'),
      },
      {
        name: 'VYE',
        description: 'A vibrant project by SODIC',
        website: 'https://sodic.com/projects/vye',
        developer: developers.find((d) => d.name === 'SODIC'),
      },
    ]);

    projects = await projectRepo.save(projects);
    console.log('Projects seeded');
  } else {
    projects = await projectRepo.find({ relations: ['developer'] });
    console.log('Projects already exist, skipping...');
  }

  const unitCount = await unitRepo.count();
  if (unitCount === 0) {
    const madinaty = projects.find(p => p.name === 'Madinaty');
    const alRehab = projects.find(p => p.name === 'Al Rehab');
    const vye = projects.find(p => p.name === 'VYE');

    const units = unitRepo.create([
      {
        code: 'MD-101',
        name: 'Luxury Villa',
        description: 'Spacious 5-bedroom villa with private garden',
        location: 'Madinaty, New Cairo',
        amenities: ['Private Garden', 'Swimming Pool', 'Security', 'Parking', 'Smart Home System'],
        price: 8500000.00,
        area: 450.00,
        bedroom_count: 5,
        bathroom_count: 6,
        furnished: false,
        project: madinaty,
      },
      {
        code: 'MD-102',
        name: 'Modern Apartment',
        description: 'Contemporary 3-bedroom apartment with city view',
        location: 'Madinaty, New Cairo',
        amenities: ['Gym', 'Pool', 'Security', 'Parking'],
        price: 3200000.00,
        area: 180.00,
        bedroom_count: 3,
        bathroom_count: 3,
        furnished: true,
        project: madinaty,
      },
      {
        code: 'RH-101',
        name: 'Family Townhouse',
        description: 'Semi-attached townhouse with garden',
        location: 'Al Rehab, New Cairo',
        amenities: ['Garden', 'Security', 'Parking', 'Club Membership'],
        price: 5500000.00,
        area: 320.00,
        bedroom_count: 4,
        bathroom_count: 4,
        furnished: false,
        project: alRehab,
      },
      {
        code: 'RH-102',
        name: 'Studio Apartment',
        description: 'Cozy studio perfect for singles or couples',
        location: 'Al Rehab, New Cairo',
        amenities: ['Security', 'Parking', 'Shopping Area'],
        price: 1200000.00,
        area: 60.00,
        bedroom_count: 0,
        bathroom_count: 1,
        furnished: true,
        project: alRehab,
      },
      {
        code: 'VY-101',
        name: 'Premium Penthouse',
        description: 'Luxurious penthouse with panoramic views',
        location: 'VYE, 6th of October',
        amenities: ['Private Pool', 'Private Elevator', 'Smart Home', 'Security', 'Parking'],
        price: 12000000.00,
        area: 400.00,
        bedroom_count: 4,
        bathroom_count: 5,
        furnished: true,
        project: vye,
      },
      {
        code: 'VY-102',
        name: 'Garden Apartment',
        description: 'Ground floor apartment with private garden',
        location: 'VYE, 6th of October',
        amenities: ['Private Garden', 'Security', 'Parking', 'Club Access'],
        price: 4500000.00,
        area: 220.00,
        bedroom_count: 3,
        bathroom_count: 3,
        furnished: false,
        project: vye,
      },
    ]);

    await unitRepo.save(units);
    console.log('Units seeded');
  } else {
    console.log('Units already exist, skipping...');
  }

  console.log('Seeding complete');
}



if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Seeding failed:', err);
      process.exit(1);
    });
}

export { seed };
