import type { Teacher, TeacherCourse } from './resources/teachers.resource'
import type { Course, Lesson } from './resources/courses.resource'
import type { DashboardStats, Assignment, Student } from './resources/dashboard.resource'
import type { CourseListItem } from './resources/courses.resource'

export const mockTeacher: Teacher = {
  id: '1',
  slug: 'ahmed-math',
  name: 'Ahmed Hassan',
  bio: 'Experienced mathematics teacher with 10+ years of experience. I have been teaching mathematics for 15 years and helped thousands of students succeed in exams.',
  courseCount: 3,
  studentCount: 1200,
}

export const mockTeacherSara: Teacher = {
  id: '2',
  slug: 'sara-science',
  name: 'Sara Science Academy',
  bio: 'Physics and science educator passionate about making complex concepts simple. Over 8 years of teaching experience.',
  courseCount: 2,
  studentCount: 850,
}

export const mockTeacherCourses: TeacherCourse[] = [
  { id: '1', slug: 'algebra-basics', title: '3rd Prep Math', price: 150, studentCount: 450 },
  { id: '2', slug: 'geometry-101', title: 'Algebra Mastery', price: 199, studentCount: 320 },
  { id: '3', slug: 'calculus-intro', title: 'Introduction to Calculus', price: 299, studentCount: 180 },
]

export const mockTeacherCoursesSara: TeacherCourse[] = [
  { id: '4', slug: 'physics-grade-2', title: 'Physics for 2nd Secondary', price: 250, studentCount: 420 },
  { id: '5', slug: 'chemistry-basics', title: 'Chemistry Basics', price: 180, studentCount: 310 },
]

export const mockCourse: Course = {
  id: '1',
  slug: 'algebra-basics',
  title: 'Algebra Basics',
  description: 'Learn the fundamentals of algebra including equations, inequalities, and functions.',
  price: 150,
  studentCount: 450,
  lessonCount: 12,
}

export const mockLessons: Lesson[] = [
  { id: '1', title: 'Introduction to Variables', type: 'video', duration: 15, order: 1 },
  { id: '2', title: 'Linear Equations', type: 'video', duration: 20, order: 2 },
  { id: '3', title: 'Quiz: Chapter 1', type: 'quiz', order: 3 },
  { id: '4', title: 'Homework Assignment', type: 'assignment', order: 4 },
]

export const mockDashboardStats: DashboardStats = {
  totalStudents: 245,
  totalCourses: 8,
  revenue: 250000,
  assignmentsPending: 14,
}

export const mockCourseList: CourseListItem[] = [
  { id: '1', title: 'Algebra Basics', students: 120, price: 150, status: 'published' },
  { id: '2', title: 'Geometry 101', students: 85, price: 199, status: 'published' },
  { id: '3', title: 'Calculus Intro', students: 0, price: 250, status: 'draft' },
]

export const mockAssignments: Assignment[] = [
  { id: '1', studentName: 'أحمد محمد', title: 'Assignment 1', submissionDate: '2024-01-15', status: 'submitted' },
  { id: '2', studentName: 'فاطمة علي', title: 'Assignment 2', submissionDate: '2024-01-16', status: 'pending' },
  { id: '3', studentName: 'محمود حسن', title: 'Chapter 2 Quiz', submissionDate: '2024-01-18', status: 'submitted' },
  { id: '4', studentName: 'سارة إبراهيم', title: 'Homework 3', submissionDate: '2024-01-20', status: 'pending' },
  { id: '5', studentName: 'عمر خالد', title: 'Final Project', submissionDate: '2024-02-01', status: 'submitted' },
]

export const mockStudents: Student[] = [
  { id: '1', name: 'أحمد محمد', course: 'Algebra Basics', joinDate: '2024-01-01', progress: 75 },
  { id: '2', name: 'فاطمة علي', course: 'Geometry 101', joinDate: '2024-01-05', progress: 50 },
  { id: '3', name: 'محمود حسن', course: 'Algebra Basics', joinDate: '2024-01-10', progress: 90 },
  { id: '4', name: 'سارة إبراهيم', course: 'Calculus Intro', joinDate: '2024-01-15', progress: 30 },
  { id: '5', name: 'عمر خالد', course: 'Geometry 101', joinDate: '2024-02-01', progress: 65 },
  { id: '6', name: 'نورا سعيد', course: 'Algebra Basics', joinDate: '2024-02-05', progress: 100 },
  { id: '7', name: 'يوسف أحمد', course: 'Calculus Intro', joinDate: '2024-02-10', progress: 20 },
  { id: '8', name: 'مريم حسين', course: 'Geometry 101', joinDate: '2024-02-15', progress: 45 },
]

export interface PaymentHistoryItem {
  id: string
  date: string
  amount: number
  status: 'completed' | 'pending' | 'processing'
}

export const mockPaymentHistory: PaymentHistoryItem[] = [
  { id: '1', date: '2025-01-15', amount: 250000, status: 'completed' },
  { id: '2', date: '2024-12-20', amount: 9800, status: 'completed' },
  { id: '3', date: '2024-11-18', amount: 11200, status: 'completed' },
  { id: '4', date: '2025-02-01', amount: 4500, status: 'processing' },
  { id: '5', date: '2024-10-15', amount: 8200, status: 'completed' },
  { id: '6', date: '2024-09-20', amount: 7500, status: 'completed' },
]

export interface AcademySettings {
  name: string
  primaryColor: string
}

export const mockAcademySettings: AcademySettings = {
  name: 'Ahmed Math Academy',
  primaryColor: '#0D9488',
}

export interface EnrolledCourse {
  id: string
  title: string
  teacherName: string
  progress: number
  lessonCount: number
  completedLessons: number
}

export const mockEnrolledCourses: EnrolledCourse[] = [
  { id: '1', title: 'Algebra Basics', teacherName: 'Ahmed Hassan', progress: 75, lessonCount: 8, completedLessons: 6 },
  { id: '2', title: 'Geometry 101', teacherName: 'Ahmed Hassan', progress: 25, lessonCount: 10, completedLessons: 2 },
]

export interface StudentAssignment {
  id: string
  courseTitle: string
  title: string
  dueDate: string
  status: 'pending' | 'submitted'
}

export const mockStudentAssignments: StudentAssignment[] = [
  { id: '1', courseTitle: 'Algebra Basics', title: 'Homework Assignment', dueDate: '2025-01-20', status: 'pending' },
  { id: '2', courseTitle: 'Algebra Basics', title: 'Chapter 1 Quiz', dueDate: '2025-01-15', status: 'submitted' },
]

export interface AnalyticsDataPoint {
  month: string
  revenue?: number
  students?: number
  enrollments?: number
  progress?: number
}

export const mockTeacherAnalytics: AnalyticsDataPoint[] = [
  { month: '2024-09', revenue: 8200, students: 180 },
  { month: '2024-10', revenue: 9500, students: 205 },
  { month: '2024-11', revenue: 11200, students: 228 },
  { month: '2024-12', revenue: 9800, students: 238 },
  { month: '2025-01', revenue: 250000, students: 245 },
  { month: '2025-02', revenue: 4500, students: 252 },
]

export const mockStudentAnalytics: AnalyticsDataPoint[] = [
  { month: '2024-09', progress: 15, enrollments: 1 },
  { month: '2024-10', progress: 28, enrollments: 1 },
  { month: '2024-11', progress: 42, enrollments: 2 },
  { month: '2024-12', progress: 55, enrollments: 2 },
  { month: '2025-01', progress: 68, enrollments: 2 },
  { month: '2025-02', progress: 75, enrollments: 2 },
]
