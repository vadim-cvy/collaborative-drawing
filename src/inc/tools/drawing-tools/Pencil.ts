import CommandLineTo from "../../drawing/commands/path/sub-commands/CommandLineTo";
import CommandMoveTo from "../../drawing/commands/path/sub-commands/CommandMoveTo";
import CommandQuadraticCurveTo from "../../drawing/commands/path/sub-commands/CommandQuadraticCurveTo";
import CommandArc from "../../drawing/commands/path/sub-commands/CommandArc";
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
    const subCommands = this.commands

    const isDot = this.lastCommand instanceof CommandMoveTo && ! isCursorPositionChanged

    if ( isDot )
    {
      // todo: get from settings
      const dotSize = 10

      // todo: implement CommandArc
      subCommands.push( new CommandArc( cursorPosition, dotSize ) )

      return
    }

    // todo: maybe uncomment this if quadratic curve not working as expected
    // if ( ! isCursorPositionChanged )
    // {
    //   subCommands.pop()
    // }

    subCommands.push( new CommandLineTo( cursorPosition ) )
  }
}