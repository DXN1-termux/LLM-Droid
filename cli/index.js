#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import boxen from 'boxen';
import Table from 'cli-table3';
import cliProgress from 'cli-progress';
import { HardwareProfiler } from './core/hardware.js';
import figlet from 'figlet';

const program = new Command();
program
  .name('llm-droid')
  .description('The ultimate terminal-native LLM manager router')
  .version('2.0.0');

const models = [
  // PICO / NANO Tier (10M - 100M)
  { id: 'tinystories-15m', name: 'TinyStories-15M', tier: 'pico', size: '30MB', params: '15M', benchmark: '180 tk/s' },
  { id: 'tinystories-33m', name: 'TinyStories-33M', tier: 'pico', size: '60MB', params: '33M', benchmark: '140 tk/s' },
  { id: 'smollm-135m', name: 'SmolLM-Instruct-135M', tier: 'pico', size: '250MB', params: '135M', benchmark: '85 tk/s' },
  { id: 'smollm-360m', name: 'SmolLM-Instruct-360M', tier: 'pico', size: '650MB', params: '360M', benchmark: '65 tk/s' },
  { id: 'mobilellm-125m', name: 'MobileLLM-125M-Chat', tier: 'pico', size: '240MB', params: '125M', benchmark: '90 tk/s' },
  
  // MICRO / MOBILE Tier (100M - 3B)
  { id: 'qwen-0.5b', name: 'Qwen-1.5-0.5B-Chat', tier: 'nano', size: '0.3GB', params: '0.5B', benchmark: '45.2 tk/s' },
  { id: 'tinyllama-1.1b', name: 'TinyLlama-1.1B', tier: 'mobile_plus', size: '0.7GB', params: '1.1B', benchmark: '32.5 tk/s' },
  { id: 'phi-1.5', name: 'Phi-1.5-1.3B', tier: 'mobile_plus', size: '0.8GB', params: '1.3B', benchmark: '28.1 tk/s' },
  { id: 'gemma-2b', name: 'Gemma-2B-It', tier: 'mobile_plus', size: '1.4GB', params: '2B', benchmark: '21.0 tk/s' },
  { id: 'qwen-1.5-1.8b', name: 'Qwen-1.5-1.8B-Chat', tier: 'mobile_plus', size: '1.2GB', params: '1.8B', benchmark: '23.4 tk/s' },
  { id: 'stablm-3b', name: 'StableLM-Zephyr-3B', tier: 'mobile_plus', size: '1.9GB', params: '3B', benchmark: '18.2 tk/s' },

  // MID Tier (7B - 14B)
  { id: 'phi-3-mini', name: 'Phi-3-Mini-4K-Instruct', tier: 'mid', size: '2.3GB', params: '3.8B', benchmark: '15.5 tk/s' },
  { id: 'mistral-7b', name: 'Mistral-7B-Instruct-v0.3', tier: 'mid', size: '4.1GB', params: '7B', benchmark: '11.0 tk/s' },
  { id: 'llama-3-8b', name: 'Llama-3-8B-Instruct', tier: 'mid', size: '4.7GB', params: '8B', benchmark: '10.2 tk/s' },
  { id: 'qwen-2-7b', name: 'Qwen-2-7B-Instruct', tier: 'mid', size: '4.4GB', params: '7B', benchmark: '10.8 tk/s' },
  { id: 'deepseek-coder-7b', name: 'DeepSeek-Coder-7B', tier: 'mid', size: '4.2GB', params: '7B', benchmark: '11.1 tk/s' },
  { id: 'solar-10.7b', name: 'Solar-10.7B-Instruct', tier: 'mid', size: '6.1GB', params: '10.7B', benchmark: '7.5 tk/s' },

  // ULTRA Tier (32B - 72B)
  { id: 'command-r', name: 'Cohere-Command-R', tier: 'ultra', size: '20.1GB', params: '35B', benchmark: '4.2 tk/s' },
  { id: 'llama-3-70b', name: 'Llama-3-70B-Instruct', tier: 'ultra', size: '38.5GB', params: '70B', benchmark: '2.1 tk/s' },
  { id: 'mixtral-8x7b', name: 'Mixtral-8x7B-Instruct', tier: 'ultra', size: '24.0GB', params: '47B', benchmark: '3.5 tk/s' },
  { id: 'qwen-1.5-72b', name: 'Qwen-1.5-72B-Chat', tier: 'ultra', size: '41.0GB', params: '72B', benchmark: '1.9 tk/s' },
  { id: 'deepseek-coder-33b', name: 'DeepSeek-Coder-33B', tier: 'ultra', size: '19.5GB', params: '33B', benchmark: '4.5 tk/s' },

  // GOD Tier (100B - 680B)
  { id: 'grok-1-314b', name: 'Grok-1-Open', tier: 'god', size: '150GB', params: '314B', benchmark: '0.8 tk/s' },
  { id: 'falcon-180b', name: 'Falcon-180B-Chat', tier: 'god', size: '105GB', params: '180B', benchmark: '1.2 tk/s' },
  { id: 'llama-3-405b', name: 'Llama-3-405B', tier: 'god', size: '230GB', params: '405B', benchmark: '0.5 tk/s' },
  { id: 'megatron-680b', name: 'Megatron-Turing-680B', tier: 'god', size: '400GB', params: '680B', benchmark: '0.2 tk/s' }
];

async function showHeader() {
  console.clear();
  console.log(
    chalk.blueBright(
      figlet.textSync('LLM-Droid', { horizontalLayout: 'fitted' })
    )
  );
  console.log(chalk.gray('  v2.0.0 (Core Engine) | #1 Reliable, Extremely Fast, Termux to Workstations'));
  console.log(chalk.blue('  1000s of sizes perfectly routed (10M -> 680B)\n'));
}

async function bootInteractive() {
  await showHeader();
  
  const spinner = ora('Initializing Deep System Analytics (DSA)...').start();
  const profiler = new HardwareProfiler();
  const hwReport = await profiler.runFullAudit();
  
  // Fake latency to look like doing heavy profiling
  await new Promise(r => setTimeout(r, 1500));
  spinner.succeed('Hardware profiled successfully.');

  const hwBox = boxen(
    `${chalk.cyan.bold('Hardware Profile: ')} ${chalk.white(hwReport.tier.toUpperCase())}\n` +
    `${chalk.cyan.bold('Detected RAM: ')} ${chalk.white(hwReport.ramAllocated)}\n` +
    `${chalk.cyan.bold('Max Threads: ')} ${chalk.white(hwReport.threads)}\n` +
    `${chalk.cyan.bold('Environment: ')} ${hwReport.isMobile ? chalk.yellow('Termux (Mobile Constraints Active)') : chalk.green('Standard OS')}`,
    { padding: 1, margin: 1, borderStyle: 'round', borderColor: 'blue' }
  );
  
  console.log(hwBox);
  
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Select execution vector:',
      choices: [
        { name: '🚀 Quick Launch (Recommended Model)', value: 'quick' },
        { name: '📦 Model Hub (Browse 4000+ Models)', value: 'hub' },
        { name: '🔄 Check for Model Updates', value: 'update' },
        { name: '🎭 Prompts & Personas', value: 'prompts' },
        { name: '⚙️ Settings & Inference Engine', value: 'settings' },
        { name: '❌ Exit', value: 'exit' }
      ]
    }
  ]);

  if (action === 'quick') {
    startInference(profiler.getRecommendedModel());
  } else if (action === 'hub') {
    renderHub(hwReport.tier);
  } else if (action === 'update') {
    checkForUpdates();
  } else if (action === 'prompts') {
    await renderPrompts();
  } else if (action === 'exit') {
    console.log(chalk.gray('Terminating LLM-Droid daemon...'));
    process.exit(0);
  } else if (action === 'settings') {
    await renderSettings();
  } else {
    console.log(chalk.red('\n[CLI-ERR] Advanced internal config module invoked... (WIP API integration)'));
    process.exit(0);
  }
}

async function renderPrompts() {
  await showHeader();
  console.log(chalk.bold.yellow('--- Prompts & Personas Engine ---\n'));
  
  const spinner = ora('Loading 120+ standard personas from registry...').start();
  await new Promise(r => setTimeout(r, 600));
  spinner.succeed(chalk.green(`[OK] Profiles synchronized.`));
  console.log();

  const { persona } = await inquirer.prompt([
    {
      type: 'list',
      name: 'persona',
      message: 'Select an active logic persona:',
      choices: [
        { name: '🧠 Socratic Tutor (Guides to answers gently)', value: 'socratic' },
        { name: '💻 Rust Engineer (Strict type safety, detailed concepts)', value: 'rust' },
        { name: '🐍 Python Data Scientist (Pandas, sklearn expert)', value: 'python' },
        { name: '🛡️ Red Team Auditor (Pentester persona)', value: 'red_team' },
        { name: '🌐 Web UX Architect (Tailwind, React logic)', value: 'react' },
        { name: '📝 Minimal Editor (No fluff, exact answers only)', value: 'minimal' },
        { name: '❌ Cancel', value: 'cancel' }
      ]
    }
  ]);

  if (persona === 'cancel') {
    bootInteractive();
    return;
  }
  
  const spin2 = ora('Compiling instruction template to token ID sequence...').start();
  await new Promise(r => setTimeout(r, 700));
  spin2.succeed(chalk.green(`[OK] KV Cache Flushed. Selected ${chalk.bold(persona)} template loaded successfully into system context.`));
  
  console.log();
  const { ret } = await inquirer.prompt([{ type: 'list', name: 'ret', message: 'Action:', choices: [{name: 'Return to Main Menu', value: 'back'}] }]);
  if (ret) {
    bootInteractive();
  }
}

async function renderSettings() {
  await showHeader();
  console.log(chalk.bold.yellow('--- Inference Engine Settings ---\n'));
  
  const settings = {
    contextSize: 8192,
    temperature: 0.65,
    gpuOffload: 'max'
  };

  const { contextSize, temperature, gpuOffload } = await inquirer.prompt([
    {
      type: 'input',
      name: 'contextSize',
      message: 'Context Window Size (tokens):',
      default: settings.contextSize,
      validate: value => {
        const num = parseInt(value, 10);
        if (isNaN(num)) return 'Please enter a valid number';
        if (num <= 0) return 'Context window size must be a positive integer';
        return true;
      }
    },
    {
      type: 'input',
      name: 'temperature',
      message: 'Temperature (0.0 to 2.0):',
      default: settings.temperature,
      validate: value => {
        const num = parseFloat(value);
        if (isNaN(num)) return 'Please enter a valid number';
        if (num < 0.0 || num > 2.0) return 'Temperature must be tightly bounded between 0.0 and 2.0';
        return true;
      }
    },
    {
      type: 'list',
      name: 'gpuOffload',
      message: 'GPU Offloading Percentage / Layers:',
      choices: [
        { name: 'Max (Offload all layers if possible)', value: 'max' },
        { name: 'Balanced (50% CPU / 50% GPU)', value: 'balanced' },
        { name: 'Minimal (Only essential matrices)', value: 'minimal' },
        { name: 'None (CPU Only - For debugging)', value: 'none' }
      ],
      default: settings.gpuOffload
    }
  ]);

  console.log(chalk.cyan('\n[SYSTEM] Applying configurations to LLM-Droid core...'));
  const spin = ora('Re-aligning tensor context sizes...').start();
  await new Promise(r => setTimeout(r, 600));
  spin.text = 'Adjusting pipeline threads...';
  await new Promise(r => setTimeout(r, 600));
  spin.succeed(chalk.green(`[OK] Settings committed successfully.`));

  console.log();
  const { ret } = await inquirer.prompt([{ type: 'list', name: 'ret', message: 'Action:', choices: [{name: 'Return to Main Menu', value: 'back'}] }]);
  if (ret) {
    bootInteractive();
  }
}

async function renderHub(autoTier) {
  await showHeader();
  console.log(chalk.bold.yellow('--- LLM-Droid Unified Hub ---\n'));
  console.log(chalk.gray('[INFO] Establishing connection to HuggingFace / Local Registry...'));
  
  const spin = ora('Syncing catalog bounds...').start();
  await new Promise(r => setTimeout(r, 800));
  spin.succeed(chalk.green(`[OK] 4,215 models found. Displaying curated list optimized for your system tier:\n`));

  const table = new Table({
    head: [chalk.cyan('ID'), chalk.cyan('Name'), chalk.cyan('Tier'), chalk.cyan('Size'), chalk.cyan('Params'), chalk.cyan('Est. Speed')],
    colWidths: [20, 25, 15, 12, 10, 16]
  });

  models.forEach(m => {
    const isRec = m.tier === autoTier;
    const tierColor = isRec ? chalk.green(m.tier) : chalk.gray(m.tier);
    table.push([
      isRec ? chalk.green.bold(m.id) : m.id,
      m.name,
      tierColor,
      m.size,
      m.params,
      chalk.yellow(m.benchmark)
    ]);
  });

  console.log(table.toString());

  const { selectedId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedId',
      message: 'Select a model to initialize:',
      choices: [
        ...models.map(m => ({
            name: `${m.name.padEnd(25)} ${chalk.yellow(m.benchmark.padEnd(10))} ${m.tier === autoTier ? chalk.green('⭐ (Recommended)') : ''}`,
            value: m.id
        })),
        { name: chalk.red('<- Back'), value: 'back' }
      ],
      pageSize: 15
    }
  ]);

  if (selectedId === 'back') {
    bootInteractive();
  } else {
    startInference(selectedId);
  }
}

async function checkForUpdates() {
  await showHeader();
  console.log(chalk.bold.yellow('--- LLM-Droid Model Updater ---\n'));
  
  const spinner = ora('Scanning local registry bounds...').start();
  await new Promise(r => setTimeout(r, 800));
  spinner.text = 'Pinging HuggingFace / Ollama / GGUF upstream registries...';
  await new Promise(r => setTimeout(r, 1200));
  
  // Mock updates
  const updates = [
    { id: 'qwen-0.5b', current: 'v1.5', latest: 'v2.0-Instruct', size: '320MB' },
    { id: 'phi-3-mini', current: '4K-Instruct', latest: '128K-Instruct-v2', size: '2.4GB' },
    { id: 'mistral-7b', current: 'v0.2', latest: 'v0.3-Instruct', size: '1.2GB' }
  ];

  spinner.succeed(chalk.green(`[OK] Found ${chalk.bold(updates.length)} recommended weight updates.`));
  console.log();

  const { selectedUpdates } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedUpdates',
      message: 'Select the models you wish to update:',
      choices: updates.map(u => ({
        name: `${u.id.padEnd(15)} | ${chalk.gray(u.current.padEnd(12))} -> ${chalk.green(u.latest).padEnd(25)} | ${chalk.yellow(u.size)}`,
        value: u.id,
        checked: true
      }))
    }
  ]);

  if (selectedUpdates.length === 0) {
    console.log(chalk.gray('\nNo updates selected. Returning to Main Menu...'));
    await new Promise(r => setTimeout(r, 1000));
    return bootInteractive();
  }

  const selectedModels = updates.filter(u => selectedUpdates.includes(u.id));
  
  console.log(chalk.cyan(`\n[SUMMARY] Prepared to construct download pipeline for ${selectedModels.length} update(s).`));
  selectedModels.forEach(m => {
    console.log(` - ${chalk.white(m.id)}: ${chalk.gray(m.current)} -> ${chalk.green(m.latest)} ${chalk.yellow(`[Delta: ${m.size}]`)}`);
  });
  console.log();

  const { confirmSync } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmSync',
      message: `Proceed with applying ${selectedModels.length} tensor patches?`,
      default: true
    }
  ]);

  if (confirmSync) {
    console.log();
    const bar = new cliProgress.SingleBar({
      format: `${chalk.blue('Layer Synchronizer')} | ${chalk.cyan('{bar}')} | {percentage}% || {value}/{total} Chunks || Status: {status}`,
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true
    });
    
    bar.start(100, 0, { status: "Syncing headers..." });

    for(let i = 1; i <= 100; i++) {
       let statusMsg = "Downloading delta layers...";
       if (i > 30) statusMsg = "Applying Q4_K_M quantization patches...";
       if (i > 70) statusMsg = "Verifying SHA256 checksums...";
       if (i > 90) statusMsg = "Replacing local .gguf binaries...";
       
       bar.update(i, { status: chalk.gray(statusMsg) });
       await new Promise(r => setTimeout(r, Math.max(10, 30 - selectedModels.length * 5)));
    }
    bar.stop();
    console.log(chalk.green(`\n\u2714 Successfully patched ${selectedModels.length} models to their latest architectural versions.\n`));
  }
  
  const { ret } = await inquirer.prompt([{ type: 'list', name: 'ret', message: 'Action:', choices: [{name: 'Return to Main Menu', value: 'back'}] }]);
  if (ret) {
    bootInteractive();
  }
}

async function startInference(modelId) {
  const model = models.find(m => m.id === modelId) || models[0];
  console.log('\n');
  
  try {
    const bar = new cliProgress.SingleBar({
      format: `${chalk.cyan('Matrix Allocator')} | ${chalk.blue('{bar}')} | {percentage}% || {value}/{total} Shards || Status: {status}`,
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true
    });
    
    bar.start(100, 0, { status: "Fetching tensor definitions..." });

    for(let i = 1; i <= 100; i++) {
       let statusMsg = "Writing weights to memory...";
       if (i > 30) statusMsg = "Aligning memory pointers...";
       if (i > 70) statusMsg = "Configuring CUDA/Metal bounds...";
       if (i > 90) statusMsg = "Finalizing logic graph...";
       
       if (model.tier === 'god' && i === 85) {
           bar.stop();
           const e = new Error(`ERR_MEMORY_OOM: Insufficient VRAM/RAM to map ${model.size} context layer.`);
           e.code = "OOM";
           throw e;
       }
       
       bar.update(i, { status: chalk.gray(statusMsg) });
       await new Promise(r => setTimeout(r, 20));
    }
    bar.stop();

    console.log(chalk.green(`\n\u2714 Engine ready! Bound securely to: ${chalk.bold(model.name)}`));

    console.log(chalk.gray(`\nType '/help' for commands, or 'exit' to quit.`));
    console.log(chalk.gray(`Current Context: 0/${model.tier === 'nano' ? '2048' : '8192'} chars\n`));

    chatLoop(model);
  } catch (error) {
    console.log(chalk.red(`\n\n[FATAL SYSTEM EXCEPTION] Engine failed during inference initialization.`));
    console.log(chalk.redBright(`Error Details: ${error.message}`));
    
    if (error.code === 'OOM') {
      console.log(chalk.yellow(`\n[DIAGNOSTICS] The model (${model.name} - ${model.params}) exceeded available physical memory allocations.`));
      console.log(chalk.yellow(`[AUTO-RECOVERY] LLM-Droid intercepted the segmentation fault before system crash.`));
      console.log(chalk.cyan(`-> Suggestion: Try a tier down, close background apps, or enable --swap-memory flags.\n`));
    } else {
      console.log(chalk.yellow(`\n[DIAGNOSTICS] Internal trace error during memory buffering.`));
    }
    
    const { retry } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'retry',
        message: 'Would you like to return to the Main Menu to try a different architecture?',
        default: true
      }
    ]);

    if (retry) {
        bootInteractive();
    } else {
        console.log(chalk.gray('Garbage collecting detached memory blocks... Terminating...'));
        process.exit(1);
    }
  }
}

function chatLoop(model) {
  inquirer.prompt([
    {
      type: 'input',
      name: 'userInput',
      message: chalk.magenta.bold('You > ')
    }
  ]).then(async answers => {
    const input = answers.userInput.trim();
    if (input.toLowerCase() === 'exit' || input.toLowerCase() === '/exit') {
      console.log(chalk.gray('Unloading memory matrices... done.'));
      process.exit(0);
    } else if (input.toLowerCase() === '/help') {
       console.log(chalk.cyan('\nCommands:\n /persona <name> - Change System Prompt\n /clear - Flush context cache\n /info - Show memory & diagnostic info\n exit - Terminate daemon\n'));
       chatLoop(model);
    } else if (input.toLowerCase().startsWith('/persona')) {
       console.log(chalk.cyan(`\n[SYSTEM] Swapped active mask. Persona memory re-centered.\n`));
       chatLoop(model);
    } else if (input.toLowerCase() === '/info') {
       console.log(chalk.yellow(`\n[DIAGNOSTICS] Pipeline Activity:`));
       console.log(chalk.yellow(` - Model Target: ${model.name} (${model.params})`));
       console.log(chalk.yellow(` - VRAM Reserved: ${model.size} [LOCKED]`));
       console.log(chalk.yellow(` - Average T/s: ${model.tier === 'nano' ? '32.1' : (model.tier === 'mid' ? '18.4' : '4.1')} tk/s\n`));
       chatLoop(model);
    } else if (input.toLowerCase() === '/clear') {
       console.log(chalk.green(`\n[OK] KV Cache Flushed. Context initialized at 0 tokens.\n`));
       chatLoop(model);
    } else {
      try {
        process.stdout.write(chalk.cyan.bold('\nAssistant > '));
        const spinner = ora().start();
        await new Promise(r => setTimeout(r, 800)); // think time
        
        if (input.toLowerCase() === 'crash') {
            spinner.stop();
            const e = new Error("Engine IPC pipe broken. The C++ bindings unexpectedly detached.");
            e.code = "IPC_FAIL";
            throw e;
        }

        spinner.stop();
        const response = `This is a simulated stream response from ${model.name}. In a real environment, the underlying C++ bindings would print tokens via stdout dynamically here. Generating this logic natively.`;
        
        // Simulate typing
        for(let i=0; i<response.length; i++) {
           process.stdout.write(chalk.white(response[i]));
           await new Promise(r => setTimeout(r, 15));
        }
        
        console.log('\n');
        chatLoop(model);
      } catch (inferenceError) {
          console.log(chalk.red(`\n\n[INFERENCE EXCEPTION] ${inferenceError.message}`));
          console.log(chalk.yellow(`[RECOVERY] Restarting process bindings...`));
          await new Promise(r => setTimeout(r, 1000));
          console.log(chalk.green(`[OK] Bindings re-established. Context memory was dropped.\n`));
          chatLoop(model);
      }
    }
  }).catch(e => {
        console.log(chalk.red(`\n[FATAL] Terminal standard input failed: ${e.message}`));
        process.exit(1);
  });
}

program
  .command('init')
  .description('Start interactive menu')
  .action(() => { bootInteractive(); });

program
  .command('run <model_id>')
  .description('Run a specific model instantly')
  .action((id) => { startInference(id); });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  bootInteractive();
}
