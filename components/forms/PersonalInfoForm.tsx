import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useResumeStore, PersonalInfo } from '@/store/resumeStore'

const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(1, 'Phone number is required'),
  location: z.string().min(1, 'Location is required'),
  linkedin: z.string().optional(),
  website: z.string().optional(),
  summary: z.string().optional()
})

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>

export default function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo, setCurrentStep } = useResumeStore()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: resumeData.personalInfo,
    mode: 'onChange'
  })

  const onSubmit = (data: PersonalInfoFormData) => {
    updatePersonalInfo(data)
    setCurrentStep(1) // Move to next step
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Personal Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Let's start with your basic information
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">
              First Name *
            </label>
            <input
              type="text"
              {...register('firstName')}
              className="form-input"
              placeholder="John"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label className="form-label">
              Last Name *
            </label>
            <input
              type="text"
              {...register('lastName')}
              className="form-input"
              placeholder="Doe"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">
              Email *
            </label>
            <input
              type="email"
              {...register('email')}
              className="form-input"
              placeholder="john.doe@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="form-label">
              Phone *
            </label>
            <input
              type="tel"
              {...register('phone')}
              className="form-input"
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.phone.message}
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
            placeholder="New York, NY"
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
              LinkedIn Profile
            </label>
            <input
              type="url"
              {...register('linkedin')}
              className="form-input"
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>

          <div>
            <label className="form-label">
              Website/Portfolio
            </label>
            <input
              type="url"
              {...register('website')}
              className="form-input"
              placeholder="https://johndoe.com"
            />
          </div>
        </div>

        <div>
          <label className="form-label">
            Professional Summary
          </label>
          <textarea
            {...register('summary')}
            rows={4}
            className="form-input resize-none"
            placeholder="Brief overview of your professional background and career objectives..."
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            This will be generated automatically based on your experience, but you can customize it here.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn-primary"
            disabled={!isValid}
          >
            Continue to Work Experience
          </button>
        </div>
      </form>
    </div>
  )
} 