export default function messageList(state = {}, action) {
  switch (action.type) {
    case "CHANNEL_LOADED":
      return {
        ...state,
        messages: action.messages,
      };
    case "CHANNEL_UNLOADED":
      console.log("CHANNEL_UNLOADED");
      return {};
    default:
      return state;
  }
}
