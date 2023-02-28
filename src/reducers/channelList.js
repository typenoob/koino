export default function channelList(state = {}, action) {
  switch (action.type) {
    case "SERVER_LOADED":
      return {
        ...state,
        channels: action.channels,
      };
    case "SERVER_UNLOADED":
      return {};
    case "ADD_CHANNEL":
      return {
        ...state,
        channels: state.channels.concat(action.channel),
      };
    case "DEL_CHANNEL":
      return {
        ...state,
        channels: state.channels.filter(
          (channel) => channel.id !== action.channelId
        ),
      };
    default:
      return state;
  }
}
