import { NextApiRequest, NextApiResponse } from 'next'
import { generateProfessionalSummary } from '@/lib/openai'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { personalInfo, experience, education } = req.body

    if (!personalInfo) {
      return res.status(400).json({ message: 'Personal information is required' })
    }

    const summary = await generateProfessionalSummary(personalInfo, experience || [], education || [])

    res.status(200).json({ summary })
  } catch (error) {
    console.error('Error generating summary:', error)
    res.status(500).json({ message: 'Failed to generate professional summary' })
  }
} 