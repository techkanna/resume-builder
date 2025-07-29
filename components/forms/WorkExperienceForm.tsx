import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useResumeStore, WorkExperience } from '@/store/resumeStore'

const workExperienceSchema = z.object({
  jobTitle: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company is required'),
  location: z.string().min(1, 'Location is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  isCurrentRole: z.boolean().default(false),
  description: z.array(z.string()).default([])
})

type WorkExperienceFormData = z.infer<typeof workExperienceSchema>

export default function WorkExperienceForm() {
  const { resumeData, addWorkExperience, updateWorkExperience, removeWorkExperience, setCurrentStep } = useResumeStore()
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [bulletPoints, setBulletPoints] = useState<string[]>([])
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<WorkExperienceFormData>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrentRole: false,
      description: []
    },
    mode: 'onChange'
  })

  const isCurrentRole = watch('isCurrentRole')

  const generateBulletPoints = async () => {
    const jobTitle = watch('jobTitle')
    const company = watch('company')
    
    if (!jobTitle || !company) {
      alert('Please fill in job title and company first')
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-bullets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle,
          company,
          responsibilities: 'Generate professional bullet points for this role'
        })
      })

      if (response.ok) {
        const { bullets } = await response.json()
        setBulletPoints(bullets)
        setValue('description', bullets)
      }
    } catch (error) {
      console.error('Error generating bullet points:', error)
      alert('Failed to generate bullet points. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const addBulletPoint = () => {
    const currentBullets = watch('description') || []
    setValue('description', [...currentBullets, ''])
  }

  const removeBulletPoint = (index: number) => {
    const currentBullets = watch('description') || []
    setValue('description', currentBullets.filter((_, i) => i !== index))
  }

  const updateBulletPoint = (index: number, value: string) => {
    const currentBullets = watch('description') || []
    const updatedBullets = [...currentBullets]
    updatedBullets[index] = value
    setValue('description', updatedBullets)
  }

  const onSubmit = (data: WorkExperienceFormData) => {
    const experience: WorkExperience = {
      id: editingIndex !== null ? resumeData.workExperience[editingIndex].id : Date.now().toString(),
      ...data,
      endDate: data.isCurrentRole ? 'Present' : data.endDate || ''
    }

    if (editingIndex !== null) {
      updateWorkExperience(experience.id, experience)
      setEditingIndex(null)
    } else {
      addWorkExperience(experience)
    }

    reset()
    setBulletPoints([])
  }

  const editExperience = (index: number) => {
    const experience = resumeData.workExperience[index]
    reset({
      ...experience,
      isCurrentRole: experience.endDate === 'Present'
    })
    setEditingIndex(index)
  }

  const deleteExperience = (id: string) => {
    removeWorkExperience(id)
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Work Experience
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Add your professional experience
        </p>
      </div>

      {/* Existing Experience List */}
      {resumeData.workExperience.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Your Experience
          </h3>
          <div className="space-y-4">
            {resumeData.workExperience.map((exp, index) => (
              <div key={exp.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {exp.jobTitle}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {exp.company} • {exp.location}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {exp.startDate} - {exp.endDate}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => editExperience(index)}
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteExperience(exp.id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">
              Job Title *
            </label>
            <input
              type="text"
              {...register('jobTitle')}
              className="form-input"
              placeholder="Software Engineer"
            />
            {errors.jobTitle && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.jobTitle.message}
              </p>
            )}
          </div>

          <div>
            <label className="form-label">
              Company *
            </label>
            <input
              type="text"
              {...register('company')}
              className="form-input"
              placeholder="Tech Corp"
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.company.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="form-label">
            Location *
          </label>
          <input
            type="text"
            {...register('location')}
            className="form-input"
            placeholder="San Francisco, CA"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.location.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">
              Start Date *
            </label>
            <input
              type="month"
              {...register('startDate')}
              className="form-input"
            />
            {errors.startDate && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.startDate.message}
              </p>
            )}
          </div>

          <div>
            <label className="form-label">
              End Date
            </label>
            <input
              type="month"
              {...register('endDate')}
              className="form-input"
              disabled={isCurrentRole}
            />
            <div className="mt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('isCurrentRole')}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  I currently work here
                </span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="form-label mb-0">
              Job Description & Achievements
            </label>
            <button
              type="button"
              onClick={generateBulletPoints}
              disabled={isGenerating}
              className="btn-secondary text-sm"
            >
              {isGenerating ? 'Generating...' : '✨ Generate with AI'}
            </button>
          </div>

          <div className="space-y-3">
            {(watch('description') || []).map((bullet, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="flex-1">
                  <textarea
                    value={bullet}
                    onChange={(e) => updateBulletPoint(index, e.target.value)}
                    className="form-input resize-none"
                    rows={2}
                    spellCheck={true}
                    placeholder="Describe your achievement or responsibility..."
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeBulletPoint(index)}
                  className="text-red-600 hover:text-red-700 p-2"
                >
                  ×
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addBulletPoint}
              className="btn-secondary w-full"
            >
              + Add Achievement
            </button>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep(0)}
            className="btn-secondary"
          >
            Back
          </button>
          
          <div className="flex space-x-3">
            <button
              type="submit"
              className="btn-primary"
            >
              {editingIndex !== null ? 'Update Experience' : 'Add Experience'}
            </button>
            
            {resumeData.workExperience.length > 0 && (
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="btn-primary"
              >
                Continue to Education
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
} 