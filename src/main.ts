#!/usr/bin/env node
export default class Robot {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  /**
   * greeter
   * personName: string
   */
  public greeter(personName: string) {
    return `Hello ${personName}!`;
  }
}
