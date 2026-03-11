/**
 * Mock data for the Teacher Public Profile / Storefront page.
 * Used for frontend simulation only. Structure is scalable for future multi-teacher support.
 */

export interface TeacherProfile {
  id: string
  slug: string
  name: string
  headline: string
  bio: string
  avatarUrl?: string
  courseCount: number
  studentCount: number
}

export interface TeacherProfileCourse {
  id: string
  slug: string
  title: string
  thumbnail?: string
  price: number
  description: string
  studentCount: number
}

export interface TeacherSession {
  id: string
  title: string
  date: string
  duration: number // minutes
  availableSeats: number
}

export interface TeacherGroup {
  id: string
  name: string
  description: string
  memberCount: number
}

export interface TeacherReview {
  id: string
  studentName: string
  rating: number
  reviewText: string
  date: string
}

export interface TeacherAnnouncement {
  id: string
  title: string
  description: string
  date: string
}

export interface TeacherProfileData {
  teacher: TeacherProfile
  courses: TeacherProfileCourse[]
  sessions: TeacherSession[]
  groups: TeacherGroup[]
  reviews: TeacherReview[]
  announcements: TeacherAnnouncement[]
}

/**
 * Returns mock data for the current teacher's public profile.
 * In future multi-teacher support, this would accept teacherId/slug and return that teacher's data.
 */
export function getMockTeacherProfileData(): TeacherProfileData {
  return mockTeacherProfileData
}

const mockTeacherProfileData: TeacherProfileData = {
  teacher: {
    id: '1',
    slug: 'ahmed-math',
    name: 'Ahmed Hassan',
    headline: 'Mathematics Educator | 15+ Years Experience | Helping Students Excel',
    bio: 'Experienced mathematics teacher with 10+ years of experience. I have been teaching mathematics for 15 years and helped thousands of students succeed in exams. My approach focuses on building strong foundations and making complex concepts accessible.',
    avatarUrl: undefined,
    courseCount: 3,
    studentCount: 1200,
  },
  courses: [
    {
      id: '1',
      slug: 'algebra-basics',
      title: '3rd Prep Math',
      thumbnail: undefined,
      price: 150,
      description: 'Master the fundamentals of algebra including equations, inequalities, and functions. Perfect for 3rd preparatory students.',
      studentCount: 450,
    },
    {
      id: '2',
      slug: 'geometry-101',
      title: 'Algebra Mastery',
      thumbnail: undefined,
      price: 199,
      description: 'Deep dive into algebraic concepts with practical applications. Build confidence for exams.',
      studentCount: 320,
    },
    {
      id: '3',
      slug: 'calculus-intro',
      title: 'Introduction to Calculus',
      thumbnail: undefined,
      price: 299,
      description: 'Learn limits, derivatives, and integrals. Essential foundation for advanced mathematics.',
      studentCount: 180,
    },
  ],
  sessions: [
    {
      id: 's1',
      title: 'Algebra Q&A Session',
      date: '2025-03-15',
      duration: 60,
      availableSeats: 8,
    },
    {
      id: 's2',
      title: 'Geometry Workshop',
      date: '2025-03-18',
      duration: 90,
      availableSeats: 5,
    },
    {
      id: 's3',
      title: 'Calculus Office Hours',
      date: '2025-03-20',
      duration: 45,
      availableSeats: 12,
    },
  ],
  groups: [
    {
      id: 'g1',
      name: '3rd Prep Study Group',
      description: 'Weekly study sessions for 3rd preparatory algebra students.',
      memberCount: 24,
    },
    {
      id: 'g2',
      name: 'Geometry Mastery Cohort',
      description: 'Intensive 8-week geometry program for exam preparation.',
      memberCount: 18,
    },
    {
      id: 'g3',
      name: 'Calculus Beginners',
      description: 'Support group for students new to calculus concepts.',
      memberCount: 12,
    },
  ],
  reviews: [
    {
      id: 'r1',
      studentName: 'Omar K.',
      rating: 5,
      reviewText: 'Excellent teacher! Clear explanations and patient. My grades improved significantly after joining his courses.',
      date: '2025-01-10',
    },
    {
      id: 'r2',
      studentName: 'Nora S.',
      rating: 5,
      reviewText: 'Highly recommend. The way he breaks down complex topics makes everything so much easier to understand.',
      date: '2025-01-05',
    },
    {
      id: 'r3',
      studentName: 'Youssef M.',
      rating: 4,
      reviewText: 'Great courses and very responsive to questions. Would love to see more practice problems.',
      date: '2024-12-28',
    },
  ],
  announcements: [
    {
      id: 'a1',
      title: 'New Course Launch: Calculus Advanced',
      description: 'Starting next month! Pre-register now for early bird pricing.',
      date: '2025-03-10',
    },
    {
      id: 'a2',
      title: 'Office Hours Schedule Update',
      description: 'Extended office hours every Tuesday and Thursday for exam preparation.',
      date: '2025-03-08',
    },
    {
      id: 'a3',
      title: 'Study Group Formation',
      description: 'Forming a new study group for 2nd secondary students. Sign up by March 15.',
      date: '2025-03-05',
    },
  ],
}
