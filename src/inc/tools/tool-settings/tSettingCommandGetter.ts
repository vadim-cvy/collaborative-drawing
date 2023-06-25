import iCommand from "@/inc/drawing/commands/iCommand";

type tSettingCommandGetter<T> = ( selectedOptionValue: T ) => iCommand

export default tSettingCommandGetter