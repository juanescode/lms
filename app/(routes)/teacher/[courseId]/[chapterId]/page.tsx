import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { ChapterForm } from "./components";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ courseId: string; chapterId: string }>;
}) {
  const { courseId, chapterId } = await params;

  const { userId } = await auth();

  if (!userId) {
    return <div>No autorizado</div>;
  }

  const chapter = await prisma.chapter.findUnique({
    where: {
      id: chapterId,
      courseId: courseId,
    },
  });

  if (!chapter) {
    return <div>Capítulo no encontrado</div>;
  }

  return (
    <div className="m-6">
      <ChapterForm chapter={chapter} courseId={courseId} />
    </div>
  );
}
