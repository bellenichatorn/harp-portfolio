
import React, { useCallback, useEffect, useState } from 'react';
import { Music, User, Briefcase, Mail, FileText } from 'lucide-react';

interface HarpProps {
  onKeyPress?: (note: string) => void;
}

const Harp: React.FC<HarpProps> = ({ onKeyPress }) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [activeStrings, setActiveStrings] = useState<Set<string>>(new Set());

  // Harp strings with frequencies and colors (following traditional harp color coding)
  const harpStrings = [
    { note: 'C4', freq: 261.63, key: 'q', color: 'bg-red-500', position: 5 },
    { note: 'D4', freq: 293.66, key: 'w', color: 'bg-yellow-100', position: 8 },
    { note: 'E4', freq: 329.63, key: 'e', color: 'bg-yellow-100', position: 11 },
    { note: 'F4', freq: 349.23, key: 'r', color: 'bg-red-500', position: 14 },
    { note: 'G4', freq: 392.00, key: 't', color: 'bg-yellow-100', position: 17 },
    { note: 'A4', freq: 440.00, key: 'y', color: 'bg-yellow-100', position: 20 },
    { note: 'B4', freq: 493.88, key: 'u', color: 'bg-blue-500', position: 23 },
    { note: 'C5', freq: 523.25, key: 'i', color: 'bg-red-500', position: 26 },
    { note: 'D5', freq: 587.33, key: 'o', color: 'bg-yellow-100', position: 29 },
    { note: 'E5', freq: 659.25, key: 'p', color: 'bg-yellow-100', position: 32 },
    { note: 'F5', freq: 698.46, key: 'a', color: 'bg-red-500', position: 35 },
    { note: 'G5', freq: 783.99, key: 's', color: 'bg-yellow-100', position: 38 },
    { note: 'A5', freq: 880.00, key: 'd', color: 'bg-yellow-100', position: 41 },
    { note: 'B5', freq: 987.77, key: 'f', color: 'bg-blue-500', position: 44 },
    { note: 'C6', freq: 1046.50, key: 'g', color: 'bg-red-500', position: 47 },
    { note: 'D6', freq: 1174.66, key: 'h', color: 'bg-yellow-100', position: 50 },
    { note: 'E6', freq: 1318.51, key: 'j', color: 'bg-yellow-100', position: 53 },
    { note: 'F6', freq: 1396.91, key: 'k', color: 'bg-red-500', position: 56 },
    { note: 'G6', freq: 1567.98, key: 'l', color: 'bg-yellow-100', position: 59 }
  ];

  // ... keep existing code (audio context and effects initialization)

  const playNote = useCallback((frequency: number, note: string) => {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'triangle'; // Triangle wave for harp-like sound

    gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 2);

    setActiveStrings(prev => new Set(prev).add(note));
    setTimeout(() => {
      setActiveStrings(prev => {
        const newSet = new Set(prev);
        newSet.delete(note);
        return newSet;
      });
    }, 200);

    onKeyPress?.(note);
  }, [audioContext, onKeyPress]);

  // ... keep existing code (keyboard event handlers)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col items-center space-y-8 relative min-h-screen w-full overflow-hidden">
      <div className="flex items-center space-x-3 text-4xl font-bold text-foreground z-50">
        <Music className="w-12 h-12" />
        <span>Concert Harp Studio</span>
      </div>
      
      {/* Full-Screen 3D Concert Harp Scene */}
      <div className="relative w-full h-screen flex items-center justify-center">
        
        {/* Background gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-accent/5"></div>
        
        {/* Harp Stool - positioned to the left */}
        <div className="absolute left-1/4 bottom-32 z-30 transform -rotate-12">
          <div className="w-24 h-20 perspective-1000">
            {/* 3D Stool with perspective */}
            <div className="relative transform rotate-x-15 rotate-y-25">
              {/* Stool seat - oval shape for 3D effect */}
              <div className="w-24 h-16 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 rounded-full shadow-2xl border-4 border-amber-600">
                <div className="w-full h-6 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full shadow-inner"></div>
              </div>
              {/* Stool legs with 3D perspective */}
              <div className="absolute -bottom-8 left-3 w-3 h-8 bg-gradient-to-br from-amber-700 to-amber-900 rounded transform rotate-y-15 shadow-lg"></div>
              <div className="absolute -bottom-8 right-3 w-3 h-8 bg-gradient-to-br from-amber-700 to-amber-900 rounded transform -rotate-y-15 shadow-lg"></div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-3 h-8 bg-gradient-to-br from-amber-700 to-amber-900 rounded shadow-lg"></div>
              <div className="absolute -bottom-8 left-6 w-3 h-8 bg-gradient-to-br from-amber-700 to-amber-900 rounded transform rotate-y-10 shadow-lg"></div>
            </div>
          </div>
          {/* Clickable area for About section */}
          <button 
            onClick={() => scrollToSection('about')}
            className="absolute inset-0 group"
            title="Click to learn about me"
          >
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground px-3 py-2 rounded text-sm whitespace-nowrap shadow-lg">
              <User className="w-4 h-4 inline mr-1" />
              About Me
            </div>
          </button>
        </div>

        {/* Music Stand - positioned to the left */}
        <div className="absolute left-16 top-1/4 z-40 transform rotate-12">
          <div className="relative perspective-1000">
            {/* Stand pole with 3D effect */}
            <div className="w-2 h-32 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 mx-auto shadow-lg transform rotate-y-10"></div>
            {/* Music sheet with 3D perspective */}
            <div className="absolute -top-20 -left-16 w-32 h-24 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 border-2 border-gray-300 rounded shadow-2xl transform rotate-y-25 rotate-x-10">
              {/* Musical staff lines */}
              <div className="p-2">
                <div className="space-y-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-px bg-gray-500"></div>
                  ))}
                </div>
                <div className="absolute top-3 left-4 text-lg">♪ ♫ ♪</div>
                <div className="absolute bottom-3 right-4 text-sm">♬</div>
              </div>
            </div>
            {/* Clickable area for Projects */}
            <button 
              onClick={() => scrollToSection('projects')}
              className="absolute -top-20 -left-16 w-32 h-24 group"
              title="View my musical projects"
            >
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground px-3 py-2 rounded text-sm whitespace-nowrap shadow-lg">
                <Briefcase className="w-4 h-4 inline mr-1" />
                Projects
              </div>
            </button>
          </div>
        </div>

        {/* Massive 3D Concert Pedal Harp - Center Stage */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-150">
          <div className="relative perspective-1000">
            
            {/* Harp Base - wider and more detailed */}
            <div className="absolute bottom-0 left-8 w-48 h-12 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 rounded-2xl shadow-2xl border-4 border-amber-600 transform rotate-y-15">
              {/* Base decorative elements */}
              <div className="absolute top-2 left-4 w-40 h-2 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full"></div>
              <div className="absolute bottom-2 left-4 w-40 h-2 bg-gradient-to-r from-amber-800 to-amber-900 rounded-full"></div>
            </div>
            
            {/* Main pillar (left side) - taller and more detailed */}
            <div className="absolute left-8 bottom-12 w-8 h-96 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 rounded-2xl shadow-2xl border-4 border-amber-600 transform rotate-y-15">
              {/* Pillar decorative ridges */}
              <div className="absolute top-8 left-1 w-6 h-1 bg-amber-600 rounded"></div>
              <div className="absolute top-24 left-1 w-6 h-1 bg-amber-600 rounded"></div>
              <div className="absolute top-40 left-1 w-6 h-1 bg-amber-600 rounded"></div>
              <div className="absolute top-56 left-1 w-6 h-1 bg-amber-600 rounded"></div>
            </div>
            
            {/* Neck (top curved part) - larger and more curved */}
            <div className="absolute left-8 top-12 w-64 h-8 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 rounded-full shadow-2xl border-4 border-amber-600 transform -rotate-20 origin-left">
              {/* Neck tuning pegs area */}
              <div className="absolute top-1 left-4 w-56 h-6 bg-gradient-to-r from-amber-800 to-amber-700 rounded-full">
                {/* Tuning peg indicators */}
                {Array.from({ length: 19 }).map((_, i) => (
                  <div key={i} className="absolute top-1" style={{ left: `${i * 12 + 8}px` }}>
                    <div className="w-1 h-4 bg-amber-600 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Sound board (right side) - larger and more detailed */}
            <div className="absolute right-16 bottom-12 w-6 h-80 bg-gradient-to-l from-amber-900 via-amber-800 to-amber-700 rounded-2xl shadow-2xl border-4 border-amber-600 transform -rotate-y-15">
              {/* Sound holes */}
              <div className="absolute top-20 left-1 w-4 h-8 bg-amber-900 rounded-full border border-amber-700"></div>
              <div className="absolute top-40 left-1 w-4 h-8 bg-amber-900 rounded-full border border-amber-700"></div>
              <div className="absolute top-60 left-1 w-4 h-8 bg-amber-900 rounded-full border border-amber-700"></div>
            </div>
            
            {/* Harp Strings - spanning the full height */}
            <div className="absolute left-16 bottom-12 w-48 h-80">
              {harpStrings.map((string, index) => {
                const stringHeight = 320 - index * 12;
                const stringLeft = index * 12 + 8;
                
                return (
                  <button
                    key={string.note}
                    onMouseDown={() => playNote(string.freq, string.note)}
                    className={`
                      absolute w-1 shadow-2xl transition-all duration-150 hover:shadow-2xl hover:scale-110
                      ${string.color} ${string.color.includes('yellow') ? 'opacity-90' : 'opacity-95'}
                      ${activeStrings.has(string.note) ? 'transform scale-125 shadow-2xl animate-pulse brightness-150' : ''}
                      rounded-full
                    `}
                    style={{
                      left: `${stringLeft}px`,
                      height: `${stringHeight}px`,
                      bottom: '0px',
                      background: string.color.includes('red') ? 'linear-gradient(to bottom, #ef4444, #dc2626)' :
                                 string.color.includes('blue') ? 'linear-gradient(to bottom, #3b82f6, #2563eb)' :
                                 'linear-gradient(to bottom, #fbbf24, #f59e0b)'
                    }}
                    title={`${string.note} - Press ${string.key.toUpperCase()}`}
                  >
                    {/* String vibration effect */}
                    {activeStrings.has(string.note) && (
                      <div className="absolute inset-0 bg-white opacity-50 animate-pulse rounded-full blur-sm"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Pedals at the base - more detailed */}
            <div className="absolute -bottom-6 left-12 flex space-x-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="relative">
                  <div className="w-3 h-6 bg-gradient-to-b from-gray-500 via-gray-600 to-gray-700 rounded-lg border-2 border-gray-400 shadow-lg transform rotate-y-10"></div>
                  <div className="absolute top-6 left-0 w-3 h-2 bg-gray-800 rounded transform rotate-y-10"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Card - top right */}
        <div className="absolute top-8 right-8 w-28 h-20 bg-gradient-to-br from-card via-card/90 to-card/80 border-2 border-border rounded-xl shadow-2xl z-40">
          <button 
            onClick={() => scrollToSection('contact')}
            className="w-full h-full flex flex-col items-center justify-center group hover:bg-accent transition-all duration-300 rounded-xl transform hover:scale-105"
            title="Get in touch"
          >
            <Mail className="w-6 h-6 text-primary mb-1" />
            <span className="text-sm text-muted-foreground font-medium">Contact</span>
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
              Get In Touch
            </div>
          </button>
        </div>

        {/* Resume/CV - bottom right */}
        <div className="absolute bottom-8 right-12 w-24 h-32 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 border-2 border-gray-300 rounded-lg shadow-2xl z-40 transform rotate-3">
          <button 
            onClick={() => window.open('#', '_blank')}
            className="w-full h-full flex flex-col items-center justify-center group hover:bg-gray-200 transition-all duration-300 rounded-lg transform hover:scale-105 hover:rotate-0"
            title="View Resume"
          >
            <FileText className="w-8 h-8 text-primary mb-2" />
            <span className="text-xs text-gray-600 font-medium">Resume</span>
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
              View Resume
            </div>
          </button>
        </div>
        
        {/* Instructions - bottom center */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-sm text-muted-foreground max-w-4xl z-50 bg-background/80 backdrop-blur-sm p-4 rounded-xl border border-border">
          <p className="mb-2">🎵 Click the harp strings or use your keyboard (Q-L) to play beautiful melodies</p>
          <p className="mb-2">✨ Red strings are C & F notes, Blue strings are B notes, Golden strings are others</p>
          <p>🔍 Explore the interactive elements to navigate through my portfolio</p>
        </div>
      </div>
    </div>
  );
};

export default Harp;


