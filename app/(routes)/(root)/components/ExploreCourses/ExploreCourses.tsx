"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function ExploreCourses() {
  const router = useRouter();
  return (
    <div>
      <div className="my-4 mx-6 border rounded-lg bg-white">
        <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-4">
          <div className="p-6 flex flex-col gap-3">
            <h1 className="text-4xl font-semibold">Explora todos los cursos</h1>

            <p className="text-balance max-w-2xl">
              Aprende a programar desde 0 con estos cursos, no necesitas previa
              experiencia
            </p>
            <Button className="w-fit" onClick={() => router.push("/courses")}>
              Empieza a aprender
            </Button>
          </div>
          <div className="flex items-end">
            <Image
              src="/image.webp"
              alt="Explora todos los cursos"
              width={300}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
