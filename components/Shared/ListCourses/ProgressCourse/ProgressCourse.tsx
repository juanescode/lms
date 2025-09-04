import { ProgressCourseProps } from './ProgressCourse.types'
import { currentUser } from '@clerk/nextjs/server'

export async function ProgressCourse(props: ProgressCourseProps) {
    const {courseId, price, totalChapters} = props 

    const user = await currentUser()

    if(!user) {
        return <p className='text-xs mt-2 text-gray-500'>No estás registrado</p>
    }


    return (
        <div className="mt-2">
            <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                    {price && price !== "Gratis" ? `$${price}` : "Gratis"}
                </span>
                <span className="text-gray-600">
                    {totalChapters} capítulos
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '0%'}}></div>
            </div>
        </div>
    )
}
