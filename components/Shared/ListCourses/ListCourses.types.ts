import { Chapter, Course } from "@/lib/generated/prisma"

export type ListCoursesProps = {
    title: String
    courses: (Course & { chapters: Chapter[]}) [] | null
}