import React from 'react'

const HealthRecordDetail = ({ record, onEdit, onDelete, onBack }) => {
  const handlePrint = () => {
    window.print()
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const renderCheckboxField = (label, value) => (
    <div className="flex items-center gap-2 py-1">
      <input type="checkbox" checked={value} disabled className="w-4 h-4 text-ispsc-maroon accent-ispsc-maroon" />
      <span className="text-sm text-gray-700">{label}</span>
    </div>
  )

  return (
    <div>
      {/* Header - Don't print */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 print:hidden">
        <button 
          className="bg-gray-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md hover:bg-gray-700 hover:-translate-y-0.5 transition-all duration-300" 
          onClick={onBack}
        >
          ← Back to List
        </button>
        <div className="flex gap-3 flex-wrap">
          <button 
            className="bg-ispsc-maroon text-white px-5 py-2.5 rounded-lg font-semibold shadow-md hover:bg-ispsc-dark-maroon hover:-translate-y-0.5 transition-all duration-300" 
            onClick={() => onEdit(record)}
          >
            ✏️ Edit Record
          </button>
          <button 
            className="bg-blue-500 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md hover:bg-blue-600 hover:-translate-y-0.5 transition-all duration-300" 
            onClick={handlePrint}
          >
            🖨️ Print
          </button>
          <button 
            className="bg-red-500 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md hover:bg-red-600 hover:-translate-y-0.5 transition-all duration-300" 
            onClick={() => onDelete(record._id)}
          >
            🗑️ Delete
          </button>
        </div>
      </div>

      {/* Print Content */}
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-ispsc-maroon mb-2">Student Health Record</h2>
          <p className="text-sm text-gray-600">Created: {formatDate(record.createdAt)}</p>
        </div>

        {/* Personal Information */}
        <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-xl font-bold text-ispsc-maroon mb-4 border-b-2 border-ispsc-maroon pb-2">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <strong className="text-sm text-gray-600">Last Name:</strong>
              <span className="text-gray-800 font-medium">{record.personalInfo.lastname}</span>
            </div>
            <div className="flex flex-col">
              <strong className="text-sm text-gray-600">First Name:</strong>
              <span className="text-gray-800 font-medium">{record.personalInfo.firstname}</span>
            </div>
            <div className="flex flex-col">
              <strong className="text-sm text-gray-600">Middle Name:</strong>
              <span className="text-gray-800 font-medium">{record.personalInfo.middlename || 'N/A'}</span>
            </div>
            <div className="flex flex-col">
              <strong className="text-sm text-gray-600">Age:</strong>
              <span className="text-gray-800 font-medium">{record.personalInfo.age}</span>
            </div>
            <div className="flex flex-col">
              <strong className="text-sm text-gray-600">Course and Year:</strong>
              <span className="text-gray-800 font-medium">{record.personalInfo.courseAndYear}</span>
            </div>
            <div className="flex flex-col">
              <strong className="text-sm text-gray-600">Birthday:</strong>
              <span className="text-gray-800 font-medium">{formatDate(record.personalInfo.birthday)}</span>
            </div>
            <div className="flex flex-col">
              <strong className="text-sm text-gray-600">Sex:</strong>
              <span className="text-gray-800 font-medium">{record.personalInfo.sex}</span>
            </div>
            <div className="flex flex-col">
              <strong className="text-sm text-gray-600">Permanent Address:</strong>
              <span className="text-gray-800 font-medium">{record.personalInfo.permanentAddress}</span>
            </div>
            <div className="flex flex-col">
              <strong className="text-sm text-gray-600">Phone Number:</strong>
              <span className="text-gray-800 font-medium">{record.personalInfo.phoneNumber}</span>
            </div>
            <div className="flex flex-col">
              <strong className="text-sm text-gray-600">Civil Status:</strong>
              <span className="text-gray-800 font-medium">{record.personalInfo.civilStatus || 'N/A'}</span>
            </div>
            <div className="flex flex-col">
              <strong className="text-sm text-gray-600">Religion:</strong>
              <span className="text-gray-800 font-medium">{record.personalInfo.religion || 'N/A'}</span>
            </div>
            <div className="flex flex-col">
              <strong className="text-sm text-gray-600">Contact Person:</strong>
              <span className="text-gray-800 font-medium">{record.personalInfo.contactPerson || 'N/A'}</span>
            </div>
            <div className="flex flex-col">
              <strong className="text-sm text-gray-600">Contact Address:</strong>
              <span className="text-gray-800 font-medium">{record.personalInfo.contactAddress || 'N/A'}</span>
            </div>
            <div className="flex flex-col">
              <strong className="text-sm text-gray-600">Contact Number:</strong>
              <span className="text-gray-800 font-medium">{record.personalInfo.contactNumber || 'N/A'}</span>
            </div>
          </div>
        </section>

        {/* Past Medical History */}
        <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-xl font-bold text-ispsc-maroon mb-4 border-b-2 border-ispsc-maroon pb-2">Past Medical History</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {renderCheckboxField('Chicken Pox', record.pastMedicalHistory.chickenPox)}
            {renderCheckboxField('Mumps', record.pastMedicalHistory.mumps)}
            {renderCheckboxField('Measles', record.pastMedicalHistory.measles)}
            {renderCheckboxField('Tuberculosis', record.pastMedicalHistory.tuberculosis)}
            {renderCheckboxField('Hepatitis', record.pastMedicalHistory.hepatitis)}
            {renderCheckboxField('Hypertension', record.pastMedicalHistory.hypertension)}
            {renderCheckboxField('Diabetes', record.pastMedicalHistory.diabetes)}
            {renderCheckboxField('Bronchial Asthma', record.pastMedicalHistory.bronchialAsthma)}
            {renderCheckboxField('Peptic Ulcer', record.pastMedicalHistory.pepticUlcer)}
            {renderCheckboxField('Epilepsy', record.pastMedicalHistory.epilepsy)}
            {renderCheckboxField('Thyroid Disease', record.pastMedicalHistory.thyroidDisease)}
            {renderCheckboxField('Heart Disease', record.pastMedicalHistory.heartDisease)}
            {renderCheckboxField('Previous Blood Transfusion', record.pastMedicalHistory.previousBloodTransfusion)}
            {renderCheckboxField('Cancer', record.pastMedicalHistory.cancer)}
            {renderCheckboxField('Use of Anti-coagulants', record.pastMedicalHistory.useOfAnticoagulants)}
            {renderCheckboxField('Bone Fracture', record.pastMedicalHistory.boneFracture)}
          </div>
        </section>

        {/* Family Medical History */}
        <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-xl font-bold text-ispsc-maroon mb-4 border-b-2 border-ispsc-maroon pb-2">Family Medical History</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {renderCheckboxField('Hypertension', record.familyMedicalHistory.hypertension)}
            {renderCheckboxField('Diabetes', record.familyMedicalHistory.diabetes)}
            {renderCheckboxField('Bronchial Asthma', record.familyMedicalHistory.bronchialAsthma)}
            {renderCheckboxField('Thyroid Disease', record.familyMedicalHistory.thyroidDisease)}
            {renderCheckboxField('Cancer', record.familyMedicalHistory.cancer)}
            {renderCheckboxField('Autoimmune Disease', record.familyMedicalHistory.autoimmuneDisease)}
            {renderCheckboxField('Heart Disease', record.familyMedicalHistory.heartDisease)}
          </div>
        </section>

        {/* Immunization History */}
        <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-xl font-bold text-ispsc-maroon mb-4 border-b-2 border-ispsc-maroon pb-2">Immunization History</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {renderCheckboxField('MMR', record.immunizationHistory.mmr)}
            {renderCheckboxField('Anti-Rabies', record.immunizationHistory.antiRabies)}
            {renderCheckboxField('Hepatitis Vaccine', record.immunizationHistory.hepatitisVaccine)}
            {renderCheckboxField('Anti-Tetanus', record.immunizationHistory.antiTetanus)}
            {renderCheckboxField('FLU Vaccine', record.immunizationHistory.fluVaccine)}
            {renderCheckboxField('PPV23', record.immunizationHistory.ppv23)}
            {renderCheckboxField('Anti-COVID-19 Vaccine', record.immunizationHistory.antiCovid19Vaccine)}
          </div>
        </section>

        {/* Personal Social History */}
        <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-xl font-bold text-ispsc-maroon mb-4 border-b-2 border-ispsc-maroon pb-2">Personal Social History</h3>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Smoker</h4>
            {record.personalSocialHistory.smoker.isSmoker ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <strong className="text-sm text-gray-600">Status:</strong>
                  <span className="text-gray-800 font-medium">Yes</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm text-gray-600">Sticks per day:</strong>
                  <span className="text-gray-800 font-medium">{record.personalSocialHistory.smoker.sticksPerDay || 'N/A'}</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm text-gray-600">Years:</strong>
                  <span className="text-gray-800 font-medium">{record.personalSocialHistory.smoker.years || 'N/A'}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">No</p>
            )}
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Alcohol Drinker</h4>
            {record.personalSocialHistory.alcoholDrinker.isDrinker ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex flex-col">
                  <strong className="text-sm text-gray-600">Status:</strong>
                  <span className="text-gray-800 font-medium">Yes</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm text-gray-600">Type of Alcohol:</strong>
                  <span className="text-gray-800 font-medium">{record.personalSocialHistory.alcoholDrinker.typeOfAlcohol || 'N/A'}</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm text-gray-600">Number of Bottles:</strong>
                  <span className="text-gray-800 font-medium">{record.personalSocialHistory.alcoholDrinker.numberOfBottles || 'N/A'}</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm text-gray-600">Frequency:</strong>
                  <span className="text-gray-800 font-medium">{record.personalSocialHistory.alcoholDrinker.frequency || 'N/A'}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">No</p>
            )}
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Illicit Drug User</h4>
            {record.personalSocialHistory.illicitDrugUser.isUser ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <strong className="text-sm text-gray-600">Status:</strong>
                  <span className="text-gray-800 font-medium">Yes</span>
                </div>
                <div className="flex flex-col">
                  <strong className="text-sm text-gray-600">Type of Drug:</strong>
                  <span className="text-gray-800 font-medium">{record.personalSocialHistory.illicitDrugUser.typeOfDrug || 'N/A'}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">No</p>
            )}
          </div>
        </section>

        {/* Maternal and Menstrual History */}
        <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-xl font-bold text-ispsc-maroon mb-4 border-b-2 border-ispsc-maroon pb-2">Maternal and Menstrual History</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <strong className="text-sm text-gray-600">Number of Pregnancy:</strong>
              <span className="text-gray-800 font-medium">{record.maternalMenstrualHistory.numberOfPregnancy || 'N/A'}</span>
            </div>
            <div className="flex flex-col">
              <strong className="text-sm text-gray-600">Number of Alive:</strong>
              <span className="text-gray-800 font-medium">{record.maternalMenstrualHistory.numberOfAlive || 'N/A'}</span>
            </div>
            <div className="flex flex-col">
              <strong className="text-sm text-gray-600">Number of Still Birth:</strong>
              <span className="text-gray-800 font-medium">{record.maternalMenstrualHistory.numberOfStillBirth || 'N/A'}</span>
            </div>
            <div className="flex flex-col">
              <strong className="text-sm text-gray-600">Gyne Pathology:</strong>
              <span className="text-gray-800 font-medium">{record.maternalMenstrualHistory.gynePathology || 'N/A'}</span>
            </div>
            <div className="flex flex-col">
              <strong className="text-sm text-gray-600">LMP:</strong>
              <span className="text-gray-800 font-medium">{record.maternalMenstrualHistory.lmp || 'N/A'}</span>
            </div>
            <div className="flex flex-col">
              <strong className="text-sm text-gray-600">Menarche:</strong>
              <span className="text-gray-800 font-medium">{record.maternalMenstrualHistory.menarche || 'N/A'}</span>
            </div>
            <div className="flex flex-col">
              <strong className="text-sm text-gray-600">Interval:</strong>
              <span className="text-gray-800 font-medium">{record.maternalMenstrualHistory.interval || 'N/A'}</span>
            </div>
            <div className="flex flex-col">
              <strong className="text-sm text-gray-600">Duration:</strong>
              <span className="text-gray-800 font-medium">{record.maternalMenstrualHistory.duration || 'N/A'}</span>
            </div>
            <div className="flex flex-col">
              <strong className="text-sm text-gray-600">Amount:</strong>
              <span className="text-gray-800 font-medium">{record.maternalMenstrualHistory.amount || 'N/A'}</span>
            </div>
            <div className="flex flex-col">
              <strong className="text-sm text-gray-600">Symptoms:</strong>
              <span className="text-gray-800 font-medium">{record.maternalMenstrualHistory.symptoms || 'N/A'}</span>
            </div>
          </div>
        </section>

        {/* Physical Examination */}
        <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-xl font-bold text-ispsc-maroon mb-4 border-b-2 border-ispsc-maroon pb-2">Physical Examination</h3>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">General Survey</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {renderCheckboxField('Conscious', record.physicalExamination.generalSurvey.conscious)}
              {renderCheckboxField('Coherent', record.physicalExamination.generalSurvey.coherent)}
              {renderCheckboxField('Afebrile', record.physicalExamination.generalSurvey.afebrile)}
              {renderCheckboxField('Febrile', record.physicalExamination.generalSurvey.febrile)}
              {renderCheckboxField('Not in CPD', record.physicalExamination.generalSurvey.notInCPD)}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Integumentary</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {renderCheckboxField('Pallor', record.physicalExamination.integumentary.pallor)}
              {renderCheckboxField('Jaundice', record.physicalExamination.integumentary.jaundice)}
              {renderCheckboxField('Cyanosis', record.physicalExamination.integumentary.cyanosis)}
              {renderCheckboxField('Warm to Touch', record.physicalExamination.integumentary.warmToTouch)}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Chest</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {renderCheckboxField('Retractions', record.physicalExamination.chest.retractions)}
              {renderCheckboxField('Symmetrical Chest Expansion', record.physicalExamination.chest.symmetricalChestExpansion)}
              {renderCheckboxField('Asymmetrical Chest Expansion', record.physicalExamination.chest.asymmetricalChestExpansion)}
              {renderCheckboxField('Rales', record.physicalExamination.chest.rales)}
              {renderCheckboxField('Wheezes', record.physicalExamination.chest.wheezes)}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Heart</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {renderCheckboxField('Adynamic', record.physicalExamination.heart.adynamic)}
              {renderCheckboxField('Precordium', record.physicalExamination.heart.precordium)}
              {renderCheckboxField('Tachycardic', record.physicalExamination.heart.tachycardic)}
              {renderCheckboxField('Irregular Rhythm', record.physicalExamination.heart.irregularRhythm)}
              {renderCheckboxField('Regular Rhythm', record.physicalExamination.heart.regularRhythm)}
              {renderCheckboxField('Murmur', record.physicalExamination.heart.murmur)}
            </div>
            <div className="flex flex-col mt-3">
              <strong className="text-sm text-gray-600">PMI at:</strong>
              <span className="text-gray-800 font-medium">{record.physicalExamination.heart.pmiAt || 'N/A'}</span>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Abdomen</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {renderCheckboxField('Scar', record.physicalExamination.abdomen.scar)}
              {renderCheckboxField('Flat', record.physicalExamination.abdomen.flat)}
              {renderCheckboxField('Flabby', record.physicalExamination.abdomen.flabby)}
              {renderCheckboxField('Globular', record.physicalExamination.abdomen.globular)}
              {renderCheckboxField('Scaphoid', record.physicalExamination.abdomen.scaphoid)}
              {renderCheckboxField('Dull', record.physicalExamination.abdomen.dull)}
              {renderCheckboxField('Tympanitic', record.physicalExamination.abdomen.tympanitic)}
              {renderCheckboxField('Non-Tender', record.physicalExamination.abdomen.nonTender)}
              {renderCheckboxField('Tender', record.physicalExamination.abdomen.tender)}
              {renderCheckboxField('Organomegaly', record.physicalExamination.abdomen.organomegaly)}
              {renderCheckboxField('NABS', record.physicalExamination.abdomen.nabs)}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Vital Signs</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <strong className="text-sm text-gray-600">Blood Pressure:</strong>
                <span className="text-gray-800 font-medium">{record.physicalExamination.vitalSigns.bp || 'N/A'}</span>
              </div>
              <div className="flex flex-col">
                <strong className="text-sm text-gray-600">Respiratory Rate:</strong>
                <span className="text-gray-800 font-medium">{record.physicalExamination.vitalSigns.rr || 'N/A'}</span>
              </div>
              <div className="flex flex-col">
                <strong className="text-sm text-gray-600">Temperature:</strong>
                <span className="text-gray-800 font-medium">{record.physicalExamination.vitalSigns.temp || 'N/A'}</span>
              </div>
              <div className="flex flex-col">
                <strong className="text-sm text-gray-600">Heart Rate:</strong>
                <span className="text-gray-800 font-medium">{record.physicalExamination.vitalSigns.hr || 'N/A'}</span>
              </div>
              <div className="flex flex-col">
                <strong className="text-sm text-gray-600">Weight:</strong>
                <span className="text-gray-800 font-medium">{record.physicalExamination.vitalSigns.weight || 'N/A'} kg</span>
              </div>
              <div className="flex flex-col">
                <strong className="text-sm text-gray-600">Height:</strong>
                <span className="text-gray-800 font-medium">{record.physicalExamination.vitalSigns.height || 'N/A'} cm</span>
              </div>
              <div className="flex flex-col">
                <strong className="text-sm text-gray-600">BMI:</strong>
                <span className="text-gray-800 font-medium">{record.physicalExamination.vitalSigns.bmi || 'N/A'}</span>
              </div>
              <div className="flex flex-col">
                <strong className="text-sm text-gray-600">Interpretation:</strong>
                <span className="text-gray-800 font-medium">{record.physicalExamination.vitalSigns.interpretation || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">HEENT</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {renderCheckboxField('Symmetric', record.physicalExamination.heent.symmetric)}
              {renderCheckboxField('Asymmetric', record.physicalExamination.heent.asymmetric)}
              {renderCheckboxField('Alar Flaring', record.physicalExamination.heent.alarFlaring)}
              {renderCheckboxField('Anicteric', record.physicalExamination.heent.anicteric)}
              {renderCheckboxField('Pink Oral Mucosa', record.physicalExamination.heent.pinkOralMucosa)}
              {renderCheckboxField('Pale Oral Mucosa', record.physicalExamination.heent.paleOralMucosa)}
              {renderCheckboxField('CLAD', record.physicalExamination.heent.clad)}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Extremities</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {renderCheckboxField('Gross Deformities', record.physicalExamination.extremities.grossDeformities)}
              {renderCheckboxField('Edema', record.physicalExamination.extremities.edema)}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Visual Acuity</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <strong className="text-sm text-gray-600">OD (Right Eye):</strong>
                <span className="text-gray-800 font-medium">{record.physicalExamination.visualAcuity.od || 'N/A'}</span>
              </div>
              <div className="flex flex-col">
                <strong className="text-sm text-gray-600">OS (Left Eye):</strong>
                <span className="text-gray-800 font-medium">{record.physicalExamination.visualAcuity.os || 'N/A'}</span>
              </div>
              <div className="flex flex-col">
                <strong className="text-sm text-gray-600">OU (Both Eyes):</strong>
                <span className="text-gray-800 font-medium">{record.physicalExamination.visualAcuity.ou || 'N/A'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Assessment and Remarks */}
        <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold text-ispsc-maroon mb-4 border-b-2 border-ispsc-maroon pb-2">Assessment and Remarks</h3>
          <div className="space-y-4">
            <div>
              <strong className="text-sm text-gray-600 block mb-1">Assessment:</strong>
              <p className="text-gray-800 bg-white p-3 rounded border border-gray-200">{record.assessment || 'N/A'}</p>
            </div>
            <div>
              <strong className="text-sm text-gray-600 block mb-1">Remarks:</strong>
              <p className="text-gray-800 bg-white p-3 rounded border border-gray-200">{record.remarks || 'N/A'}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HealthRecordDetail
