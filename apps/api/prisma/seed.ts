import { PrismaClient, type DrugCategory, type StockStatus } from '@prisma/client';
import { hashPassword } from '../src/utils/password';
import { calculateStockStatus } from '../src/utils/stockStatus';

const prisma = new PrismaClient();
const DEFAULT_PASSWORD = 'Password123!';

const DRUGS: Array<{
  name: string;
  genericName: string;
  category: DrugCategory;
  unit: string;
  emhsCode: string;
  avgDailyUsage: number;
}> = [
  {
    name: 'Amoxicillin 250mg',
    genericName: 'Amoxicillin',
    category: 'ANTIBIOTIC',
    unit: 'tablets',
    emhsCode: 'EMHS-001',
    avgDailyUsage: 120,
  },
  {
    name: 'Amoxicillin 500mg',
    genericName: 'Amoxicillin',
    category: 'ANTIBIOTIC',
    unit: 'tablets',
    emhsCode: 'EMHS-002',
    avgDailyUsage: 80,
  },
  {
    name: 'Co-trimoxazole 480mg',
    genericName: 'Co-trimoxazole',
    category: 'ANTIBIOTIC',
    unit: 'tablets',
    emhsCode: 'EMHS-003',
    avgDailyUsage: 60,
  },
  {
    name: 'Metronidazole 400mg',
    genericName: 'Metronidazole',
    category: 'ANTIBIOTIC',
    unit: 'tablets',
    emhsCode: 'EMHS-004',
    avgDailyUsage: 45,
  },
  {
    name: 'Ciprofloxacin 500mg',
    genericName: 'Ciprofloxacin',
    category: 'ANTIBIOTIC',
    unit: 'tablets',
    emhsCode: 'EMHS-005',
    avgDailyUsage: 30,
  },
  {
    name: 'Artemether-Lumefantrine',
    genericName: 'Artemether/Lumefantrine',
    category: 'ANTIMALARIAL',
    unit: 'tablets',
    emhsCode: 'EMHS-010',
    avgDailyUsage: 200,
  },
  {
    name: 'Artesunate 50mg',
    genericName: 'Artesunate',
    category: 'ANTIMALARIAL',
    unit: 'vials',
    emhsCode: 'EMHS-011',
    avgDailyUsage: 25,
  },
  {
    name: 'Quinine 300mg',
    genericName: 'Quinine',
    category: 'ANTIMALARIAL',
    unit: 'tablets',
    emhsCode: 'EMHS-012',
    avgDailyUsage: 40,
  },
  {
    name: 'Tenofovir/Lamivudine/Dolutegravir',
    genericName: 'TLD',
    category: 'ARV',
    unit: 'tablets',
    emhsCode: 'EMHS-020',
    avgDailyUsage: 90,
  },
  {
    name: 'Zidovudine/Lamivudine',
    genericName: 'AZT/3TC',
    category: 'ARV',
    unit: 'tablets',
    emhsCode: 'EMHS-021',
    avgDailyUsage: 35,
  },
  {
    name: 'Paracetamol 500mg',
    genericName: 'Paracetamol',
    category: 'ANALGESIC',
    unit: 'tablets',
    emhsCode: 'EMHS-030',
    avgDailyUsage: 300,
  },
  {
    name: 'Ibuprofen 400mg',
    genericName: 'Ibuprofen',
    category: 'ANALGESIC',
    unit: 'tablets',
    emhsCode: 'EMHS-031',
    avgDailyUsage: 80,
  },
  {
    name: 'Amlodipine 5mg',
    genericName: 'Amlodipine',
    category: 'ANTIHYPERTENSIVE',
    unit: 'tablets',
    emhsCode: 'EMHS-040',
    avgDailyUsage: 50,
  },
  {
    name: 'Enalapril 5mg',
    genericName: 'Enalapril',
    category: 'ANTIHYPERTENSIVE',
    unit: 'tablets',
    emhsCode: 'EMHS-041',
    avgDailyUsage: 40,
  },
  {
    name: 'Metformin 500mg',
    genericName: 'Metformin',
    category: 'ANTIDIABETIC',
    unit: 'tablets',
    emhsCode: 'EMHS-050',
    avgDailyUsage: 70,
  },
  {
    name: 'Glibenclamide 5mg',
    genericName: 'Glibenclamide',
    category: 'ANTIDIABETIC',
    unit: 'tablets',
    emhsCode: 'EMHS-051',
    avgDailyUsage: 25,
  },
  {
    name: 'BCG Vaccine',
    genericName: 'BCG',
    category: 'VACCINE',
    unit: 'vials',
    emhsCode: 'EMHS-060',
    avgDailyUsage: 5,
  },
  {
    name: 'Measles Rubella Vaccine',
    genericName: 'MR',
    category: 'VACCINE',
    unit: 'vials',
    emhsCode: 'EMHS-061',
    avgDailyUsage: 8,
  },
  {
    name: 'Oxytocin 10 IU',
    genericName: 'Oxytocin',
    category: 'MATERNAL_HEALTH',
    unit: 'ampoules',
    emhsCode: 'EMHS-070',
    avgDailyUsage: 15,
  },
  {
    name: 'Ferrous Folate',
    genericName: 'Iron/Folic acid',
    category: 'MATERNAL_HEALTH',
    unit: 'tablets',
    emhsCode: 'EMHS-071',
    avgDailyUsage: 100,
  },
  {
    name: 'Magnesium Sulphate',
    genericName: 'MgSO4',
    category: 'MATERNAL_HEALTH',
    unit: 'vials',
    emhsCode: 'EMHS-072',
    avgDailyUsage: 10,
  },
  {
    name: 'Surgical Gloves',
    genericName: 'Gloves',
    category: 'SURGICAL_SUPPLY',
    unit: 'pairs',
    emhsCode: 'EMHS-080',
    avgDailyUsage: 50,
  },
  {
    name: 'Gauze Bandage',
    genericName: 'Gauze',
    category: 'SURGICAL_SUPPLY',
    unit: 'packs',
    emhsCode: 'EMHS-081',
    avgDailyUsage: 20,
  },
  {
    name: 'HIV Rapid Test Kit',
    genericName: 'HIV RDT',
    category: 'DIAGNOSTIC',
    unit: 'kits',
    emhsCode: 'EMHS-090',
    avgDailyUsage: 30,
  },
  {
    name: 'Malaria RDT',
    genericName: 'Malaria RDT',
    category: 'DIAGNOSTIC',
    unit: 'kits',
    emhsCode: 'EMHS-091',
    avgDailyUsage: 150,
  },
];

const FACILITIES = [
  {
    name: 'Gayaza Hospital',
    code: 'WAK-GAY-001',
    lat: 0.4167,
    lng: 32.6333,
    level: 'GENERAL_HOSPITAL' as const,
  },
  {
    name: 'Kasangati HC III',
    code: 'WAK-KAS-002',
    lat: 0.4378,
    lng: 32.5911,
    level: 'HC_III' as const,
  },
  {
    name: 'Nansana HC IV',
    code: 'WAK-NAN-003',
    lat: 0.3639,
    lng: 32.5286,
    level: 'HC_IV' as const,
  },
  {
    name: 'Wakiso HC III',
    code: 'WAK-WAK-004',
    lat: 0.4044,
    lng: 32.4594,
    level: 'HC_III' as const,
  },
  {
    name: 'Entebbe General Hospital',
    code: 'WAK-ENT-005',
    lat: 0.0512,
    lng: 32.4634,
    level: 'GENERAL_HOSPITAL' as const,
  },
];

function quantityForStatus(status: StockStatus, avgDailyUsage: number): number {
  switch (status) {
    case 'STOCKOUT':
      return 0;
    case 'CRITICAL':
      return avgDailyUsage * 3;
    case 'LOW':
      return avgDailyUsage * 10;
    default:
      return avgDailyUsage * 30;
  }
}

async function main() {
  await prisma.alert.deleteMany();
  await prisma.stockEntry.deleteMany();

  const passwordHash = await hashPassword(DEFAULT_PASSWORD);

  const wakiso = await prisma.district.upsert({
    where: { name: 'Wakiso' },
    update: {},
    create: { name: 'Wakiso', region: 'Central' },
  });

  await prisma.district.upsert({
    where: { name: 'Kampala' },
    update: {},
    create: { name: 'Kampala', region: 'Central' },
  });

  await prisma.district.upsert({
    where: { name: 'Mukono' },
    update: {},
    create: { name: 'Mukono', region: 'Central' },
  });

  const facilityRecords = [];
  for (const f of FACILITIES) {
    const facility = await prisma.facility.upsert({
      where: { code: f.code },
      update: {},
      create: {
        name: f.name,
        code: f.code,
        level: f.level,
        districtId: wakiso.id,
        latitude: f.lat,
        longitude: f.lng,
        address: `${f.name}, Wakiso District`,
      },
    });
    facilityRecords.push(facility);
  }

  const gayaza = facilityRecords[0];

  const pharmacist = await prisma.user.upsert({
    where: { email: 'pharmacist@gayaza.ug' },
    update: { passwordHash, isActive: true },
    create: {
      email: 'pharmacist@gayaza.ug',
      passwordHash,
      fullName: 'Sarah Nakato',
      phone: '+256700000010',
      role: 'FACILITY_WORKER',
      facilityId: gayaza.id,
    },
  });

  await prisma.user.upsert({
    where: { email: 'dho@wakiso.ug' },
    update: { passwordHash, isActive: true },
    create: {
      email: 'dho@wakiso.ug',
      passwordHash,
      fullName: 'James Okello',
      phone: '+256700000020',
      role: 'DISTRICT_OFFICER',
      districtId: wakiso.id,
    },
  });

  await prisma.user.upsert({
    where: { email: 'admin@nms.ug' },
    update: { passwordHash, isActive: true },
    create: {
      email: 'admin@nms.ug',
      passwordHash,
      fullName: 'Grace Achieng',
      phone: '+256700000030',
      role: 'NMS_ADMIN',
    },
  });

  const drugRecords = [];
  for (const drug of DRUGS) {
    const record = await prisma.drug.upsert({
      where: { name: drug.name },
      update: {},
      create: {
        name: drug.name,
        genericName: drug.genericName,
        category: drug.category,
        unit: drug.unit,
        emhsCode: drug.emhsCode,
      },
    });
    drugRecords.push({ ...record, avgDailyUsage: drug.avgDailyUsage });

    const existingThreshold = await prisma.threshold.findFirst({
      where: { drugId: record.id, facilityId: null },
    });

    if (existingThreshold) {
      await prisma.threshold.update({
        where: { id: existingThreshold.id },
        data: { avgDailyUsage: drug.avgDailyUsage },
      });
    } else {
      await prisma.threshold.create({
        data: {
          drugId: record.id,
          lowDays: 14,
          criticalDays: 7,
          avgDailyUsage: drug.avgDailyUsage,
        },
      });
    }
  }

  const statusPattern: StockStatus[] = ['ADEQUATE', 'ADEQUATE', 'LOW', 'CRITICAL', 'STOCKOUT'];

  for (const facility of facilityRecords) {
    for (let i = 0; i < drugRecords.length; i += 1) {
      const drug = drugRecords[i];
      const status = statusPattern[i % statusPattern.length];
      const quantity = quantityForStatus(status, drug.avgDailyUsage);
      const { status: computedStatus, daysRemaining } = calculateStockStatus(quantity, {
        lowDays: 14,
        criticalDays: 7,
        avgDailyUsage: drug.avgDailyUsage,
      });

      await prisma.stockEntry.create({
        data: {
          facilityId: facility.id,
          drugId: drug.id,
          quantity,
          unit: drug.unit,
          reportedById: pharmacist.id,
          status: computedStatus,
          daysRemaining,
          entryDate: new Date(),
        },
      });

      if (computedStatus === 'STOCKOUT' || computedStatus === 'CRITICAL') {
        await prisma.alert.create({
          data: {
            facilityId: facility.id,
            drugId: drug.id,
            drugName: drug.name,
            severity: computedStatus === 'STOCKOUT' ? 'CRITICAL' : 'WARNING',
            type: computedStatus === 'STOCKOUT' ? 'STOCKOUT' : 'STOCK_CRITICAL',
            message: `${drug.name} at ${facility.name} is ${computedStatus === 'STOCKOUT' ? 'out of stock' : 'critically low'}.`,
            status: i % 3 === 0 ? 'ACTIVE' : i % 3 === 1 ? 'ACKNOWLEDGED' : 'RESOLVED',
          },
        });
      }
    }
  }

  console.log('Seed complete. Test accounts (password: Password123!):');
  console.log('  pharmacist@gayaza.ug  — FACILITY_WORKER');
  console.log('  dho@wakiso.ug         — DISTRICT_OFFICER');
  console.log('  admin@nms.ug          — NMS_ADMIN');
  console.log(`  ${drugRecords.length} drugs, ${facilityRecords.length} facilities seeded`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
