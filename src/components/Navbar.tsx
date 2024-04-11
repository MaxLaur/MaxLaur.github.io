"use client"
import { useState } from 'react';
import Link from 'next/link';
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"

const Navbar = () => {
  const [scanLinesToggle, setScanLinesToggle] = useState<boolean>(true);
  const [scanLineToggle, setScanLineToggle] = useState<boolean>(true);
  const [flickerToggle, setFlickerToggle] = useState<boolean>(true);

  return (
    <>
      {
        scanLinesToggle &&
        <div className='scanlines'></div>
      }
      {
        scanLineToggle &&
        <div className='scanline'></div>
      }
      {
        flickerToggle &&
        <div className='flicker'></div>
      }
      <nav className='flex justify-end w-full'>
      <Link href="/">
          <Button variant="ghost" className='m-2 mr-4 hover:bg-purple-400 hover:text-green-300 text-xl' >Home</Button>
        </Link>
        <Link href="https://drive.google.com/file/d/1lc-Lc300vg4dhbu7hITuV4P9kufxWEP9/view?usp=drive_link" target="blank">
          <Button variant="ghost" className='m-2 hover:bg-purple-400 hover:text-green-300 text-xl'>Resume</Button>
        </Link>
        {/* <a href="mailto:maxlaurend85@gmail.com">
          <Button variant="ghost" className='m-2 mr-10 hover:bg-purple-400 hover:text-green-300 text-xl' >contact</Button>
        </a> */}
        <Link href="/projects">
          <Button variant="ghost" className='m-2 mr-10 hover:bg-purple-400 hover:text-green-300 text-xl' >Projects</Button>
        </Link>
        <div className='flex border border-double border-green-300 border-4 pl-2 pr-2'>
          <div className='flex flex-col mr-2 mt-2'>
            <p>visual</p>
            <p>effects</p>
          </div>
          
          <div className='flex flex-col'>
            <Toggle
              defaultPressed
              className='m-1 p-1 text-purple-400 text-xl'
              onClick={()=>{setFlickerToggle(!flickerToggle)}}>
                Flicker
            </Toggle>
            <Toggle
              defaultPressed
              className='m-1 p-1 text-purple-400 text-xl'
              onClick={()=>{
                setScanLinesToggle(!scanLinesToggle)
                setScanLineToggle(!scanLineToggle)
              }}>
              Scanline
            </Toggle>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;