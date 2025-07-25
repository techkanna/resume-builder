import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  linkedin: string
  website: string
  summary: string
}

export interface WorkExperience {
  id: string
  jobTitle: string
  company: string
  location: string
  startDate: string
  endDate: string
  isCurrentRole: boolean
  description: string[]
}

export interface Education {
  id: string
  degree: string
  school: string
  location: string
  graduationDate: string
  gpa?: string
  relevantCoursework?: string
}

export interface Skill {
  id: string
  category: string
  skills: string[]
}

export interface ResumeData {
  personalInfo: PersonalInfo
  workExperience: WorkExperience[]
  education: Education[]
  skills: Skill[]
}

export interface ResumeStore {
  resumeData: ResumeData
  currentStep: number
  theme: 'light' | 'dark'
  
  // Actions
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void
  addWorkExperience: (experience: WorkExperience) => void
  updateWorkExperience: (id: string, experience: Partial<WorkExperience>) => void
  removeWorkExperience: (id: string) => void
  addEducation: (education: Education) => void
  updateEducation: (id: string, education: Partial<Education>) => void
  removeEducation: (id: string) => void
  addSkill: (skill: Skill) => void
  updateSkill: (id: string, skill: Partial<Skill>) => void
  removeSkill: (id: string) => void
  setCurrentStep: (step: number) => void
  toggleTheme: () => void
  resetResume: () => void
}

const initialResumeData: ResumeData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: ''
  },
  workExperience: [],
  education: [],
  skills: []
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      resumeData: initialResumeData,
      currentStep: 0,
      theme: 'light',

      updatePersonalInfo: (info) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            personalInfo: { ...state.resumeData.personalInfo, ...info }
          }
        })),

      addWorkExperience: (experience) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            workExperience: [...state.resumeData.workExperience, experience]
          }
        })),

      updateWorkExperience: (id, experience) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            workExperience: state.resumeData.workExperience.map((exp) =>
              exp.id === id ? { ...exp, ...experience } : exp
            )
          }
        })),

      removeWorkExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            workExperience: state.resumeData.workExperience.filter((exp) => exp.id !== id)
          }
        })),

      addEducation: (education) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: [...state.resumeData.education, education]
          }
        })),

      updateEducation: (id, education) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.map((edu) =>
              edu.id === id ? { ...edu, ...education } : edu
            )
          }
        })),

      removeEducation: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.filter((edu) => edu.id !== id)
          }
        })),

      addSkill: (skill) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: [...state.resumeData.skills, skill]
          }
        })),

      updateSkill: (id, skill) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.map((s) =>
              s.id === id ? { ...s, ...skill } : s
            )
          }
        })),

      removeSkill: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.filter((s) => s.id !== id)
          }
        })),

      setCurrentStep: (step) => set({ currentStep: step }),

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light'
        })),

      resetResume: () =>
        set({
          resumeData: initialResumeData,
          currentStep: 0
        })
    }),
    {
      name: 'resume-builder-storage'
    }
  )
) 