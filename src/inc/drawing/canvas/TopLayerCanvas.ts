import Tool from "../../tools/Tool"
import Layer from "../Layer"
import Canvas from "./Canvas"
import MouseRelPosition from "./mouse/MouseRelPosition"
import tMouseEventType from "./mouse/tMouseEventType"

export default class TopLayerCanvas extends Canvas
{
  public constructor(
    protected readonly element: HTMLCanvasElement,
    protected readonly bottomLayersCanvas: Canvas,
    public activeTool: Tool
  )
  {
    super( element )

    this.listenMouseEvents()
  }

  protected get layer()
  {
    return this.getLayer( this.layers.length - 1 )
  }

  protected listenMouseEvents()
  {
    window.addEventListener( 'mousemove', e => this.onMouseEvent( e, 'move' ) )
    window.addEventListener( 'mouseup', e => this.onMouseEvent( e, 'up' ) )

    this.element.addEventListener( 'mousemove', e => this.onMouseEvent( e, 'move' ) )
    this.element.addEventListener( 'mousedown', e => this.onMouseEvent( e, 'down' ) )
    this.element.addEventListener( 'mouseenter', e => this.onMouseEvent( e, 'enter' ) )
    this.element.addEventListener( 'mouseleave', e => this.onMouseEvent( e, 'leave' ) )
  }

  protected onMouseEvent( e: MouseEvent, type: tMouseEventType )
  {
    const mouseRelPosition = new MouseRelPosition( e.clientX, e.clientY, this.element )

    if ( ! this.layer && type === 'down' )
    {
      this.addLayer(new Layer(
        mouseRelPosition.x,
        mouseRelPosition.y
      ))
    }

    if ( ! this.layer )
    {
      return
    }

    this.activeTool.maybeUpdateLayerOnMouseEvent( type, mouseRelPosition, this.layer )

    if ( type === 'up' )
    {
      this.completeLayer()
    }
  }

  public addLayer( layer: Layer )
  {
    if ( this.layer )
    {
      throw new Error( 'Previous layer is not completed!' )
    }

    super.addLayer( layer )
  }

  protected completeLayer()
  {
    if ( ! this.layer )
    {
      throw new Error( 'Nothing to complete!' )
    }

    this.bottomLayersCanvas.addLayer( this.layer )

    // todo: clear canvas rect

    this.layers.splice( 0, this.layers.length )
  }
}