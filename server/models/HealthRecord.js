import mongoose from 'mongoose'

const healthRecordSchema = new mongoose.Schema({
  personalInfo: {
    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
    middlename: String,
    age: { type: Number, required: true },
    courseAndYear: { type: String, required: true },
    birthday: { type: Date, required: true },
    sex: { type: String, required: true, enum: ['Male', 'Female'] },
    permanentAddress: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    civilStatus: String,
    religion: String,
    contactPerson: String,
    contactAddress: String,
    contactNumber: String
  },
  pastMedicalHistory: {
    chickenPox: { type: Boolean, default: false },
    mumps: { type: Boolean, default: false },
    measles: { type: Boolean, default: false },
    tuberculosis: { type: Boolean, default: false },
    hepatitis: { type: Boolean, default: false },
    hypertension: { type: Boolean, default: false },
    diabetes: { type: Boolean, default: false },
    bronchialAsthma: { type: Boolean, default: false },
    pepticUlcer: { type: Boolean, default: false },
    epilepsy: { type: Boolean, default: false },
    thyroidDisease: { type: Boolean, default: false },
    heartDisease: { type: Boolean, default: false },
    previousBloodTransfusion: { type: Boolean, default: false },
    cancer: { type: Boolean, default: false },
    useOfAnticoagulants: { type: Boolean, default: false },
    boneFracture: { type: Boolean, default: false }
  },
  familyMedicalHistory: {
    hypertension: { type: Boolean, default: false },
    diabetes: { type: Boolean, default: false },
    bronchialAsthma: { type: Boolean, default: false },
    thyroidDisease: { type: Boolean, default: false },
    cancer: { type: Boolean, default: false },
    autoimmuneDisease: { type: Boolean, default: false },
    heartDisease: { type: Boolean, default: false }
  },
  immunizationHistory: {
    mmr: { type: Boolean, default: false },
    antiRabies: { type: Boolean, default: false },
    hepatitisVaccine: { type: Boolean, default: false },
    antiTetanus: { type: Boolean, default: false },
    fluVaccine: { type: Boolean, default: false },
    ppv23: { type: Boolean, default: false },
    antiCovid19Vaccine: { type: Boolean, default: false }
  },
  personalSocialHistory: {
    smoker: {
      isSmoker: { type: Boolean, default: false },
      sticksPerDay: String,
      years: String
    },
    alcoholDrinker: {
      isDrinker: { type: Boolean, default: false },
      typeOfAlcohol: String,
      numberOfBottles: String,
      frequency: String
    },
    illicitDrugUser: {
      isUser: { type: Boolean, default: false },
      typeOfDrug: String
    }
  },
  maternalMenstrualHistory: {
    numberOfPregnancy: String,
    numberOfAlive: String,
    numberOfStillBirth: String,
    gynePathology: String,
    lmp: String,
    menarche: String,
    interval: String,
    duration: String,
    amount: String,
    symptoms: String
  },
  physicalExamination: {
    generalSurvey: {
      conscious: { type: Boolean, default: false },
      coherent: { type: Boolean, default: false },
      afebrile: { type: Boolean, default: false },
      febrile: { type: Boolean, default: false },
      notInCPD: { type: Boolean, default: false }
    },
    integumentary: {
      pallor: { type: Boolean, default: false },
      jaundice: { type: Boolean, default: false },
      cyanosis: { type: Boolean, default: false },
      warmToTouch: { type: Boolean, default: false }
    },
    chest: {
      retractions: { type: Boolean, default: false },
      symmetricalChestExpansion: { type: Boolean, default: false },
      asymmetricalChestExpansion: { type: Boolean, default: false },
      rales: { type: Boolean, default: false },
      wheezes: { type: Boolean, default: false }
    },
    heart: {
      adynamic: { type: Boolean, default: false },
      precordium: { type: Boolean, default: false },
      pmiAt: String,
      tachycardic: { type: Boolean, default: false },
      irregularRhythm: { type: Boolean, default: false },
      regularRhythm: { type: Boolean, default: false },
      murmur: { type: Boolean, default: false }
    },
    abdomen: {
      scar: { type: Boolean, default: false },
      flat: { type: Boolean, default: false },
      flabby: { type: Boolean, default: false },
      globular: { type: Boolean, default: false },
      scaphoid: { type: Boolean, default: false },
      dull: { type: Boolean, default: false },
      tympanitic: { type: Boolean, default: false },
      nonTender: { type: Boolean, default: false },
      tender: { type: Boolean, default: false },
      organomegaly: { type: Boolean, default: false },
      nabs: { type: Boolean, default: false }
    },
    vitalSigns: {
      bp: String,
      rr: String,
      temp: String,
      hr: String,
      weight: String,
      height: String,
      bmi: String,
      interpretation: String
    },
    heent: {
      symmetric: { type: Boolean, default: false },
      asymmetric: { type: Boolean, default: false },
      alarFlaring: { type: Boolean, default: false },
      anicteric: { type: Boolean, default: false },
      pinkOralMucosa: { type: Boolean, default: false },
      paleOralMucosa: { type: Boolean, default: false },
      clad: { type: Boolean, default: false }
    },
    extremities: {
      grossDeformities: { type: Boolean, default: false },
      edema: { type: Boolean, default: false }
    },
    visualAcuity: {
      od: String,
      os: String,
      ou: String
    }
  },
  assessment: String,
  remarks: String
}, {
  timestamps: true
})

const HealthRecord = mongoose.model('HealthRecord', healthRecordSchema)

export default HealthRecord
