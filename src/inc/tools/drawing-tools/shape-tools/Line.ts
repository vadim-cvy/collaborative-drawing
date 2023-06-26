import CommandLineTo from "@/inc/board/commands/path/CommandLineTo";
import tCoord from "@/inc/board/tCoord";
import ShapeTool from "./ShapeTool";

export default class Line extends ShapeTool
{
  public readonly label = 'Line'

  protected createShapeCommandInstance(cursorPosition: tCoord)
  {
    return new CommandLineTo( cursorPosition )
  }
}