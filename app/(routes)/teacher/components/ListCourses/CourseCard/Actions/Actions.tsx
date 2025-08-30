"use client"

import { ActionsProps } from './Actions.types'
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';

export function Actions(props: ActionsProps) {

    const { courseId } = props;

    const router = useRouter()

    const onEdit = () => {
        router.push(`/teacher/${courseId}`)
    }

    const deleteCourse = () => {
        axios.delete(`/api/course/${courseId}`)
        toast("Curso Eliminado correctamente")
        
        router.refresh()
    }

  return (
    <div className='flex flex-col gap-2 items-center w-full lg:max-w-42'>
        <Button className='w-full' onClick={onEdit}>
            Editar  <Edit className='w-4 h-4'/>
        </Button>

        <AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline" className='w-full text-red-500 border-red-500 hover:bg-red-100 hover:text-red-500'>
        Eliminar <Trash className='w-4 h-4' />
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
      <AlertDialogDescription>
        Esta acción no se puede deshacer. Esto eliminará permanentemente el curso y todos sus datos.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction onClick={deleteCourse}>Eliminar</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    </div>
  )
}
