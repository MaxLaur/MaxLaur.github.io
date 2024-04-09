"use client"
import { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ReactTerminal } from "react-terminal";
import Terminal from '@/components/Terminal';
import lazer_grid from '../../public/lazer_grid.png'
import "./globals.css";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const commands = {
    whoami: "jackharper",
    // whoam
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <main className={`flex min-h-screen flex-col items-center transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className='scanlines'></div>
      <div className='scanline'></div>
      <div className='flicker'></div>
      <nav className='flex justify-end w-full'>
        <a href="https://drive.google.com/file/d/10d4LYYEVk8XHkX3nwke7BSGxPud2VP60/view?usp=drive_link">
          <Button variant="outline" className='m-3'>Resume</Button>
        </a>
        <a href="mailto:maxlaurend85@gmail.com">
          <Button variant="outline" className='m-3 mr-40' >contact</Button>
        </a>
      </nav>
      <div 
        className="absolute inset-0 bg-black opacity-10 animate-pulse-opacity"
        style={{ backgroundImage: `url(${lazer_grid.src})`, backgroundSize: 'cover', zIndex: '-1' }}
      ></div>

      <h1 className="scroll-m-20 text-3xl font-light text-green-300 md:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl">
        MAXIME LAURENDEAU
      </h1>

      <Card className='sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 opacity-85 mb-5 mt-10 pt-5'>
        <CardContent>
          <p className='text-green-300'>
            Hi, I&apos;m Max and I am a web developer, welcome to my page! Here you will find a 
            bit of information about me and a collection of projects I have worked on. Use the terminal or the buttons above to navigate across my website.
          </p>
        </CardContent>
      </Card>

      <ReactTerminal
        commands={commands}
        // themes={{
        //   "my-custom-theme": {
        //     themeBGColor: "#272B36",
        //     themeToolbarColor: "#DBDBDB",
        //     themeColor: "#FFFEFC",
        //     themePromptColor: "#a917a8"
        //   }
        // }}
        theme="matrix"
      />

      <Terminal />
    </main>
  );
}
