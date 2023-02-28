export default function channel(state = {}, action) {
  switch (action.type) {
    case "CHANNEL_LOADED":
      return {
        ...state,
        currentChannel: action.channel,
      };
    case "CHANNEL_UNLOADED":
      return {};
    default:
      return state;
  }
}
