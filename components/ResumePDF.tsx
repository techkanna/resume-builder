import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import { ResumeData } from '@/store/resumeStore'

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    lineHeight: 1.5,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  contactItem: {
    marginHorizontal: 5,
  },
  section: {
    margin: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 2,
  },
  experienceItem: {
    marginBottom: 10,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 11,
    marginBottom: 2,
  },
  dateRange: {
    fontSize: 10,
    fontStyle: 'italic',
  },
  bulletPoint: {
    fontSize: 10,
    marginBottom: 2,
    marginLeft: 10,
    flexDirection: 'row',
  },
  bullet: {
    marginRight: 5,
  },
  educationItem: {
    marginBottom: 8,
  },
  degree: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  school: {
    fontSize: 11,
    marginBottom: 2,
  },
  skillCategory: {
    marginBottom: 6,
  },
  skillCategoryTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  skillsList: {
    fontSize: 10,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.4,
    textAlign: 'justify',
  },
})

interface ResumePDFProps {
  resumeData: ResumeData
}

export default function ResumePDF({ resumeData }: ResumePDFProps) {
  const { personalInfo, workExperience, education, skills } = resumeData

  // Format contact info
  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin && 'LinkedIn',
    personalInfo.website && 'Portfolio'
  ].filter(Boolean)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {personalInfo.firstName} {personalInfo.lastName}
          </Text>
          <View style={styles.contactInfo}>
            {contactItems.map((item, index) => (
              <Text key={index} style={styles.contactItem}>
                {item}{index < contactItems.length - 1 && ' •'}
              </Text>
            ))}
          </View>
        </View>

        {/* Professional Summary */}
        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
            <Text style={styles.summary}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
            {workExperience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.jobHeader}>
                  <View>
                    <Text style={styles.jobTitle}>{exp.jobTitle}</Text>
                    <Text style={styles.company}>{exp.company} • {exp.location}</Text>
                  </View>
                  <Text style={styles.dateRange}>
                    {exp.startDate} - {exp.endDate}
                  </Text>
                </View>
                {exp.description.map((bullet, index) => (
                  <View key={index} style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text>{bullet}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <View style={styles.jobHeader}>
                  <View>
                    <Text style={styles.degree}>{edu.degree}</Text>
                    <Text style={styles.school}>{edu.school} • {edu.location}</Text>
                    {edu.gpa && <Text style={styles.company}>GPA: {edu.gpa}</Text>}
                  </View>
                  <Text style={styles.dateRange}>{edu.graduationDate}</Text>
                </View>
                {edu.relevantCoursework && (
                  <Text style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text>Relevant Coursework: {edu.relevantCoursework}</Text>
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SKILLS</Text>
            {skills.map((skillGroup) => (
              <View key={skillGroup.id} style={styles.skillCategory}>
                <Text style={styles.skillCategoryTitle}>{skillGroup.category}:</Text>
                <Text style={styles.skillsList}>{skillGroup.skills.join(', ')}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  )
} 