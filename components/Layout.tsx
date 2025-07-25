import React from 'react'
import { useResumeStore } from '@/store/resumeStore'
import ThemeToggle from './ThemeToggle'

interface LayoutProps {
  children: React.ReactNode
}

const steps = [
  { id: 0, name: 'Personal Info', description: 'Basic information' },
  { id: 1, name: 'Work Experience', description: 'Employment history' },
  { id: 2, name: 'Education', description: 'Academic background' },
  { id: 3, name: 'Skills', description: 'Technical & soft skills' },
  { id: 4, name: 'Preview', description: 'Review your resume' }
]

export default function Layout({ children }: LayoutProps) {
  const { currentStep, setCurrentStep } = useResumeStore()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Resume Builder
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Steps Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="space-y-2">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Progress
              </h2>
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                    currentStep === step.id
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-700'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-3 ${
                        currentStep === step.id
                          ? 'bg-primary-600 text-white'
                          : currentStep > step.id
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {currentStep > step.id ? '✓' : step.id + 1}
                    </div>
                    <div>
                      <div className="font-medium">{step.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {step.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 