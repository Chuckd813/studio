
'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';

interface SpinningWheelProps {
  segments: string[];
  onSpinComplete: (result: string) => void;
  primaryColor: string;
  accentColor: string;
  foregroundColor: string; // For text on segments and borders
  canvasSize?: number;
}

const SpinningWheel: React.FC<SpinningWheelProps> = ({
  segments,
  onSpinComplete,
  primaryColor,
  accentColor,
  foregroundColor,
  canvasSize = 300,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const animationFrameId = useRef<number | null>(null);

  const size = canvasSize;
  const segCount = segments.length;
  const anglePerSegment = segCount > 0 ? (2 * Math.PI) / segCount : 0;

  useEffect(() => {
    setIsMounted(true);
    return () => {
      // Cleanup animation frame on unmount
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const drawWheel = useCallback((rotation = 0) => {
    if (!isMounted || !canvasRef.current || segCount === 0) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.rotate(rotation);

    segments.forEach((text, i) => {
      const startAngle = i * anglePerSegment;
      const endAngle = startAngle + anglePerSegment;

      // Segment slice
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, size / 2 - 2, startAngle, endAngle); // -2 for a small gap for border
      ctx.fillStyle = i % 2 === 0 ? primaryColor : accentColor;
      ctx.fill();
      
      // Segment border
      ctx.strokeStyle = foregroundColor; 
      ctx.lineWidth = 0.5; // Thin border
      ctx.stroke();

      // Text
      ctx.save();
      ctx.rotate(startAngle + anglePerSegment / 2);
      // Adjust text distance based on canvas size, ensure it's within the segment
      const textRadius = size / 2 * 0.65; 
      ctx.translate(textRadius, 0);
      ctx.rotate(Math.PI / 2); // Rotate text to be upright
      ctx.fillStyle = foregroundColor;
      // Scale font size based on canvas size and segment width
      const maxTextWidth = anglePerSegment * textRadius * 0.8; // Approx arc length for text
      const fontSize = Math.min(size * 0.045, maxTextWidth / (text.length * 0.6)); // Dynamic font size
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 0, 0);
      ctx.restore();
    });

    ctx.restore();

    // Center "Spin" Button
    const centerButtonRadius = size * 0.12;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, centerButtonRadius, 0, 2 * Math.PI);
    ctx.fillStyle = primaryColor; // Use primary color for the button itself
    ctx.fill();
    ctx.strokeStyle = foregroundColor; // Border for the button
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = foregroundColor; // Text color on the button
    ctx.font = `bold ${size * 0.05}px sans-serif`; // Scaled font size
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Spin', size / 2, size / 2);

  }, [isMounted, segCount, anglePerSegment, segments, primaryColor, accentColor, foregroundColor, size]);

  useEffect(() => {
    if (isMounted && canvasRef.current && segCount > 0) {
      drawWheel(); // Initial draw
    }
  }, [isMounted, segCount, drawWheel, segments]); // Added segments to re-draw if they change


  const spinWheel = () => {
    if (isSpinning || !isMounted || segCount === 0) return;
    setIsSpinning(true);
    setResult(null);

    const baseSpins = 5; // Minimum number of full rotations
    const randomExtraSpins = Math.random() * 3; // Add some variability
    const totalSpins = baseSpins + randomExtraSpins;
    
    const winningSegmentIndex = Math.floor(Math.random() * segCount);
    
    // Calculate the angle to stop at the middle of the winning segment.
    // The "pointer" is assumed to be at the 3 o'clock position (0 radians in standard canvas orientation).
    // To make segment `winningSegmentIndex` land there, its middle point should rotate to 0.
    // Angle of middle of winning segment: `(winningSegmentIndex + 0.5) * anglePerSegment`
    // We need to rotate by an amount that makes this angle effectively 0 after `totalSpins`.
    // So, final rotation `R` should be `totalSpins * 2 * PI - (middle_angle_of_winning_segment)`
    // Or more simply, rotate so the START of the winning segment is at 0, then add half segment width.
    // Target angle = `2 * PI * totalSpins - (winningSegmentIndex * anglePerSegment + anglePerSegment / 2)`
    // To ensure it spins in the positive direction:
    let targetAngle = (totalSpins * 2 * Math.PI) - (winningSegmentIndex * anglePerSegment + (anglePerSegment / 2));
    // Ensure it's a positive rotation for consistency if formula gives negative for some reason (unlikely here)
    targetAngle = (targetAngle % (2*Math.PI) + 2*Math.PI) % (2*Math.PI) + (Math.floor(totalSpins) * 2 * Math.PI);


    const duration = 4000; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      // Ease-outQuint easing function: progress => 1 - pow(1 - progress, 5)
      const easedProgress = 1 - Math.pow(1 - progress, 5); 
      const currentAngle = easedProgress * targetAngle;

      drawWheel(currentAngle);

      if (progress < 1) {
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        drawWheel(targetAngle); // Ensure final position
        if (segments[winningSegmentIndex]) {
          setResult(segments[winningSegmentIndex]);
          onSpinComplete(segments[winningSegmentIndex]);
        } else {
            // Fallback, should not happen with correct logic
            const fallbackIndex = 0;
            setResult(segments[fallbackIndex]);
            onSpinComplete(segments[fallbackIndex]);
        }
        setIsSpinning(false);
        animationFrameId.current = null;
      }
    };
    animationFrameId.current = requestAnimationFrame(animate);
  };

  if (!isMounted || segCount === 0) {
    return (
      <div style={{ width: size, height: size, cursor: 'default' }} className="flex items-center justify-center border rounded-lg bg-muted text-muted-foreground">
        Loading Wheel...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        onClick={spinWheel}
        style={{ cursor: isSpinning ? 'default' : 'pointer', touchAction: 'pan-y' }} // Allow vertical scroll on touch
        role="button"
        tabIndex={0}
        aria-label="Spin the wheel"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); spinWheel(); }}}
      />
      <div className="mt-4 text-lg sm:text-xl font-bold text-primary min-h-[2em]"> {/* Min height to prevent layout shift */}
        {result ? `🎉 You got: ${result}!` : (isSpinning ? "Spinning..." : "Click wheel to spin!")}
      </div>
    </div>
  );
};

export default SpinningWheel;
