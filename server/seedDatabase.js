import mongoose from 'mongoose'
import dotenv from 'dotenv'
import HealthRecord from './models/HealthRecord.js'

dotenv.config()

const sampleRecords = [
  {
    personalInfo: {
      lastname: 'Dela Cruz',
      firstname: 'Maria',
      middlename: 'Santos',
      age: 20,
      courseAndYear: 'BS Nursing - 2nd Year',
      birthday: '2005-05-15',
      sex: 'Female',
      permanentAddress: '123 Main Street, Manila, Philippines',
      phoneNumber: '09171234567',
      civilStatus: 'Single',
      religion: 'Roman Catholic',
      contactPerson: 'Juan Dela Cruz',
      contactAddress: '123 Main Street, Manila, Philippines',
      contactNumber: '09189876543'
    },
    pastMedicalHistory: {
      chickenPox: true,
      mumps: false,
      measles: true,
      tuberculosis: false,
      hepatitis: false,
      hypertension: false,
      diabetes: false,
      bronchialAsthma: true,
      pepticUlcer: false,
      epilepsy: false,
      thyroidDisease: false,
      heartDisease: false,
      previousBloodTransfusion: false,
      cancer: false,
      useOfAnticoagulants: false,
      boneFracture: false
    },
    familyMedicalHistory: {
      hypertension: true,
      diabetes: true,
      bronchialAsthma: false,
      thyroidDisease: false,
      cancer: false,
      autoimmuneDisease: false,
      heartDisease: true
    },
    immunizationHistory: {
      mmr: true,
      antiRabies: false,
      hepatitisVaccine: true,
      antiTetanus: true,
      fluVaccine: true,
      ppv23: false,
      antiCovid19Vaccine: true
    },
    personalSocialHistory: {
      smoker: {
        isSmoker: false,
        sticksPerDay: '',
        years: ''
      },
      alcoholDrinker: {
        isDrinker: false,
        typeOfAlcohol: '',
        numberOfBottles: '',
        frequency: ''
      },
      illicitDrugUser: {
        isUser: false,
        typeOfDrug: ''
      }
    },
    maternalMenstrualHistory: {
      numberOfPregnancy: '0',
      numberOfAlive: '0',
      numberOfStillBirth: '0',
      gynePathology: 'None',
      lmp: '2026-01-15',
      menarche: '13 years old',
      interval: '28-30 days',
      duration: '5-6 days',
      amount: 'Moderate',
      symptoms: 'Mild cramping'
    },
    physicalExamination: {
      generalSurvey: {
        conscious: true,
        coherent: true,
        afebrile: true,
        febrile: false,
        notInCPD: true
      },
      integumentary: {
        pallor: false,
        jaundice: false,
        cyanosis: false,
        warmToTouch: true
      },
      chest: {
        retractions: false,
        symmetricalChestExpansion: true,
        asymmetricalChestExpansion: false,
        rales: false,
        wheezes: false
      },
      heart: {
        adynamic: false,
        precordium: false,
        pmiAt: '5th ICS MCL',
        tachycardic: false,
        irregularRhythm: false,
        regularRhythm: true,
        murmur: false
      },
      abdomen: {
        scar: false,
        flat: true,
        flabby: false,
        globular: false,
        scaphoid: false,
        dull: false,
        tympanitic: false,
        nonTender: true,
        tender: false,
        organomegaly: false,
        nabs: true
      },
      vitalSigns: {
        bp: '110/70',
        rr: '18',
        temp: '36.5',
        hr: '72',
        weight: '52',
        height: '160',
        bmi: '20.3',
        interpretation: 'Normal'
      },
      heent: {
        symmetric: true,
        asymmetric: false,
        alarFlaring: false,
        anicteric: true,
        pinkOralMucosa: true,
        paleOralMucosa: false,
        clad: false
      },
      extremities: {
        grossDeformities: false,
        edema: false
      },
      visualAcuity: {
        od: '20/20',
        os: '20/20',
        ou: '20/20'
      }
    },
    assessment: 'Generally healthy. History of asthma - well controlled with medication. Family history of hypertension and diabetes - advised for regular monitoring.',
    remarks: 'Patient is advised to maintain healthy lifestyle, continue asthma medication as prescribed, and return for annual check-up.'
  },
  {
    personalInfo: {
      lastname: 'Garcia',
      firstname: 'Carlos',
      middlename: 'Reyes',
      age: 22,
      courseAndYear: 'BS Computer Science - 4th Year',
      birthday: '2003-11-20',
      sex: 'Male',
      permanentAddress: '456 University Avenue, Quezon City, Philippines',
      phoneNumber: '09261234567',
      civilStatus: 'Single',
      religion: 'Christian',
      contactPerson: 'Rosa Garcia',
      contactAddress: '456 University Avenue, Quezon City, Philippines',
      contactNumber: '09178765432'
    },
    pastMedicalHistory: {
      chickenPox: true,
      mumps: true,
      measles: true,
      tuberculosis: false,
      hepatitis: false,
      hypertension: false,
      diabetes: false,
      bronchialAsthma: false,
      pepticUlcer: false,
      epilepsy: false,
      thyroidDisease: false,
      heartDisease: false,
      previousBloodTransfusion: false,
      cancer: false,
      useOfAnticoagulants: false,
      boneFracture: true
    },
    familyMedicalHistory: {
      hypertension: false,
      diabetes: true,
      bronchialAsthma: false,
      thyroidDisease: false,
      cancer: false,
      autoimmuneDisease: false,
      heartDisease: false
    },
    immunizationHistory: {
      mmr: true,
      antiRabies: false,
      hepatitisVaccine: true,
      antiTetanus: true,
      fluVaccine: false,
      ppv23: false,
      antiCovid19Vaccine: true
    },
    personalSocialHistory: {
      smoker: {
        isSmoker: false,
        sticksPerDay: '',
        years: ''
      },
      alcoholDrinker: {
        isDrinker: true,
        typeOfAlcohol: 'Beer',
        numberOfBottles: '2-3',
        frequency: 'Occasionally (weekends)'
      },
      illicitDrugUser: {
        isUser: false,
        typeOfDrug: ''
      }
    },
    maternalMenstrualHistory: {
      numberOfPregnancy: '',
      numberOfAlive: '',
      numberOfStillBirth: '',
      gynePathology: 'N/A',
      lmp: '',
      menarche: '',
      interval: '',
      duration: '',
      amount: '',
      symptoms: ''
    },
    physicalExamination: {
      generalSurvey: {
        conscious: true,
        coherent: true,
        afebrile: true,
        febrile: false,
        notInCPD: true
      },
      integumentary: {
        pallor: false,
        jaundice: false,
        cyanosis: false,
        warmToTouch: true
      },
      chest: {
        retractions: false,
        symmetricalChestExpansion: true,
        asymmetricalChestExpansion: false,
        rales: false,
        wheezes: false
      },
      heart: {
        adynamic: false,
        precordium: false,
        pmiAt: '5th ICS MCL',
        tachycardic: false,
        irregularRhythm: false,
        regularRhythm: true,
        murmur: false
      },
      abdomen: {
        scar: false,
        flat: true,
        flabby: false,
        globular: false,
        scaphoid: false,
        dull: false,
        tympanitic: false,
        nonTender: true,
        tender: false,
        organomegaly: false,
        nabs: true
      },
      vitalSigns: {
        bp: '120/80',
        rr: '16',
        temp: '36.8',
        hr: '68',
        weight: '68',
        height: '175',
        bmi: '22.2',
        interpretation: 'Normal'
      },
      heent: {
        symmetric: true,
        asymmetric: false,
        alarFlaring: false,
        anicteric: true,
        pinkOralMucosa: true,
        paleOralMucosa: false,
        clad: false
      },
      extremities: {
        grossDeformities: false,
        edema: false
      },
      visualAcuity: {
        od: '20/30',
        os: '20/30',
        ou: '20/30'
      }
    },
    assessment: 'Healthy male student. History of bone fracture (healed). Mild myopia noted. Family history of diabetes - advised for lifestyle modifications.',
    remarks: 'Patient advised to get eyeglasses for better vision. Recommended to limit alcohol consumption and maintain regular exercise.'
  }
]

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing records (optional)
    await HealthRecord.deleteMany({})
    console.log('Cleared existing records')

    // Insert sample records
    const result = await HealthRecord.insertMany(sampleRecords)
    console.log(`Successfully inserted ${result.length} sample health records`)

    console.log('\nSample Records:')
    result.forEach((record, index) => {
      console.log(`${index + 1}. ${record.personalInfo.firstname} ${record.personalInfo.lastname} - ${record.personalInfo.courseAndYear}`)
    })

    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
