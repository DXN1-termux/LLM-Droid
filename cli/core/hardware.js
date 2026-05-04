import os from 'os';
import si from 'systeminformation';
import chalk from 'chalk';

export class HardwareProfiler {
  constructor() {
    this.sysInfo = {};
    this.ramGB = 0;
    this.tier = 'unknown';
    this.isTermux = false;
    this.threads = 1;
  }

  async runFullAudit() {
    try {
      this.isTermux = process.env.PREFIX?.includes('com.termux') || os.release().toLowerCase().includes('android');
      const cpu = await si.cpu();
      const mem = await si.mem();
      const osInfo = await si.osInfo();

      this.ramGB = mem.total / (1024 ** 3);
      this.threads = cpu.cores || os.cpus().length;

      // Determine Tiering
      if (this.isTermux || this.ramGB < 1) {
        this.tier = 'pico';
      } else if (this.ramGB >= 1 && this.ramGB < 4) {
        this.tier = 'nano';
      } else if (this.ramGB >= 4 && this.ramGB < 8) {
        this.tier = 'mobile_plus';
      } else if (this.ramGB >= 8 && this.ramGB < 16) {
        this.tier = 'mid';
      } else if (this.ramGB >= 16 && this.ramGB < 64) {
        this.tier = 'ultra';
      } else {
        this.tier = 'god';
      }

      this.sysInfo = { cpu, mem, osInfo };
      return this.generateReport();
    } catch (e) {
      // Fallback
      this.tier = 'mid';
      this.ramGB = 8;
      this.threads = 4;
      return this.generateReport();
    }
  }

  generateReport() {
    return {
      tier: this.tier,
      ramAllocated: this.ramGB.toFixed(2) + ' GB',
      threads: this.threads,
      isMobile: this.isTermux,
      platform: os.platform(),
      arch: os.arch()
    };
  }

  getRecommendedModel() {
    switch(this.tier) {
      case 'pico': return 'tinystories-33m';
      case 'nano': return 'qwen-0.5b';
      case 'mobile_plus': return 'tinyllama-1.1b';
      case 'mid': return 'mistral-7b';
      case 'ultra': return 'llama-3-70b';
      case 'god': return 'llama-3-405b';
      default: return 'qwen-0.5b';
    }
  }
}
