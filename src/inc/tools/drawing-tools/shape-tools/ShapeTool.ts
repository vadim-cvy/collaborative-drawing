import tMouseEventType from "@/inc/drawing/mouse/tMouseEventType";
import tCoord from "@/inc/drawing/tCoord";
import DrawingTool from "../DrawingTool";

export default abstract class ShapeTool extends DrawingTool
{
  protected updateCommandsOnDrawingEnd( cursorPosition: tCoord, isCursorPositionChanged: boolean )
  {
    if ( isCursorPositionChanged )
    {
      this.updateCommandsOnDrawingContinue( cursorPosition, 'up' )
    }
  }
}