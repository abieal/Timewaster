import React, { useState, useEffect, useRef } from 'react';
import { LevelConfig } from '../../types/game';

interface PixelLevelProps {
  level: LevelConfig;
  onComplete: () => void;
}

const PixelLevel: React.FC<PixelLevelProps> = ({ level, onComplete }) => {
  const [found, setFound] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const [hint, setHint] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const [hiddenPixel, setHiddenPixel] = useState({ x: 0, y: 0 });

  // Generate random pixel position
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      setHiddenPixel({
        x: Math.floor(Math.random() * (rect.width - 20)) + 10,
        y: Math.floor(Math.random() * (rect.height - 20)) + 10
      });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container || found) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePos({ x, y });
    setAttempts(prev => prev + 1);

    // Check if mouse is near the hidden pixel
    const distance = Math.sqrt(
      Math.pow(x - hiddenPixel.x, 2) + Math.pow(y - hiddenPixel.y, 2)
    );

    // Console messages based on distance
    if (distance < 5) {
      setFound(true);
      console.log('Pixel found: "Finally! You found me hiding in plain sight!"');
      setTimeout(() => {
        onComplete();
      }, 1500);
    } else if (distance < 20) {
      setHint('🔥 BURNING HOT! You\'re practically touching it!');
      console.log('Pixel: "So close I can feel your cursor breathing on me!"');
    } else if (distance < 50) {
      setHint('🌡️ Very warm! You\'re getting closer!');
      console.log('Pixel: "Warmer... but not quite there yet."');
    } else if (distance < 100) {
      setHint('😐 Warm-ish. Keep looking around this area.');
      console.log('Pixel: "You\'re in the neighborhood, but wrong house."');
    } else if (distance < 200) {
      setHint('🧊 Cold. Try a different area.');
      console.log('Pixel: "Brrr, you\'re getting colder!"');
    } else {
      setHint('❄️ Freezing! You\'re way off.');
      console.log('Pixel: "Is this your life now? Randomly moving your mouse?"');
    }

    // Sarcastic messages based on attempts
    if (attempts === 50) {
      console.log('System: "50 attempts and counting. Professional pixel hunter right here."');
    } else if (attempts === 100) {
      console.log('System: "100 attempts. The pixel is laughing at you."');
    } else if (attempts === 200) {
      console.log('System: "200 attempts. Maybe try a different career?"');
    }
  };

  const getSarcasticMessage = () => {
    if (found) {
      return "Congratulations! You found a single pixel. Your parents must be so proud.";
    }
    
    if (attempts === 0) {
      return "Move your mouse around to find the hidden pixel. It's somewhere in this area, mocking you.";
    }
    
    if (attempts < 20) {
      return "Keep searching! The pixel is enjoying watching you struggle.";
    } else if (attempts < 50) {
      return "Still looking? The pixel is getting bored of your incompetence.";
    } else if (attempts < 100) {
      return "This is taking a while. Maybe the pixel doesn't want to be found by you.";
    } else {
      return "At this point, the pixel feels bad for you. But not bad enough to reveal itself.";
    }
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="text-center space-y-4">
        <div className="text-4xl">🔍</div>
        <p className="text-xl text-gray-300">
          Find the Hidden Pixel
        </p>
        <p className="text-gray-400">
          Move your mouse around the area below. The pixel is 1x1 and changes color when you find it.
        </p>
      </div>

      {/* Stats */}
      <div className="flex justify-center space-x-8 text-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">{attempts}</div>
          <div className="text-gray-400">Attempts</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">
            {mousePos.x.toFixed(0)}, {mousePos.y.toFixed(0)}
          </div>
          <div className="text-gray-400">Mouse Position</div>
        </div>
      </div>

      {/* Hint */}
      {hint && (
        <div className="text-center">
          <p className="text-lg font-bold text-yellow-400">{hint}</p>
        </div>
      )}

      {/* Pixel Hunt Area */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative bg-gray-800 rounded-lg h-96 border-2 border-gray-600 cursor-crosshair overflow-hidden"
        style={{ 
          background: found 
            ? 'radial-gradient(circle at center, #10b981 0%, #1f2937 100%)'
            : 'linear-gradient(45deg, #1f2937 25%, #374151 25%, #374151 50%, #1f2937 50%, #1f2937 75%, #374151 75%)',
          backgroundSize: '20px 20px'
        }}
      >
        {/* Hidden Pixel */}
        <div
          className={`absolute w-1 h-1 transition-all duration-200 ${
            found ? 'bg-green-400 shadow-lg' : 'bg-red-500'
          }`}
          style={{
            left: hiddenPixel.x,
            top: hiddenPixel.y,
            boxShadow: found ? '0 0 10px #10b981' : 'none',
            transform: found ? 'scale(10)' : 'scale(1)'
          }}
        />
        
        {/* Mouse Trail Effect */}
        {!found && (
          <div
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-50 pointer-events-none"
            style={{
              left: mousePos.x - 4,
              top: mousePos.y - 4,
              transition: 'all 0.1s ease-out'
            }}
          />
        )}

        {/* Success Message */}
        {found && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-green-600 text-white px-6 py-3 rounded-lg text-xl font-bold animate-pulse">
              🎉 PIXEL FOUND! 🎉
            </div>
          </div>
        )}
      </div>

      {/* Sarcastic Commentary */}
      <div className="bg-gray-700 rounded-lg p-4 text-center">
        <p className="text-gray-300 italic">
          "{getSarcasticMessage()}"
        </p>
      </div>

      {/* Console Output */}
      <div className="bg-black rounded-lg p-4 font-mono text-sm max-h-32 overflow-y-auto">
        <div className="text-green-400">Console Output:</div>
        <div className="text-gray-300 mt-2">
          {attempts > 0 && (
            <div className="text-yellow-400">
              Mouse moved {attempts} times. Pixel remains elusive.
            </div>
          )}
          {found && (
            <div className="text-green-400">
              SUCCESS: Hidden pixel located at ({hiddenPixel.x}, {hiddenPixel.y})
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PixelLevel;