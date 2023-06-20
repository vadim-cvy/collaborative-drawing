import Command from "../drawing/commands/Command";
import PathSubCommandMoveTo from "../drawing/commands/path/sub-commands/PathSubCommandMoveTo";
import DrawingBoard from "../drawing/DrawingBoard";
import tMouseEventType from "../drawing/mouse/tMouseEventType";
import tCoord from "../drawing/tCoord";
import Setting from "./settings/Setting"
import tUpdateToolCommandMouseEventType from "./tUpdateToolCommandMouseEventType";

export default abstract class Tool
{
  public constructor(
    public readonly label: string,
    protected readonly drawingBoard: DrawingBoard,
    public readonly settings: Setting[],
  )
  {
    drawingBoard.mouseEventsListeners.push( ( type, cursorPosition ) => this.onMouseEvent( type, cursorPosition ) )
  }

  public isSelected = false

  protected abstract readonly command: Command

  protected mouseEventCursorLastPosition?: tCoord

  protected onMouseEvent( type: tMouseEventType, cursorPosition: tCoord )
  {
    if ( ! this.isSelected )
    {
      return
    }

    if ( type === 'down' )
    {
      this.setInitialSubCommands( cursorPosition )

      return
    }

    this.updateCommandOnMouseEvent( type, cursorPosition, this.isCursorPositionChanged( cursorPosition ) )

    if ( type === 'up' )
    {
      this.drawingBoard.drawPersistant( this.command )

      this.command.subCommands.splice( 0, this.command.subCommands.length )

      this.mouseEventCursorLastPosition = undefined
    }
    else
    {
      this.drawingBoard.drawTmp( this.command )

      this.mouseEventCursorLastPosition = cursorPosition
    }
  }

  protected isCursorPositionChanged( curPosition: tCoord )
  {
    const prevPosition = this.mouseEventCursorLastPosition

    if ( ! prevPosition )
    {
      return true
    }

    return prevPosition.x !== curPosition.x && prevPosition.y !== curPosition.y
  }

  protected abstract setInitialSubCommands( cursorPosition: tCoord ) : void

  protected abstract updateCommandOnMouseEvent(
    type: tUpdateToolCommandMouseEventType,
    cursorPosition: tCoord,
    isCursorPositionChanged: boolean
  ) : void
}