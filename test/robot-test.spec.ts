import { expect } from "chai";
import conf from "../src/conf.json";
import Robot, { Directions, IRobot } from "../src/robot";
import Table, {roundToInt } from "../src/table";

describe("Toy Robot", () => {

  let robot: Robot;
  let table: Table;

  beforeEach (() => {
    const options: IRobot = { position: {x: roundToInt(3), y: roundToInt(3)}, direction: Directions.NORTH};
    robot = new Robot(options);
    const tableWidth: number = conf.table.width;
    const tableHeight: number = conf.table.height;
    table = new Table(roundToInt(tableWidth), roundToInt(tableHeight));
 });

  describe("#new robot", () => {
    it("should be initialized with the given params {{3,3},{0}}", () => {
      expect(robot.position.x).to.eq(3);
      expect(robot.position.y).to.eq(3);
      expect(robot.direction).to.eq(Directions.NORTH);
    });

    it("should round up number input to Int for X and Y", () => {
      const x: number = 1.323;
      const y: number = 6.666;
      const f: Directions = 0;

      const options: IRobot = { position: {x: roundToInt(x), y: roundToInt(y)}, direction: Directions.NORTH};
      robot = new Robot(options);

      expect(robot.position.x).to.eq(1);
      expect(robot.position.y).to.eq(7);
      expect(robot.direction).to.eq(Directions.NORTH);
    });

  });

  describe("#report", () => {
    it("robot should report current RobotParams {position, direction}", () => {

      expect(robot.report()).to.eq("3, 3, NORTH");
      expect(robot.direction).to.eq(Directions.NORTH);
    });
  });

  describe("#turnLeft", () => {
    it("robot should turn left", () => {
      expect(robot.direction).to.eq(Directions.NORTH);

      expect(robot.turnLeft()).to.eq(Directions.WEST);
      expect(robot.direction).to.eq(Directions.WEST);

      expect(robot.turnLeft()).to.eq(Directions.SOUTH);
      expect(robot.direction).to.eq(Directions.SOUTH);

      expect(robot.turnLeft()).to.eq(Directions.EAST);
      expect(robot.direction).to.eq(Directions.EAST);

      expect(robot.turnLeft()).to.eq(Directions.NORTH);
      expect(robot.direction).to.eq(Directions.NORTH);
    });
  });

  describe("#turnRight", () => {
    it("should turn the robot right", () => {

      expect(robot.direction).to.eq(Directions.NORTH);

      expect(robot.turnRight()).to.eq(Directions.EAST);
      expect(robot.direction).to.eq(Directions.EAST);

      expect(robot.turnRight()).to.eq(Directions.SOUTH);
      expect(robot.direction).to.eq(Directions.SOUTH);

      expect(robot.turnRight()).to.eq(Directions.WEST);
      expect(robot.direction).to.eq(Directions.WEST);

      expect(robot.turnRight()).to.eq(Directions.NORTH);
      expect(robot.direction).to.eq(Directions.NORTH);
    });
  });

  describe("#move", () => {
    it("should move Robot from {{3,3},{0}} to {{3,4},{0}}", () => {
      robot.move(table);
      expect(robot.position.x).to.eq(3);
      expect(robot.position.y).to.eq(4);
      expect(robot.direction).to.eq(Directions.NORTH);
    });
    it("should move Robot twice in direction North, from {{3,3},{0}} to {{3,4},{0}} preventing from falling", () => {
      robot.move(table);
      robot.move(table);
      expect(robot.position.x).to.eq(3);
      expect(robot.position.y).to.eq(4);
      expect(robot.direction).to.eq(Directions.NORTH);
    });
  });

});
