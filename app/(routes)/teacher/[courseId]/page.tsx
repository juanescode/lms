import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import React from 'react'
import { CourseForm, HeaderCourse } from './components';

export default async function CoursePage({params}: {params: Promise<{courseId: string}>}) {
  const { courseId } = await params;

  const {userId} = await auth()

    if(!userId) {
      return <div>No tienes permisos para ver este curso</div>
    }

    const course = await prisma.course.findUnique({
        where: {
            id: courseId,
            userId
        },
        include: {
            chapters: true
        }
    })

    if(!course) {
      return <p>Curso no encontrado</p>
    }

  return (
    <div className='m-6'>
        <HeaderCourse idCourse={course.id} isPublished={course.isPublished} />

        <CourseForm course={course} />

    </div>
  )
}
