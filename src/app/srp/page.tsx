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
        <div className="flex justify-center">
          <Image src={srpLogo} alt="SRPLogo"/>
        </div>
        <article className="flex flex-col items-center font-teko text-3xl text-green-300">
          <div>
            <Link
              href='https://github.com/MaxLaur/project-srp-website'
              target='blank'
              className="hover:text-purple-500"
            >Github page</Link>
          </div>
          <div className="flex flex-col items-center justify-evenly mb-10 w-full">
            <Card className="text-green-300 w-full lg:w-4/6 p-3 my-4">This project was made in under 2 weeks using the MERN stack with Auth0. Connects to the official SRP apis for real time server information and lap time leaderboards. Logged in users have the option to favorite the servers they like best.</Card>
            {/* <div className="w-full md-5/6 lg:w-5/6 xl:w-4/6" style={{ position: 'relative', overflow: 'hidden', paddingTop: '56.25%' }}>
              <iframe 
                style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, width: '100%', height: '100%', border: 'none' }} 
                src="https://www.youtube.com/embed/VKlrg3rCXeQ?si=_E0ErFOATKWE4qw8"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
              </iframe>
            </div> */}
            <iframe
              width="1020"
              height="630"
              src="https://www.youtube.com/embed/VKlrg3rCXeQ?si=_E0ErFOATKWE4qw8"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </article>
      </section>
    </main>
  )
}

export default SRP;