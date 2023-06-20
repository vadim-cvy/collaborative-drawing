import PathCoordSubCommand from "../drawing/commands/path/sub-commands/PathCoordSubCommand";
import PathSubCommandLineTo from "../drawing/commands/path/sub-commands/PathSubCommandLineTo";
import PathSubCommandMoveTo from "../drawing/commands/path/sub-commands/PathSubCommandMoveTo";
import DrawingBoard from "../drawing/DrawingBoard";
import tMouseEventType from "../drawing/mouse/tMouseEventType";
import tCoord from "../drawing/tCoord";
import DrawingTool from "./DrawingTool";

export default class Pencil extends DrawingTool
{
  public constructor( drawingBoard: DrawingBoard )
  {
    super( 'Pencil', drawingBoard )
  }

  protected get lastSubCommand()
  {
    const lastSubCommand = this.command.subCommands[ this.command.subCommands.length - 1 ]

    if ( ! ( lastSubCommand instanceof PathCoordSubCommand ) )
    {
      throw new Error( 'Something goes wrong!' )
    }

    return lastSubCommand
  }

  protected updateCommandOnMouseEvent(
    type: tMouseEventType,
    cursorPosition: tCoord,
    isCursorPositionChanged: boolean
  )
  {
    if ( type === 'up' )
    {
      this.onCompleteDrawingEvent( cursorPosition, isCursorPositionChanged )
    }
    else if ( isCursorPositionChanged )
    {
      this.onContinueDrawingEvent( cursorPosition )
    }
  }

  protected onContinueDrawingEvent( cursorPosition: tCoord )
  {
    const cursorLastPosition = this.lastSubCommand.coord

    // todo: implement PathSubCommandQuadraticCurveTo
    this.command.subCommands.push(new PathSubCommandQuadraticCurveTo(
      cursorLastPosition,
      // "( last cursor last position + cursor curent position ) / 2" makes the curve smoother
      (cursorLastPosition.x + cursorPosition.x) / 2,
      (cursorLastPosition.y + cursorPosition.y) / 2
    ))
  }

  protected onCompleteDrawingEvent( cursorPosition: tCoord, isCursorPositionChanged: boolean )
  {
    const subCommands = this.command.subCommands

    const isDot = this.lastSubCommand instanceof PathSubCommandMoveTo && ! isCursorPositionChanged

    if ( isDot )
    {
      // todo: get from the last StrokeSize subcommand
      const dotSize = 10

      // todo: implement PathSubCommandArc
      subCommands.push( new PathSubCommandArc( cursorPosition, dotSize, 0, Math.PI * 2 ) )

      return
    }

    if ( ! isCursorPositionChanged )
    {
      subCommands.pop()
    }

    subCommands.push( new PathSubCommandLineTo( cursorPosition ) )
  }
}