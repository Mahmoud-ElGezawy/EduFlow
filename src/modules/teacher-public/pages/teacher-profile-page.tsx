import { Container, Box } from '@mui/material'
import { getMockTeacherProfileData } from '../mockTeacherData'
import { TeacherHero } from '../components/teacher-hero'
import { TeacherCourses } from '../components/teacher-courses'
import { TeacherSessions } from '../components/teacher-sessions'
import { TeacherGroups } from '../components/teacher-groups'
import { TeacherReviews } from '../components/teacher-reviews'
import { TeacherAnnouncements } from '../components/teacher-announcements'

/**
 * Teacher Public Profile / Storefront page.
 * Displays the current teacher's public landing page.
 * Uses mock data for now; structure is scalable for future multi-teacher support.
 */
export function TeacherProfilePage() {
  const data = getMockTeacherProfileData()
  const { teacher, courses, sessions, groups, reviews, announcements } = data

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, py: 4 }}>
      <TeacherHero
        name={teacher.name}
        headline={teacher.headline}
        bio={teacher.bio}
        avatarUrl={teacher.avatarUrl}
        courseCount={teacher.courseCount}
        studentCount={teacher.studentCount}
        teacherSlug={teacher.slug}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        <TeacherCourses courses={courses} id="courses" />
        <TeacherSessions sessions={sessions} />
        <TeacherGroups groups={groups} />
        <TeacherReviews reviews={reviews} />
        <TeacherAnnouncements announcements={announcements} />
      </Box>
    </Container>
  )
}
