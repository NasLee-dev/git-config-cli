import simpleGit from "simple-git";
import { GitConfig } from "../types";

export class GitConfigManager {
  private git = simpleGit();

  async getCurrentConfig(): Promise<GitConfig> {
    try {
      const globalConfig = await this.git.listConfig('global');
      const localConfig = await this.git.listConfig('local');

      console.log('Global config:', globalConfig);
      console.log('Local config:', localConfig);
      
      return this.parseConfig({
        ...globalConfig.all,
        ...localConfig.all
      })
    } catch (error) {
      console.error("Failed to get git config:", error);
      throw error;
    }
  }

  private parseConfig(config: any): GitConfig {
    const getName = (key: string) => {
      const value = config[key];
      return Array.isArray(value) ? value[value.length - 1] : value;
    }

    const parsedCofig = {
      user: {
        name: getName('user.name') || '',
        email: getName('user.email') || ''
      }
    }
    return parsedCofig;
  }

  async switchConfig(newConfig: GitConfig): Promise<void> {
    try {
      console.log('Switching to config:', newConfig);
      // 새로운 설정 추가
      await this.git.addConfig('user.name', newConfig.user.name, false, 'global');
      await this.git.addConfig('user.email', newConfig.user.email, false, 'global');
      
      console.log('Config switched successfully');
    } catch (error) {
      console.error('Error switching git config:', error);
      throw error;
    }
  }
}