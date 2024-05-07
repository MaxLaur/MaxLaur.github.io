"use client"
import Navbar from "@/components/Navbar";
import lazer_grid from"../../../public/lazer_grid.png";
import Link from "next/link";
import Image from 'next/image';
import { Card } from "@/components/ui/card"
import srpCoverImage from "../../../public/k4ntycvz.bmp"
import docereHomePage from "../../../public/docereHomePage.png"

const Projects = () => {
  return (
    <main>
      <Navbar/>
      <div 
        className="fixed top-0 left-0 w-full h-full bg-black opacity-10 animate-pulse-opacity"
        style={{ 
          backgroundImage: `url(${lazer_grid.src})`, 
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat-y',
          zIndex: '-1',
          transform: 'scaleY(-1)'
        }}
      />
      <section>
        <div className="flex justify-center mt-10">
          <p className="font-teko text-green-300 text-3xl mx-4">
            Have a look at some of the projects I have worked on.
          </p>
        </div>
        <div className="flex lg:flex-row flex-col justify-evenly mt-16 mb-5">
          <Card className="flex flex-col items-center text-green-300 opacity-95 w-5/6 lg:w-2/6 md:w-5/6 m-auto lg:-m-0 hover:scale-105">
            <Link href='/docere-health'>
              <p className="text-green-300 text-center text-3xl mt-10">Docere Health</p>
              <Image src={docereHomePage} alt="Docere Homepage" className="p-2"/>
              <p className="text-2xl font-teko  p-2">Demo for the startup Docere Health, an electronic medial/health record app made with React, Node/Express, Supabase, MUI and Mobx.</p>
            </Link>
          </Card>
            
          <Card className="flex flex-col items-center text-green-300 opacity-95 lg:w-2/6 w-5/6 m-auto mt-5 lg:mt-0 lg:-m-0 justify-center hover:scale-105">
            <Link href='/srp'>
              <p className="text-3xl text-center">Shutoko Revivial Project website</p>
              <Image src={srpCoverImage} alt="SRP" className="p-2"/>
              <p className="text-2xl font-teko p-2">Full stack website project for the Shutoko Revival Project, a famous mod for Assetto Corsa. App was created with React, Node/Express, Mongodb and Auth0.</p>
            </Link>
          </Card>
        </div>
      </section>
    </main>
  )
}

export default Projects;