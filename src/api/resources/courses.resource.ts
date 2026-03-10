import { apiClient } from '../client'

export interface Course {
  id: string
  slug: string
  title: string
  description: string
  price: number
  thumbnail?: string
  studentCount: number
  lessonCount: number
}

export interface CourseListItem {
  id: string
  title: string
  students: number
  price: number
  status: 'draft' | 'published'
}

export interface Lesson {
  id: string
  title: string
  type: 'video' | 'quiz' | 'pdf' | 'assignment'
  duration?: number
  order: number
}

export async function getCourseBySlug(slug: string): Promise<Course> {
  const res = await apiClient.get(`courses/${slug}`).json<Course>()
  return res
}

export async function getCourseLessons(courseId: string): Promise<Lesson[]> {
  const res = await apiClient.get(`courses/${courseId}/lessons`).json<Lesson[]>()
  return res
}

export async function getDashboardCourses(): Promise<CourseListItem[]> {
  const res = await apiClient.get('dashboard/courses').json<CourseListItem[]>()
  return res
}

export async function createCourse(data: {
  title: string
  description: string
  price: number
  grade?: string
  category?: string
}): Promise<Course> {
  const res = await apiClient.post('courses', { json: data }).json<Course>()
  return res
}
