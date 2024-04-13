"use client"
import Link from "next/link";
import Image from 'next/image';
import { Card } from "@/components/ui/card"
import Navbar from "@/components/Navbar";
import lazer_grid from"../../../public/lazer_grid.png";
import srpLogo from "../../../public/srp-logo-main-white.svg"

const SRP = () => {
  return (
    <main>
      <Navbar/>
      <div 
        className="absolute inset-0 bg-black opacity-10 animate-pulse-opacity"
        style={{ backgroundImage: `url(${lazer_grid.src})`, backgroundSize: 'cover', zIndex: '-1' }}
      />
      <section>
        <div className="flex justify-center mt-5">
        <Image src={srpLogo} alt="SRPLogo" className="p-2"/>
        </div>
        <article className="flex flex-col items-center font-teko text-3xl mt-1 text-green-300">
          <p>
            This is a fullstack webpage I have made for the Shutotko Revival Project in April 2023
          </p>
          <div>
            <Link
              href='https://github.com/MaxLaur/project-srp-website'
              target='blank'
              className="hover:text-purple-500"
            >Github page</Link>
          </div>
          <div className="flex flex-row items-center justify-evenly">
            <Card className="text-green-300 w-1/6 p-3">This project was made in under 2 weeks using the MERN stack with Auth0. Logged in users have the option to favorite the servers they like best</Card>
            <iframe width="1020" height="630" src="https://www.youtube.com/embed/VKlrg3rCXeQ?si=_E0ErFOATKWE4qw8" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <Card className="text-green-300 w-1/6 p-3">This responsive website connects to the official SRP apis for real time server information and lap time leaderboards</Card>
          </div>
        </article>
      </section>
    </main>
  )
}

export default SRP;