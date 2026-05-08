const fs = require('fs');

let content = fs.readFileSync('src/pages/Home.tsx', 'utf-8');

// Global Background
content = content.replace(
  /className="min-h-screen bg-stone-900 text-white/g,
  'className="min-h-screen bg-[#0C0F0E] text-[#E4EBE7]'
);

// Menu/Header -> Floating Pill
content = content.replace(
  /<header className="fixed inset-x-0 top-0 z-50 bg-stone-900\/80 backdrop-blur-md border-b border-white\/5">/,
  '<header className="fixed top-4 sm:top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">\n        <div className="w-full max-w-4xl pointer-events-auto">'
);
content = content.replace(
  /<nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">/,
  '<nav aria-label="Global" className="flex w-full items-center justify-between p-3 px-6 bg-[#161B18]/70 backdrop-blur-xl border border-white/5 rounded-full shadow-2xl">'
);
content = content.replace(
  /<\/nav>\n      <\/header>/,
  '</nav>\n        </div>\n      </header>'
);

// Marquee Strip
content = content.replace(
  /<div className="w-full bg-\[#505F52\] py-4 overflow-hidden flex whitespace-nowrap">/,
  '<div className="w-full bg-[#161B18] border-y border-white/5 py-4 overflow-hidden flex whitespace-nowrap">'
);

// Section Accents
content = content.replace(/bg-stone-900\/50/g, 'bg-transparent');

// Cases
content = content.replace(/bg-stone-800\/30/g, 'bg-[#161B18]/80');
content = content.replace(/rounded-2xl/g, 'rounded-[2rem]');
content = content.replace(/bg-stone-700/g, 'bg-[#232A26]'); // number bubbles

// Accordion Update
content = content.replace(
  /className="bg-stone-800\/30 hover:bg-stone-800\/50 border border-white\/5 hover:border-white\/10 rounded-2xl mb-4 overflow-hidden transition-all duration-300"/g,
  'className="bg-[#161B18] hover:bg-[#1C221E] border border-white/5 mb-4 rounded-[2rem] overflow-hidden transition-all duration-300 shadow-sm"'
);

// Bottom buttons - make them normal, not huge
content = content.replace(
  /className="bg-\[#D9520E\] hover:bg-\[#B9420B\] text-white font-medium py-3 px-8 rounded-md transition-all hover:scale-105 hover:shadow-\[0_0_20px_rgba\(217,82,14,0.4\)\] w-full sm:w-auto text-center flex flex-col items-center justify-center"/,
  'className="bg-[#D9520E] hover:bg-[#B9420B] text-white font-semibold py-2.5 px-6 rounded-full transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(217,82,14,0.3)] w-full sm:w-auto text-center flex flex-col items-center justify-center"'
);
content = content.replace(
  /className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-md transition-all hover:scale-105 hover:shadow-\[0_0_20px_rgba\(59,130,246,0.4\)\] w-full sm:w-auto text-center flex flex-col items-center justify-center"/,
  'className="bg-[#1C221E] hover:bg-[#232A26] border border-white/10 text-white font-semibold py-2.5 px-6 rounded-full transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] w-full sm:w-auto text-center flex flex-col items-center justify-center"'
);
content = content.replace(
  /<span className="text-base font-bold uppercase tracking-wide">/g,
  '<span className="text-sm font-bold uppercase tracking-wide">'
);
content = content.replace(
  /<span className="text-xs text-white\/80 mt-0.5 uppercase tracking-wide block">/g,
  '<span className="text-[10px] text-white/60 uppercase tracking-wide block mt-1">'
);

// All rounded-md to rounded-full for buttons
content = content.replace(/rounded-md/g, 'rounded-full');

// Payment block
content = content.replace(
  /bg-stone-800\/50 border border-white\/10 p-8 flex flex-col border-\[2px\] border-stone-700\/50 hover:border-\[#505F52\]\/50 transition-colors/g,
  'bg-[#161B18] border border-white/5 p-8 flex flex-col hover:border-[#505F52]/30 transition-colors'
);
content = content.replace(
  /bg-\[#D9520E\]\/10 border-\[#D9520E\] p-8 flex flex-col border-\[2px\] relative overflow-hidden/g,
  'bg-[#1D1B16] border-[#D9520E]/30 p-8 flex flex-col border relative overflow-hidden'
);

content = content.replace(/rounded-3xl/g, 'rounded-[2.5rem]');

// Video wrapper rounded
content = content.replace(/rounded-t-xl sm:rounded-t-3xl/g, 'rounded-t-[2rem] sm:rounded-t-[3rem]');
content = content.replace(/rounded-b-xl sm:rounded-b-2xl/g, 'rounded-b-[2rem] sm:rounded-b-[3rem]');

// Footer and remaining stone-900 backgrounds
content = content.replace(/bg-stone-900/g, 'bg-[#0C0F0E]');
content = content.replace(/bg-stone-950/g, 'bg-[#090B0A]');
content = content.replace(/border-white\/10/g, 'border-white/5');

fs.writeFileSync('src/pages/Home.tsx', content);

