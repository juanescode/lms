import Link from 'next/link'
import React from 'react'

export function Footer() {
  return (
    <footer className='py-4 px-6 border-t bg-white w-full'>
        <div className='flex justify-between items-center text-sm text-slate-500'>
            <p>2025 JuanesCode</p>

            <div className='flex gap-2 items-center'>
                <Link href="/privacy-policy" className='hover:text-slate-900'>Privacidad</Link>
                <Link href="/terms" className='hover:text-slate-900'>Terminos de uso</Link>
            </div>
        </div>
    </footer>
  )
}
