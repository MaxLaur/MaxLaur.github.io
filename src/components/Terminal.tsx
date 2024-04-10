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
      if (inputText === 'C:\\MaxLaur>help') {
        const clear = "clear/cls --- clear the terminal"
        const ls = "ls ---------- list directory content"
        const resume = "resume ---- view my CV"
        setTerminalText(prevText => [resume, ls, clear, "*", inputText, ...prevText]);
        setInputText('C:\\MaxLaur>');
      }
      else if (inputText === 'C:\\MaxLaur>clear' || inputText === 'C:\\MaxLaur>cls') {
        setTerminalText(["type help for available commands", "MaxLaur [version 1.0]"]);
        setInputText('C:\\MaxLaur>');
      }
      else if (inputText === 'C:\\MaxLaur>resume') {
        setTerminalText(prevText => [inputText, ...prevText]);
        setResumeDialog(true)
        setInputText('C:\\MaxLaur>');
      }
      else{
        setTerminalText(prevText => [inputText, ...prevText]);
        setInputText('C:\\MaxLaur>');
      }
      setCommandHistory(prevHistory => [inputText, ...prevHistory]);
      setHistoryIndex(-1);
    }
  };

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
              // src="https://drive.google.com/file/d/10d4LYYEVk8XHkX3nwke7BSGxPud2VP60/preview"
              title="Resume"
              onLoad={handleIframeLoad}
            />
          </div>
          <DialogFooter className="sm:justify-start h-12">
            
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <section
        style={{ height: '50vh' }}
        onClick={handleTerminalClick}
        className="p-1 sm:w-5/6 sm:w-5/6 md:w-5/6 lg:w-4/6 xl:w-4/6 mx-auto  flex flex-col bg-black text-green-300 overflow-y-auto border border-green-300 font-vt323 text-2xl"
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