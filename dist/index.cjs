#!/usr/bin/env node
"use strict";
const commander = require("commander");
const inquirer = require("inquirer");
const chalk = require("chalk");
const program = new commander.Command();
async function promptLoginInfo() {
  const { email } = await inquirer.prompt([
    {
      type: "input",
      name: "email",
      message: chalk.blue("이메일을 입력하세요:"),
      validate: (input) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input)) {
          return "이메일 형식이 올바르지 않습니다.";
        }
        return true;
      }
    }
  ]);
  const { password } = await inquirer.prompt([
    {
      type: "password",
      name: "password",
      message: chalk.blue("비밀번호를 입력하세요:"),
      validate: (input) => {
        if (input.length < 8) {
          return "비밀번호는 8자 이상이어야 합니다.";
        }
        return true;
      }
    }
  ]);
  return { email, password };
}
async function validateCredentials(credentials) {
  try {
    const response = await fetch("https://api.example.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    });
    if (!response.ok) {
      throw new Error("Invalid credentials");
    }
    console.log(chalk.green("로그인 성공!"));
    return true;
  } catch (error) {
    console.error(chalk.red("로그인 실패:"));
    return false;
  }
}
async function main() {
  program.name("github-config-manager").description("Manage GitHub configurations").version("0.0.1");
  program.parse();
  try {
    const credentials = await promptLoginInfo();
    await validateCredentials(credentials);
  } catch (error) {
    console.error(chalk.red("오류 발생:"), error);
    process.exit(1);
  }
}
main();
