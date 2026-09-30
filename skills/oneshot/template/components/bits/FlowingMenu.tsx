// @ts-nocheck — componente de React Bits (FlowingMenu) parcheado por One-Shoot
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

/*
 * Parche One-Shoot sobre FlowingMenu de React Bits:
 * - el marquee solo corre mientras el puntero está encima (antes: N tweens infinitos siempre activos);
 * - filas con número + texto + meta, y clases de texto configurables (sin tamaños en vh);
 * - en táctil no hay hover: la fila se ve completa y estática.
 */
interface MenuItemData {
  link: string;
  text: string;
  image: string;
  num?: string;
  meta?: string;
}

interface FlowingMenuProps {
  items?: MenuItemData[];
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
  textClassName?: string;
  rowClassName?: string;
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({
  items = [],
  speed = 15,
  textColor = '#fff',
  bgColor = 'transparent',
  marqueeBgColor = '#fff',
  marqueeTextColor = '#120F17',
  borderColor = '#fff',
  textClassName = '',
  rowClassName = ''
}) => {
  return (
    <div className="w-full overflow-hidden" style={{ backgroundColor: bgColor, borderBottom: `1px solid ${borderColor}` }}>
      <nav className="m-0 flex flex-col p-0">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            textClassName={textClassName}
            rowClassName={rowClassName}
          />
        ))}
      </nav>
    </div>
  );
};

const MenuItem = ({ link, text, image, num, meta, speed, textColor, marqueeBgColor, marqueeTextColor, borderColor, textClassName, rowClassName }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const [repetitions, setRepetitions] = useState(4);
  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  useEffect(() => {
    const calc = () => {
      const part = marqueeInnerRef.current?.querySelector('.marquee-part') as HTMLElement;
      if (!part || !part.offsetWidth) return;
      setRepetitions(Math.max(4, Math.ceil(window.innerWidth / part.offsetWidth) + 2));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [text, image]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const part = marqueeInnerRef.current?.querySelector('.marquee-part') as HTMLElement;
      if (!part || !part.offsetWidth) return;
      animationRef.current?.kill();
      animationRef.current = gsap.to(marqueeInnerRef.current, { x: -part.offsetWidth, duration: speed, ease: 'none', repeat: -1, paused: true });
    }, 50);
    return () => {
      clearTimeout(timer);
      animationRef.current?.kill();
    };
  }, [text, image, repetitions, speed]);

  const enter = (ev) => {
    if (ev.pointerType !== 'mouse' || !itemRef.current) return;
    const r = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - r.left, ev.clientY - r.top, r.width, r.height);
    animationRef.current?.play();
    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };
  const leave = (ev) => {
    if (ev.pointerType !== 'mouse' || !itemRef.current) return;
    const r = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - r.left, ev.clientY - r.top, r.width, r.height);
    gsap
      .timeline({ defaults: animationDefaults, onComplete: () => animationRef.current?.pause() })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  return (
    <div className="relative overflow-hidden" ref={itemRef} style={{ borderTop: `1px solid ${borderColor}` }}>
      <a className={`relative flex items-baseline gap-4 no-underline ${rowClassName}`} href={link} target="_blank" rel="noreferrer" onPointerEnter={enter} onPointerLeave={leave} style={{ color: textColor }}>
        {num && <span className="w-8 flex-none font-mono text-xs opacity-60">{num}</span>}
        <span className={`min-w-0 flex-1 ${textClassName}`}>{text}</span>
        {meta && <span className="hidden flex-none text-right text-sm opacity-70 sm:block">{meta}</span>}
      </a>
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full translate-y-[101%] overflow-hidden" ref={marqueeRef} style={{ backgroundColor: marqueeBgColor }} aria-hidden="true">
        <div className="flex h-full w-fit" ref={marqueeInnerRef}>
          {[...Array(repetitions)].map((_, idx) => (
            <div className="marquee-part flex flex-shrink-0 items-center" key={idx} style={{ color: marqueeTextColor }}>
              <span className={`whitespace-nowrap px-[1vw] leading-none ${textClassName}`}>{text}</span>
              <div className="mx-[2vw] h-[60%] w-[180px] rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlowingMenu;
