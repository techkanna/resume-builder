import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useResumeStore, Education } from '@/store/resumeStore'

const educationSchema = z.object({
  degree: z.string().min(1, 'Degree is required'),
  school: z.string().min(1, 'School is required'),
  location: z.string().min(1, 'Location is required'),
  graduationDate: z.string().min(1, 'Graduation date is required'),
  gpa: z.string().optional(),
  relevantCoursework: z.string().optional()
})

type EducationFormData = z.infer<typeof educationSchema>

export default function EducationForm() {
  const { resumeData, addEducation, updateEducation, removeEducation, setCurrentStep } = useResumeStore()
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      degree: '',
      school: '',
      location: '',
      graduationDate: '',
      gpa: '',
      relevantCoursework: ''
    },
    mode: 'onChange'
  })

  const onSubmit = (data: EducationFormData) => {
    const education: Education = {
      id: editingIndex !== null ? resumeData.education[editingIndex].id : Date.now().toString(),
      ...data
    }

    if (editingIndex !== null) {
      updateEducation(education.id, education)
      setEditingIndex(null)
    } else {
      addEducation(education)
    }

    reset()
  }

  const editEducationEntry = (index: number) => {
    const education = resumeData.education[index]
    reset(education)
    setEditingIndex(index)
  }

  const deleteEducationEntry = (id: string) => {
    removeEducation(id)
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Education
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Add your educational background
        </p>
      </div>

      {/* Existing Education List */}
      {resumeData.education.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Your Education
          </h3>
          <div className="space-y-4">
            {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {edu.degree}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {edu.school} • {edu.location}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Graduated: {edu.graduationDate}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </p>
                    {edu.relevantCoursework && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                        Relevant Coursework: {edu.relevantCoursework}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => editEducationEntry(index)}
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEducationEntry(edu.id)}
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
              Degree *
            </label>
            <input
              type="text"
              {...register('degree')}
              className="form-input"
              placeholder="Bachelor of Science in Computer Science"
            />
            {errors.degree && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.degree.message}
              </p>
            )}
          </div>

          <div>
            <label className="form-label">
              School *
            </label>
            <input
              type="text"
              {...register('school')}
              className="form-input"
              placeholder="University of Technology"
            />
            {errors.school && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.school.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">
              Location *
            </label>
            <input
              type="text"
              {...register('location')}
              className="form-input"
              placeholder="Boston, MA"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.location.message}
              </p>
            )}
          </div>

          <div>
            <label className="form-label">
              Graduation Date *
            </label>
            <input
              type="month"
              {...register('graduationDate')}
              className="form-input"
            />
            {errors.graduationDate && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.graduationDate.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="form-label">
            GPA (Optional)
          </label>
          <input
            type="text"
            {...register('gpa')}
            className="form-input"
            placeholder="3.8/4.0"
          />
        </div>

        <div>
          <label className="form-label">
            Relevant Coursework (Optional)
          </label>
          <textarea
            {...register('relevantCoursework')}
            rows={3}
            className="form-input resize-none"
            placeholder="Data Structures, Algorithms, Database Systems, Web Development..."
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className="btn-secondary"
          >
            Back
          </button>
          
          <div className="flex space-x-3">
            <button
              type="submit"
              className="btn-primary"
            >
              {editingIndex !== null ? 'Update Education' : 'Add Education'}
            </button>
            
            {resumeData.education.length > 0 && (
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="btn-primary"
              >
                Continue to Skills
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
} 