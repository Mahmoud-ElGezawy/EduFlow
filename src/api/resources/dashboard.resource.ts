import { apiClient } from '../client'
import { mockDashboardStats, mockAssignments, mockStudents } from '../mock-data'

export interface DashboardStats {
  totalStudents: number
  totalCourses: number
  revenue: number
  assignmentsPending: number
}

export interface Assignment {
  id: string
  studentName: string
  title: string
  submissionDate: string
  status: 'pending' | 'submitted' | 'graded'
}

export interface Student {
  id: string
  name: string
  course: string
  joinDate: string
  progress: number
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const res = await apiClient.get('dashboard/stats').json<DashboardStats>()
    return res
  } catch {
    return mockDashboardStats
  }
}

export async function getAssignments(): Promise<Assignment[]> {
  try {
    const res = await apiClient.get('dashboard/assignments').json<Assignment[]>()
    return res
  } catch {
    return mockAssignments
  }
}

export async function getStudents(): Promise<Student[]> {
  try {
    const res = await apiClient.get('dashboard/students').json<Student[]>()
    return res
  } catch {
    return mockStudents
  }
}
