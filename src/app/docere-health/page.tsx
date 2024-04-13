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
        className="absolute inset-0 bg-black opacity-10 animate-pulse-opacity"
        style={{ backgroundImage: `url(${lazer_grid.src})`, backgroundSize: 'cover', zIndex: '-1' }}
      />
      <section>
        <div className="flex justify-center mt-5">
          <Link href='https://docereapp.net/' target="blank">
            <img src="https://docereapp.net/static/media/logo.4d302cfa78cbed6b2f37.png" className="size-16 hover:scale-150"/>
          </Link>
        </div>
        <article className="flex flex-col items-center font-teko text-3xl mt-4 text-green-300">
          <h1 className="text-5xl ml-10 mr-10 hover:scale-105">
            <Link href='https://docereapp.net/' className="hover:text-purple-500" target="blank">Docere Health, a startup with a mission to revolutionize family health care</Link>
          </h1>
          {/* &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */}
          <div className="flex flex-col lg:flex-row lg:justify-evenly md:justify-center mt-5 ml-5 mr-5">
            <Card className="lg:w-2/6 md:w-5/6 sm:w-5/6 mb-3 p-5 text-green-300">
              <p>
              <span className='text-5xl'>I</span> have joined Docere Health in May 2023 as an intern and soon began 
                to elevate my role by becoming the main contributor to the creation of this app
                having created a large amount of features and at least touching and improving most
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
        </article>
      </section>
    </main>
  )
}

export default DocereHealth;