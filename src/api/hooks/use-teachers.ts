import { createQuery } from 'react-query-kit'
import { getTeacherBySlug, getTeacherCourses } from '../resources/teachers.resource'

export const useTeacher = createQuery({
  queryKey: ['teachers'],
  fetcher: (variables: { slug: string }) => getTeacherBySlug(variables.slug),
})

export const useTeacherCourses = createQuery({
  queryKey: ['teachers', 'courses'],
  fetcher: (variables: { teacherSlug: string }) => getTeacherCourses(variables.teacherSlug),
})
