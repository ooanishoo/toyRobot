import { expect } from "chai";
import stream from "stream";
import Commander from "../src/commander";
import conf from "../src/conf.json";
import { Directions} from "../src/robot";
import Table, {roundToInt} from "../src/table";

describe("Commander", () => {
    let commander: Commander;
    let hook: any;

    /*
    * function use to capture process.stdout by replacing process.stdout object
    * @params s is process.stdout object
    */
    function captureStream(s: any) {
        const oldWrite = s.write;
        let buf: string | Buffer = "";
        s.write = (chunk: string | Buffer, encoding: string, callback: object) => {
          buf += chunk.toString(); // chunk is a String or Buffer
          oldWrite.apply(s, arguments);
        };

        return {
          unhook: function unhook() {
           s.write = oldWrite;
          },
          captured() {
            return buf;
          },
        };
      }

    beforeEach (() => {
        const tableWidth: number = conf.table.width;
        const tableHeight: number = conf.table.height;
        const table: Table = new Table(roundToInt(tableWidth), roundToInt(tableHeight));
        commander = new Commander(table);
    });

    describe("#new controller", () => {

        // VALID PLACE COMMANDS

        it('should input PLACE command "PLACE 0,0,NORTH" and Robot is instantiate at position 0,0,NORTH', () => {
            commander.execute("PLACE 0,0,NORTH");
            expect(commander.robot.position.x).to.eq(0);
            expect(commander.robot.position.y).to.eq(0);
            expect(commander.robot.direction).to.eq(Directions.NORTH);
        });

        it('should input PLACE command "PLACE 0,0,EAST" and Robot is instantiate at position 0,0,EAST', () => {
            commander.execute("PLACE 0,0,EAST");
            expect(commander.robot.position.x).to.eq(0);
            expect(commander.robot.position.y).to.eq(0);
            expect(commander.robot.direction).to.eq(Directions.EAST);
        });

        it('should input PLACE command "PLACE 0,0,SOUTH" and Robot is instantiate at position 0,0,SOUTH', () => {
            commander.execute("PLACE 0,0,SOUTH");
            expect(commander.robot.position.x).to.eq(0);
            expect(commander.robot.position.y).to.eq(0);
            expect(commander.robot.direction).to.eq(Directions.SOUTH);
        });

        it('should input PLACE command "PLACE 0,0,WEST" and Robot is instantiate at position 0,0,WEST', () => {
            commander.execute("PLACE 0,0,WEST");
            expect(commander.robot.position.x).to.eq(0);
            expect(commander.robot.position.y).to.eq(0);
            expect(commander.robot.direction).to.eq(Directions.WEST);
        });

        it('should input PLACE command "PLACE 0,4.3,EAST" and and Robot is instantiate at position 0,4,EAST', () => {
            commander.execute("PLACE 0,4.3,EAST");
            expect(commander.robot.position.x).to.eq(0);
            expect(commander.robot.position.y).to.eq(4);
            expect(commander.robot.direction).to.eq(Directions.EAST);
        });

        it('should input PLACE command "PLACE 1,3,EAST" and asset Robot Params', () => {
            commander.execute("PLACE 1,3,EAST");
            expect(commander.table.width).to.eq(5);
            expect(commander.table.height).to.eq(5);
            expect(commander.robot.position.x).to.eq(1);
            expect(commander.robot.position.y).to.eq(3);
            expect(commander.robot.direction).to.eq(Directions.EAST);
        });

        it('should input PLACE command "PLACE 3,3,WEST" and asset Robot Params', () => {
            commander.execute("PLACE 3,3,WEST");
            expect(commander.table.width).to.eq(5);
            expect(commander.table.height).to.eq(5);
            expect(commander.robot.position.x).to.eq(3);
            expect(commander.robot.position.y).to.eq(3);
            expect(commander.robot.direction).to.eq(Directions.WEST);
        });

        // INVALID PLACE COMMANDS

        it('should input PLACE command " PLACE 5,6,EAST" and Robot is undefined', () => {
            hook = captureStream(process.stdout);
            commander.execute(" PLACE 5,6,EAST");
            expect(commander.robot).to.eq(undefined);
            expect(hook.captured()).to.eq("");
            hook.unhook();
        });

        it('should input PLACE command "placE 1,3,EAST" and Robot is undefined', () => {
            hook = captureStream(process.stdout);
            commander.execute("placE 1,3,EAST");
            expect(commander.robot).to.eq(undefined);
            expect(hook.captured()).to.eq("");
            hook.unhook();
        });

        it('should input PLACE command "PLACE 1.2.NORTH" and Robot is undefined', () => {
            hook = captureStream(process.stdout);
            commander.execute("PLACE 1.2.NORTH");
            expect(commander.robot).to.eq(undefined);
            expect(hook.captured()).to.eq("");
            hook.unhook();
        });

        it('should input PLACE command "PLACE 3,3,EASTAS" and Robot is undefined', () => {
            hook = captureStream(process.stdout);
            commander.execute("PLACE 3,3,EASTAS");
            expect(commander.robot).to.eq(undefined);
            expect(hook.captured()).to.eq("");
            hook.unhook();
        });

        it('should input PLACE command "PLACE -1,6,EAST" and Robot is undefined', () => {
            hook = captureStream(process.stdout);
            commander.execute("PLACE -1,6,EAST");
            expect(commander.robot).to.eq(undefined);
            expect(hook.captured()).to.eq("");
            hook.unhook();
        });

        it('should input PLACE command "PLACE 0,0,SOUTH IS THE DIRECTION" and Robot is undefined', () => {
            hook = captureStream(process.stdout);
            commander.execute("PLACE 0,0,SOUTH IS THE DIRECTION");
            expect(commander.robot).to.eq(undefined);
            expect(hook.captured()).to.eq("");
            hook.unhook();
        });

        it('should input PLACE command "PLACE 0,0,SOUTH," and Robot is undefined', () => {
            hook = captureStream(process.stdout);
            commander.execute("PLACE 0,0,SOUTH,");
            expect(commander.robot).to.eq(undefined);
            expect(hook.captured()).to.eq("");
            hook.unhook();
        });

        it('should input PLACE command "PLACE 0,0,WEST."  and Robot is undefined', () => {
            hook = captureStream(process.stdout);
            commander.execute("PLACE 0,0,WEST.");
            expect(commander.robot).to.eq(undefined);
            expect(hook.captured()).to.eq("");
            hook.unhook();
        });

        it('should input PLACE command "PLACE 0,4.89,EAST" and Robot is undefined', () => {
            hook = captureStream(process.stdout);
            commander.execute("PLACE 0,4.89,EAST");
            expect(commander.robot).to.eq(undefined);
            expect(hook.captured()).to.eq("");
            hook.unhook();
        });

        it('should input PLACE command "PLACE 0,2,23sdfs" and Robot is undefined', () => {
            hook = captureStream(process.stdout);
            commander.execute("PLACE 0,2,23sdfs");
            expect(commander.robot).to.eq(undefined);
            expect(hook.captured()).to.eq("");
            hook.unhook();
        });

        it('should input PLACE command "PLACE 2,2,2" and Robot is undefined', () => {
            hook = captureStream(process.stdout);
            commander.execute("PLACE 2,2,2");
            expect(commander.robot).to.eq(undefined);
            expect(hook.captured()).to.eq("");
            hook.unhook();
        });

        // VALID MOVE COMMANDS

        it("should input MOVE command, return Robot Params {(2,3),EAST}", () => {
            commander.execute("PLACE 1,3,EAST");
            commander.execute("MOVE");
            expect(commander.robot.position.x).to.eq(2);
            expect(commander.robot.position.y).to.eq(3);
            expect(commander.robot.direction).to.eq(Directions.EAST);
        });

        // INVALID MOVE COMMANDS

        it("should input move, MOVE123 and 12MOVE! commands, Robot position remains unchanged", () => {
            commander.execute("PLACE 1,3,EAST");
            commander.execute("move");
            commander.execute("MOVE123");
            commander.execute("12MOVE!");
            expect(commander.robot.position.x).to.eq(1);
            expect(commander.robot.position.y).to.eq(3);
            expect(commander.robot.direction).to.eq(Directions.EAST);
        });

        // VALID LEFT COMMANDS

        it("should input LEFT command 4 times, rotate Robot in 360 degrees start from and end at 3,3,EAST", () => {
            commander.execute("PLACE 3,3,EAST");
            commander.execute("LEFT");
            expect(commander.robot.position.x).to.eq(3);
            expect(commander.robot.position.y).to.eq(3);
            expect(commander.robot.direction).to.eq(Directions.NORTH);
            commander.execute("LEFT");
            expect(commander.robot.position.x).to.eq(3);
            expect(commander.robot.position.y).to.eq(3);
            expect(commander.robot.direction).to.eq(Directions.WEST);
            commander.execute("LEFT");
            expect(commander.robot.position.x).to.eq(3);
            expect(commander.robot.position.y).to.eq(3);
            expect(commander.robot.direction).to.eq(Directions.SOUTH);
            commander.execute("LEFT");
            expect(commander.robot.position.x).to.eq(3);
            expect(commander.robot.position.y).to.eq(3);
            expect(commander.robot.direction).to.eq(Directions.EAST);
        });

        //  INVALID LEFT COMMANDS

        it("should input left, LEFT123 and LEFT! command, Robot position remains unchanged", () => {
            commander.execute("PLACE 1,3,EAST");
            commander.execute("left");
            commander.execute("LEFT123");
            commander.execute("LEFT!");
            expect(commander.robot.position.x).to.eq(1);
            expect(commander.robot.position.y).to.eq(3);
            expect(commander.robot.direction).to.eq(Directions.EAST);
        });

        //  VALID RIGHT COMMANDS

        it("should input RIGHT command 4 times, rotate Roboto in 360 degress start from and end at 3,3,EAST", () => {
            commander.execute("PLACE 3,3,EAST");
            commander.execute("RIGHT");
            expect(commander.robot.position.x).to.eq(3);
            expect(commander.robot.position.y).to.eq(3);
            expect(commander.robot.direction).to.eq(Directions.SOUTH);
            commander.execute("RIGHT");
            expect(commander.robot.position.x).to.eq(3);
            expect(commander.robot.position.y).to.eq(3);
            expect(commander.robot.direction).to.eq(Directions.WEST);
            commander.execute("RIGHT");
            expect(commander.robot.position.x).to.eq(3);
            expect(commander.robot.position.y).to.eq(3);
            expect(commander.robot.direction).to.eq(Directions.NORTH);
            commander.execute("RIGHT");
            expect(commander.robot.position.x).to.eq(3);
            expect(commander.robot.position.y).to.eq(3);
            expect(commander.robot.direction).to.eq(Directions.EAST);
        });

        // INVALID RIGHT COMMANDS

        it("should input right, RIGHT123 and RIGHT! command, Robot position remains unchanged", () => {
            commander.execute("PLACE 1,3,EAST");
            commander.execute("right");
            commander.execute("RIGHT123");
            commander.execute("RIGHT!");
            expect(commander.robot.position.x).to.eq(1);
            expect(commander.robot.position.y).to.eq(3);
            expect(commander.robot.direction).to.eq(Directions.EAST);
        });

        //  VALID REPORT COMMANDS

        it('should input REPORT commands, output Robot position as "1, 3, EAST"', () => {
            hook = captureStream(process.stdout);
            commander.execute("PLACE 1,3,EAST");
            commander.execute("REPORT");
            expect(hook.captured()).to.eq("1, 3, EAST\n");
            hook.unhook();
        });

        //  INVALID REPORT COMMANDS

        it("should input report, REPORT1, 12REPORT and REPORT! commands, return no output", () => {
            hook = captureStream(process.stdout);
            commander.execute("PLACE 1,3,EAST");
            commander.execute("report");
            commander.execute("REPORT1");
            commander.execute("12REPORT");
            commander.execute("REPORT!");
            expect(hook.captured()).to.eq("");
            hook.unhook();
        });
    });

});
