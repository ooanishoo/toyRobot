import Table, { Int, ITablePosition } from "./table";

export enum Directions {
  "NORTH"= 1,
  "EAST",
  "SOUTH",
  "WEST",
}

// toDo: Lets make a map for reverse lookup of Enum so we can set the String back.
export const stringToDirections = new Map<string, number> ([
  ["NORTH", Directions.NORTH],
  ["EAST", Directions.EAST],
  ["SOUTH", Directions.SOUTH],
  ["WEST", Directions.WEST],
]);
/** parameters used to interface with the robot class  */
export interface IRobot {
  position: ITablePosition;
  direction: Directions;
}
/** Robot representing the Robot */
export default class Robot {

  /**
   * Must be defined in enum Directions
   */
  public direction: Directions;
  /**
   * Must be within defined table width, height
   */
  public position: ITablePosition;

  constructor(options: IRobot) {
    this.position = options.position;
    this.direction = options.direction;
  }

  /**
   * turn the robot left from the direction it is current facing, anti-clockwise North > West > South > East
   */
  public turnLeft(): Directions {
    const newDirection: Directions = this.direction === Directions.NORTH ? Directions.WEST : this.direction - 1;
    return this.direction = newDirection;
  }

  /**
   * turn the robot right from the direction it is current facing, clockwise North > East > South > West
   */
  public turnRight(): Directions {
    const newDirection: Directions = this.direction === Directions.WEST ? Directions.NORTH : this.direction + 1;
    return this.direction = newDirection;
  }

  /**
   * Move robot coordinates in the direction it is facing by value of 1
   * @param table the table instance instantiated
   * @returns true always
   */
  public move(table: Table): boolean {

    switch (this.direction) {
      case Directions.NORTH:
        ++this.position.y;
        if (checkOutOfBounds(this.position, table)) {
          --this.position.y;
       }
        break;
      case Directions.EAST:
        ++this.position.x;
        if (checkOutOfBounds(this.position, table)) {
          --this.position.x;
        }
        break;
      case Directions.SOUTH:
        --this.position.y;
        if (checkOutOfBounds(this.position, table)) {
         ++this.position.y;
        }
        break;
      case Directions.WEST:
        --this.position.x;
        if (checkOutOfBounds(this.position, table)) {
        ++this.position.x;
        }
        break;
      default:
    }
    return true;
  }

  /** method use to report the robot's position on the table and direction its facing */
  public report() {
    return `${this.position.x}, ${this.position.y}, ${Directions[(this.direction)]}`;
  }
}

/** Internal function used to check if a given position on a defined table is out of bounds
 * @param pos x,y table coordinates on table
 * @param table defined table instance
 * @returns true/false
 */
function checkOutOfBounds(pos: ITablePosition, table: Table): boolean {
    if (table.outOfBoundary(pos)) {
      process.stdout.write("[ERROR!] - Move ignored, Robot prevented from fall!\n");
    }
    return table.outOfBoundary(pos);
}
