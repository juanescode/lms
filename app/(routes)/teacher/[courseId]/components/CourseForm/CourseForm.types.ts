import { Chapter, Course } from "@/lib/generated/prisma"

export type CourseFormProps = {
    course: CourseWithRelations
}

type CourseWithRelations = Course & {chapters: Chapter[]}