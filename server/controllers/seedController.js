import HealthRecord from '../models/HealthRecord.js'

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
        skinLesion: false,
        desquamation: false
      },
      abdomen: {
        softAndNonTender: true,
        distended: false,
        massVisible: false
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
    assessment: 'Healthy female student. Family history of hypertension and diabetes. Advised for regular check-ups and lifestyle modifications.',
    remarks: 'Patient encouraged to maintain regular exercise and healthy diet. Follow-up recommended in 6 months.'
  },
  {
    personalInfo: {
      lastname: 'Santos',
      firstname: 'Juan',
      middlename: 'Reyes',
      age: 22,
      courseAndYear: 'BS Information Technology - 3rd Year',
      birthday: '2003-08-22',
      sex: 'Male',
      permanentAddress: '456 Oak Avenue, Quezon City, Philippines',
      phoneNumber: '09095551234',
      civilStatus: 'Single',
      religion: 'Roman Catholic',
      contactPerson: 'Rosa Santos',
      contactAddress: '456 Oak Avenue, Quezon City, Philippines',
      contactNumber: '09215556789'
    },
    pastMedicalHistory: {
      chickenPox: true,
      mumps: true,
      measles: false,
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
      diabetes: false,
      bronchialAsthma: false,
      thyroidDisease: false,
      cancer: false,
      autoimmuneDisease: false,
      heartDisease: false
    },
    immunizationHistory: {
      mmr: true,
      antiRabies: true,
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
        numberOfBottles: '1-2',
        frequency: 'Occasional (1-2x per month)'
      },
      illicitDrugUser: {
        isUser: false,
        typeOfDrug: ''
      }
    },
    maternalMenstrualHistory: {
      numberOfPregnancy: 'N/A',
      numberOfAlive: 'N/A',
      numberOfStillBirth: 'N/A',
      gynePathology: 'N/A',
      lmp: 'N/A',
      menarche: 'N/A',
      interval: 'N/A',
      duration: 'N/A',
      amount: 'N/A',
      symptoms: 'N/A'
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
        skinLesion: false,
        desquamation: false
      },
      abdomen: {
        softAndNonTender: true,
        distended: false,
        massVisible: false
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
    assessment: 'Healthy male student. History of bone fracture (healed). Occasional alcohol consumption noted. No significant findings.',
    remarks: 'Patient advised to avoid smoking and limit alcohol consumption. Continue regular physical activity.'
  }
]

export const seedDatabase = async (req, res) => {
  try {
    // Optional: Verify seed secret if provided in headers
    const seedSecret = req.headers['x-seed-secret']
    const expectedSecret = process.env.SEED_SECRET

    if (expectedSecret && seedSecret !== expectedSecret) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Invalid or missing seed secret.'
      })
    }

    // Check if records already exist (prevent accidental overwrites)
    const existingCount = await HealthRecord.countDocuments()
    if (existingCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Database already contains ${existingCount} records. Use ?force=true to overwrite (not recommended).`,
        existingCount
      })
    }

    // Insert sample records
    const result = await HealthRecord.insertMany(sampleRecords)

    res.json({
      success: true,
      message: `Successfully seeded database with ${result.length} sample health records`,
      insertedCount: result.length,
      records: result.map(record => ({
        id: record._id,
        name: `${record.personalInfo.firstname} ${record.personalInfo.lastname}`,
        courseAndYear: record.personalInfo.courseAndYear
      }))
    })
  } catch (error) {
    console.error('Error seeding database:', error)
    res.status(500).json({
      success: false,
      message: 'Error seeding database',
      error: error.message
    })
  }
}

export const seedDatabaseForce = async (req, res) => {
  try {
    // Optional: Verify seed secret if provided in headers
    const seedSecret = req.headers['x-seed-secret']
    const expectedSecret = process.env.SEED_SECRET

    if (expectedSecret && seedSecret !== expectedSecret) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Invalid or missing seed secret.'
      })
    }

    // Clear existing records
    const deleteResult = await HealthRecord.deleteMany({})
    console.log(`Cleared ${deleteResult.deletedCount} existing records`)

    // Insert sample records
    const result = await HealthRecord.insertMany(sampleRecords)

    res.json({
      success: true,
      message: `Successfully reseeded database with ${result.length} sample health records`,
      deletedCount: deleteResult.deletedCount,
      insertedCount: result.length,
      records: result.map(record => ({
        id: record._id,
        name: `${record.personalInfo.firstname} ${record.personalInfo.lastname}`,
        courseAndYear: record.personalInfo.courseAndYear
      }))
    })
  } catch (error) {
    console.error('Error reseeding database:', error)
    res.status(500).json({
      success: false,
      message: 'Error reseeding database',
      error: error.message
    })
  }
}
