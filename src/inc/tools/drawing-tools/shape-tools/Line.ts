import CommandLineTo from "@/inc/drawing/commands/path/sub-commands/CommandLineTo";
import tMouseEventType from "@/inc/drawing/mouse/tMouseEventType";
import tCoord from "@/inc/drawing/tCoord";
import ShapeTool from "./ShapeTool";

export default class Line extends ShapeTool
{
  public readonly label = 'Line'

  protected updateCommandsOnDrawingContinue( cursorPosition: tCoord, eventType: tMouseEventType )
  {
    this.commands.push(new CommandLineTo( cursorPosition ))
  }
}