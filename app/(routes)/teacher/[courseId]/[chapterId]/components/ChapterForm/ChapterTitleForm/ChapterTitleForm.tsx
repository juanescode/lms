"use client";

import { z } from "zod";
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
import { ChapterTitleFormProps } from "./ChapterTitleForm.types";
import { EditorDescription } from "@/components/Shared";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().min(2).max(500),
  isFree: z.boolean().default(false).optional(),
});

export function ChapterTitleForm(props: ChapterTitleFormProps) {
  const { courseId, chapter } = props;
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: chapter.title || "",
      description: chapter.description || "",
      isFree: chapter.isFree || false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/course/${courseId}/chapter/${chapter.id}`, {
        title: values.title,
        description: values.description,
        isFree: values.isFree,
      });

      toast("Capitulo modificado");

      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Algo ha fallado");
    }
  };

  return (
    <div className="p-6 rounded-md bg-white mt-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del capitulo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese el nombre del capitulo"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción del capitulo</FormLabel>
                <FormControl>
                  <EditorDescription 
                    value={field.value || ""} 
                    onChange={(content) => {
                      field.onChange(content);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Capitulo publico</FormLabel>
                  <FormDescription>
                    Si quieres que este capitulo sea visible para todos los
                    usuarios
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div />
          <Button type="submit" className="mt-4">
            Guardar
          </Button>
        </form>
      </Form>
    </div>
  );
}
