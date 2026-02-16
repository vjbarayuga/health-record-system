import React, { useState, useEffect } from 'react'
import { createHealthRecord, updateHealthRecord } from '../services/api'

const HealthRecordForm = ({ record, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    // Personal Information
    personalInfo: {
      lastname: '',
      firstname: '',
      middlename: '',
      age: '',
      courseAndYear: '',
      birthday: '',
      sex: '',
      permanentAddress: '',
      phoneNumber: '',
      civilStatus: '',
      religion: '',
      contactPerson: '',
      contactAddress: '',
      contactNumber: ''
    },
    // Health Information - Past Medical History
    pastMedicalHistory: {
      chickenPox: false,
      mumps: false,
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
      boneFracture: false
    },
    // Family Medical History
    familyMedicalHistory: {
      hypertension: false,
      diabetes: false,
      bronchialAsthma: false,
      thyroidDisease: false,
      cancer: false,
      autoimmuneDisease: false,
      heartDisease: false
    },
    // Immunization History
    immunizationHistory: {
      mmr: false,
      antiRabies: false,
      hepatitisVaccine: false,
      antiTetanus: false,
      fluVaccine: false,
      ppv23: false,
      antiCovid19Vaccine: false
    },
    // Personal Social History
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
    // Maternal and Menstrual History
    maternalMenstrualHistory: {
      numberOfPregnancy: '',
      numberOfAlive: '',
      numberOfStillBirth: '',
      gynePathology: '',
      lmp: '',
      menarche: '',
      interval: '',
      duration: '',
      amount: '',
      symptoms: ''
    },
    // Physical Examination
    physicalExamination: {
      generalSurvey: {
        conscious: false,
        coherent: false,
        afebrile: false,
        febrile: false,
        notInCPD: false
      },
      integumentary: {
        pallor: false,
        jaundice: false,
        cyanosis: false,
        warmToTouch: false
      },
      chest: {
        retractions: false,
        symmetricalChestExpansion: false,
        asymmetricalChestExpansion: false,
        rales: false,
        wheezes: false
      },
      heart: {
        adynamic: false,
        precordium: false,
        pmiAt: '',
        tachycardic: false,
        irregularRhythm: false,
        regularRhythm: false,
        murmur: false
      },
      abdomen: {
        scar: false,
        flat: false,
        flabby: false,
        globular: false,
        scaphoid: false,
        dull: false,
        tympanitic: false,
        nonTender: false,
        tender: false,
        organomegaly: false,
        nabs: false
      },
      vitalSigns: {
        bp: '',
        rr: '',
        temp: '',
        hr: '',
        weight: '',
        height: '',
        bmi: '',
        interpretation: ''
      },
      heent: {
        symmetric: false,
        asymmetric: false,
        alarFlaring: false,
        anicteric: false,
        pinkOralMucosa: false,
        paleOralMucosa: false,
        clad: false
      },
      extremities: {
        grossDeformities: false,
        edema: false
      },
      visualAcuity: {
        od: '',
        os: '',
        ou: ''
      }
    },
    // Assessment and Remarks
    assessment: '',
    remarks: ''
  })

  useEffect(() => {
    if (record) {
      // Format dates to yyyy-MM-dd for date inputs
      const formattedRecord = {
        ...record,
        personalInfo: {
          ...record.personalInfo,
          birthday: record.personalInfo.birthday ? record.personalInfo.birthday.split('T')[0] : ''
        }
      }
      setFormData(formattedRecord)
    }
  }, [record])

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [name]: value
      }
    })
  }

  const handleCheckboxChange = (section, field) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: !formData[section][field]
      }
    })
  }

  const handleNestedChange = (section, subsection, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [subsection]: {
          ...formData[section][subsection],
          [field]: value
        }
      }
    })
  }

  const handleSimpleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (record && record._id) {
        await updateHealthRecord(record._id, formData)
      } else {
        await createHealthRecord(formData)
      }
      onSuccess()
    } catch (error) {
      console.error('Error saving record:', error)
      alert('Error saving record. Please try again.')
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold text-ispsc-maroon mb-6 pb-3 border-b-2 border-ispsc-maroon">
        {record ? '✏️ Edit Health Record' : '📝 Student Health Record Form'}
      </h2>

      {/* Personal Information */}
      <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-bold text-ispsc-maroon mb-4 flex items-center gap-2">
          <span>👤</span> Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Lastname *</label>
            <input
              type="text"
              name="lastname"
              value={formData.personalInfo.lastname}
              onChange={handlePersonalInfoChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Firstname *</label>
            <input
              type="text"
              name="firstname"
              value={formData.personalInfo.firstname}
              onChange={handlePersonalInfoChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Middlename</label>
            <input
              type="text"
              name="middlename"
              value={formData.personalInfo.middlename}
              onChange={handlePersonalInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Age *</label>
            <input
              type="number"
              name="age"
              value={formData.personalInfo.age}
              onChange={handlePersonalInfoChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Course and Year *</label>
            <input
              type="text"
              name="courseAndYear"
              value={formData.personalInfo.courseAndYear}
              onChange={handlePersonalInfoChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Birthday *</label>
            <input
              type="date"
              name="birthday"
              value={formData.personalInfo.birthday}
              onChange={handlePersonalInfoChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Sex *</label>
            <select
              name="sex"
              value={formData.personalInfo.sex}
              onChange={handlePersonalInfoChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all bg-white"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Permanent Address *</label>
            <input
              type="text"
              name="permanentAddress"
              value={formData.personalInfo.permanentAddress}
              onChange={handlePersonalInfoChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.personalInfo.phoneNumber}
              onChange={handlePersonalInfoChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Civil Status</label>
            <select
              name="civilStatus"
              value={formData.personalInfo.civilStatus}
              onChange={handlePersonalInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all bg-white"
            >
              <option value="">Select</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Widowed">Widowed</option>
              <option value="Separated">Separated</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Religion</label>
            <input
              type="text"
              name="religion"
              value={formData.personalInfo.religion}
              onChange={handlePersonalInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Person</label>
            <input
              type="text"
              name="contactPerson"
              value={formData.personalInfo.contactPerson}
              onChange={handlePersonalInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Address</label>
            <input
              type="text"
              name="contactAddress"
              value={formData.personalInfo.contactAddress}
              onChange={handlePersonalInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.personalInfo.contactNumber}
              onChange={handlePersonalInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
            />
          </div>
        </div>
      </section>

      {/* Past Medical History */}
      <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-bold text-ispsc-maroon mb-4 flex items-center gap-2">
          <span>🏥</span> Past Medical History
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.keys(formData.pastMedicalHistory).map((key) => (
            <label key={key} className="flex items-center gap-2 p-2 hover:bg-white rounded cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={formData.pastMedicalHistory[key]}
                onChange={() => handleCheckboxChange('pastMedicalHistory', key)}
                className="w-4 h-4 text-ispsc-maroon accent-ispsc-maroon rounded focus:ring-2 focus:ring-ispsc-maroon/20"
              />
              <span className="text-sm text-gray-700">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Family Medical History */}
      <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-bold text-ispsc-maroon mb-4 flex items-center gap-2">
          <span>👨‍👩‍👧‍👦</span> Family Medical History
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.keys(formData.familyMedicalHistory).map((key) => (
            <label key={key} className="flex items-center gap-2 p-2 hover:bg-white rounded cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={formData.familyMedicalHistory[key]}
                onChange={() => handleCheckboxChange('familyMedicalHistory', key)}
                className="w-4 h-4 text-ispsc-maroon accent-ispsc-maroon rounded focus:ring-2 focus:ring-ispsc-maroon/20"
              />
              <span className="text-sm text-gray-700">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Immunization History */}
      <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-bold text-ispsc-maroon mb-4 flex items-center gap-2">
          <span>💉</span> Immunization History
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.keys(formData.immunizationHistory).map((key) => (
            <label key={key} className="flex items-center gap-2 p-2 hover:bg-white rounded cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={formData.immunizationHistory[key]}
                onChange={() => handleCheckboxChange('immunizationHistory', key)}
                className="w-4 h-4 text-ispsc-maroon accent-ispsc-maroon rounded focus:ring-2 focus:ring-ispsc-maroon/20"
              />
              <span className="text-sm text-gray-700">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).toUpperCase()}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Personal Social History */}
      <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-bold text-ispsc-maroon mb-4 flex items-center gap-2">
          <span>🚬</span> Personal Social History
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Smoker</h4>
            <label className="flex items-center gap-2 p-2 hover:bg-white rounded cursor-pointer transition-colors mb-3">
              <input
                type="checkbox"
                checked={formData.personalSocialHistory.smoker.isSmoker}
                onChange={(e) => handleNestedChange('personalSocialHistory', 'smoker', 'isSmoker', e.target.checked)}
                className="w-4 h-4 text-ispsc-maroon accent-ispsc-maroon rounded focus:ring-2 focus:ring-ispsc-maroon/20"
              />
              <span className="text-sm text-gray-700">Is a smoker</span>
            </label>
            {formData.personalSocialHistory.smoker.isSmoker && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Sticks per day</label>
                  <input
                    type="number"
                    value={formData.personalSocialHistory.smoker.sticksPerDay}
                    onChange={(e) => handleNestedChange('personalSocialHistory', 'smoker', 'sticksPerDay', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Years</label>
                  <input
                    type="number"
                    value={formData.personalSocialHistory.smoker.years}
                    onChange={(e) => handleNestedChange('personalSocialHistory', 'smoker', 'years', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Alcohol Drinker</h4>
            <label className="flex items-center gap-2 p-2 hover:bg-white rounded cursor-pointer transition-colors mb-3">
              <input
                type="checkbox"
                checked={formData.personalSocialHistory.alcoholDrinker.isDrinker}
                onChange={(e) => handleNestedChange('personalSocialHistory', 'alcoholDrinker', 'isDrinker', e.target.checked)}
                className="w-4 h-4 text-ispsc-maroon accent-ispsc-maroon rounded focus:ring-2 focus:ring-ispsc-maroon/20"
              />
              <span className="text-sm text-gray-700">Is an alcohol drinker</span>
            </label>
            {formData.personalSocialHistory.alcoholDrinker.isDrinker && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Type of alcohol</label>
                  <input
                    type="text"
                    value={formData.personalSocialHistory.alcoholDrinker.typeOfAlcohol}
                    onChange={(e) => handleNestedChange('personalSocialHistory', 'alcoholDrinker', 'typeOfAlcohol', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Number of bottles</label>
                  <input
                    type="number"
                    value={formData.personalSocialHistory.alcoholDrinker.numberOfBottles}
                    onChange={(e) => handleNestedChange('personalSocialHistory', 'alcoholDrinker', 'numberOfBottles', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Frequency</label>
                  <input
                    type="text"
                    value={formData.personalSocialHistory.alcoholDrinker.frequency}
                    onChange={(e) => handleNestedChange('personalSocialHistory', 'alcoholDrinker', 'frequency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Illicit Drug User</h4>
            <label className="flex items-center gap-2 p-2 hover:bg-white rounded cursor-pointer transition-colors mb-3">
              <input
                type="checkbox"
                checked={formData.personalSocialHistory.illicitDrugUser.isUser}
                onChange={(e) => handleNestedChange('personalSocialHistory', 'illicitDrugUser', 'isUser', e.target.checked)}
                className="w-4 h-4 text-ispsc-maroon accent-ispsc-maroon rounded focus:ring-2 focus:ring-ispsc-maroon/20"
              />
              <span className="text-sm text-gray-700">Is an illicit drug user</span>
            </label>
            {formData.personalSocialHistory.illicitDrugUser.isUser && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Type of drug</label>
                <input
                  type="text"
                  value={formData.personalSocialHistory.illicitDrugUser.typeOfDrug}
                  onChange={(e) => handleNestedChange('personalSocialHistory', 'illicitDrugUser', 'typeOfDrug', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Maternal and Menstrual History */}
      <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-bold text-ispsc-maroon mb-4 flex items-center gap-2">
          <span>🤰</span> Maternal and Menstrual History
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Pregnancy</label>
            <input
              type="number"
              value={formData.maternalMenstrualHistory.numberOfPregnancy}
              onChange={(e) => setFormData({
                ...formData,
                maternalMenstrualHistory: {
                  ...formData.maternalMenstrualHistory,
                  numberOfPregnancy: e.target.value
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Alive</label>
            <input
              type="number"
              value={formData.maternalMenstrualHistory.numberOfAlive}
              onChange={(e) => setFormData({
                ...formData,
                maternalMenstrualHistory: {
                  ...formData.maternalMenstrualHistory,
                  numberOfAlive: e.target.value
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Still Birth</label>
            <input
              type="number"
              value={formData.maternalMenstrualHistory.numberOfStillBirth}
              onChange={(e) => setFormData({
                ...formData,
                maternalMenstrualHistory: {
                  ...formData.maternalMenstrualHistory,
                  numberOfStillBirth: e.target.value
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Gyne Pathology</label>
            <input
              type="text"
              value={formData.maternalMenstrualHistory.gynePathology}
              onChange={(e) => setFormData({
                ...formData,
                maternalMenstrualHistory: {
                  ...formData.maternalMenstrualHistory,
                  gynePathology: e.target.value
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">LMP (Last Menstrual Period)</label>
            <input
              type="date"
              value={formData.maternalMenstrualHistory.lmp}
              onChange={(e) => setFormData({
                ...formData,
                maternalMenstrualHistory: {
                  ...formData.maternalMenstrualHistory,
                  lmp: e.target.value
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Menarche</label>
            <input
              type="text"
              value={formData.maternalMenstrualHistory.menarche}
              onChange={(e) => setFormData({
                ...formData,
                maternalMenstrualHistory: {
                  ...formData.maternalMenstrualHistory,
                  menarche: e.target.value
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Interval</label>
            <input
              type="text"
              value={formData.maternalMenstrualHistory.interval}
              onChange={(e) => setFormData({
                ...formData,
                maternalMenstrualHistory: {
                  ...formData.maternalMenstrualHistory,
                  interval: e.target.value
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Duration</label>
            <input
              type="text"
              value={formData.maternalMenstrualHistory.duration}
              onChange={(e) => setFormData({
                ...formData,
                maternalMenstrualHistory: {
                  ...formData.maternalMenstrualHistory,
                  duration: e.target.value
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Amount</label>
            <input
              type="text"
              value={formData.maternalMenstrualHistory.amount}
              onChange={(e) => setFormData({
                ...formData,
                maternalMenstrualHistory: {
                  ...formData.maternalMenstrualHistory,
                  amount: e.target.value
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Symptoms</label>
            <input
              type="text"
              value={formData.maternalMenstrualHistory.symptoms}
              onChange={(e) => setFormData({
                ...formData,
                maternalMenstrualHistory: {
                  ...formData.maternalMenstrualHistory,
                  symptoms: e.target.value
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
            />
          </div>
        </div>
      </section>

      {/* Physical Examination */}
      <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-bold text-ispsc-maroon mb-4 flex items-center gap-2">
          <span>🩺</span> Physical Examination (to be filled by health provider)
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">General Survey</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {Object.keys(formData.physicalExamination.generalSurvey).map((key) => (
                <label key={key} className="flex items-center gap-2 p-2 hover:bg-white rounded cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.physicalExamination.generalSurvey[key]}
                    onChange={() => handleNestedChange('physicalExamination', 'generalSurvey', key, !formData.physicalExamination.generalSurvey[key])}
                    className="w-4 h-4 text-ispsc-maroon accent-ispsc-maroon rounded focus:ring-2 focus:ring-ispsc-maroon/20"
                  />
                  <span className="text-sm text-gray-700">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Integumentary</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {Object.keys(formData.physicalExamination.integumentary).map((key) => (
                <label key={key} className="flex items-center gap-2 p-2 hover:bg-white rounded cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.physicalExamination.integumentary[key]}
                    onChange={() => handleNestedChange('physicalExamination', 'integumentary', key, !formData.physicalExamination.integumentary[key])}
                    className="w-4 h-4 text-ispsc-maroon accent-ispsc-maroon rounded focus:ring-2 focus:ring-ispsc-maroon/20"
                  />
                  <span className="text-sm text-gray-700">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Chest</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {Object.keys(formData.physicalExamination.chest).map((key) => (
                <label key={key} className="flex items-center gap-2 p-2 hover:bg-white rounded cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.physicalExamination.chest[key]}
                    onChange={() => handleNestedChange('physicalExamination', 'chest', key, !formData.physicalExamination.chest[key])}
                    className="w-4 h-4 text-ispsc-maroon accent-ispsc-maroon rounded focus:ring-2 focus:ring-ispsc-maroon/20"
                  />
                  <span className="text-sm text-gray-700">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Heart</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
              {Object.keys(formData.physicalExamination.heart).filter(k => k !== 'pmiAt').map((key) => (
                <label key={key} className="flex items-center gap-2 p-2 hover:bg-white rounded cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.physicalExamination.heart[key]}
                    onChange={() => handleNestedChange('physicalExamination', 'heart', key, !formData.physicalExamination.heart[key])}
                    className="w-4 h-4 text-ispsc-maroon accent-ispsc-maroon rounded focus:ring-2 focus:ring-ispsc-maroon/20"
                  />
                  <span className="text-sm text-gray-700">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                </label>
              ))}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">PMI at __ ICS MCL</label>
              <input
                type="text"
                value={formData.physicalExamination.heart.pmiAt}
                onChange={(e) => handleNestedChange('physicalExamination', 'heart', 'pmiAt', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Abdomen</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {Object.keys(formData.physicalExamination.abdomen).map((key) => (
                <label key={key} className="flex items-center gap-2 p-2 hover:bg-white rounded cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.physicalExamination.abdomen[key]}
                    onChange={() => handleNestedChange('physicalExamination', 'abdomen', key, !formData.physicalExamination.abdomen[key])}
                    className="w-4 h-4 text-ispsc-maroon accent-ispsc-maroon rounded focus:ring-2 focus:ring-ispsc-maroon/20"
                  />
                  <span className="text-sm text-gray-700">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).toUpperCase()}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Vital Signs</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Blood Pressure</label>
                <input
                  type="text"
                  value={formData.physicalExamination.vitalSigns.bp}
                  onChange={(e) => handleNestedChange('physicalExamination', 'vitalSigns', 'bp', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Respiratory Rate</label>
                <input
                  type="text"
                  value={formData.physicalExamination.vitalSigns.rr}
                  onChange={(e) => handleNestedChange('physicalExamination', 'vitalSigns', 'rr', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Temperature</label>
                <input
                  type="text"
                  value={formData.physicalExamination.vitalSigns.temp}
                  onChange={(e) => handleNestedChange('physicalExamination', 'vitalSigns', 'temp', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Heart Rate</label>
                <input
                  type="text"
                  value={formData.physicalExamination.vitalSigns.hr}
                  onChange={(e) => handleNestedChange('physicalExamination', 'vitalSigns', 'hr', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Weight (kg)</label>
                <input
                  type="text"
                  value={formData.physicalExamination.vitalSigns.weight}
                  onChange={(e) => handleNestedChange('physicalExamination', 'vitalSigns', 'weight', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Height (cm)</label>
                <input
                  type="text"
                  value={formData.physicalExamination.vitalSigns.height}
                  onChange={(e) => handleNestedChange('physicalExamination', 'vitalSigns', 'height', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">BMI</label>
                <input
                  type="text"
                  value={formData.physicalExamination.vitalSigns.bmi}
                  onChange={(e) => handleNestedChange('physicalExamination', 'vitalSigns', 'bmi', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Interpretation</label>
                <input
                  type="text"
                  value={formData.physicalExamination.vitalSigns.interpretation}
                  onChange={(e) => handleNestedChange('physicalExamination', 'vitalSigns', 'interpretation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">HEENT</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {Object.keys(formData.physicalExamination.heent).map((key) => (
                <label key={key} className="flex items-center gap-2 p-2 hover:bg-white rounded cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.physicalExamination.heent[key]}
                    onChange={() => handleNestedChange('physicalExamination', 'heent', key, !formData.physicalExamination.heent[key])}
                    className="w-4 h-4 text-ispsc-maroon accent-ispsc-maroon rounded focus:ring-2 focus:ring-ispsc-maroon/20"
                  />
                  <span className="text-sm text-gray-700">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).toUpperCase()}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Extremities</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {Object.keys(formData.physicalExamination.extremities).map((key) => (
                <label key={key} className="flex items-center gap-2 p-2 hover:bg-white rounded cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.physicalExamination.extremities[key]}
                    onChange={() => handleNestedChange('physicalExamination', 'extremities', key, !formData.physicalExamination.extremities[key])}
                    className="w-4 h-4 text-ispsc-maroon accent-ispsc-maroon rounded focus:ring-2 focus:ring-ispsc-maroon/20"
                  />
                  <span className="text-sm text-gray-700">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Visual Acuity</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">OD (Right Eye)</label>
                <input
                  type="text"
                  value={formData.physicalExamination.visualAcuity.od}
                  onChange={(e) => handleNestedChange('physicalExamination', 'visualAcuity', 'od', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">OS (Left Eye)</label>
                <input
                  type="text"
                  value={formData.physicalExamination.visualAcuity.os}
                  onChange={(e) => handleNestedChange('physicalExamination', 'visualAcuity', 'os', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">OU (Both Eyes)</label>
                <input
                  type="text"
                  value={formData.physicalExamination.visualAcuity.ou}
                  onChange={(e) => handleNestedChange('physicalExamination', 'visualAcuity', 'ou', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment and Remarks */}
      <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-bold text-ispsc-maroon mb-4 flex items-center gap-2">
          <span>📋</span> Assessment and Remarks
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Assessment</label>
            <textarea
              rows="4"
              value={formData.assessment}
              onChange={(e) => handleSimpleChange('assessment', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Remarks</label>
            <textarea
              rows="4"
              value={formData.remarks}
              onChange={(e) => handleSimpleChange('remarks', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-ispsc-maroon focus:ring-2 focus:ring-ispsc-maroon/20 outline-none transition-all"
            ></textarea>
          </div>
        </div>
      </section>

      <div className="flex gap-4 justify-end">
        <button type="button" className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-600 hover:-translate-y-0.5 transition-all duration-300" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="bg-ispsc-maroon text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-ispsc-dark-maroon hover:-translate-y-0.5 transition-all duration-300">
          {record ? 'Update Record' : 'Submit Record'}
        </button>
      </div>
    </form>
  )
}

export default HealthRecordForm
