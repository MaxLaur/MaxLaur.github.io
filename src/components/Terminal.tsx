"use client"
import { useEffect, useState, useRef } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const Terminal: React.FC = () => {
  const [resumeDialog, setResumeDialog] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('C:\\MaxLaur>');
  const [terminalText, setTerminalText] = useState<string[]>(["type help for available commands", "MaxLaur [version 1.0]"]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // if (terminalRef.current) {
    //   terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    // }
  }, [terminalText]);

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
    }
  };

  return (
    <>
      {
        resumeDialog &&
        <Dialog>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      }

      <div className="p-1 sm:w-full md:w-4/6 lg:w-4/6 xl:w-4/6 mx-auto h-124 flex flex-col bg-black text-green-300 overflow-y-auto border border-green-300 font-vt323">
        <div className="flex-grow flex flex-col-reverse">
          {terminalText.map((text, index) => (
            <p key={text + index} >{text}</p>
          ))}
        </div>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleEnterPress}
          className="w-full bg-black text-green-300 border-none outline-none "
          autoFocus
        />
      </div>
    </>
  );
};

export default Terminal