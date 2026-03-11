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

/** Sample PDF URL for assignment briefs (real public PDF for demo) */
const SAMPLE_PDF_URL = 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/pdf.pdf'

export const mockAssignments: Assignment[] = [
  { id: '1', studentId: '1', studentName: 'أحمد محمد', courseId: '1', courseTitle: 'Algebra Basics', title: 'Assignment 1', description: 'Complete Chapter 2 exercises', instructionsPdfUrl: SAMPLE_PDF_URL, dueDate: '2025-01-15', submissionDate: '2024-01-15', status: 'graded', grade: 88, feedback: 'Good work on the equations.', submittedFileUrl: SAMPLE_PDF_URL },
  { id: '2', studentId: '2', studentName: 'فاطمة علي', courseId: '2', courseTitle: 'Geometry 101', title: 'Assignment 2', description: 'Triangle proofs', instructionsPdfUrl: SAMPLE_PDF_URL, dueDate: '2025-01-20', status: 'pending' },
  { id: '3', studentId: '3', studentName: 'محمود حسن', courseId: '1', courseTitle: 'Algebra Basics', title: 'Chapter 2 Quiz', description: 'Quiz on linear equations', instructionsPdfUrl: SAMPLE_PDF_URL, dueDate: '2025-01-18', submissionDate: '2024-01-18', status: 'graded', grade: 95 },
  { id: '4', studentId: '4', studentName: 'سارة إبراهيم', courseId: '3', courseTitle: 'Calculus Intro', title: 'Homework 3', description: 'Limits and derivatives', instructionsPdfUrl: SAMPLE_PDF_URL, dueDate: '2025-01-25', status: 'pending' },
  { id: '5', studentId: '5', studentName: 'عمر خالد', courseId: '2', courseTitle: 'Geometry 101', title: 'Final Project', description: 'Geometric proofs portfolio', dueDate: '2025-02-01', submissionDate: '2024-02-01', status: 'submitted', submittedFileUrl: SAMPLE_PDF_URL },
  { id: '6', studentId: '1', studentName: 'أحمد محمد', courseId: '1', courseTitle: 'Algebra Basics', title: 'Chapter 3 Quiz', description: 'Quiz on quadratics', instructionsPdfUrl: SAMPLE_PDF_URL, dueDate: '2025-01-28', status: 'pending' },
  { id: '7', studentId: '8', studentName: 'مريم حسين', courseId: '2', courseTitle: 'Geometry 101', title: 'Triangle Proofs', description: 'Prove triangle congruence', instructionsPdfUrl: SAMPLE_PDF_URL, dueDate: '2025-01-25', status: 'pending' },
]

export const mockStudents: Student[] = [
  { id: '1', name: 'أحمد محمد', email: 'ahmed@example.com', course: 'Algebra Basics', courseId: '1', joinDate: '2024-01-01', progress: 75 },
  { id: '2', name: 'فاطمة علي', email: 'fatma@example.com', course: 'Geometry 101', courseId: '2', joinDate: '2024-01-05', progress: 50 },
  { id: '3', name: 'محمود حسن', email: 'mahmoud@example.com', course: 'Algebra Basics', courseId: '1', joinDate: '2024-01-10', progress: 90 },
  { id: '4', name: 'سارة إبراهيم', email: 'sara@example.com', course: 'Calculus Intro', courseId: '3', joinDate: '2024-01-15', progress: 30 },
  { id: '5', name: 'عمر خالد', email: 'omar@example.com', course: 'Geometry 101', courseId: '2', joinDate: '2024-02-01', progress: 65 },
  { id: '6', name: 'نورا سعيد', email: 'nora@example.com', course: 'Algebra Basics', courseId: '1', joinDate: '2024-02-05', progress: 100 },
  { id: '7', name: 'يوسف أحمد', email: 'youssef@example.com', course: 'Calculus Intro', courseId: '3', joinDate: '2024-02-10', progress: 20 },
  { id: '8', name: 'مريم حسين', email: 'mariam@example.com', course: 'Geometry 101', courseId: '2', joinDate: '2024-02-15', progress: 45 },
]

export interface StudentDetail {
  id: string
  name: string
  email?: string
  phone?: string
  joinDate: string
  enrolledCourses: { id: string; title: string; progress: number; lessonCount: number; completedLessons: number }[]
  assignments: { id: string; title: string; courseTitle: string; status: string; grade?: number }[]
}

export const mockStudentDetails: Record<string, StudentDetail> = {
  '1': {
    id: '1',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+20 100 123 4567',
    joinDate: '2024-01-01',
    enrolledCourses: [
      { id: '1', title: 'Algebra Basics', progress: 75, lessonCount: 12, completedLessons: 9 },
      { id: '2', title: 'Geometry 101', progress: 20, lessonCount: 10, completedLessons: 2 },
    ],
    assignments: [
      { id: '1', title: 'Assignment 1', courseTitle: 'Algebra Basics', status: 'graded', grade: 88 },
      { id: '6', title: 'Chapter 3 Quiz', courseTitle: 'Algebra Basics', status: 'pending' },
    ],
  },
  '2': {
    id: '2',
    name: 'فاطمة علي',
    email: 'fatma@example.com',
    joinDate: '2024-01-05',
    enrolledCourses: [{ id: '2', title: 'Geometry 101', progress: 50, lessonCount: 10, completedLessons: 5 }],
    assignments: [
      { id: '2', title: 'Assignment 2', courseTitle: 'Geometry 101', status: 'pending' },
    ],
  },
  '3': {
    id: '3',
    name: 'محمود حسن',
    email: 'mahmoud@example.com',
    joinDate: '2024-01-10',
    enrolledCourses: [{ id: '1', title: 'Algebra Basics', progress: 90, lessonCount: 12, completedLessons: 11 }],
    assignments: [
      { id: '3', title: 'Chapter 2 Quiz', courseTitle: 'Algebra Basics', status: 'graded', grade: 95 },
    ],
  },
  '4': {
    id: '4',
    name: 'سارة إبراهيم',
    email: 'sara@example.com',
    joinDate: '2024-01-15',
    enrolledCourses: [{ id: '3', title: 'Calculus Intro', progress: 30, lessonCount: 8, completedLessons: 2 }],
    assignments: [
      { id: '4', title: 'Homework 3', courseTitle: 'Calculus Intro', status: 'pending' },
    ],
  },
  '5': {
    id: '5',
    name: 'عمر خالد',
    email: 'omar@example.com',
    joinDate: '2024-02-01',
    enrolledCourses: [{ id: '2', title: 'Geometry 101', progress: 65, lessonCount: 10, completedLessons: 6 }],
    assignments: [
      { id: '5', title: 'Final Project', courseTitle: 'Geometry 101', status: 'submitted' },
    ],
  },
  '6': {
    id: '6',
    name: 'نورا سعيد',
    email: 'nora@example.com',
    joinDate: '2024-02-05',
    enrolledCourses: [{ id: '1', title: 'Algebra Basics', progress: 100, lessonCount: 12, completedLessons: 12 }],
    assignments: [],
  },
  '7': {
    id: '7',
    name: 'يوسف أحمد',
    email: 'youssef@example.com',
    joinDate: '2024-02-10',
    enrolledCourses: [{ id: '3', title: 'Calculus Intro', progress: 20, lessonCount: 8, completedLessons: 1 }],
    assignments: [],
  },
  '8': {
    id: '8',
    name: 'مريم حسين',
    email: 'mariam@example.com',
    joinDate: '2024-02-15',
    enrolledCourses: [{ id: '2', title: 'Geometry 101', progress: 45, lessonCount: 10, completedLessons: 4 }],
    assignments: [
      { id: '7', title: 'Triangle Proofs', courseTitle: 'Geometry 101', status: 'pending' },
    ],
  },
}

export const mockAssignmentDetails: Record<string, Assignment> = Object.fromEntries(
  mockAssignments.map((a) => [a.id, a])
)

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
  courseId: string
  courseTitle: string
  title: string
  description: string
  instructions: string
  /** PDF or file URL for assignment brief/worksheet (teacher provides, student downloads) */
  instructionsPdfUrl?: string
  dueDate: string
  status: 'pending' | 'submitted'
  submittedAt?: string
  grade?: number
  feedback?: string
}

export const mockStudentAssignments: StudentAssignment[] = [
  {
    id: '1',
    courseId: '1',
    courseTitle: 'Algebra Basics',
    title: 'Homework Assignment',
    description: 'Complete the exercises from Chapter 2',
    instructions: 'Solve problems 1-15 from the textbook. Show all your work. Upload your solutions as a PDF or image.',
    instructionsPdfUrl: SAMPLE_PDF_URL,
    dueDate: '2025-01-20',
    status: 'pending',
  },
  {
    id: '2',
    courseId: '1',
    courseTitle: 'Algebra Basics',
    title: 'Chapter 1 Quiz',
    description: 'Quiz covering variables and linear equations',
    instructions: 'Answer all questions. You have 30 minutes to complete.',
    instructionsPdfUrl: SAMPLE_PDF_URL,
    dueDate: '2025-01-15',
    status: 'submitted',
    submittedAt: '2025-01-14T18:30:00',
    grade: 85,
    feedback: 'Good work! Review the quadratic formula section.',
  },
  {
    id: '3',
    courseId: '2',
    courseTitle: 'Geometry 101',
    title: 'Triangle Proofs',
    description: 'Prove the congruence of triangles',
    instructions: 'Complete proofs for problems 5, 7, and 9. Use two-column format.',
    instructionsPdfUrl: SAMPLE_PDF_URL,
    dueDate: '2025-01-25',
    status: 'pending',
  },
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

export const mockEngagementAnalytics: AnalyticsDataPoint[] = [
  { month: '2024-09', progress: 72, enrollments: 45 },
  { month: '2024-10', progress: 78, enrollments: 52 },
  { month: '2024-11', progress: 81, enrollments: 61 },
  { month: '2024-12', progress: 84, enrollments: 58 },
  { month: '2025-01', progress: 86, enrollments: 72 },
  { month: '2025-02', progress: 88, enrollments: 65 },
]

export type SessionType = 'online' | 'offline'

export interface BookingSlot {
  id: string
  date: string
  start: string
  end: string
  available: boolean
  capacity: number
  booked: number
  type?: SessionType
}

export interface BookingDaySlots {
  date: string
  slots: BookingSlot[]
}

export interface OfflineStudentInGroup {
  id: string
  name: string
  phone: string
  email: string
  notes?: string
}

export interface SessionGroup {
  id: string
  slotId: string
  date: string
  start: string
  end: string
  type: SessionType
  students?: OfflineStudentInGroup[]
  createdAt?: string
  notes?: string
}

export const mockSessionGroups: SessionGroup[] = [
  {
    id: 'g1',
    slotId: '2-0',
    date: new Date().toISOString().split('T')[0],
    start: '10:00',
    end: '11:00',
    type: 'offline',
    createdAt: new Date().toISOString(),
    students: [
      { id: 's1', name: 'أحمد محمد', phone: '+20 100 123 4567', email: 'ahmed@example.com', notes: 'First session' },
      { id: 's2', name: 'فاطمة علي', phone: '+20 101 234 5678', email: 'fatma@example.com' },
      { id: 's3', name: 'محمود حسن', phone: '+20 102 345 6789', email: 'mahmoud@example.com' },
    ],
  },
  {
    id: 'g2',
    slotId: '2-1',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    start: '10:00',
    end: '11:00',
    type: 'offline',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    students: [
      { id: 's4', name: 'سارة إبراهيم', phone: '+20 103 456 7890', email: 'sara@example.com' },
      { id: 's5', name: 'عمر خالد', phone: '+20 104 567 8901', email: 'omar@example.com', notes: 'Group A' },
    ],
  },
  {
    id: 'g3',
    slotId: '1-2',
    date: new Date().toISOString().split('T')[0],
    start: '09:00',
    end: '10:00',
    type: 'online',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    notes: 'Zoom link sent',
  },
]

export const mockBookingWeekSlots: BookingDaySlots[] = (() => {
  const result: BookingDaySlots[] = []
  const today = new Date()
  for (let i = 0; i < 7; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - d.getDay() + i)
    result.push({
      date: d.toISOString().split('T')[0],
      slots: [
        { id: `1-${i}`, start: '09:00', end: '10:00', available: true, capacity: 10, booked: 3, type: 'online' },
        { id: `2-${i}`, start: '10:00', end: '11:00', available: i < 5, capacity: 10, booked: 10, type: 'offline' },
        { id: `3-${i}`, start: '14:00', end: '15:00', available: true, capacity: 10, booked: 0, type: 'online' },
      ],
    })
  }
  return result
})()

export interface AutomationRule {
  id: string
  trigger: string
  action: string
  enabled: boolean
}

export const mockAutomationRules: AutomationRule[] = [
  { id: '1', trigger: 'Student books class', action: 'Send reminder email 24h before', enabled: true },
  { id: '2', trigger: 'New enrollment', action: 'Send welcome email', enabled: true },
  { id: '3', trigger: 'Assignment submitted', action: 'Notify teacher', enabled: false },
]

export interface ThemeLayoutBlock {
  id: string
  type: 'hero' | 'courses' | 'testimonials' | 'cta' | 'about'
  title: string
  enabled: boolean
  order: number
}

export const mockThemeLayoutBlocks: ThemeLayoutBlock[] = [
  { id: '1', type: 'hero', title: 'Hero Section', enabled: true, order: 0 },
  { id: '2', type: 'courses', title: 'Course Showcase', enabled: true, order: 1 },
  { id: '3', type: 'about', title: 'About', enabled: true, order: 2 },
  { id: '4', type: 'testimonials', title: 'Testimonials', enabled: true, order: 3 },
  { id: '5', type: 'cta', title: 'Call to Action', enabled: true, order: 4 },
]

export const mockStudentAnalytics: AnalyticsDataPoint[] = [
  { month: '2024-09', progress: 15, enrollments: 1 },
  { month: '2024-10', progress: 28, enrollments: 1 },
  { month: '2024-11', progress: 42, enrollments: 2 },
  { month: '2024-12', progress: 55, enrollments: 2 },
  { month: '2025-01', progress: 68, enrollments: 2 },
  { month: '2025-02', progress: 75, enrollments: 2 },
]
