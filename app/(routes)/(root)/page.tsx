import { Button } from "@/components/ui/button";
import { ExploreCourses } from "./components";
import { getHomeCourses } from "@/actions/getHomeCourses";
import { ListCourses } from "@/components/Shared";

export default async function Home() {

  const listCourses = await getHomeCourses()


  return (
   <div>
   <ExploreCourses />

   <ListCourses title="Cursos mas populares" courses={listCourses}/>
   </div>
  );
}
