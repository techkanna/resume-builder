import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function generateResumeContent(prompt: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional resume writer. Generate clear, concise, and impactful resume content based on the user's input. Focus on achievements and quantifiable results when possible."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    })

    return response.choices[0].message.content || ''
  } catch (error) {
    console.error('Error generating resume content:', error)
    throw new Error('Failed to generate resume content')
  }
}

export async function generateJobDescriptionBullets(jobTitle: string, company: string, responsibilities: string): Promise<string[]> {
  const prompt = `Create 3-5 professional resume bullet points for a ${jobTitle} position at ${company}. Base the content on these responsibilities: ${responsibilities}.
  
  Guidelines:
  - Start each bullet with a strong action verb
  - Include quantifiable achievements when possible
  - Keep each bullet concise (max 25 words) and impactful
  - Ensure the text is completely free of spelling or grammatical errors
  - Focus on results and accomplishments
  
  Return only the bullet points, one per line, without bullet symbols.`

  try {
    const content = await generateResumeContent(prompt)
    return content.split('\n').filter(line => line.trim() !== '').map(line => line.trim())
  } catch (error) {
    console.error('Error generating job bullets:', error)
    return []
  }
}

export async function generateProfessionalSummary(personalInfo: any, experience: any[], education: any[]): Promise<string> {
  const prompt = `Create a professional summary for a resume based on this information:
  
  Name: ${personalInfo.firstName} ${personalInfo.lastName}
  Recent Experience: ${experience.slice(0, 2).map(exp => `${exp.jobTitle} at ${exp.company}`).join(', ')}
  Education: ${education.map(edu => `${edu.degree} from ${edu.school}`).join(', ')}
  
  Write a compelling 2–3 sentence professional summary that highlights key qualifications, experience, and career objectives. The text must be tailored to their background and contain zero spelling or grammatical errors.`

  try {
    return await generateResumeContent(prompt)
  } catch (error) {
    console.error('Error generating summary:', error)
    return ''
  }
} 