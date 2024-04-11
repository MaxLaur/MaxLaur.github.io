"use client"
import { useEffect, useState, useRef, RefObject } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from "@/components/ui/button"
import { Hourglass } from 'react-loader-spinner'

interface TerminalProps {
  resumeDialog: boolean;
  setResumeDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const Terminal: React.FC<TerminalProps> = ({resumeDialog, setResumeDialog}) => {
  const [inputText, setInputText] = useState<string>('C:\\MaxLaur>');
  const [terminalText, setTerminalText] = useState<string[]>(["type help for available commands", "MaxLaur [version 1.0]"]);
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
          const clear = "clear/cls --- clear the terminal";
          const ls = "ls ---------- list viewable files";
          const resume = "resume ------ view my CV";
          const about = "about ------- about me :))";
          const run = "run --------- `run [filename]` to view file";
          setTerminalText(prevText => [run, resume, ls, clear, about, "*", inputText, ...prevText]);
          break;
        }
        case 'C:\\MaxLaur>clear':
        case 'C:\\MaxLaur>cls': {
          setTerminalText(["type help for available commands", "MaxLaur [version 1.0]"]);
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

  //auto complete
  const availableCommands = [
    "help",
    "clear",
    "cls",
    "resume",
    "about",
    "run"
  ];
  
  // const handleTabPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === 'Tab') {
  //     event.preventDefault();
  //     const currentInput = inputText.substring('C:\\MaxLaur>'.length);
  //     const closestMatch = findClosestMatch(currentInput, availableCommands);
  //     if (closestMatch) {
  //       setInputText(`C:\\MaxLaur>${closestMatch}`);
  //       inputRef.current?.setSelectionRange(inputText.length, inputText.length);
  //     }
  //   }
  // };
  
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
      <Dialog open={resumeDialog} >
        <DialogContent className="h-full">
          <DialogHeader className="h-12">
            <DialogTitle className='text-purple-300'>Maxime Laurendeau</DialogTitle>
            <DialogDescription className='text-purple-300'>My resume</DialogDescription>
            <DialogClose onClick={() => setResumeDialog(false)}>
              <Button className='bg-purple-500' type="button" variant="secondary" onClick={() => setResumeDialog(false)}>
                Close
              </Button>
            </DialogClose>
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
              src="https://web2pdf.org/temp/2024-04-10/20240410210243.pdf"
              title="Resume"
              onLoad={handleIframeLoad}
            />
          </div>
        </DialogContent>
      </Dialog>

      <section
        ref={terminalContainerRef}
        style={{ height: '50vh', overflowY: 'auto'  }}
        onClick={handleTerminalClick}
        className="p-1 sm:w-5/6 sm:w-5/6 md:w-5/6 lg:w-4/6 xl:w-4/6 mx-auto flex flex-col bg-black text-green-300 overflow-y-auto border border-4 border-double border-green-300 font-vt323 text-2xl"
      >
        <div className="flex-grow flex flex-col-reverse">
          {terminalText.map((text, index) => (
            <p key={text + index} >{text}</p>
          ))}
        </div>
        <input
          type="text"
          value={inputText}
          ref={inputRef}
          onChange={handleInputChange}
          onKeyPress={handleEnterPress}
          onKeyDown={handleKeyDown}
          className="w-full bg-black text-green-300 border-none outline-none "
          autoFocus
        />
      </section>
    </>
  );
};

export default Terminal