import Setting from "./Setting"

export default class Size extends Setting
{
  public constructor( from = 1, to = 10 )
  {
    const options: Size['options'] = []

    for (let i = from; i <= to; i++)
    {
      options.push({
        label: String( i ),
        value: i,
      })
    }

    super( 'Size', options )
  }
}