"use client"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  courseName: z.string().min(2).max(200),
  slug: z.string().min(2).max(200),
});

export function FormCreateCourse() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: "",
      slug: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post("/api/course", values);
      toast("Curso creado correctamente");

      router.push(`/teacher/${res.data.id}`);
    } catch (error) {
      console.log(error);
      toast.error("Ha ocurrido un error")
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
        <FormField
          control={form.control}
          name="courseName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del curso</FormLabel>
              <FormControl>
                <Input placeholder="Curso de react" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug del curso</FormLabel>
              <FormControl>
                <Input placeholder="curso-de-react" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Crear curso</Button>
      </form>
    </Form>
  );
}
