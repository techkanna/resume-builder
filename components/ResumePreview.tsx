import React, { useState } from 'react'
import { useResumeStore } from '@/store/resumeStore'
import PDFDownloadButton from './PDFDownloadButton'

interface ResumePreviewProps {
  showGenerateSummary?: boolean
}

export default function ResumePreview({ showGenerateSummary = false }: ResumePreviewProps) {
  const { resumeData, updatePersonalInfo } = useResumeStore()
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false)
  const { personalInfo, workExperience, education, skills } = resumeData

  const generateSummary = async () => {
    setIsGeneratingSummary(true)
    try {
      const response = await fetch('/api/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personalInfo,
          experience: workExperience,
          education
        })
      })

      if (response.ok) {
        const { summary } = await response.json()
        updatePersonalInfo({ summary })
      }
    } catch (error) {
      console.error('Error generating summary:', error)
      alert('Failed to generate summary. Please try again.')
    } finally {
      setIsGeneratingSummary(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* PDF Download Button */}
      <div className="flex justify-end">
        <PDFDownloadButton />
      </div>
      
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
      {/* Header */}
      <header className="text-center border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-gray-600 dark:text-gray-400">
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="hover:text-primary-600">
              {personalInfo.email}
            </a>
          )}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600">
              LinkedIn
            </a>
          )}
          {personalInfo.website && (
            <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600">
              Portfolio
            </a>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {(personalInfo.summary || showGenerateSummary) && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 pb-1 border-b border-gray-200 dark:border-gray-700">
            Professional Summary
          </h2>
          {personalInfo.summary ? (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {personalInfo.summary}
            </p>
          ) : showGenerateSummary && (
            <div className="flex items-center justify-center py-4">
              <button
                onClick={generateSummary}
                disabled={isGeneratingSummary}
                className="btn-primary"
              >
                {isGeneratingSummary ? 'Generating...' : '✨ Generate AI Summary'}
              </button>
            </div>
          )}
        </section>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 pb-1 border-b border-gray-200 dark:border-gray-700">
            Work Experience
          </h2>
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {exp.jobTitle}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {exp.company} • {exp.location}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                {exp.description.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-2">
                    {exp.description.map((bullet, index) => (
                      <li key={index} className="leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 pb-1 border-b border-gray-200 dark:border-gray-700">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {edu.school} • {edu.location}
                    </p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">
                    {edu.graduationDate}
                  </span>
                </div>
                {edu.relevantCoursework && (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Relevant Coursework:</strong> {edu.relevantCoursework}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 pb-1 border-b border-gray-200 dark:border-gray-700">
            Skills
          </h2>
          <div className="space-y-3">
            {skills.map((skillGroup) => (
              <div key={skillGroup.id}>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {!personalInfo.firstName && !personalInfo.lastName && workExperience.length === 0 && education.length === 0 && skills.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Your resume preview will appear here
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Start by filling out your personal information to see a live preview.
          </p>
        </div>
      )}
      </div>
    </div>
  )
} 