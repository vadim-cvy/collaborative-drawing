import iCommand from "../board/commands/iCommand";
import CommandsSet from "../board/commands/CommandsSet";
import CoordCommand from "../board/commands/path/CoordCommand";
import DrawingBoard from "../board/DrawingBoard";
import tMouseEventType from "../board/mouse/tMouseEventType";
import tCoord from "../board/tCoord";
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

  protected get commandsSet()
  {
    const settingsCommands = Object.values( this.settings ).map( setting => setting.command )

    return this.createCommandsSet( settingsCommands.concat( this.commands ) )
  }

  protected commands: iCommand[] = []

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
      this.drawingBoard.drawPersistant( this.commandsSet )

      this.commands = []
    }
    else
    {
      this.drawingBoard.drawTmp( this.commandsSet )
    }
  }

  protected updateCommandsOnMouseEvent( type: tMouseEventType, cursorPosition: tCoord )
  {
    if ( type === 'down' )
    {
      this.updateCommandsOnDrawingStart( cursorPosition )

      return
    }

    const isCursorPositionChanged =
      this.lastCoord &&
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

  protected abstract createCommandsSet( commands: iCommand[] ) : CommandsSet
}