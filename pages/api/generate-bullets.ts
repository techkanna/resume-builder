import { NextApiRequest, NextApiResponse } from 'next'
import { generateJobDescriptionBullets } from '@/lib/openai'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { jobTitle, company, responsibilities } = req.body

    if (!jobTitle || !company) {
      return res.status(400).json({ message: 'Job title and company are required' })
    }

    const bullets = await generateJobDescriptionBullets(jobTitle, company, responsibilities)

    res.status(200).json({ bullets })
  } catch (error) {
    console.error('Error generating bullets:', error)
    res.status(500).json({ message: 'Failed to generate bullet points' })
  }
} 