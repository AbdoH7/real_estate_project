import { connectionSource } from './config/typeorm';

import { Developer } from './developer/entities/developer.entity';
import { Project } from './project/entities/project.entity';


async function seed() {
  console.log('Connected to DB');

  const developerRepo = connectionSource.getRepository(Developer);
  const projectRepo = connectionSource.getRepository(Project);


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

  const projectCount = await projectRepo.count();
  if (projectCount === 0) {
    const projects = projectRepo.create([
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

    await projectRepo.save(projects);
    console.log('Projects seeded');
  } else {
    console.log('Projects already exist, skipping...');
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
