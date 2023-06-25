import iCommand from "@/inc/board/commands/iCommand";

type tSettingCommandGetter<T> = ( selectedSettingOptionValue: T ) => iCommand

export default tSettingCommandGetter