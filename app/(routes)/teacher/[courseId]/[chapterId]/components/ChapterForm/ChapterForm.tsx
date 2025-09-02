"use client";

import { Button } from "@/components/ui/button";
import { ChapterFormProps } from "./ChapterForm.types";
import { ArrowLeft, Cog, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { TitleBlock } from "../../../components";
import axios from "axios";
import { toast } from "sonner";
import { ChapterTitleForm } from "./ChapterTitleForm";
import { ChapterVideoForm } from "./ChapterVideoForm";
import { useState } from "react";

export function ChapterForm(props: ChapterFormProps) {
  const { chapter, courseId } = props;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  if (!chapter) {
    return null;
  }

  const onPublish = async (state: boolean) => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/course/${courseId}/chapter/${chapter.id}`, {
        isPublished: state,
      });
      toast(state ? "Capítulo publicado" : "Capítulo ocultado");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Error al actualizar el estado del capítulo");
    } finally {
      setIsLoading(false);
    }
  };

  const removeChapter = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/course/${courseId}/chapter/${chapter.id}`);
      toast("Capítulo eliminado");
      router.push(`/teacher/${courseId}`);
    } catch (error) {
      console.log(error);
      toast.error("Error al eliminar el capítulo");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="p-6 bg-white rounded-md">
        <Button
          className="mb-4 cursor-pointer"
          variant="outline"
          onClick={() => router.push(`/teacher/${courseId}`)}
        >
          <ArrowLeft />
          Volver al curso
        </Button>
      </div>

      <div className="p-6 mt-6 bg-white rounded-md flex justify-between items-center">
        <TitleBlock title="Configuracion del capitulo" icon={Cog} />

        <div className="gap-2 flex items-center">
          {chapter?.isPublished ? (
            <Button
              variant="outline"
              onClick={() => onPublish(false)}
              className="cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Procesando..." : "Ocultar"}
            </Button>
          ) : (
            <Button 
              onClick={() => onPublish(true)} 
              className="cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Procesando..." : "Publicar"}
            </Button>
          )}

          <Button 
            variant="destructive" 
            onClick={removeChapter} 
            className="cursor-pointer"
            disabled={isLoading}
          >
            <Trash />
          </Button>
        </div>
      </div>
      <ChapterTitleForm courseId={courseId} chapter={chapter} />

      <ChapterVideoForm chapterId={chapter.id} courseId={courseId} videoUrl={chapter.videoUrl} />
    </div>
  );
}
