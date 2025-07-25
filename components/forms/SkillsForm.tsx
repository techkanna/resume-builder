import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useResumeStore, Skill } from '@/store/resumeStore'

const skillSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  skills: z.array(z.string()).min(1, 'At least one skill is required')
})

type SkillFormData = z.infer<typeof skillSchema>

const skillCategories = [
  'Programming Languages',
  'Frameworks & Libraries',
  'Databases',
  'Cloud & DevOps',
  'Tools & Software',
  'Soft Skills',
  'Languages'
]

export default function SkillsForm() {
  const { resumeData, addSkill, updateSkill, removeSkill, setCurrentStep } = useResumeStore()
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [currentSkillInput, setCurrentSkillInput] = useState('')
  const [currentSkills, setCurrentSkills] = useState<string[]>([])
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      category: '',
      skills: []
    },
    mode: 'onChange'
  })

  const addSkillToList = () => {
    if (currentSkillInput.trim() && !currentSkills.includes(currentSkillInput.trim())) {
      const newSkills = [...currentSkills, currentSkillInput.trim()]
      setCurrentSkills(newSkills)
      setValue('skills', newSkills)
      setCurrentSkillInput('')
    }
  }

  const removeSkillFromList = (skillToRemove: string) => {
    const newSkills = currentSkills.filter(skill => skill !== skillToRemove)
    setCurrentSkills(newSkills)
    setValue('skills', newSkills)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkillToList()
    }
  }

  const onSubmit = (data: SkillFormData) => {
    const skill: Skill = {
      id: editingIndex !== null ? resumeData.skills[editingIndex].id : Date.now().toString(),
      ...data
    }

    if (editingIndex !== null) {
      updateSkill(skill.id, skill)
      setEditingIndex(null)
    } else {
      addSkill(skill)
    }

    reset()
    setCurrentSkills([])
  }

  const editSkillCategory = (index: number) => {
    const skill = resumeData.skills[index]
    reset(skill)
    setCurrentSkills(skill.skills)
    setEditingIndex(index)
  }

  const deleteSkillCategory = (id: string) => {
    removeSkill(id)
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Skills
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Organize your skills by category
        </p>
      </div>

      {/* Existing Skills List */}
      {resumeData.skills.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Your Skills
          </h3>
          <div className="space-y-4">
            {resumeData.skills.map((skillGroup, index) => (
              <div key={skillGroup.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {skillGroup.category}
                  </h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => editSkillCategory(index)}
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteSkillCategory(skillGroup.id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="form-label">
            Skill Category *
          </label>
          <select
            {...register('category')}
            className="form-input"
          >
            <option value="">Select a category</option>
            {skillCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.category.message}
            </p>
          )}
        </div>

        <div>
          <label className="form-label">
            Skills *
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={currentSkillInput}
              onChange={(e) => setCurrentSkillInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="form-input flex-1"
              placeholder="Type a skill and press Enter or click Add"
            />
            <button
              type="button"
              onClick={addSkillToList}
              className="btn-secondary"
            >
              Add
            </button>
          </div>

          {/* Current Skills Display */}
          {currentSkills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {currentSkills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-sm rounded-full"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkillFromList(skill)}
                    className="ml-2 text-primary-600 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-100"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {errors.skills && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.skills.message}
            </p>
          )}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="btn-secondary"
          >
            Back
          </button>
          
          <div className="flex space-x-3">
            <button
              type="submit"
              className="btn-primary"
              disabled={currentSkills.length === 0}
            >
              {editingIndex !== null ? 'Update Skills' : 'Add Skills'}
            </button>
            
            {resumeData.skills.length > 0 && (
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="btn-primary"
              >
                Preview Resume
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
} 