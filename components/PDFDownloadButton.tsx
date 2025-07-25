import React, { useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import { useResumeStore } from '@/store/resumeStore'
import ResumePDF from './ResumePDF'

export default function PDFDownloadButton() {
  const { resumeData } = useResumeStore()
  const [isGenerating, setIsGenerating] = useState(false)
  
  const { personalInfo } = resumeData
  const fileName = `${personalInfo.firstName}_${personalInfo.lastName}_Resume.pdf`.replace(/\s+/g, '_')

  const handleDownload = async () => {
    setIsGenerating(true)
    try {
      const blob = await pdf(<ResumePDF resumeData={resumeData} />).toBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  // Check if resume has minimum required data
  const hasMinimumData = personalInfo.firstName && personalInfo.lastName && personalInfo.email

  if (!hasMinimumData) {
    return (
      <button
        disabled
        className="btn-secondary opacity-50 cursor-not-allowed"
        title="Please fill in at least your name and email to download PDF"
      >
        📄 Download PDF
      </button>
    )
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className="btn-primary"
    >
      {isGenerating ? 'Generating PDF...' : '📄 Download PDF'}
    </button>
  )
} 