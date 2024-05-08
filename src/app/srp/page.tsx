"use client"
import Link from "next/link";
import Image from 'next/image';
import { Card } from "@/components/ui/card"
import Navbar from "@/components/Navbar";
import lazer_grid from"../../../public/lazer_grid.jpg";
import srpLogo from "../../../public/srp-logo-main-white.svg"

const SRP = () => {
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
        <div className="flex justify-center">
          <Image src={srpLogo} alt="SRPLogo"/>
        </div>
        <article className="flex flex-col items-center font-teko text-3xl text-green-300">
          <div>
            <Link
              href='https://github.com/MaxLaur/project-srp-website'
              target='_blank'
              className="hover:text-purple-500"
            >Github page</Link>
          </div>
          <div className="flex flex-col items-center justify-evenly mb-10 w-full">
            <Card className="text-green-300 w-full lg:w-4/6 p-3 my-4">This project was made in under 2 weeks using the MERN stack with Auth0. Connects to the official SRP apis for real time server information and lap time leaderboards. Logged in users have the option to favorite the servers they like best.</Card>
            <div className="flex justify-center">
              <iframe
                className="absolute w-full h-2/6 md:w-3/6 xl:h-3/6"
                src="https://www.youtube.com/embed/VKlrg3rCXeQ?si=_E0ErFOATKWE4qw8"
                title="YouTube video player"
                allow="web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </article>
      </section>
    </main>
  )
}

export default SRP;