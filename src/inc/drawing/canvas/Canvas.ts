import Layer from "../Layer"

export default class Canvas
{
  public constructor(
    protected readonly element: HTMLCanvasElement
  )
  {
    const ctx = element.getContext("2d")

    if ( ! ctx )
    {
      throw new Error( 'Cant get rendering context' )
    }

    this.ctx = ctx
  }

  protected readonly ctx: CanvasRenderingContext2D

  protected readonly layers: Layer[] = []

  public addLayer( layer: Layer )
  {
    this.layers.push( layer )

    // todo: handle
  }

  public getLayer( index: number ) : Layer | undefined
  {
    return this.layers[ index ]
  }
}