'use client'

import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleClick = () => {
    setIsButtonDisabled(true); // Disable the button
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 1000);
  };

  const Particle = ({finalX, finalY, direction, rotate, color = ""} : {finalX: number, finalY: number, rotate: number, direction: string, color?: string}) => {
    const startBg = direction === 'left' ? '100% 0%' : '200% 0%';
    const finalBg = direction === 'left' ? '200% 0%' : '100% 0%';

    return (
      <motion.div variants={{ rest: { x: 0, rotate: rotate, backgroundPosition: startBg }, tap: {rotate: rotate, x: [0, finalX, finalX, finalX], y: [0, finalY, finalY, finalY], backgroundPosition: [startBg, startBg, startBg, finalBg], transition: { duration: .3, delay: .15 } } }} animate={isButtonDisabled ? 'tap' : 'rest'} initial="rest" className={"particle rounded-[5px] absolute w-[8px] h-[3px] " + direction + " " + color}/>
    )
  }

  return (
    <>
    <div className="flex justify-center items-center h-screen">
      <motion.button onClick={handleClick} className="relative w-[18px] aspect-square" disabled={isButtonDisabled}  animate={isButtonDisabled ? 'tap' : 'rest'} variants={{rest: {scale: 1}, tap: {scale: [1, 1.5, 1], transition: {duration: .6}}}}>
      <img src="/images/heart.png" className='w-[18px] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10'/>
        <div className="absolute w-[8px] h-[3px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Particle finalX={-12} finalY={-12} direction="left" rotate={45}/>
          <Particle finalX={0} finalY={-16} direction="left" rotate={90} color="pink"/>
          <Particle finalX={12} finalY={-12} direction="right" rotate={-45} color="aqua"/>
          <Particle finalX={16} finalY={0} direction="right" rotate={0}/>
          <Particle finalX={12} finalY={12} direction="right" rotate={45} color="aqua"/>
          <Particle finalX={0} finalY={16} direction="right" rotate={90}/>
          <Particle finalX={-12} finalY={12} direction="left" rotate={-45}/>
          <Particle finalX={-16} finalY={0} direction="left" rotate={0} color="pink"/>
        </div>
        
      </motion.button>

    </div>
    </>
  );
}