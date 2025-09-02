"use client";

import { z } from "zod";

import { CourseFormProps } from "./CourseForm.types";
import { TitleBlock } from "../TitleBlock";
import { Cog } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(2).max(200),
  slug: z.string().min(2).max(200),
  description: z.string().min(2).max(500).optional().or(z.literal("")),
  category: z.string().min(2).max(200),
  level: z.string().min(2).max(200),
});

export function CourseForm(props: CourseFormProps) {
  const { course } = props;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course.title || "",
      slug: course.slug || "",
      description: course.description || "",
      category: course.category || "",
      level: course.level || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        axios.patch(`/api/course/${course.id}`, values)
        toast("Curso actualizado correctamente ")
    } catch (error) {
        toast.error("Error al actualizar el curso")
    }
  }

  return (
    <div className="p-6 bg-white rounded-md">
      <TitleBlock title="Información del curso" icon={Cog} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título del curso</FormLabel>
                  <FormControl>
                    <Input placeholder="Curso de ReactJS" {...field} />
                  </FormControl>
                  <FormDescription>
                    Este es el nombre público que se mostrará.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url del curso</FormLabel>
                  <FormControl>
                    <Input placeholder="curso-de-reactjs" {...field} />
                  </FormControl>
                  <FormDescription>
                    Este es el identificador único del curso.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar la categoría del curso" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Frontend" className="cursor-pointer">
                        Frontend
                      </SelectItem>
                      <SelectItem value="Backend" className="cursor-pointer">
                        Backend
                      </SelectItem>
                      <SelectItem value="Fullstack" className="cursor-pointer">
                        Fullstack
                      </SelectItem>
                      <SelectItem
                        value="Infrastructura"
                        className="cursor-pointer"
                      >
                        Infrastructura
                      </SelectItem>
                      <SelectItem
                        value="Diseño UX/UI"
                        className="cursor-pointer"
                      >
                        Diseño UX/UI
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nivel</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar el nivel del curso" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        value="Principiante"
                        className="cursor-pointer"
                      >
                        Principiante
                      </SelectItem>
                      <SelectItem value="Intermedio" className="cursor-pointer">
                        Intermedio
                      </SelectItem>
                      <SelectItem value="Avanzado" className="cursor-pointer">
                        Avanzado
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descripción del curso"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                   Descripción breve del curso (opcional).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Guardar informacion basica</Button>
        </form>
      </Form>
    </div>
  );
}
