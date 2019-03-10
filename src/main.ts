#!/usr/bin/env node
import * as process from "process";
import { createInterface, ReadLineOptions } from "readline";
import Commander from "./commander";
import conf from "./conf.json";
import Table, {roundToInt} from "./table";

/**
 * This is the entry point of the application
 * Instantiates table and commander instances, provide a CLI parser for stdin and stdout
 */

/** table width and height loaded in from json config */
const tableWidth: number = conf.table.width;
const tableHeight: number = conf.table.height;
/** table width and height rounded up/down */
const table = new Table(roundToInt(tableWidth), roundToInt(tableHeight));
/** InstantiateDictionary the cont */
const commander = new Commander(table);
/** using standard readline for sending commands */
const readLineOptions: ReadLineOptions = {
  input: process.stdin,
  output: process.stdout,
  terminal: false,
};

process.stdout.write("toyRobot Running!\n" +
"Valid commands: PLACE X,Y,F (Direction: NORTH, EAST, SOUTH, WEST) or LEFT or RIGHT or MOVE or REPORT.\n");

const cli = createInterface(readLineOptions);

cli.prompt(true);
/** Command line parser, reading input using readline modules */
cli.on("line", (line: string) => {
  commander.execute(line);
  cli.prompt(true);
});
