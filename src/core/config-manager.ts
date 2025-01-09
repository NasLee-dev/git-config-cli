import simpleGit from "simple-git";
import { GitConfig } from "../types";

export class GitConfigManager {
  private git = simpleGit();

  async getCurrentConfig(): Promise<GitConfig> {
    try {
      const stdout = await this.git.raw(['config', '--local', '--list']);
      console.log('Raw local config:', stdout);
      return this.parseConfig(stdout);
    } catch (error) {
      console.error("Failed to get git config:", error);
      throw error;
    }
  }

  private parseConfig(configStr: string): GitConfig {
    const config: Record<string, string> = {};
    configStr.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        config[key.trim()] = value.trim();
      }
    });

    return {
      user: {
        name: config['user.name'] || '',
        email: config['user.email'] || ''
      }
    }
  }

  async switchConfig(newConfig: GitConfig): Promise<void> {
    try {
      console.log('Switching to config:', newConfig);

      await this.git.raw(['config', '--local', '--unset-all', 'user.name']);
      await this.git.raw(['config', '--local', '--unset-all', 'user.email']);

      // 새로운 설정 추가
      await this.git.raw(['config', '--local', 'user.name', newConfig.user.name]);
      await this.git.raw(['config', '--local', 'user.email', newConfig.user.email]);
      
      console.log('Config switched successfully');
    } catch (error) {
      if ((error as any)?.message?.includes('--unset-all')) {
        // 기존 설정이 없는 경우 무시하고 계속 진행
        console.log('No existing config to unset');
      } else {
        throw error;
      }
    }
  }
}