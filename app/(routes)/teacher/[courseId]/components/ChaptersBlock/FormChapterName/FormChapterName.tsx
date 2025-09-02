"use client"

import { z } from "zod"
import { FormChapterNameProps } from './FormChapterName.types'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  title: z.string().min(2).max(200),
})
export function FormChapterName(props: FormChapterNameProps) {

    const { idCourse, setShowInputChapter } = props;

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        axios.post(`/api/course/${idCourse}/chapter`, {
            title: values.title
        })

        toast("Capitulo creado")
        setShowInputChapter(false)
        router.refresh()
    } catch (error) {
        toast.error("Error al crear el capitulo")
        console.log(error)
    }
}

  return (
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Ej: introducción a la programacion" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!form.formState.isValid}>Crear</Button>
      </form>
    </Form>
  )
}
