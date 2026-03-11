# Assignment System – Ideas & Design

This document outlines ideas for how assignments should work in EduFlow LMS.

---

## Current Implementation

- **Teacher view**: List assignments, view details, download student submissions (PDF), grade, give feedback
- **Student view**: List assignments, view details, download assignment brief (PDF), upload submission
- **Assignment brief PDF**: Teachers can attach a PDF (worksheet, instructions, problems) that students download
- **Submission**: Students upload PDF or images; teachers download and grade

---

## Assignment Workflow Ideas

### 1. **Assignment Creation (Teacher)**

- Create from course/lesson context
- **Fields**: Title, description, instructions (rich text), due date, optional PDF attachment
- **Types**: Homework, Quiz, Project, Essay
- **Grading**: Points-based (e.g. 100) or rubric
- **Linked to**: Specific lesson or course module
- **Visibility**: Auto-assign to enrolled students or manual selection

### 2. **Assignment Brief (PDF)**

- Teacher uploads a PDF (worksheet, problems, reading)
- Students download before starting
- Optional: In-app PDF viewer instead of download
- Support multiple attachments (PDF + images)

### 3. **Student Submission**

- **Accepted formats**: PDF, images (JPG, PNG), DOCX
- **Upload**: Single file or multiple files
- **Draft**: Save progress before final submit
- **Resubmit**: Allow resubmission before due date (configurable)
- **Late submission**: Flag if past due; optional penalty

### 4. **Grading & Feedback**

- **Grade**: Numeric (0–100) or letter grade
- **Feedback**: Text, optional voice note
- **Rubric**: Predefined criteria with points
- **Annotations**: Mark up PDF (future)
- **Notify student** when graded

### 5. **Notifications**

- Student: New assignment, reminder before due, grade published
- Teacher: New submission, bulk grading queue

### 6. **Analytics**

- Assignment completion rate per course
- Average grade per assignment
- Late submission stats
- Time to grade

### 7. **Plagiarism & AI**

- Optional plagiarism check on submissions
- AI-assisted grading for structured answers (future)

### 8. **Templates**

- Reuse assignment templates across courses
- Duplicate assignments for new term

---

## Data Model (Extended)

```ts
interface Assignment {
  id: string
  courseId: string
  lessonId?: string
  title: string
  description?: string
  instructions?: string
  instructionsPdfUrl?: string      // Assignment brief
  instructionsPdfUrls?: string[]  // Multiple attachments
  type: 'homework' | 'quiz' | 'project' | 'essay'
  dueDate: string
  maxPoints?: number
  allowLateSubmission?: boolean
  allowResubmit?: boolean
  createdAt: string
  updatedAt: string
}

interface AssignmentSubmission {
  id: string
  assignmentId: string
  studentId: string
  fileUrls: string[]
  submittedAt: string
  isLate: boolean
  grade?: number
  feedback?: string
  gradedAt?: string
}
```

---

## UI/UX Ideas

- **Teacher**: Calendar view of due dates, bulk grade mode, filter by status
- **Student**: Progress indicator (pending → submitted → graded), due date countdown
- **Mobile**: Camera upload for handwritten work
- **Accessibility**: Screen reader support, keyboard navigation
