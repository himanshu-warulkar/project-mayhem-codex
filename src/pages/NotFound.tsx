
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const [terminalText, setTerminalText] = useState('');
  const [showRestart, setShowRestart] = useState(false);

  const terminalCommands = [
    '$ whoami',
    'root',
    '$ ls -la /',
    'total 0',
    'drwxr-xr-x   1 root  wheel   512 Dec 29 2025 .',
    'drwxr-xr-x   1 root  wheel   512 Dec 29 2025 ..',
    '-rw-r--r--   1 root  wheel     0 Dec 29 2025 reality.txt',
    '-rw-r--r--   1 root  wheel     0 Dec 29 2025 simulation.db',
    '$ cat reality.txt',
    'ERROR: File not found in current dimension',
    '$ sudo rm -rf /',
    'Removing universe...',
    'Reality.exe has stopped working...',
    'Simulation terminated.',
    'SYSTEM FAILURE: You just broke the simulation.',
    '',
    'Initiating restart protocol...'
  ];

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    let currentIndex = 0;
    let currentText = '';
    
    const typeTimer = setInterval(() => {
      if (currentIndex < terminalCommands.length) {
        const currentLine = terminalCommands[currentIndex];
        
        if (currentLine === '') {
          currentText += '\n';
          setTerminalText(currentText);
          currentIndex++;
        } else {
          // Type out character by character
          if (currentText.endsWith(currentLine)) {
            currentText += '\n';
            currentIndex++;
          } else {
            const targetLength = currentText.split('\n').pop()?.length || 0;
            if (targetLength < currentLine.length) {
              const lines = currentText.split('\n');
              lines[lines.length - 1] = currentLine.substring(0, targetLength + 1);
              currentText = lines.join('\n');
            } else {
              currentText += '\n';
              currentIndex++;
            }
          }
          setTerminalText(currentText);
        }
      } else {
        clearInterval(typeTimer);
        setTimeout(() => setShowRestart(true), 2000);
      }
    }, 100);

    return () => clearInterval(typeTimer);
  }, [location.pathname]);

  const handleRestart = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-8 overflow-hidden">
      {/* Matrix-style background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-900/20 to-black"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-500 mb-4 glitch animate-pulse">
            SYSTEM BREACH DETECTED
          </h1>
          <p className="text-xl text-yellow-400">
            Route: <span className="text-red-400">{location.pathname}</span> does not exist in this reality.
          </p>
        </div>

        <div className="bg-black border border-green-600 p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-gray-400 ml-4">Terminal - Project Mayhem</span>
          </div>
          
          <div className="h-96 overflow-y-auto">
            <pre className="text-green-400 text-sm leading-relaxed whitespace-pre-wrap">
              {terminalText}
              <span className="animate-pulse">█</span>
            </pre>
          </div>
        </div>

        {showRestart && (
          <div className="mt-8 text-center animate-fade-in">
            <div className="text-6xl mb-4 animate-pulse">💀</div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              You just broke the simulation.
            </h2>
            <p className="text-gray-400 mb-6 font-mono">
              The matrix has been compromised. Reboot required.
            </p>
            <Button 
              onClick={handleRestart}
              className="bg-red-600 hover:bg-red-700 text-white font-mono px-8 py-4 text-lg border border-red-500"
            >
              RESTART SIMULATION
            </Button>
          </div>
        )}
      </div>

      <div className="fixed bottom-4 right-4 text-xs text-gray-600">
        <p>Error Code: 404_REALITY_NOT_FOUND</p>
        <p>Timestamp: {new Date().toISOString()}</p>
      </div>
    </div>
  );
};

export default NotFound;
