'use client';

import React from 'react';
import { Terminal, Download, Shield, Cpu, Database, Command, Star, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-indigo-500/30">
      {/* Background Graphic */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-neutral-950 to-neutral-950"></div>
      
      {/* Navbar */}
      <nav className="border-b border-neutral-800/50 bg-neutral-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center">
                <Terminal className="text-white w-5 h-5" />
            </div>
            <span className="italic">LLM-DROID</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex gap-2">
              <div className="bg-neutral-800 border border-neutral-700 px-3 py-1 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-300">v2.0.0-Beta</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        {/* Header section */}
        <div className="text-center max-w-4xl mx-auto space-y-8 mb-24">
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white"
          >
            TERMINAL NATIVE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 italic">INTELLIGENCE.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-2xl mx-auto font-light"
          >
            A unified terminal manager for localized logic. Auto-detects hardware to deploy optimized weights from <strong className="text-white font-medium">10M</strong> on edge devices to <strong className="text-white font-medium">680B</strong> parameters on your workstation clusters.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button className="flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold uppercase tracking-tight hover:bg-neutral-200 transition-colors w-full sm:w-auto text-sm">
              <Download className="w-4 h-4" />
              Download Repository ZIP
            </button>
            <a href="https://github.com/DXN1-termux/LLM-Droid" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-8 py-4 rounded-full bg-neutral-900 border border-neutral-800 text-white font-bold uppercase tracking-tight hover:bg-neutral-800 transition-colors w-full sm:w-auto text-sm">
              <Star className="w-4 h-4 text-indigo-400" />
              Star on GitHub
            </a>
          </motion.div>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800/80 rounded-2xl p-8 hover:border-indigo-500/50 transition-colors group">
            <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 tracking-tight">Deep Hardware Scaling</h3>
            <p className="text-neutral-400 leading-relaxed text-sm">
              Dynamically profiles RAM and architecture to allocate standard mobile logic matrices or heavy desktop GPU layers. 
            </p>
          </div>
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800/80 rounded-2xl p-8 hover:border-cyan-500/50 transition-colors group">
            <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Command className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 tracking-tight">Cross-Platform Engine</h3>
            <p className="text-neutral-400 leading-relaxed text-sm">
              Native bindings support for Android (Termux) specifically, circumventing Android background limits, + Linux, macOS, and Windows.
            </p>
          </div>
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800/80 rounded-2xl p-8 hover:border-purple-500/50 transition-colors group">
            <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Database className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 tracking-tight">Massive Model Catalog</h3>
            <p className="text-neutral-400 leading-relaxed text-sm">
              Supporting over 1000s of sizes natively. Instantly spin up models from 10M, 100M, 1B, 2B, all the way to clustered 680B enterprise models.
            </p>
          </div>
        </div>

        {/* Termux terminal mockup */}
        <div className="max-w-4xl mx-auto mb-24 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl blur opacity-20"></div>
          <div className="relative rounded-xl overflow-hidden border border-neutral-700 bg-black shadow-2xl">
            <div className="flex items-center px-4 py-3 bg-neutral-900 border-b border-neutral-800">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-neutral-700"></div>
                <div className="w-3 h-3 rounded-full bg-neutral-700"></div>
                <div className="w-3 h-3 rounded-full bg-neutral-700"></div>
              </div>
              <div className="mx-auto text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                llm-droid — termux — 80x24
              </div>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto text-indigo-300">
              <div className="flex gap-2 text-neutral-500 mb-4 italic">
                <span>$</span>
                <span className="text-neutral-200">llmd run qwen-0.5b</span>
              </div>
              <div className="text-neutral-400 mb-1">[SYSTEM] Initialize Deep System Analytics (DSA)...</div>
              <div className="text-green-500 mb-2">[OK] Found Termux (ARM64) | 5.8GB RAM</div>
              <div className="text-neutral-400 mb-4">[INFO] Loading quantized model (Q4_K_M)...</div>
              
              <div className="border border-neutral-800 bg-neutral-900/30 p-4 rounded mb-4">
                <div className="text-xs text-neutral-500 mb-2 uppercase tracking-tight">Prompt / Persona Engine</div>
                <div className="text-neutral-100">"Execute Socratic Tutor Mode..."</div>
              </div>
              
              <div className="flex gap-2 text-white">
                <span className="text-magenta-500 font-bold">You &gt;</span> Explain the concept of Rust borrowing.
              </div>
              <div className="flex gap-2 mt-2">
                <span className="text-cyan-500 font-bold">Assistant &gt;</span>
                <span className="text-neutral-300">To understand borrowing, what do you think would happen if two parts of a program tried to modify the exact same memory at the exact same time without knowing about each other?</span>
              </div>
              <div className="flex gap-2 animate-pulse mt-1">
                <div className="w-2 h-4 bg-indigo-500 mt-1"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Install Instructions */}
        <div className="max-w-4xl mx-auto bg-neutral-900/30 border border-neutral-800 rounded-2xl p-8 lg:p-12">
          <div className="md:flex gap-12 items-center">
            <div className="md:w-1/3 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">#1 Easiest Setup.</h2>
                <p className="text-neutral-400 text-sm mb-4">LLM-Droid utilizes ultra-fast shallow cloning. Designed for <strong>speed and absolute reliability</strong>.</p>
                <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-center gap-2 text-indigo-400"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div> Native Error Catching</div>
                    <div className="flex items-center gap-2 text-indigo-400"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div> Deep Hardware Auth</div>
                    <div className="flex items-center gap-2 text-indigo-400"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div> Zero-Copy Streaming</div>
                </div>
            </div>
            <div className="md:w-2/3">
                <div className="p-6 bg-black border border-neutral-800 rounded-xl relative group shadow-2xl">
                  <div className="absolute top-0 right-0 bg-neutral-800 text-[10px] px-3 py-1 rounded-bl-lg font-mono text-neutral-400">TERMUX SH</div>
                  <pre className="font-mono text-xs text-neutral-300 overflow-x-auto whitespace-pre-wrap mt-2">
                    <span className="text-green-400">pkg</span> update && <span className="text-green-400">pkg</span> upgrade -y{'\n'}
                    <span className="text-neutral-500"># Install native bindings build-tools</span>{'\n'}
                    <span className="text-green-400">pkg</span> install nodejs git python build-essential cmake -y{'\n'}
                    <span className="text-neutral-500"># Ultra-fast shallow clone</span>{'\n'}
                    <span className="text-indigo-400">git</span> clone --depth 1 https://github.com/DXN1-termux/LLM-Droid.git{'\n'}
                    <span className="text-blue-400">cd</span> LLM-Droid{'\n'}
                    <span className="text-green-400">npm</span> install{'\n'}
                    <span className="text-yellow-400">llm-droid</span> init
                  </pre>
                </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-neutral-900 bg-neutral-950 mt-20 pt-12 pb-24 text-center">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
            <div className="text-[10px] font-mono tracking-[0.3em] text-neutral-600 uppercase mb-4">
                Architected by DXN1-termux
            </div>
            <p className="text-neutral-500 text-sm mb-4 max-w-2xl">You can export this full project via the Export feature (top right) in Google AI Studio to download the exact Repo ZIP including the massive CLI source code and markdowns.</p>
            <div className="flex gap-6 text-xs text-neutral-400 uppercase tracking-widest font-mono mt-4">
                <span className="hover:text-white cursor-pointer transition-colors">Documentation</span>
                <span className="hover:text-white cursor-pointer transition-colors">Model Zoo</span>
                <span className="hover:text-white cursor-pointer transition-colors">Github</span>
            </div>
        </div>
      </footer>
    </div>
  );
}
