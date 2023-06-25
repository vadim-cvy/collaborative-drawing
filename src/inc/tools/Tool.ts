import Command from "../drawing/commands/Command";
import CoordCommand from "../drawing/commands/path/sub-commands/CoordCommand";
import DrawingBoard from "../drawing/DrawingBoard";
import tMouseEventType from "../drawing/mouse/tMouseEventType";
import tCoord from "../drawing/tCoord";
import tSettings from "./tool-settings/tSettings";

export default abstract class Tool
{
  public constructor(
    protected readonly drawingBoard: DrawingBoard
  )
  {
    drawingBoard.mouseEventsListeners.push( ( type, cursorPosition ) => this.onMouseEvent( type, cursorPosition ) )
  }

  public abstract readonly label: string

  public abstract readonly settings: tSettings

  public isSelected = false

  protected get wrapperCommand()
  {
    const wrapperCommand = this.createWrapperCommandInstance()

    // todo: populate with settings commands

    this.commands.forEach( command => wrapperCommand.subCommands.push( command ) )

    return wrapperCommand
  }

  protected abstract commands: Command[]

  protected get lastCommand()
  {
    return this.commands[ this.commands.length - 1 ]
  }

  protected get lastCoord()
  {
    if ( ! ( this.lastCommand instanceof CoordCommand ) )
    {
      return false
    }

    return this.lastCommand.coord
  }

  protected onMouseEvent( type: tMouseEventType, cursorPosition: tCoord )
  {
    if ( ! this.isSelected )
    {
      return
    }

    this.updateCommandsOnMouseEvent( type, cursorPosition )

    if ( type === 'up' )
    {
      this.drawingBoard.drawPersistant( this.wrapperCommand )

      this.commands = []
    }
    else
    {
      this.drawingBoard.drawTmp( this.wrapperCommand )
    }
  }

  protected updateCommandsOnMouseEvent( type: tMouseEventType, cursorPosition: tCoord )
  {
    if ( type === 'down' )
    {
      this.updateCommandsOnDrawingStart( cursorPosition )

      return
    }

    if ( ! this.lastCoord )
    {
      throw new Error( 'Something goes wrong!' )
    }

    const isCursorPositionChanged =
      this.lastCoord.x !== cursorPosition.x &&
      this.lastCoord.y !== cursorPosition.y

    if ( type === 'up' )
    {
      this.updateCommandsOnDrawingEnd( cursorPosition, isCursorPositionChanged )
    }
    else if ( isCursorPositionChanged )
    {
      this.updateCommandsOnDrawingContinue( cursorPosition, type )
    }
  }

  protected abstract updateCommandsOnDrawingStart( cursorPosition: tCoord ) : void

  protected abstract updateCommandsOnDrawingContinue( cursorPosition: tCoord, eventType: tMouseEventType ) : void

  protected abstract updateCommandsOnDrawingEnd( cursorPosition: tCoord, isCursorPositionChanged: boolean ) : void

  protected abstract createWrapperCommandInstance() : Command
}