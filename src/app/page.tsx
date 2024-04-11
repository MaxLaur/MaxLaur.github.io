"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Toggle } from "@/components/ui/toggle"
import Terminal from '@/components/Terminal';
import lazer_grid from '../../public/lazer_grid.png'
import "./globals.css";
import Navbar from '@/components/Navbar';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [resumeDialog, setResumeDialog] = useState<boolean>(false);
  const [srpDialog, setSrpDialog] = useState<boolean>(false);
  const [docereDialog, setDocereDialog] = useState<boolean>(false);
  const [scanLinesToggle, setScanLinesToggle] = useState<boolean>(true);
  const [scanLineToggle, setScanLineToggle] = useState<boolean>(true);
  const [flickerToggle, setFlickerToggle] = useState<boolean>(true);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const closeResumeDialog = (event: React.MouseEvent<HTMLInputElement>) => {
    if (resumeDialog) setResumeDialog(false)
    if (srpDialog) setSrpDialog(false)
    if (docereDialog) setDocereDialog(false)
  }

  return (
    <>
    <main onClick={closeResumeDialog} className={`flex min-h-screen flex-col items-center transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar/>
      <div 
        className="absolute inset-0 bg-black opacity-10 animate-pulse-opacity"
        style={{ backgroundImage: `url(${lazer_grid.src})`, backgroundSize: 'cover', zIndex: '-1' }}
      />
      <h1 className="scroll-m-20 text-3xl font-light text-green-300 md:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl">
        MAX LAURENDEAU
      </h1>
      <Card className='sm:w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 opacity-85 mb-5 mt-5 pt-5'>
        <CardContent>
          <p className='text-green-300 text-3xl font-teko'>
            Hi, my name is Max and I am a web developer, welcome to my page! Here you will find a 
            bit of information about me and a collection of projects I have worked on. Use the terminal or the buttons above to navigate across my website.
          </p>
        </CardContent>
      </Card>
      <Terminal
        resumeDialog={resumeDialog}
        setResumeDialog={setResumeDialog}
        srpDialog={srpDialog}
        setSrpDialog={setSrpDialog}
      />
    </main>
    </>
  );
}
