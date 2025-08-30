import { currentUser } from "@clerk/nextjs/server";
import { Header } from "./components";
import prisma from "@/lib/prisma";
import ListCourses from "./components/ListCourses/ListCourses";

export default async function TeacherPage() {
  const user = await currentUser();

  if (!user) {
    return <div>Not signed in</div>;
  }

  const courses = await prisma.course.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <div>
      <Header />
      <ListCourses courses={courses} />
    </div>
  );
}
