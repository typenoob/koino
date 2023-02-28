export default function server(state = {}, action) {
  switch (action.type) {
    case "SERVER_LOADED":
      return {
        ...state,
        currentServer: action.server,
      };
    case "SERVER_UNLOADED":
      return {};
    default:
      return state;
  }
}
