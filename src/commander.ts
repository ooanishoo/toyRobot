import * as process from "process";
import Robot, { stringToDirections } from "./robot";
import Table, { Int, roundToInt } from "./table";

/**
 * Commander, process stdin and instantiates a robot instance
 * Execute robot's method(s), includes: movements, directions and reporting
 */
export default class Commander {

  public robot: Robot;
  public table: Table;

  constructor(table: Table) {
    this.table = table;
  }

  public execute(command: string): void {
    // Perform the command if it matches one of Robot's expected input
    if (this.robot) {
      switch (command) {
        case "LEFT":
          this.robot.turnLeft();
          break;
        case "RIGHT":
          this.robot.turnRight();
          break;
        case "MOVE":
          this.robot.move(this.table);
          break;
        case "REPORT":
          process.stdout.write(this.robot.report() + "\n");
          break;
        default:
      }
    }

    if (command.startsWith("PLACE") && command.indexOf("PLACE ") !== -1) {
      // command transformer
      const robotParams: number[] = commandTransformer(command);
      if (robotParams) {
        const xValue: Int = roundToInt(robotParams[0]);
        const yValue: Int = roundToInt(robotParams[1]);
        const faceValue: number = robotParams[2];
       /**
        * If the coordinates are not out of bounds then instantiate the robot
        */
        if (!this.table.outOfBoundary({x: xValue, y: yValue})) {
          this.robot = new Robot({position: {x: xValue, y: yValue}, direction: faceValue});
        }
      }
    }
  }
}

/**
 * Takes input string, validate and transform into array of number to instantiate a Robot instance
 * @param inputString stdin command
 * @returns convertedParameters [x, y, direction]
 */
function commandTransformer(inputString: string): number[] {
    const input: string = inputString.slice(6);
    const inputParams: string[] = input.split(","); // string [1,2,EAST]
    if (inputParams.length === 3) {
      const convertedParameters: number [] = stringToNumber(inputParams);
      if (convertedParameters.length === 3) {
       return convertedParameters;
      }
    }
  }

/**
 * Takes string array representation of input string, lookup direction and transform parameters to Array of numbers
 * @param inputValues input command converted to array of string split by ","
 * @returns an array of number [x, y, direction]
 */
function stringToNumber(inputValues: string[]): number[] {
    const stringToNumberArray: number [] = new Array();
    // Check if face is a direction defined in Enum Directions.
    if (stringToDirections.get(inputValues[2])) {
      const face: string = stringToDirections.get(inputValues[2]).toString();
      inputValues.pop();
      inputValues.push(face);

      for (const value of inputValues) {
          if (!isNaN(+value)) {
            stringToNumberArray.push(+value);
          }
      }
    }
    return stringToNumberArray;
  }
