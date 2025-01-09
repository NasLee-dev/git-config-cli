import { GitConfig } from "../types";
export declare class GitConfigManager {
    private git;
    getCurrentConfig(): Promise<GitConfig>;
    private parseConfig;
    switchConfig(newConfig: GitConfig): Promise<void>;
}
