"use client"
import Navbar from "@/components/Navbar";
import lazer_grid from"../../../public/lazer_grid.png";
import Link from "next/link";
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import srpLogo from "../../../public/srp-logo-main-white.svg"
import srpCoverImage from "../../../public/k4ntycvz.bmp"
import docereHomePage from "../../../public/docereHomePage.png"

const Projects = () => {
  return (
    <main>
      <Navbar/>
      <div 
        className="absolute inset-0 bg-black opacity-10 animate-pulse-opacity"
        style={{ backgroundImage: `url(${lazer_grid.src})`, backgroundSize: 'cover', zIndex: '-1' }}
      />
      <section>
      {/* <div className="flex justify-center mt-10">
        <img
          src="https://docereapp.net/static/media/logo.4d302cfa78cbed6b2f37.png"
          className="size-16"
        />
      </div> */}
      <div className="flex justify-center font-teko text-3xl mt-10 text-green-300">
        <p>
          Have a look at some of the projects I have worked on.
        </p>
      </div>
      <div className="flex flex-row justify-evenly mt-16">
        
        <Card className="flex flex-col items-center text-green-300 opacity-95 w-2/6 hover:scale-105">
          <Link href='/docere-health'>
            <p className="text-green-300 text-center text-3xl mt-10">Docere Health</p>
            <Image src={docereHomePage} alt="Docere Homepage" className="p-2"/>
            <p className="text-2xl font-teko  p-2">Demo for the startup Docere Health, an electronic medial/health record app made with React, Node/Express, Supabase, MUI and Mobx.</p>
          </Link>
        </Card>
          
        <Card className="flex flex-col items-center text-green-300 opacity-95 w-2/6 justify-center hover:scale-105">
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