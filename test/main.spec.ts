import { expect } from "chai";
import Robot from "../src/main";

// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe("Hello function", () => {
  it("should return hello world", () => {
    const testRobot = new Robot("tsangbot");
    const result = testRobot.greeter("World");
    expect(result).to.equal("Hello World!");
  });
});
