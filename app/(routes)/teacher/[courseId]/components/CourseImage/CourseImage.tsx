"use client";

import React, { useState } from "react";
import { CourseImageProps } from "./CourseImage.types";
import { TitleBlock } from "../TitleBlock";
import { FileImage, Pencil } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import axios from "axios";

export function CourseImage(props: CourseImageProps) {
  const { idCourse, imageCourse } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(imageCourse);

  const onChangeImage = (imageUrl: string) => {
    console.log(imageUrl);

    try {
      axios.patch(`/api/course/${idCourse}`, { imageUrl: imageUrl });
      toast("Imagen actualizada correctamente");
    } catch (error) {
      toast.error("Error al actualizar la imagen");
    }
  };

  return (
    <div className="p-4 rounded-lg bg-white h-fit">
      <TitleBlock title="Imagen del curso" icon={FileImage} />

      {isEditing ? (
        <div
          className="bg-slate-300 p-4 mt-2 rounded-lg"
          style={{ display: isEditing ? "block" : "none" }}
        >
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              const url = res[0]?.ufsUrl;

              if (url) {
                onChangeImage(url);
                setImage(url);
                setIsEditing(false);
              }
            }}
            onUploadError={() => {
              toast.error("Error al subir la imagen");
            }}
          />
        </div>
      ) : (
        <Image
          src={image || "/image.webp"}
          alt="Curso"
          width={500}
          height={250}
          className="w-full h-full rounded-md"
        />
      )}

      <Button
        className="w-full mt-4 cursor-pointer"
        variant="outline"
        size="sm"
        onClick={() => setIsEditing(!isEditing)}
      >
        <Pencil className="w-4 h-4" />
        Editar imagen
      </Button>
    </div>
  );
}
