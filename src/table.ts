/** Utility type Integer, intersected as an object type */
export type Int = number & { __int__: void };
/** Utility function turn number type to Integer by rounding input to a whole number */
export const roundToInt = (num: number): Int => Math.round(num) as Int;

/** Table position x,y */
export interface ITablePosition {
  x: Int;
  y: Int;
}

/** Table representing the playing boundary */
export default class Table {

  public width: Int;
  public height: Int;

  /**
   * Create a Table.
   * @param width - The width value.
   * @param height - The height value.
   */

  constructor(width: Int, height: Int) {
    this.width = width;
    this.height = height;
  }

  /**
   * Check if coordinates are out of table boundary
   * @param position pass in the {x,y} coordinates for check
   */
  public outOfBoundary(position: ITablePosition): boolean {
    if (((this.width - 1) < position.x) ||
    (position.x < 0) ||
    ((this.height - 1) < position.y) ||
    (position.y < 0)) {
      return true;
    } else {
      return false;
    }

  }
}
