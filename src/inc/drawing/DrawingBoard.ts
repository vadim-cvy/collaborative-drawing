import Tool from "../tools/Tool"
import Canvas from "./Canvas"
import Command from "./commands/Command"
import tMouseEventListenerCb from "./mouse/tMouseEventListenerCb"
import tMouseEventType from "./mouse/tMouseEventType"

// todo (future): commands may be shared between users
export default class DrawingBoard
{
  public constructor(
    tmpDrawingCanvasElement: HTMLCanvasElement,
    persistantDrawingCanvasElement: HTMLCanvasElement,
  )
  {
    this.tmpDrawingCanvas = new Canvas( tmpDrawingCanvasElement )

    this.persistantDrawingCanvas = new Canvas( persistantDrawingCanvasElement )

    this.listenMouseEvents()
  }

  protected readonly tmpDrawingCanvas: Canvas

  protected readonly persistantDrawingCanvas: Canvas

  public mouseEventsListeners: tMouseEventListenerCb[] = []

  protected listenMouseEvents()
  {
    window.addEventListener( 'mousemove', e => this.onMouseEvent( e, 'move' ) )
    window.addEventListener( 'mouseup', e => this.onMouseEvent( e, 'up' ) )

    this.tmpDrawingCanvas.element.addEventListener( 'mousemove', e => this.onMouseEvent( e, 'move' ) )
    this.tmpDrawingCanvas.element.addEventListener( 'mousedown', e => this.onMouseEvent( e, 'down' ) )
    this.tmpDrawingCanvas.element.addEventListener( 'mouseenter', e => this.onMouseEvent( e, 'enter' ) )
    this.tmpDrawingCanvas.element.addEventListener( 'mouseleave', e => this.onMouseEvent( e, 'leave' ) )
  }

  protected onMouseEvent( e: MouseEvent, type: tMouseEventType )
  {
    const cursorPosition = this.tmpDrawingCanvas.getCursorRelativeCoord({
      x: e.clientX,
      y: e.clientY,
    })

    this.mouseEventsListeners.forEach( cb => cb( type, cursorPosition ) )
  }

  public drawPersistant( command: Command )
  {
    this.tmpDrawingCanvas.clear()

    this.persistantDrawingCanvas.draw( command )
  }

  public drawTmp( command: Command )
  {
    this.tmpDrawingCanvas.clear()

    this.tmpDrawingCanvas.draw( command )
  }
}