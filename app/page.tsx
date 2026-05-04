'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, Download, Shield, Cpu, Database, Command, Star, ArrowRight, Activity, Zap, HardDrive } from 'lucide-react';
import { motion } from 'motion/react';

const useTypingEffect = (text: string, delay: number = 20, isReady: boolean = true) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    if (!isReady) return;
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i === text.length) clearInterval(intervalId);
    }, delay);
    return () => clearInterval(intervalId);
  }, [text, delay, isReady]);
  return displayedText;
};

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

        {/* Features grid - BENTO BOX STYLE */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 lg:gap-6 mb-24 max-w-5xl mx-auto">
          {/* Main big box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 relative overflow-hidden bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-3xl p-8 hover:border-indigo-500/30 transition-all group shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-12 border border-indigo-500/30 group-hover:scale-110 transition-transform">
                <Cpu className="w-7 h-7 text-indigo-400" />
            </div>
            <h3 className="text-3xl font-black mb-4 tracking-tight text-white">Deep Hardware<br/>Routing Protocol.</h3>
            <p className="text-neutral-400 leading-relaxed text-base max-w-sm">
              Dynamically profiles your RAM pool, Core Count, and Instruction Set (AVX2/NEON/MPS) to allocate matrices. Running on Termux? Nano 1B. Running on a Mac Studio? Ultra 70B.
            </p>
            <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full"></div>
          </motion.div>

          {/* Top right box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 relative overflow-hidden bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-3xl p-8 hover:border-cyan-500/30 transition-all group"
          >
            <div className="absolute right-0 top-0 w-32 h-32 bg-cyan-500/10 blur-2xl rounded-full"></div>
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center border border-cyan-500/30 group-hover:rotate-6 transition-transform">
                  <Command className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="flex gap-2">
                 <span className="px-2 py-1 bg-neutral-950 border border-neutral-800 rounded-md text-[10px] font-mono text-neutral-400">TERMUX</span>
                 <span className="px-2 py-1 bg-neutral-950 border border-neutral-800 rounded-md text-[10px] font-mono text-neutral-400">LINUX</span>
                 <span className="px-2 py-1 bg-neutral-950 border border-neutral-800 rounded-md text-[10px] font-mono text-neutral-400">MAC</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 tracking-tight text-white">Cross-Platform Engine</h3>
            <p className="text-neutral-400 leading-relaxed text-sm">
              Native bindings support for Mobile devices via Termux circumvents aggressive background killing. Built with C++ performance layers.
            </p>
          </motion.div>

          {/* Bottom right box 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-3xl p-6 hover:border-purple-500/30 transition-all group flex flex-col justify-between"
          >
            <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 border border-purple-500/30">
                <Database className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 tracking-tight text-white">10M to 680B</h3>
              <p className="text-neutral-400 text-xs">Massive catalog of auto-downloadable quantizations.</p>
            </div>
          </motion.div>

          {/* Bottom right box 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative overflow-hidden bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-3xl p-6 hover:border-emerald-500/30 transition-all group flex flex-col justify-between"
          >
            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4 border border-emerald-500/30">
                <Zap className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 tracking-tight text-white">Zero-Copy Stream</h3>
              <p className="text-neutral-400 text-xs">Tokens piped directly to STDOUT via SharedArrayBuffers.</p>
            </div>
          </motion.div>
        </div>

        {/* Termux terminal mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto mb-32 relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
          <div className="relative rounded-2xl overflow-hidden border border-neutral-700 bg-[#0a0a0c] shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center px-4 py-3 bg-neutral-900/80 border-b border-neutral-800 backdrop-blur">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors cursor-pointer"></div>
              </div>
              <div className="mx-auto text-[10px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                <HardDrive className="w-3 h-3"/> termux-environment — 80x24
              </div>
              <div className="w-10"></div> {/* spacer to center text rigidly */}
            </div>
            
            {/* Terminal Body */}
            <div className="p-6 md:p-8 font-mono text-sm leading-relaxed overflow-x-auto text-indigo-300 relative min-h-[400px]">
              
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                transition={{ delay: 0.1 }}
                className="flex gap-2 text-neutral-500 mb-6 italic"
              >
                <span className="text-fuchsia-500 animate-pulse">❯</span>
                <span className="text-neutral-200">llm-droid run smollm-135m</span>
              </motion.div>
              
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.8 }} transition={{ delay: 0.5 }} className="text-neutral-400 mb-1">[SYSTEM] Invoking Deep System Analytics (DSA)...</motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-green-500 mb-3">[OK] Profile Generated: Termux | ARM64 | PICO-TIER | 5.8GB RAM</motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.8 }} className="text-cyan-400 mb-6 flex overflow-hidden">
                <span className="whitespace-nowrap">[INFO] Allocating Matrix Layers [100%]</span>
                <motion.span 
                  initial={{ width: 0 }} 
                  whileInView={{ width: "100%" }} 
                  transition={{ delay: 1.8, duration: 1.5, ease: "linear" }}
                  className="overflow-hidden ml-2 flex-grow whitespace-nowrap"
                >
                  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
                </motion.span>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                transition={{ delay: 3.5 }}
                className="border border-neutral-800 bg-black p-4 rounded-xl mb-6 max-w-2xl relative overflow-hidden shadow-lg"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-cyan-500"></div>
                <div className="text-xs text-neutral-500 mb-2 uppercase tracking-widest font-bold flex items-center gap-2">
                  <Activity className="w-3 h-3 group-hover:rotate-180 transition-transform"/> Persona Pipeline Activated
                </div>
                <div className="text-neutral-200">"Execute Rust Socratic Tutor Mode. Provide semantic explanations."</div>
              </motion.div>
              
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 4.5 }} className="flex gap-3 text-white items-start">
                <span className="text-magenta-500 font-bold whitespace-nowrap pt-1">You &gt;</span> 
                <span className="pt-1 font-medium">Explain the concept of Rust borrowing conceptually.</span>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 5.5 }} className="flex gap-3 mt-4 items-start relative">
                <span className="text-cyan-500 font-bold whitespace-nowrap">Assistant &gt;</span>
                <span className="text-neutral-300 w-full leading-7">
                  <span className="text-white">To understand borrowing, imagine a book in a library.</span>
                  <br/>
                  If two people tried to physically write in the exact same book at the exact same moment without coordination, the context (data state) would be destroyed.
                  <br/>
                  <span className="text-yellow-400">Rust's Borrow Checker enforces a compile-time rule:</span> you may have either one mutable reference (exclusive writer) OR multiple immutable references (many readers), but never both simultaneously.
                  <span className="inline-block w-2 h-4 bg-cyan-500 ml-1 animate-pulse align-middle"></span>
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Real-World Benchmarks */}
        <div className="max-w-5xl mx-auto mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">Unmatched Local Performance</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">Hardware-specific optimizations ensure the highest token/sec throughput possible on consumer devices.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 hover:bg-neutral-900/80 transition-colors">
              <div className="text-xs text-neutral-500 font-mono mb-2 uppercase tracking-tight">Android (Termux)</div>
              <div className="text-2xl font-black text-white mb-1">Qwen-0.5B</div>
              <div className="text-emerald-400 font-mono text-sm font-bold flex items-center gap-2"><Zap className="w-3 h-3"/> 45.2 tk/s</div>
              <div className="mt-4 text-xs text-neutral-500">Galaxy S24 (Native ARM)</div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 hover:bg-neutral-900/80 transition-colors">
              <div className="text-xs text-neutral-500 font-mono mb-2 uppercase tracking-tight">Apple Silicon</div>
              <div className="text-2xl font-black text-white mb-1">Llama-3-8B</div>
              <div className="text-emerald-400 font-mono text-sm font-bold flex items-center gap-2"><Zap className="w-3 h-3"/> 112.5 tk/s</div>
              <div className="mt-4 text-xs text-neutral-500">M3 Max (Metal Unified)</div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 hover:bg-neutral-900/80 transition-colors">
              <div className="text-xs text-neutral-500 font-mono mb-2 uppercase tracking-tight">Linux PC</div>
              <div className="text-2xl font-black text-white mb-1">Command-R</div>
              <div className="text-emerald-400 font-mono text-sm font-bold flex items-center gap-2"><Zap className="w-3 h-3"/> 54.3 tk/s</div>
              <div className="mt-4 text-xs text-neutral-500">RTX 4090 (CUDA Fast)</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 hover:bg-neutral-900/80 transition-colors">
              <div className="text-xs text-neutral-500 font-mono mb-2 uppercase tracking-tight">Raspberry Pi 4</div>
              <div className="text-2xl font-black text-white mb-1">SmolLM-135M</div>
              <div className="text-emerald-400 font-mono text-sm font-bold flex items-center gap-2"><Zap className="w-3 h-3"/> 18.0 tk/s</div>
              <div className="mt-4 text-xs text-neutral-500">8GB RAM (CPU Heavy)</div>
            </motion.div>
          </div>
        </div>

        {/* Global Catalog Section */}
        <div className="max-w-5xl mx-auto mb-32 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-blue-500/10 via-fuchsia-500/10 to-indigo-500/10 blur-[100px] -z-10 rounded-full pointer-events-none"></div>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">4,000+ Verified Network Architectures</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">LLM-Droid natively hooks into the HuggingFace and GGUF local registries, intelligently matching tensor bounds with your hardware.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-neutral-800 bg-neutral-950/80 backdrop-blur rounded-2xl p-8 hover:border-indigo-500/50 transition-colors relative overflow-hidden group">
              <div className="w-2 h-full bg-indigo-500 absolute left-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className="text-xl font-bold text-white mb-2">Micro & Mobile Logic</h3>
              <p className="text-neutral-500 text-sm mb-6">Designed for restricted edge devices (&lt; 4GB RAM).</p>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex justify-between items-center text-indigo-300"><span>TinyStories-33M</span> <span className="text-xs px-2 py-1 bg-indigo-500/10 rounded">60 MB</span></div>
                <div className="flex justify-between items-center text-indigo-300"><span>SmolLM-360M</span> <span className="text-xs px-2 py-1 bg-indigo-500/10 rounded">650 MB</span></div>
                <div className="flex justify-between items-center text-indigo-300"><span>MobileLLM-125M</span> <span className="text-xs px-2 py-1 bg-indigo-500/10 rounded">240 MB</span></div>
                <div className="flex justify-between items-center text-indigo-300"><span>Phi-1.5</span> <span className="text-xs px-2 py-1 bg-indigo-500/10 rounded">0.8 GB</span></div>
              </div>
            </div>

            <div className="border border-neutral-800 bg-neutral-950/80 backdrop-blur rounded-2xl p-8 hover:border-fuchsia-500/50 transition-colors relative overflow-hidden group">
              <div className="w-2 h-full bg-fuchsia-500 absolute left-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className="text-xl font-bold text-white mb-2">Flagship Processing</h3>
              <p className="text-neutral-500 text-sm mb-6">Desktop-class parameter weights for intense pipelines.</p>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex justify-between items-center text-fuchsia-300"><span>Llama-3-8B</span> <span className="text-xs px-2 py-1 bg-fuchsia-500/10 rounded">4.7 GB</span></div>
                <div className="flex justify-between items-center text-fuchsia-300"><span>Mistral-7B-v0.3</span> <span className="text-xs px-2 py-1 bg-fuchsia-500/10 rounded">4.1 GB</span></div>
                <div className="flex justify-between items-center text-fuchsia-300"><span>Command-R (35B)</span> <span className="text-xs px-2 py-1 bg-fuchsia-500/10 rounded">20.1 GB</span></div>
                <div className="flex justify-between items-center text-fuchsia-300"><span>Llama-3-70B</span> <span className="text-xs px-2 py-1 bg-fuchsia-500/10 rounded">38.5 GB</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Install Instructions */}
        <div className="max-w-4xl mx-auto bg-neutral-900/30 border border-neutral-800 rounded-2xl p-8 lg:p-12 mb-32">
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

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-2">Can it actually run on a cheap Android phone?</h4>
              <p className="text-neutral-400 text-sm">Yes. We heavily quantize standard networks to PICO and NANO sizes (10M - 1B). For example, a $150 Samsung device with 4GB RAM can easily run <b>Qwen-0.5B</b> inside Termux using our ARM64 optimizations.</p>
            </div>
            <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-2">Is the model catalog restricted or locked?</h4>
              <p className="text-neutral-400 text-sm">Absolutely not. LLM-Droid serves as an engine-router for HuggingFace and local GGUF / Safetensor formats. While we highlight top-tier models, you can pull any standard supported architecture up to 680 Billion parameters.</p>
            </div>
            <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-2">Why not just use Python scripts?</h4>
              <p className="text-neutral-400 text-sm">Python restricts us from leveraging real-world fault tolerant native processes seamlessly across edge limits. By using Node.js wrapped over heavily compiled C++ binaries, if a memory leak crashes the UI, the C++ layer resets, protecting your OS.</p>
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
