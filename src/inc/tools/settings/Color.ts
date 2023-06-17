import Setting from "./Setting"

export default class Color extends Setting
{
  public constructor( hasTrasparent = false )
  {
    const options: Color['options'] = [
      {
        label: 'Black',
        value: '#000',
      },
      {
        label: 'White',
        value: '#000',
      },
    ]

    if ( hasTrasparent )
    {
      options.push({
        label: 'Transparent',
        value: 'transparent',
      })
    }

    super( 'Color', options )
  }
}