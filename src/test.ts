import { GitConfigManager } from "./core/config-manager";

export async function test() {
  const manager = new GitConfigManager();

  const currentConfig = await manager.getCurrentConfig();
  console.log("현재 설정:", currentConfig);

  await manager.switchConfig({
    user: {
      name: "fined000",
      email: "fined000@naver.com"
    }
  });

  const newConfig = await manager.getCurrentConfig();
  console.log("변경된 설정:", newConfig);
}

test();