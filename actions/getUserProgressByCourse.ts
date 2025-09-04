import prisma from "@/lib/prisma";

export async function getCourseProgressByCourse(
  userId: string,
  courseId: string
): Promise<number> {
  try {
    const purchase = await prisma.purchase.findFirst({
      where: {
        userId,
        courseId,
      },
    });

    if (!purchase) {
      return 0;
    }

    const totalChapters = await prisma.chapter.count({
      where: {
        courseId,
      },
    });

    if (totalChapters === 0) {
      return 0;
    }

    const completedChapters = await prisma.userProgress.count({
      where: {
        userId,
        isCompleted: true,
        chapter: {
          courseId,
        },
      },
    });

    const progressPercentage = Math.round((completedChapters / totalChapters) * 100);

    return progressPercentage;

  } catch (error) {
      console.log(error)
  return 0
  }
}
