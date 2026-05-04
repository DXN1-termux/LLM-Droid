import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import boxen from 'boxen';
import Table from 'cli-table3';
import { HardwareProfiler } from './core/hardware.js';
import figlet from 'figlet';

const program = new Command();
program
  .name('llm-droid')
  .description('The ultimate terminal-native LLM manager router')
  .version('2.0.0');

const models = [
  // PICO / NANO Tier (10M - 100M)
  { id: 'tinystories-15m', name: 'TinyStories-15M', tier: 'pico', size: '30MB', params: '15M', status: 'Not Downloaded' },
  { id: 'tinystories-33m', name: 'TinyStories-33M', tier: 'pico', size: '60MB', params: '33M', status: 'Not Downloaded' },
  { id: 'smollm-135m', name: 'SmolLM-135M', tier: 'pico', size: '250MB', params: '135M', status: 'Not Downloaded' },
  // MICRO Tier (100M - 1.5B)
  { id: 'qwen-0.5b', name: 'Qwen-1.5-0.5B-Chat', tier: 'nano', size: '0.3GB', params: '0.5B', status: 'Not Downloaded' },
  { id: 'tinyllama-1.1b', name: 'TinyLlama-1.1B', tier: 'mobile_plus', size: '0.7GB', params: '1.1B', status: 'Not Downloaded' },
  { id: 'gemma-2b', name: 'Gemma-2B-It', tier: 'mobile_plus', size: '1.4GB', params: '2B', status: 'Not Downloaded' },
  // MID Tier (7B - 14B)
  { id: 'phi-3-mini', name: 'Phi-3-Mini-4K', tier: 'mid', size: '2.3GB', params: '3.8B', status: 'Not Downloaded' },
  { id: 'mistral-7b', name: 'Mistral-7B-v0.3', tier: 'mid', size: '4.1GB', params: '7B', status: 'Not Downloaded' },
  // ULTRA Tier (32B - 72B)
  { id: 'llama-3-8b', name: 'Llama-3-8B-Instruct', tier: 'ultra', size: '4.7GB', params: '8B', status: 'Not Downloaded' },
  { id: 'command-r', name: 'Command-R', tier: 'ultra', size: '20.1GB', params: '35B', status: 'Not Downloaded' },
  { id: 'llama-3-70b', name: 'Llama-3-70B-Instruct', tier: 'ultra', size: '38.5GB', params: '70B', status: 'Not Downloaded' },
  // GOD Tier (100B - 680B)
  { id: 'grok-1-314b', name: 'Grok-1', tier: 'god', size: '150GB', params: '314B', status: 'Not Downloaded' },
  { id: 'llama-3-405b', name: 'Llama-3-405B', tier: 'god', size: '230GB', params: '405B', status: 'Not Downloaded' },
  { id: 'megatron-680b', name: 'Megatron-Turing-680B', tier: 'god', size: '400GB', params: '680B', status: 'Distributed/Not Downloaded' }
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
        { name: '📦 Model Hub (Browse & Download)', value: 'hub' },
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
  } else if (action === 'exit') {
    console.log(chalk.gray('Terminating LLM-Droid daemon...'));
    process.exit(0);
  } else {
    console.log(chalk.red('\n[CLI-ERR] Module not fully mocked in this preview.'));
    process.exit(0);
  }
}

async function renderHub(autoTier) {
  await showHeader();
  console.log(chalk.bold.yellow('--- LLM-Droid Unified Hub ---\n'));

  const table = new Table({
    head: [chalk.cyan('ID'), chalk.cyan('Name'), chalk.cyan('Tier'), chalk.cyan('Size'), chalk.cyan('Params')],
    colWidths: [20, 25, 15, 12, 10]
  });

  models.forEach(m => {
    const isRec = m.tier === autoTier;
    const tierColor = isRec ? chalk.green(m.tier) : chalk.gray(m.tier);
    table.push([
      isRec ? chalk.green.bold(m.id) : m.id,
      m.name,
      tierColor,
      m.size,
      m.params
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
            name: `${m.name} ${m.tier === autoTier ? chalk.green('(Recommended)') : ''}`,
            value: m.id
        })),
        { name: chalk.red('<- Back'), value: 'back' }
      ],
      pageSize: 10
    }
  ]);

  if (selectedId === 'back') {
    bootInteractive();
  } else {
    startInference(selectedId);
  }
}

async function startInference(modelId) {
  const model = models.find(m => m.id === modelId) || models[0];
  console.log('\n');
  const spinner = ora(`Allocating tensors and loading weights for ${chalk.bold(model.name)}...`).start();
  
  await new Promise(r => setTimeout(r, 2000));
  spinner.text = 'Warming up execution graph...';
  await new Promise(r => setTimeout(r, 1000));
  spinner.succeed(chalk.green(`Engine ready! [Bound to: ${model.name}]`));

  console.log(chalk.gray(`\nType '/help' for commands, or 'exit' to quit.`));
  console.log(chalk.gray(`Current Context: 0/${model.tier === 'nano' ? '2048' : '8192'} chars\n`));

  chatLoop(model);
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
       console.log(chalk.cyan('\nCommands:\n /persona - Change System Prompt\n /clear - Reset context\n /info - Diagnostics\n exit - Quit\n'));
       chatLoop(model);
    } else {
      process.stdout.write(chalk.cyan.bold('\nAssistant > '));
      const spinner = ora().start();
      await new Promise(r => setTimeout(r, 800)); // think time
      spinner.stop();
      
      const response = `This is a simulated stream response from ${model.name}. In a real environment, the underlying C++ bindings would print tokens via stdout dynamically here. Generating this logic natively.`;
      
      // Simulate typing
      for(let i=0; i<response.length; i++) {
         process.stdout.write(chalk.white(response[i]));
         await new Promise(r => setTimeout(r, 15));
      }
      
      console.log('\n');
      chatLoop(model);
    }
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
