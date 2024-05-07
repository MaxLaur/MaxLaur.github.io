"use client"
import Link from "next/link";
import Image from 'next/image';
import { Card } from "@/components/ui/card"
import Navbar from "@/components/Navbar";
import lazer_grid from"../../../public/lazer_grid.png";

const DocereHealth = () => {
  return (
    <main className="w-full">
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
        <article className="flex flex-col items-center font-teko text-3xl mt-4 text-green-300">
          <h1 className="text-5xl ml-10 mr-10">
            <Link href='https://docereapp.net/' className="hover:text-purple-400 hover:scale-105 underline" target="blank">Docere Health</Link>, a startup with a mission to revolutionize family health care
          </h1>
          {/* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */}
          <div className="flex flex-col lg:flex-row lg:justify-evenly md:justify-center mt-5 ml-5 mr-5">
            <Card className="lg:w-2/6 md:w-5/6 sm:w-5/6 mb-3 p-5 text-green-300">
              <p>
              <span className='text-5xl'>I</span> joined Docere Health in May 2023 as an intern and soon began 
                to elevate my role by becoming the main contributor to the creation of this app
                having implemented a large amount of features and at least touching and improving most
                of the remaining ones, if not all.
              </p>
            </Card>

            <Card className="lg:w-2/6 md:w-5/6 sm:w-5/6 lg:ml-5 md:mr-5 mb-3 p-5 text-green-300">
              <p>
              <span className='text-5xl'>F</span>or this I was rewarded in December 2023 with a full-time 
                position as soon as the company would close it&apos;s first ever round of financing which happened in early 2024.
              </p>
            </Card>

            <Card className="lg:w-2/6 md:w-5/6 sm:w-5/6 mb-3 p-3 text-green-300 lg:text-center">
              <span className='text-5xl'>F</span>rom implementing user registration, authentication, 
              user role protected routes to protecting our apis and more,
              I have taken multiple critical tasks normally not given to interns.
            </Card>
          </div>
          <div className="flex justify-center">
            <iframe
              className="absolute w-full h-2/6 md:w-3/6 xl:h-3/6"
              src="https://www.youtube.com/embed/GeuwfXXcjZw?si=o_RXHoIROmfl20H7"
              title="YouTube video player"
              allow="web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen>
            </iframe>
          </div>
        </article>
      </section>
    </main>
  )
}

export default DocereHealth;