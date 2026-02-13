import React, { useState, useEffect, useCallback } from 'react';
import { Heart, Stars, Sparkles, PartyPopper } from 'lucide-react';

/**
 * VALENTINE'S DAY PROPOSAL APP
 * Features:
 * 1. Interactive "No" button that moves on hover/touch.
 * 2. Transition to a success page using the provided images.
 * 3. Responsive design for mobile and desktop.
 */

const App: React.FC = () => {
  const [stage, setStage] = useState<'ASKING' | 'SUCCESS'>('ASKING');
  const [noButtonPos, setNoButtonPos] = useState({ top: '0px', left: '0px', position: 'relative' as const });
  const [hasMoved, setHasMoved] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number; size: number }[]>([]);

  // Function to move the "No" button to a random spot
  const moveButton = useCallback(() => {
    const randomX = Math.floor(Math.random() * 60) + 20;
    const randomY = Math.floor(Math.random() * 60) + 20;

    setNoButtonPos({
      top: `${randomY}vh`,
      left: `${randomX}vw`,
      position: 'fixed'
    });
    setHasMoved(true);
  }, []);

  // Generate floating hearts for the success stage
  useEffect(() => {
    if (stage === 'SUCCESS') {
      const newHearts = Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        size: Math.random() * 20 + 10
      }));
      setHearts(newHearts);
    }
  }, [stage]);

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center p-6 overflow-hidden font-sans selection:bg-rose-200">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 text-rose-200 animate-pulse">
          <Heart size={48} fill="currentColor" />
        </div>
        <div className="absolute bottom-20 right-10 text-rose-200 animate-bounce">
          <Heart size={64} fill="currentColor" />
        </div>
      </div>

      <div className="z-10 max-w-lg w-full bg-white/80 backdrop-blur-md p-8 rounded-[2rem] shadow-2xl border-b-8 border-rose-100 text-center">
        {stage === 'ASKING' ? (
          <div className="space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="relative inline-block group">
              <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <img
                src="https://media.tenor.com/y3_6qMv_6k8AAAAd/bubu-dudu-flower.gif"
                alt="Asking"
                className="relative w-64 h-64 mx-auto rounded-xl object-cover shadow-inner"
              />
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl font-black text-rose-600 tracking-tight">
                Will you be my Valentine? 🌹
              </h1>
              <p className="text-rose-400 font-medium">Please say yes! I promise it'll be fun!</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 min-h-[120px]">
              <button
                onClick={() => setStage('SUCCESS')}
                className="group relative px-12 py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-full shadow-[0_8px_0_rgb(190,18,60)] active:shadow-none active:translate-y-2 transition-all flex items-center gap-2"
              >
                YES!
                <Heart size={20} className="group-hover:scale-125 transition-transform" fill="white" />
              </button>

              <button
                onMouseEnter={moveButton}
                onTouchStart={moveButton}
                onClick={moveButton}
                style={hasMoved ? {
                  position: noButtonPos.position,
                  top: noButtonPos.top,
                  left: noButtonPos.left,
                  transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  zIndex: 100
                } : {}}
                className="px-10 py-4 bg-slate-200 text-slate-500 font-bold rounded-full shadow-[0_8px_0_rgb(203,213,225)] hover:bg-slate-300 transition-colors"
              >
                No
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-700">
            <div className="relative">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-4">
                <PartyPopper className="text-yellow-500 animate-bounce" />
                <Sparkles className="text-rose-400 animate-pulse" />
                <Stars className="text-rose-400 animate-bounce" />
              </div>
              <img
                src="https://media.tenor.com/Z8X_qEw2V78AAAAd/bubu-dudu-love.gif"
                alt="Success"
                className="w-72 h-72 mx-auto rounded-full object-cover border-8 border-rose-100 shadow-2xl"
              />
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl font-black text-rose-600 leading-tight">
                Yay! I knew it! 💖
              </h1>
              <p className="text-xl text-rose-400 italic font-semibold">
                "Let's have some fun!"
              </p>
            </div>

            <div className="pt-4">
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-rose-100 text-rose-600 rounded-full text-sm font-bold uppercase tracking-widest">
                Our Valentine's date pending...
              </div>
            </div>

            <button
              onClick={() => { setStage('ASKING'); setHasMoved(false); }}
              className="text-slate-400 hover:text-rose-500 text-xs font-medium underline transition-colors"
            >
              Ask me again?
            </button>
          </div>
        )}
      </div>

      {/* Floating Success Hearts */}
      {stage === 'SUCCESS' && hearts.map(heart => (
        <div
          key={heart.id}
          className="fixed bottom-[-50px] pointer-events-none animate-float-up opacity-0"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            color: `hsl(${340 + Math.random() * 20}, 100%, 75%)`
          }}
        >
          <Heart size={heart.size} fill="currentColor" />
        </div>
      ))}

      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
        }
        .animate-float-up {
          animation: float-up 6s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
