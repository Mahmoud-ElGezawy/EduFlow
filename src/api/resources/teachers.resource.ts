import { apiClient } from '../client'

export interface Teacher {
  id: string
  slug: string
  name: string
  bio: string
  avatarUrl?: string
  courseCount: number
  studentCount: number
}

export interface TeacherCourse {
  id: string
  slug: string
  title: string
  thumbnail?: string
  price: number
  studentCount: number
}

export async function getTeacherBySlug(slug: string): Promise<Teacher> {
  const res = await apiClient.get(`teachers/${slug}`).json<Teacher>()
  return res
}

export async function getTeacherCourses(teacherSlug: string): Promise<TeacherCourse[]> {
  const res = await apiClient.get(`teachers/${teacherSlug}/courses`).json<TeacherCourse[]>()
  return res
}
