import tCoord from "@/inc/board/tCoord";
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