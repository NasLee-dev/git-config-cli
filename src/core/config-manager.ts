import simpleGit from "simple-git";
import { GitConfig } from "../types";

export class GitConfigManager {
  private git = simpleGit();

  async getCurrentConfig(): Promise<GitConfig> {
    const config = await this.git.listConfig();
    return this.parseConfig(config);
  }

  private parseConfig(config: any): GitConfig {
    return {
      user: {
        name: config.user?.name || "",
        email: config.user?.email || "",
      },
    }
  }

  async switchConfig(newConfig: GitConfig): Promise<void> {
    await this.git.addConfig("user.name", newConfig.user.name);
    await this.git.addConfig("user.email", newConfig.user.email);
  }
}