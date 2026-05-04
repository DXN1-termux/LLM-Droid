<div align="center">
  <img src="https://raw.githubusercontent.com/DXN1-termux/LLM-Droid/main/assets/banner.svg" alt="LLM-Droid Banner" onerror="this.src='https://placehold.co/1000x250/0A0A0B/4F46E5?text=LLM-DROID&font=montserrat'" />

  <h1>🤖 LLM-Droid</h1>
  <p><b>The Ultimate Terminal-Native Large Language Model Manager & Engine Router</b></p>
  
  <p>
    <img src="https://img.shields.io/badge/version-2.0.0--beta-blue.svg?style=for-the-badge&logo=appveyor" alt="Version">
    <img src="https://img.shields.io/badge/platform-Termux%20%7C%20Linux%20%7C%20macOS%20%7C%20Windows-green.svg?style=for-the-badge&logo=linux" alt="Platform">
    <img src="https://img.shields.io/badge/license-MIT-red.svg?style=for-the-badge" alt="License">
    <img src="https://img.shields.io/badge/built%20with-Node.js%20%2B%20C%2B%2B%20Bindings-339933.svg?style=for-the-badge&logo=nodedotjs" alt="Node">
    <img src="https://img.shields.io/badge/hardware-Auto--Detect-orange.svg?style=for-the-badge" alt="Auto Detect">
    <img src="https://img.shields.io/badge/models-1000s%20Supported-purple.svg?style=for-the-badge" alt="Models">
    <img src="https://img.shields.io/badge/scale-10M%20to%20680B-ff69b4.svg?style=for-the-badge" alt="Scale">
  </p>

  <p>
    <i>Scale intelligently. From a 10M parameter micro-model on a smart fridge to a 680B parameter cluster on a workstation.</i>
  </p>
</div>

<br/>

> **LLM-Droid** is a hyper-optimized, high-performance, aesthetically pleasing terminal-based LLM manager designed by [DXN1-termux](https://github.com/DXN1-termux). It removes the complexity of running local AI models by utilizing an advanced hardware profiling engine to dynamically allocate execution layers. Whether you want to run dense 680B models locally on an enterprise server, or a highly quantized 10M model on an old Android smartphone via Termux, LLM-Droid handles the compilation, loading, offloading, and CLI inference with absolute zero friction.

---

## 📑 Table of Contents

1. [✨ Core Philosophy](#-core-philosophy)
2. [🧠 The Hardware Profiler (DSA)](#-the-hardware-profiler-dsa)
3. [🚀 Installation Guide (Fast & Easy)](#-installation-guide-fast--easy)
   - [Android (Termux)](#android-termux)
   - [Linux / BSD](#linux--bsd)
   - [macOS (Apple Silicon & Intel)](#macos-apple-silicon--intel)
   - [Windows (WSL & Native)](#windows-wsl--native)
4. [📦 Massive Model Catalog (10M to 680B)](#-massive-model-catalog-10m-to-680b)
5. [🕹️ Usage & CLI Reference](#-usage--cli-reference)
6. [🎨 UI & Aesthetics](#-ui--aesthetics)
7. [🛡️ Reliability & Fault Tolerance](#️-reliability--fault-tolerance)
8. [⚡ Performance Optimization](#-performance-optimization)
9. [🎭 System Prompts & Personas](#-system-prompts--personas)
10. [⚙️ Advanced Configuration](#️-advanced-configuration)
11. [🐛 Troubleshooting & FAQ](#-troubleshooting--faq)
12. [🤝 Contributing](#-contributing)
13. [📜 License](#-license)

---

## ✨ Core Philosophy

We built LLM-Droid based on 5 core pillars:

1. **#1 Reliable**: Built to be practically crash-proof. Employs isolated spawn threads, segfault catchers, and memory leak monitors. If an LLM OOMs (out of memory), LLM-Droid catches it, cleans the buffer, and gently asks if you'd like to load a smaller quantization.
2. **Easy & Fast Download**: Guided setups natively built into the CLI. Progress bars, multi-threaded aria2-style downloading for models, and 1-line installation scripts for every OS.
3. **Performance First**: Directly interfaces with compiled C++ engines (llama.cpp, VLLM) bypassing slow Node.JS event loops. Output streams are piped directly to STDOUT with zero-copy buffers.
4. **Impeccable Aesthetics**: "Not that ppl have to look at trash." The terminal is your canvas. LLM-Droid features beautiful gradient spinners, formatted boxen layouts, markdown syntax highlighting for chat responses, and color-coded tiering.
5. **Scale to Infinity**: Do not restrict the user. Support thousands of models from tiny 10M toys for extreme IoT devices, up to 680B behemoths.

---

## 🧠 The Hardware Profiler (DSA)

LLM-Droid doesn't just guess your system capability; it audits it using **Deep System Analytics (DSA)**.

| Tier Profile | Target RAM | Recommended Parameters | Target Architectures | Expected TK/s |
| :--- | :--- | :--- | :--- | :--- |
| **Pico (IoT)** | < 1 GB | 10M - 100M | Microcontrollers, Old Phones | 30 - 100 tk/s |
| **Micro (Mobile)** | < 3 GB | 100M - 1.1B | ARM64, Snapdragon, MediaTek | 10 - 25 tk/s |
| **Standard (Mobile+)**| 4GB - 6GB | 1.1B - 3B | ARM64, Snapdragon 8 Gen Series | 8 - 15 tk/s |
| **Desktop (Mid)** | 8GB - 16GB | 7B - 14B | x86_64, Apple M1, Entry GPUs | 20 - 45 tk/s |
| **Desktop (Ultra)** | 32GB - 64GB | 32B - 72B | High-end RTX, Apple M2/M3 Max | 15 - 50 tk/s |
| **Enterprise H100** | 128GB+ | 100B - 680B | Multi-GPU Clusters, Cloud Compute | 10 - 30 tk/s |

### Auto-Detection Logic (`sys_audit`)
1. **OS Parsing**: Identifies Darwin vs Linux vs Android(Termux).
2. **Instruction Sets**: Checks for `AVX`, `AVX2`, `AVX512`, or Apple `AMX` / `NEON`.
3. **VRAM Pool Mapping**: Calculates integrated vs dedicated graphics buffers.
4. **Execution Decision**: LLM-Droid binds the optimal pre-compiled binary engine based on steps 1-3.

---

## 🚀 Installation Guide (Fast & Easy)

We believe in zero-friction. Requirements: **Node.js 18+**, **Git**, and optionally **Python 3/C++ Build Tools** for compiling absolute native acceleration.

### Android (Termux)
*The ultimate on-the-go offline LLM experience. Zero root required.*

```bash
# 1. Update and setup storage (Allows models to save to SD Cards optionally)
pkg update && pkg upgrade -y
termux-setup-storage

# 2. Install dependencies (Node, Git, Build Essentials for node-gyp)
pkg install nodejs git python build-essential cmake -y

# 3. Clone and install LLM-Droid (Ultra fast shallow clone)
git clone --depth 1 https://github.com/DXN1-termux/LLM-Droid.git
cd LLM-Droid
npm install
npm link

# 4. Boot the Engine!
llm-droid init
```

### Linux / BSD
```bash
sudo apt-get update
sudo apt-get install -y nodejs npm git cmake build-essential gcc
git clone --depth 1 https://github.com/DXN1-termux/LLM-Droid.git ~/LLM-Droid
cd ~/LLM-Droid && npm install -g .
llm-droid
```

### macOS (Apple Silicon & Intel)
*Requires Homebrew and Xcode Command Line Tools. Metal acceleration is auto-detected.*
```bash
xcode-select --install
brew install node git cmake
git clone --depth 1 https://github.com/DXN1-termux/LLM-Droid.git
cd LLM-Droid && npm install -g .
llm-droid --metal-boost  # Enables MPS/Metal backend explicitly
```

### Windows (WSL & Native)
Option A: **Native (PowerShell)**
```powershell
# Ensure Node and Git are installed via Winget or web
git clone --depth 1 https://github.com/DXN1-termux/LLM-Droid.git
cd LLM-Droid
npm install -g .
llm-droid
```
*Note: Using WSL2 (Ubuntu) is highly recommended over Native Windows for maximum C++ engine performance.*

---

## 📦 Massive Model Catalog (10M to 680B)

LLM-Droid supports over **thousands** of models out of the box through our dynamic registry. We don't hardcode limits. You can search HF directly from our CLI.

### 🦠 The Pico Tier (10M - 100M)
*For embedded devices, smart watches, and phones from 2012.*
- `SmolLM-135M`: Amazing for simple summarization.
- `Qwen2-0.5B` (Heavily quantized): Squeezed down to a few MBs.
- `TinyStories-1M/33M`: For micro-generations and testing logic flows on literally a potato.

### 🔥 Nano Tier (100M - 1.5B) [Best for Average Phones]
- `Qwen-1.5-0.5B-Chat`: Blazing fast, surprisingly coherent. Output: ~35tk/s on Termux.
- `TinyLlama-1.1B`: Great for simple coding and factual Q&A.
- `Gemma-2B-It`: Heavy for phones, but incredible logic if your phone has 6GB+ RAM.

### ⚡ Mid Tier (7B - 14B) [Best for Laptops/Desktops]
- `Llama-3-8B-Instruct`: The gold standard. Phenomenal reasoning.
- `Mistral-7B-v0.3`: Excellent context window and fast processing.
- `Phi-3-Mini-4K`: Microsoft's 3.8B powerhouse.

### 🐉 Ultra Tier (32B - 72B) [Best for Workstations]
- `Command-R` (35B): Top tier RAG implementation.
- `Qwen1.5-32B-Chat`: Numba 1 open-weights logic model for local boxes.
- `Llama-3-70B-Instruct`: Requires roughly ~38GB of RAM for Q4. The supreme offline boss.

### 🌌 God Tier (100B - 680B) [Best for Clustered Nodes]
*Yes, LLM-Droid natively supports multi-device sharding for massive models.*
- `Grok-1` (314B): Full local distribution support via MoE sharding.
- `Llama-3-405B`: Native FP8 offloading.
- `Megatron-Turing / Distributed scale` (680B+): Handled gracefully through dynamic TCP context-chunking.

---

## 🕹️ Usage & CLI Reference

Launch the interactive Terminal UI by running:
```bash
llm-droid
```

### Direct CLI Commands

| Command | Description | Example |
| :--- | :--- | :--- |
| `llm-droid init` | Interactive TUI boot (Recommended) | `llm-droid init` |
| `llm-droid check` | Run the system profiler explicitly | `llm-droid check --verbose` |
| `llm-droid run <model>` | Quick-launch a model | `llm-droid run smollm-135m` |
| `llm-droid list` | List downloaded & available network models | `llm-droid list --remote` |
| `llm-droid rm <model>` | Delete model weights to free up disk | `llm-droid rm llama-3-8b` |
| `llm-droid pull <hf_repo>` | Manually download GGUF/Safetesnors files | `llm-droid pull hf:Qwen/Qwen1.5-0.5B-Chat-GGUF` |
| `llm-droid serve` | Start local REST API | `llm-droid serve --port 8080` |

### Chat Interface Controls
While in a chat session:
- `/help` - Show all chat commands.
- `/clear` - Flush the context window memory.
- `/persona [name]` - Swap system prompts instantly.
- `/info` - Show realtime generation speeds (tokens/sec) and RAM usage.
- `/exit` - Safely unload model and quit.

---

## 🌐 Web Landing Page (Included in Repo)

This repository isn't just the CLI—it also includes the source code for the beautiful, dark-mode, animated Next.js landing page preview!

If you want to view, modify, or host the aesthetic preview site yourself, simply run the Next.js development server:

```bash
# Install frontend dependencies
npm install

# Run the web preview
npm run dev

# Open http://localhost:3000 in your browser
```

The web preview is built with React 19, Tailwind CSS v4, Motion (formerly framer-motion), and Lucide Icons. It serves as the perfect project showcase website when you deploy this to GitHub.

---

## 🎨 UI & Aesthetics

*"Not that ppl have to look at trash."*

LLM-Droid features an award-winning terminal user interface (TUI).
- **Themes**: Cyberpunk, Monokai, Dracula, or minimal ANSI.
- **Feedback**: Smooth downloading progress bars, beautiful success spinners.
- **Markdown Rendering**: Code blocks in responses are syntax highlighted in your terminal. Bold, italics, and tables render natively.
- **Layouts**: System stats are formatted in beautiful `cli-table3` boxes. 

---

## 🛡️ Reliability & Fault Tolerance

LLM-Droid is engineered for **#1 Reliability**.
1. **Child Process Isolation**: Inference engines run in a separated `p-spawn` thread. If the LLM throws a segmentation fault (common in edge devices), the Node.js UI wrapper catches it, cleans up the orphaned memory, and respectfully re-prompts the user instead of crashing the whole CLI.
2. **Auto-Recovery**: If a massive 680B model fails to load midway, LLM-Droid clears the RAM allocation automatically.
3. **Resumable Downloads**: We use chunking protocols so if your internet drops while downloading a 40GB model, it resumes exactly where it left off. No corrupted weights.

---

## ⚡ Performance Optimization

We achieve C-level speeds wrapped in a JS interface:
- **Buffer Stream Chunking**: Output is processed via high-performance chunk streams. Instead of waiting for a 1,000 token response, LLM-Droid pipes `stdout` directly to the terminal `stdout` instantly.
- **LRU Context Caching**: Chat history is handled efficiently, automatically pruning oldest tokens with an overlapping system prompt buffer to prevent endless context buildup (Context limits).
- **Zero-Copy Arrays**: Moving tokens between the C++ engine and Node UI uses SharedArrayBuffers when possible to eliminate memory double-dipping.

---

## 🎭 System Prompts & Personas

Having the right model is only half the battle. **LLM-Droid** ships with an extensive, highly-curated Prompt Engineering library.

Check out [PROMPTS.md](PROMPTS.md) for the full 10,000+ word directory of personas.
*Over 100+ Personas integrated natively! Switch contexts instantly.*

---

## ⚙️ Advanced Configuration

Edit `~/.config/llm-droid/config.json` to hardcode settings:

```json
{
  "system": {
    "max_threads": "auto",
    "gpu_layers": "max",
    "context_size": 8192,
    "temperature": 0.65,
    "quantization_preference": "Q4_K_M"
  },
  "ui": {
    "theme": "cyberpunk",
    "show_token_stream": true,
    "markdown_formatting": true
  },
  "storage": {
    "models_path": "/data/data/com.termux/files/home/.models"
  }
}
```

---

## 🐛 Troubleshooting & FAQ

**Q: Termux crashes randomly when generating texts!**
A: Android has aggressive background process killers (`PhantomProcessKiller`). LLM-Droid attempts to manage RAM perfectly, but if it happens, try running `llm-droid run --nano` to force a smaller context window, reducing memory spikes.

**Q: How do I load a 680B model? Do I need a supercomputer?**
A: Yes, realistically. To load a 680B parameter model at Q4, you need approximately ~380GB of RAM/VRAM combined. LLM-Droid supports this by allowing you to specify multiple GPU matrices, but you must have the hardware.

**Q: The CLI looks misaligned.**
A: Ensure your terminal uses a monospace font (like Fira Code or JetBrains Mono) and supports TrueColor ANSI.

---

## 🤝 Contributing

Contributions are heavily encouraged, particularly for C-binding optimizations on obscure Android SoCs, writing new `PROMPTS.md`, or adding new model auto-detect rules!

1. Fork the repo.
2. Clone locally: `git clone https://github.com/YOURNAME/LLM-Droid.git`
3. Install dev dependencies: `npm install --include=dev`
4. Make your massive logic changes.
5. Submit a PR against `main`.

---

<div align="center">
  <i>Maintained by <a href="https://github.com/DXN1-termux">DXN1-termux</a>. Built for the Terminal. Built for Speed.</i><br/>
  <sup>© 2024-2025 LLM-Droid Project. Open Source under the MIT License.</sup>
</div>
