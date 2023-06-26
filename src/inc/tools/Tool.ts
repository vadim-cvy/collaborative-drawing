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

  protected isDrawing = false

  protected get commandsSet()
  {
    const commandsSet = this.createCommandsSetInstance()

    Object.values( this.settings ).forEach( setting => commandsSet.commands.push( setting.command ) )

    this.commands.forEach( command => commandsSet.commands.push( command ) )

    return commandsSet
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
      this.isDrawing = true

      this.updateCommandsOnDrawingStart( cursorPosition )

      return
    }

    if ( ! this.isDrawing )
    {
      return
    }

    if ( ! this.lastCoord )
    {
      throw new Error( 'Last coord cant be missed as drawing is started already.' )
    }

    const isCursorPositionChanged =
      this.lastCoord.x !== cursorPosition.x ||
      this.lastCoord.y !== cursorPosition.y

    if ( type === 'up' )
    {
      this.updateCommandsOnDrawingEnd( cursorPosition, isCursorPositionChanged )

      this.isDrawing = false
    }
    else if ( isCursorPositionChanged )
    {
      this.updateCommandsOnDrawingContinue( cursorPosition, type )
    }
  }

  protected abstract updateCommandsOnDrawingStart( cursorPosition: tCoord ) : void

  protected abstract updateCommandsOnDrawingContinue( cursorPosition: tCoord, eventType: tMouseEventType ) : void

  protected abstract updateCommandsOnDrawingEnd( cursorPosition: tCoord, isCursorPositionChanged: boolean ) : void

  protected abstract createCommandsSetInstance() : CommandsSet
}