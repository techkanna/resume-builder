import React from 'react'
import { useResumeStore } from '@/store/resumeStore'
import PersonalInfoForm from './forms/PersonalInfoForm'
import WorkExperienceForm from './forms/WorkExperienceForm'
import EducationForm from './forms/EducationForm'
import SkillsForm from './forms/SkillsForm'
import ResumePreview from './ResumePreview'

export default function StepContainer() {
  const { currentStep } = useResumeStore()

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoForm />
      case 1:
        return <WorkExperienceForm />
      case 2:
        return <EducationForm />
      case 3:
        return <SkillsForm />
      case 4:
        return (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Resume Preview
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Review your resume and make any final adjustments
              </p>
            </div>
            <ResumePreview showGenerateSummary={true} />
          </div>
        )
      default:
        return <PersonalInfoForm />
    }
  }

  return <>{renderStep()}</>
} 