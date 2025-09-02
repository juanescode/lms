import { Chapter } from "@/lib/generated/prisma";

export type ChaptersBlockProps = { 
    idCourse: string;
    chapters: Chapter[] | null
};