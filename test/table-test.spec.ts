import { expect } from "chai";
import Table, { ITablePosition, roundToInt } from "../src/table";

describe("Table", () => {

  let table: Table;
  const xOuts: number[] = [- 1, 5];
  const yOuts: number[] = [- 1, 5];
  const xIns: number[] = [0, 4];
  const yIns: number[] = [0, 4];
  const startPointX: number = 0;
  const startPointY: number = 0;
  const lengthX: number = 5;
  const lengthY: number = 5;

  describe("#new with param new TableTop(3 ,8)", () => {
    it("should create a 3x8 matrix", () => {
      table = new Table(roundToInt(3), roundToInt(8));
      expect(table.width).to.be.eq(3);
      expect(table.height).to.be.eq(8);
      // expect(tableTop.surfaceArea.length).to.be.equal(5);
      // expect(tableTop.surfaceArea[0].length).to.be.equal(5);
    });

    it("should create a 4x7 matrix, round number 4.46453738, 6.8867665", () => {
      table = new Table(roundToInt(4.46453738), roundToInt(6.8867665));
      expect(table.width).to.be.eq(4);
      expect(table.height).to.be.eq(7);
    });

  });

  beforeEach (() => {
     table = new Table(roundToInt(5), roundToInt(5));
  });

  describe("#new with param new TableTop(5 ,5)", () => {
    it("should create a 5x5 matrix", () => {
      expect(table.width).to.be.eq(5);
      expect(table.height).to.be.eq(5);

    });
  });

  describe("#outOfBounds(IPosition)", () => {
    function loopInvalidY(position: ITablePosition) {
      it("should return TRUE if Ys are OUTSIDE table area", () => {
          expect(table.outOfBoundary(position)).to.be.eq(true);
      });
    }

    function loopValidY(position: ITablePosition) {
        it("should return FALSE if Ys are INSIDE table area", () => {
            expect(table.outOfBoundary(position)).to.be.eq(false);
        });
    }

    function loopInvalidX(position: ITablePosition) {
        it("should return TRUE if Xs are OUTSIDE table area", () => {
            expect(table.outOfBoundary(position)).to.be.eq(true);
        });
    }

    function loopValidX(position: ITablePosition) {
        it("should return FALSE if Xs are INSIDE table area", () => {
            expect(table.outOfBoundary(position)).to.be.eq(false);
        });
    }
    /**
     * Y is OUTside [0, -1],[1, -1],[2, -1],[3, -1],[4, -1],[0, 5],[1, 5] ,[2, 5] ,[3, 5] ,[4, 5]
     */
    for (const posX of Array(lengthX)) {
      for (const posY of yOuts) {
        const position = {x: roundToInt(posX), y: roundToInt(posY)};
        loopInvalidY(position);
      }
    }

    /**
     * Y is INside [0, 0],[1, 0],[2, 0],[3, 0],[4, 0],[0, 4],[1, 4] ,[2, 4] ,[3, 4] ,[4, 4]
     */
    for (const posX of Array(lengthX)) {
        for (const posY of yIns) {
          const position = {x: roundToInt(posX), y: roundToInt(posY)};
          loopValidY(position);
        }
    }

    /**
     * X is OUTside [-1, 0],[-1, 1],[-1, 2],[-1, 3],[-1, 4],[5, 0],[5, 1],[5, 2],[5, 3],[5, 4]
     */
    for (const posY of Array(lengthY)) {
        for (const posX of xOuts) {
          const position = {x: roundToInt(posX), y: roundToInt(posY)};
          loopInvalidX(position);
        }
    }

    /**
     * X is INside [0, 0],[0, 1],[0, 2],[0, 3],[0, 4],[4, 0],[4, 1],[4, 2],[4, 3],[4, 4]
     */
    for (const posY of Array(lengthY)) {
        for (const posX of xIns) {
          const position = {x: roundToInt(posX), y: roundToInt(posY)};
          loopValidX(position);
        }
    }
  });
});
