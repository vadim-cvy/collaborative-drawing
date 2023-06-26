import iCommand from "@/inc/board/commands/iCommand";
import CommandMoveTo from "@/inc/board/commands/path/CommandMoveTo";
import tCoord from "@/inc/board/tCoord";
import DrawingTool from "../DrawingTool";

export default abstract class ShapeTool extends DrawingTool
{
  protected updateCommandsOnDrawingEnd( cursorPosition: tCoord, isCursorPositionChanged: boolean )
  {
    if ( isCursorPositionChanged )
    {
      this.updateCommandsOnDrawingContinue( cursorPosition )
    }
  }

  protected updateCommandsOnDrawingContinue( cursorPosition: tCoord )
  {
    if ( ! ( this.lastCommand instanceof CommandMoveTo ) )
    {
      this.commands.pop()
    }

    this.commands.push( this.createShapeCommandInstance( cursorPosition ) )
  }

  protected abstract createShapeCommandInstance( cursorPosition: tCoord ) : iCommand
}