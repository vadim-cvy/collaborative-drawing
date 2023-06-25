import CommandLineTo from "@/inc/drawing-board/commands/path/CommandLineTo";
import tMouseEventType from "@/inc/drawing-board/mouse/tMouseEventType";
import tCoord from "@/inc/drawing-board/tCoord";
import ShapeTool from "./ShapeTool";

export default class Line extends ShapeTool
{
  public readonly label = 'Line'

  protected updateCommandsOnDrawingContinue( cursorPosition: tCoord, eventType: tMouseEventType )
  {
    this.commands.push(new CommandLineTo( cursorPosition ))
  }
}