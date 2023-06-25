import CommandLineTo from "@/inc/board/commands/path/CommandLineTo";
import tMouseEventType from "@/inc/board/mouse/tMouseEventType";
import tCoord from "@/inc/board/tCoord";
import ShapeTool from "./ShapeTool";

export default class Line extends ShapeTool
{
  public readonly label = 'Line'

  protected updateCommandsOnDrawingContinue( cursorPosition: tCoord, eventType: tMouseEventType )
  {
    this.commands.push(new CommandLineTo( cursorPosition ))
  }
}