"use client"
import { useEffect, useState, useRef, RefObject } from 'react';
import Link from 'next/link';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Hourglass } from 'react-loader-spinner'

interface TerminalProps {
  resumeDialog: boolean;
  setResumeDialog: React.Dispatch<React.SetStateAction<boolean>>;
  srpDialog: boolean;
  setSrpDialog: React.Dispatch<React.SetStateAction<boolean>>;
  docereDialog: boolean;
  setDocereDialog: React.Dispatch<React.SetStateAction<boolean>>;
  aboutDialog: boolean;
  setAboutDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setSecretOne: React.Dispatch<React.SetStateAction<boolean>>;
  setSecretTwo: React.Dispatch<React.SetStateAction<boolean>>;
  setSecretThree: React.Dispatch<React.SetStateAction<boolean>>;
  setSecretFour: React.Dispatch<React.SetStateAction<boolean>>;
}

type TerminalItem = string | JSX.Element;

const Terminal: React.FC<TerminalProps> = ({resumeDialog, setResumeDialog, srpDialog, setSrpDialog, aboutDialog, setAboutDialog, docereDialog, setDocereDialog, setSecretOne, setSecretTwo, setSecretThree, setSecretFour}) => {
  //prefix for command line. dont forget to change!
  const terminalPath = 'C:\\MaxLaur>'
  const terminalIntro = [
    <span key="command">Type <span className='text-purple-400'>help</span> for available commands</span>,
    <span key="command">Hi, I&apos;m Max, a fullstack web developer.<span className='text-purple-400'> Use the terminal</span> or the menu above to view my portfolio&apos;s content.</span>,
    "MaxLaur [version 1.0]"
  ]
  const [inputText, setInputText] = useState<string>(terminalPath);
  const [terminalText, setTerminalText] = useState<TerminalItem[]>(terminalIntro);
  const [loading, setLoading] = useState<boolean>(true);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(inputText.length, inputText.length);
    }
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [terminalText]);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { selectionStart } = event.target;
    const currentPosition = inputText.indexOf('>');

    if (selectionStart !== null && selectionStart <= currentPosition) {
      event.preventDefault();
      return;
    }
    setInputText(event.target.value);
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      switch (inputText) {
        case 'C:\\MaxLaur>help': {
          const clear = "clear --- clear the terminal";
          const ls = "ls ---------- list viewable files";
          const resume = "resume ------ view my CV";
          const about = "about ------- about me :))";
          const run = "run --------- `run [filename]` to view a file. Type `ls` to view runnable files";
          setTerminalText(prevText => [run, resume, ls, clear, about, "-$ press tab to auto complete commands $-", inputText, ...prevText]);
          break;
        }
        case 'C:\\MaxLaur>clear':
        case 'C:\\MaxLaur>cls':
        case 'C:\\MaxLaur>clear/cls': {
          setTerminalText(terminalIntro);
          break;
        }
        case 'C:\\MaxLaur>ls': {
          setTerminalText(prevText => ["docere_health_demo, srp_website", inputText, ...prevText]);
          break;
        }
        case 'C:\\MaxLaur>resume': {
          setTerminalText(prevText => [inputText, ...prevText]);
          setResumeDialog(true);
          break;
        }
        case 'C:\\MaxLaur>about': {
          setTerminalText(prevText => [inputText, ...prevText]);
          setAboutDialog(true)
          break;
        }
        case 'C:\\MaxLaur>run srp_website': {
          setTerminalText(prevText => [inputText, ...prevText]);
          setSrpDialog(true)
          break;
        }
        case 'C:\\MaxLaur>run docere_health_demo': {
          setTerminalText(prevText => [inputText, ...prevText]);
          setDocereDialog(true)
          break;
        }
        default: {
          const entry = inputText.substring('C:\\MaxLaur>'.length);
          setTerminalText(prevText => [`'${entry}' is not recognized as an internal or external command. Type help for available commands`, inputText, ...prevText]);
          break;
        }
      }
      setInputText('C:\\MaxLaur>');
      setCommandHistory(prevHistory => [inputText, ...prevHistory]);
      setHistoryIndex(-1);
    }
  };

  // function to access command entries history when clicking up or down.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      const newHistoryIndex = event.key === 'ArrowUp' ? historyIndex + 1 : historyIndex - 1;
      const newInputText = commandHistory[newHistoryIndex];
      if (newInputText !== undefined) {
        setHistoryIndex(newHistoryIndex);
        setInputText(newInputText);
      }
    }
    // autocomplete todo: show suggested command in input field.
    if (event.key === 'Tab') {
      event.preventDefault();
      const currentInput = inputText.substring('C:\\MaxLaur>'.length);
      const closestMatch = findClosestMatch(currentInput, availableCommands);
      if (closestMatch) {
        setInputText(`C:\\MaxLaur>${closestMatch}`);
        inputRef.current?.setSelectionRange(inputText.length, inputText.length);
      }
    }
  };

  //auto complete choices
  const availableCommands = [
    "help",
    "clear",
    "cls",
    "resume",
    "about",
    "run",
    "run docere_health_demo",
    "run srp_website"
  ];
  
  const findClosestMatch = (input: string, commands: string[]): string | undefined => {
    const matches = commands.filter(command => command.startsWith(input));
    if (matches.length === 1) {
      return matches[0];
    } else if (matches.length > 1) {
      return matches.reduce((a, b) => (a.length < b.length ? a : b));
    } else {
      return undefined;
    }
  };

  return (
    <>
      {/* RESUME DIALOG */}
      <Dialog open={resumeDialog} >
        <DialogContent className="h-full">
          <DialogHeader className="h-12">
            <DialogTitle className='text-purple-400 text-center text-3xl'>My Resume</DialogTitle>
            <div className='flex justify-center'>
              <Button className='m-1 p-3 text-green-300 bg-purple-400 hover:text-purple-400 text-xl' type="button" variant="secondary" onClick={() => {setResumeDialog(false); setSecretTwo(true)}}>
                Close
              </Button>
            </div>
          </DialogHeader>
          <div className="flex justify-center">
            {loading && (
              <div className="spinner-border text-primary" role="status">
                <Hourglass
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="hourglass-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  colors={['#d8b4fe', '#d8b4fe']}
                />
              </div>
            )}
            <iframe
              className="absolute inset-0 w-full h-5/6 border-none mt-36 mb-12"
              src="https://web2pdf.org/temp/2024-04-29/20240429235444.pdf"
              title="Resume"
              // sidebar={false}
              onLoad={handleIframeLoad}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* SRP DIALOG */}
      <Dialog open={srpDialog} >
        <DialogContent>
          <DialogHeader className="h-12">
            <DialogTitle className='text-purple-400 text-center text-2xl'>SRP</DialogTitle>
            <DialogDescription className='text-green-300 text-3xl font-teko text-center'>Full-stack webpage project made for the Shutoko Revival Project using the MERN stack (Mongodb, Express, React, Node) and Auth0</DialogDescription>
          </DialogHeader>
          <div className="relative mt-32 sm:mt-14" style={{ paddingTop: '56.25%' }}>
            <iframe 
              className="absolute top-0 left-0 w-full h-full" 
              src="https://www.youtube.com/embed/VKlrg3rCXeQ?si=_E0ErFOATKWE4qw8" 
              title="YouTube video player" 
              allow="web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>
          <div className='flex justify-center'>
            <Button className='m-1 p-3 text-green-300 bg-purple-400 hover:text-purple-400 text-xl' type="button" variant="secondary" onClick={() => {setSrpDialog(false); setSecretThree(true)}}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* DOCERE DIALOG */}
      <Dialog open={docereDialog} >
        <DialogContent>
          <DialogHeader className="h-12">
            <DialogTitle className='text-purple-400 text-center text-2xl '>Docere Health</DialogTitle>
            <DialogDescription className='text-green-300 font-teko text-center text-3xl'>
              <Link href='https://docereapp.net/' className="hover:text-purple-400 hover:scale-105 underline" target="blank">
                Docere Health{' '}
              </Link>
              is an electronic health/medical record platform
            </DialogDescription>
          </DialogHeader>
          <div className="relative mt-14" style={{ paddingTop: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full" 
              src="https://www.youtube.com/embed/GeuwfXXcjZw?si=o_RXHoIROmfl20H7"
              title="YouTube video player"
              allow="web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen>
            </iframe>
          </div>
          <div className="flex justify-center font-teko text-2xl text-green-300">
            I have worked on this demo app from May 2023 to January 2024 with a small team of interns, overseen by the co-founders.
            I was the main contributor and was responsible for features such as user registration, authentication, 
            user role protected routes to protecting our apis and more.
            I have taken multiple critical tasks normally not given to interns.
          </div>
          <div className='flex justify-center'>
            <Button className='m-1 p-3 text-green-300 bg-purple-400 hover:text-purple-400 text-xl' type="button" variant="secondary" onClick={() => {setDocereDialog(false); setSecretFour(true)}}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ABOUT ME DIALOG */}
      <Dialog open={aboutDialog}>
        <DialogContent className="h-auto">
          <DialogHeader className="h-12">
            <DialogTitle className='text-purple-400 text-center text-2xl'>About me</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col justify-center">
            <p className='text-green-300 font-teko text-3xl mb-3'>
              Hey there, I&apos;m a web developer called Max. 
              My journey into tech began in 2022, and since then, I&apos;ve immersed myself in the world of web development.
            </p>
            <Separator className="my-4" />
              <p className='text-green-300 font-teko text-3xl mb-3'>
                After completing a full-stack web development bootcamp in April 2023, I joined a startup 
                called Docere Health as an intern and quickly became an essential part of the team. 
                My hard work paid off and I&apos;m now a valued member of the company. Notably, 
                out of a dozen interns, I was the only one to be offered a full-time 
                position which is a testament to my dedication and contribution.
              </p>
              {/* <Separator className="my-4" /> */}
              {/* <p className='text-green-300 font-teko text-3xl mb-3'>
                I&apos;m proficient in a variety of technologies, including HTML, CSS, JavaScript, 
                React, Node.js, MongoDB, Supabase, MobX, MUI, Soft UI, TypeScript, Next.js, Tailwind CSS, ShadcnUI, 
                and I&apos;ve also worked with Spring Boot and Kotlin. I utilize tools like Visual Studio Code, 
                IntelliJ IDEA, Git Fork, and Figma.
              </p> */}
              {/* <Separator className="my-4" />
              <p className='text-green-300 font-teko text-3xl'>
                My background as a tree planter has instilled in me a strong work ethic and a commitment 
                to excellence. I excelled in the industry, setting important production records, fueled by my 
                desire to become the best. I thrive in challenging environments and am always eager to expand my skills.
            </p> */}
          </div>
          <div className='flex justify-center'>
            <Button className='m-1 p-3 text-green-300 bg-purple-400 hover:text-purple-400 text-xl' type="button" variant="secondary" onClick={() => {setAboutDialog(false); setSecretOne(true)}}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <section
        ref={terminalContainerRef}
        style={{ height: '70vh', overflowY: 'auto'  }}
        onClick={handleTerminalClick}
        className="p-1 w-full md:w-5/6 lg:w-4/6 xl:w-4/6 mx-auto flex flex-col bg-black text-green-300 overflow-y-auto border border-4 border-double border-green-300 font-vt323 text-2xl"
      >
        <div className="flex-grow flex flex-col-reverse">
          {terminalText.map((text, index) => (
            <p key={index + index} >{text}</p>
          ))}
        </div>
        <input
          type="text"
          value={inputText}
          ref={inputRef}
          onChange={handleInputChange}
          onKeyPress={handleEnterPress}
          onKeyDown={handleKeyDown}
          className="w-full bg-black text-green-300 border-none outline-none"
          autoFocus
        />
      </section>
    </>
  );
};

export default Terminal