import { Chapter } from "@/lib/generated/prisma"

export type ChapterFormProps = {
    chapter: Chapter | null
    courseId: string
}