"use client";

import { HeaderCourseProps } from "./HeaderCourse.types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, MoveLeft, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export function HeaderCourse(props: HeaderCourseProps) {
  const { idCourse, isPublished } = props;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onPublish = async (state: boolean) => {
    setIsLoading(true);
    try {
      axios.patch(`/api/course/${idCourse}`, {
        isPublished: state,
      });

      toast(state ? "Curso publicado" : "Curso despublicado");
      router.refresh();
    } catch (error) {
      toast("Ups, algo ha ido mal");
    }

    setIsLoading(false);
  };

  const removeCourse = async () => {
    setIsLoading(true);
    try {
      axios.delete(`/api/course/${idCourse}`);

      toast("Curso eliminado");
      router.push("/teacher");
      router.refresh();
    } catch (error) {
      toast("Ups, algo ha ido mal");
    }

    setIsLoading(false);
  }

  return (
    <div>
      <div className="mb-4 ">
        <div className="flex flex-col md:flex-row justify-between items-center ">
          <Button
            className="cursor-pointer"
            onClick={() => router.push("/teacher")}
          >
            <MoveLeft />
            Volver a todos los cursos
          </Button>

          <div className="gap-2 flex items-center">
            {isPublished ? (
              <Button
                variant="outline"
                className="cursor-pointer "
                disabled={isLoading}
                onClick={() => {
                  onPublish(false);
                }}
              >
                Despublicar
                <EyeOff />
              </Button>
            ) : (
              <Button
                className="cursor-pointer"
                disabled={isLoading}
                onClick={() => {
                  onPublish(true);
                }}
              >
                Publicar
                <Eye />
              </Button>
            )}

            <Button
              variant="destructive"
              onClick={removeCourse}
              className="cursor-pointer"
            >
              <Trash />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
