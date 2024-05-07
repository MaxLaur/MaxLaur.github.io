"use client"
import { useState } from 'react';
import Link from 'next/link';
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
      <nav className='flex md:justify-end justify-between w-full mb-4'>
        {/* Hamburger menu for small breakpoints */}
        <div className="block md:hidden ml-3 mt-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className='text-green-300 text-xl bg-purple-500'>MENU</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <Link href='/'>
                  <DropdownMenuItem className='cursor-pointer text-purple-400'>Home</DropdownMenuItem>
                </Link>
                <Link href='/projects'>
                  <DropdownMenuItem className='cursor-pointer text-purple-400'>Projects</DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="https://drive.google.com/file/d/1mJN9zEvyk1nnRz1rriFa94G6X-kecnRi/view?usp=drive_link" target="_blank">
                  <DropdownMenuItem className='cursor-pointer text-purple-400'>Resume</DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
                <Link href="https://www.linkedin.com/in/maxime-laurendeau/" target="_blank">
                  <DropdownMenuItem className='cursor-pointer text-purple-400'>LinkedIn</DropdownMenuItem>
                </Link>
                <Link href="https://github.com/MaxLaur" target="_blank">
                  <DropdownMenuItem className='cursor-pointer text-purple-400'>GitHub</DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <ul className="hidden md:flex text-purple-400">
          <li>
          <Link href="/">
            <Button variant="ghost" className='m-2 mr-4 hover:bg-purple-400 hover:text-green-300 text-xl tracking-wider'>Home</Button>
          </Link>
          </li>
          
          <li>
          <Link href="https://drive.google.com/file/d/1mJN9zEvyk1nnRz1rriFa94G6X-kecnRi/view?usp=drive_link" target="_blank">
            <Button variant="ghost" className='m-2 hover:bg-purple-400 hover:text-green-300 text-xl tracking-wider'>Resume</Button>
          </Link>
          </li>
          
          <li>
          <Link href="https://www.linkedin.com/in/maxime-laurendeau/" target="_blank">
            <Button variant="ghost" className='m-2 hover:bg-purple-400 hover:text-green-300 text-xl tracking-wider'>LinkedIn</Button>
          </Link>
          </li>
          
          <li>
          <Link href="/projects">
            <Button variant="ghost" className='m-2 mr-10 hover:bg-purple-400 hover:text-green-300 text-xl tracking-wider' >Projects</Button>
          </Link>
          </li>
          
        </ul>
        {/* Effects toggle button section */}
        <div className='flex border border-double border-green-300 border-4 pl-2 pr-2'>
          <div className='flex flex-col mr-2 mt-2 tracking-wider'>
            <p>visual</p>
            <p>effects</p>
          </div>
          <div className='flex flex-col'>
            <Toggle
              defaultPressed
              className='m-1 p-1 text-purple-400 text-xl tracking-wider'
              onClick={()=>{setFlickerToggle(!flickerToggle)}}>
                Flicker
            </Toggle>
            <Toggle
              defaultPressed
              className='m-1 p-1 text-purple-400 text-xl tracking-wider'
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