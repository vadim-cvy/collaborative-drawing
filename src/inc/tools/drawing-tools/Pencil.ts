import CommandLineTo from "../../drawing/commands/path/CommandLineTo";
import CommandMoveTo from "../../drawing/commands/path/CommandMoveTo";
import CommandQuadraticCurveTo from "../../drawing/commands/path/CommandQuadraticCurveTo";
import CommandArc from "../../drawing/commands/path/CommandArc";
import tCoord from "../../drawing/tCoord";
import DrawingTool from "./DrawingTool";

export default class Pencil extends DrawingTool
{
  public readonly label = 'Pencil'

  protected updateCommandsOnDrawingContinue( cursorPosition: tCoord )
  {
    if ( ! this.lastCoord )
    {
      throw new Error( 'Something goes wrong!' )
    }

    this.commands.push(new CommandQuadraticCurveTo( this.lastCoord, cursorPosition ))
  }

  protected updateCommandsOnDrawingEnd( cursorPosition: tCoord, isCursorPositionChanged: boolean )
  {
    const isDot = this.lastCommand instanceof CommandMoveTo && ! isCursorPositionChanged

    if ( isDot )
    {
      this.commands.push( new CommandArc( cursorPosition, this.settings.lineWidth.selectedOption ) )

      return
    }

    // todo: maybe uncomment this if quadratic curve not working as expected
    // if ( ! isCursorPositionChanged )
    // {
    //   this.commands.pop()
    // }

    this.commands.push( new CommandLineTo( cursorPosition ) )
  }
}