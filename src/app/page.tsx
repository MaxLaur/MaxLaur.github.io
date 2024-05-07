"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Terminal from '@/components/Terminal';
import lazer_grid from '../../public/lazer_grid.png'
import candle from '../../public/candle.gif'
import lights_out from '../../public/lights_out.gif'
import "./globals.css";
import Navbar from '@/components/Navbar';
import { useMediaQuery } from 'react-responsive';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [resumeDialog, setResumeDialog] = useState<boolean>(false);
  const [srpDialog, setSrpDialog] = useState<boolean>(false);
  const [docereDialog, setDocereDialog] = useState<boolean>(false);
  const [aboutDialog, setAboutDialog] = useState<boolean>(false);
  const [secretOne, setSecretOne] = useState<boolean>(false);
  const [secretTwo, setSecretTwo] = useState<boolean>(false);
  const [secretThree, setSecretThree] = useState<boolean>(false);
  const [secretFour, setSecretFour] = useState<boolean>(false);
  const [hunterAchievement, setHunterAchievement] = useState<boolean>(false);
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  useEffect(() => {
    setLoaded(true);
    if (secretOne && secretTwo && secretThree && secretFour) {
      setTimeout(() => {
        setHunterAchievement(true);
        const timeoutId = setTimeout(() => {
          setSecretOne(false)
          setSecretTwo(false)
          setSecretThree(false)
          setSecretFour(false)
          setHunterAchievement(false);
        }, 4200);
  
        return () => clearTimeout(timeoutId);
      }, 1500);
    }
  }, [secretOne, secretTwo, secretThree, secretFour]);

  return (
    <>
      {hunterAchievement ?
      <div className="flex flex-col justify-center items-center h-screen bg-black">
        <h2 className='text-3xl text-green-300 tracking-wider mx-10'>Thank you for playing with the terminal!</h2>
        <Image
          src={lights_out}
          alt="lights out"
          unoptimized
        />
      </div>
      :
      <main className={`flex min-h-screen flex-col items-center transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
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
        <h1 className="scroll-m-20 text-3xl font-light text-green-300 md:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl">
          MAX LAURENDEAU
        </h1>
        {/* <Card className='sm:w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 opacity-85 mb-5 mt-5 pt-5'>
          <CardContent>
            <p className='text-green-300 text-3xl font-teko'>
              Hi, I'm Max a web developer focused on the frontend. Use the terminal to view my site's content and unlock achievements or use the menu above.
            </p>
          </CardContent>
        </Card> */}

        {/* SMALL VIEWPORT SECRET candleES */}
        {isMobile && (
          <section className='flex flex-row justify-evenly'>
            <Image
              src={candle}
              alt="secretcandle1"
              className={`transition-opacity duration-1500 ${secretOne ? "opacity-100" : "opacity-0"} w-1/5 h-1/5 mb-1`}
              style={{ animation: `${secretOne ? 'candlesFadeIn 2.5s forwards' : 'none'}` }}
              unoptimized
            />
            <Image
              src={candle}
              alt="secretcandle2"
              className={`transition-opacity duration-1500 ${secretTwo ? "opacity-100" : "opacity-0"} w-1/5 h-1/5 mb-1`}
              style={{ animation: `${secretTwo ? 'candlesFadeIn 2.5s forwards' : 'none'}` }}
              unoptimized
            />
            <Image
              src={candle}
              alt="secretcandle3"
              className={`transition-opacity duration-1500 ${secretThree ? "opacity-100" : "opacity-0"} w-1/5 h-1/5 mb-1`}
              style={{ animation: `${secretThree ? 'candlesFadeIn 2.5s forwards' : 'none'}` }}
              unoptimized
            />
            <Image
              src={candle}
              alt="secretcandle4"
              className={`transition-opacity duration-1500 ${secretFour ? "opacity-100" : "opacity-0"} w-1/5 h-1/5 mb-1`}
              style={{ animation: `${secretFour ? 'candlesFadeIn 2.5s forwards' : 'none'}` }}
              unoptimized
            />
          </section>
        )}

        
        <section className='flex flex-row w-full' >
          {/* BIG VIEWPORT SECRET candleES */}
          {!isMobile && (
            <div className='flex flex-col justify-between'>
              <Image
                src={candle}
                alt="secretcandle1"
                className={`transition-opacity duration-1500 ${secretOne ? "opacity-100" : "opacity-0"}`}
                style={{ animation: `${secretOne ? 'candlesFadeIn 2.5s forwards' : 'none'}` }}
                unoptimized
              />
              <Image
                src={candle}
                alt="secretcandle2"
                className={`transition-opacity duration-1500 ${secretTwo ? "opacity-100" : "opacity-0"}`}
                style={{ animation: `${secretTwo ? 'candlesFadeIn 2.5s forwards' : 'none'}` }}
                unoptimized
              />
            </div>
          )}
          <Terminal
            resumeDialog={resumeDialog}
            setResumeDialog={setResumeDialog}
            srpDialog={srpDialog}
            setSrpDialog={setSrpDialog}
            aboutDialog={aboutDialog}
            setAboutDialog={setAboutDialog}
            docereDialog={docereDialog}
            setDocereDialog={setDocereDialog}
            setSecretOne={setSecretOne}
            setSecretTwo={setSecretTwo}
            setSecretThree={setSecretThree}
            setSecretFour={setSecretFour}
          />
          {/* BIG VIEWPORT SECRET candleES */}
          {!isMobile && (
            <div className='flex flex-col justify-between'>
              <Image
                src={candle}
                alt="secretcandle3"
                className={`transition-opacity duration-1500 ${secretThree ? "opacity-100" : "opacity-0"}`}
                style={{ animation: `${secretThree ? 'candlesFadeIn 2.5s forwards' : 'none'}` }}
                unoptimized
              />
              <Image
                src={candle}
                alt="secretcandle4"
                className={`transition-opacity duration-1500 ${secretFour ? "opacity-100" : "opacity-0"}`}
                style={{ animation: `${secretFour ? 'candlesFadeIn 2.5s forwards' : 'none'}` }}
                unoptimized
              />
            </div>
          )}
        </section>
      </main>
      }
    </>
  );
}
