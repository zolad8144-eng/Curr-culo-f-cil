import React from 'react';
import { ArrowRight } from 'lucide-react';
import africaAngolaMap from '../assets/images/africa_angola_map_1791672180102.jpg';

interface Props {
  onStart: () => void;
}

export const WelcomeSplash: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#ffffff] via-[#f7f8fa] to-[#eceff3] flex flex-col justify-between overflow-hidden select-none">
      {/* ================= TOP-LEFT GEOMETRIC ANGLED TECH LINES ================= */}
      <div className="absolute top-0 left-0 pointer-events-none z-10 w-48 sm:w-64 h-48 sm:h-64">
        <svg viewBox="0 0 240 240" className="w-full h-full fill-none">
          {/* Thick Red Outer Band */}
          <path
            d="M -10 35 L 75 35 L 140 100 L 140 175"
            stroke="#990014"
            strokeWidth="10"
            strokeLinecap="square"
          />
          {/* Black Middle Band */}
          <path
            d="M -10 55 L 65 55 L 120 110 L 120 185"
            stroke="#0a0a0c"
            strokeWidth="4"
          />
          {/* Gold Accent Band */}
          <path
            d="M -10 70 L 55 70 L 105 120 L 105 195"
            stroke="#d4af37"
            strokeWidth="2.5"
          />
          {/* Thin Red Inner Band */}
          <path
            d="M -10 85 L 45 85 L 90 130 L 90 205"
            stroke="#990014"
            strokeWidth="2"
          />
          {/* Diagonal cut wedge */}
          <polygon points="0,0 110,0 35,75 0,75" fill="#990014" opacity="0.9" />
          <polygon points="10,0 80,0 20,60 0,60" fill="#000000" />
        </svg>

        {/* 6-Dot Matrix */}
        <div className="absolute top-8 left-36 sm:left-40 grid grid-cols-3 gap-2 opacity-50">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-[#990014]" />
          ))}
        </div>
      </div>

      {/* ================= TOP-RIGHT DOT MATRIX ================= */}
      <div className="absolute top-8 right-6 sm:right-12 grid grid-cols-3 gap-2.5 opacity-40 pointer-events-none">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-[#990014]" />
        ))}
      </div>

      {/* ================= BOTTOM-RIGHT GEOMETRIC ANGLED TECH LINES ================= */}
      <div className="absolute bottom-0 right-0 pointer-events-none z-10 w-48 sm:w-64 h-48 sm:h-64">
        <svg viewBox="0 0 240 240" className="w-full h-full fill-none">
          {/* Thick Red Outer Band */}
          <path
            d="M 250 205 L 165 205 L 100 140 L 100 65"
            stroke="#990014"
            strokeWidth="10"
            strokeLinecap="square"
          />
          {/* Black Middle Band */}
          <path
            d="M 250 185 L 175 185 L 120 130 L 120 55"
            stroke="#0a0a0c"
            strokeWidth="4"
          />
          {/* Gold Accent Band */}
          <path
            d="M 250 170 L 185 170 L 135 120 L 135 45"
            stroke="#d4af37"
            strokeWidth="2.5"
          />
          {/* Thin Red Inner Band */}
          <path
            d="M 250 155 L 195 155 L 150 110 L 150 35"
            stroke="#990014"
            strokeWidth="2"
          />
          {/* Diagonal cut wedge */}
          <polygon points="240,240 130,240 205,165 240,165" fill="#990014" opacity="0.9" />
          <polygon points="230,240 160,240 220,180 240,180" fill="#000000" />
        </svg>

        {/* 6-Dot Matrix */}
        <div className="absolute bottom-12 right-36 sm:right-40 grid grid-cols-3 gap-2 opacity-50">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-[#990014]" />
          ))}
        </div>
      </div>

      {/* ================= BOTTOM-LEFT DOT MATRIX ================= */}
      <div className="absolute bottom-8 left-6 sm:left-12 grid grid-cols-3 gap-2.5 opacity-40 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-[#990014]" />
        ))}
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-between px-4 pt-8 pb-6 max-w-lg mx-auto w-full">
        {/* TOP TITLE: 3D "CVF" & "CURRÍCULO VITAE FÁCIL EM ANGOLA" */}
        <div className="text-center pt-2 sm:pt-4">
          {/* 3D "CVF" Letters with metallic gold bevel and wine red core */}
          <div className="inline-block relative">
            <h1
              className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none text-3d-gold select-none"
              style={{
                fontFamily: "'Space Grotesk', 'Plus Jakarta Sans', sans-serif",
                letterSpacing: '1px',
              }}
            >
              CVF
            </h1>
          </div>

          {/* Subtitle exact layout */}
          <div className="mt-2.5 sm:mt-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-wider uppercase">
              CURRÍCULO VITAE FÁCIL
            </h2>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="h-0.5 w-6 bg-[#990014]" />
              <p className="text-xs sm:text-sm font-black text-[#990014] tracking-widest uppercase">
                EM ANGOLA
              </p>
              <span className="h-0.5 w-6 bg-[#990014]" />
            </div>
          </div>
        </div>

        {/* CENTER: REALISTIC SERIOUS MAP OF AFRICA WITH ANGOLA IN AUTHENTIC COLORS */}
        <div className="relative my-2 w-full flex items-center justify-center">
          <div className="relative w-72 sm:w-84 max-w-[85vw] aspect-square flex items-center justify-center">
            <img
              src={africaAngolaMap}
              alt="Mapa de África com Angola em destaque"
              className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.12)] mix-blend-multiply"
            />
          </div>
        </div>

        {/* BOTTOM CARD: ONLY THE "CRIAR" BUTTON AS REQUESTED */}
        <div className="w-full relative mt-auto pt-2">
          {/* White floating card container matching screenshot */}
          <div className="relative bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xl">
            {/* The single, prominent "CRIAR" button */}
            <div className="relative">
              <button
                type="button"
                onClick={onStart}
                className="w-full relative z-20 py-4 px-6 rounded-2xl btn-wine-gold btn-pulse-glow flex items-center justify-center gap-3 font-black text-xl sm:text-2xl tracking-widest uppercase cursor-pointer"
              >
                <span className="text-[#fef08a] font-black">CRIAR</span>
                <ArrowRight className="w-6 h-6 text-[#fef08a] transition-transform duration-200 group-hover:translate-x-1.5" />
              </button>

              {/* Concentric Golden Radar / Beacon Pulse Ring on the right (identical to image!) */}
              <div className="absolute right-3 -bottom-2 z-30 pointer-events-none flex items-center justify-center w-14 h-14">
                <div className="absolute w-14 h-14 rounded-full border-2 border-amber-400/80 beacon-ring-1" />
                <div className="absolute w-14 h-14 rounded-full border-2 border-amber-300/60 beacon-ring-2" />
                <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 p-1 shadow-lg flex items-center justify-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#7a0010] shadow-inner" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
