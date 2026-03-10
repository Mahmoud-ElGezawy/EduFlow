import { createQuery, createMutation } from 'react-query-kit'
import {
  getCourseBySlug,
  getCourseLessons,
  getDashboardCourses,
  createCourse,
} from '../resources/courses.resource'

export const useCourse = createQuery({
  queryKey: ['courses'],
  fetcher: (variables: { slug: string }) => getCourseBySlug(variables.slug),
})

export const useCourseLessons = createQuery({
  queryKey: ['courses', 'lessons'],
  fetcher: (variables: { courseId: string }) => getCourseLessons(variables.courseId),
})

export const useDashboardCourses = createQuery({
  queryKey: ['dashboard', 'courses'],
  fetcher: () => getDashboardCourses(),
})

export const useCreateCourse = createMutation({
  mutationFn: createCourse,
})
