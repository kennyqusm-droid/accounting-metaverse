import { create } from 'zustand'

export interface CourseInfo {
  id: string
  code: string
  name: string
  role: 'student' | 'lecturer'
}

interface CourseState {
  activeCourse: CourseInfo | null
  enrolledCourses: CourseInfo[]
  setActiveCourse: (course: CourseInfo | null) => void
  setEnrolledCourses: (courses: CourseInfo[]) => void
}

export const useCourseStore = create<CourseState>((set) => ({
  activeCourse: null,
  enrolledCourses: [],

  setActiveCourse: (course) => set({ activeCourse: course }),
  setEnrolledCourses: (courses) => set({ enrolledCourses: courses }),
}))