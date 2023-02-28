export default function serverList(state = {}, action) {
  switch (action.type) {
    case "PAGE_LOADED":
      return {
        ...state,
        servers: action.servers,
      };
    case "PAGE_UNLOADED":
      return {};
    case "ADD_SERVER":
      return {
        ...state,
        servers: state.servers.concat(action.server),
      };
    case "DEL_SERVER":
      return {
        ...state,
        servers: state.servers.filter(
          (server) => server.id !== action.serverId
        ),
      };
    default:
      return state;
  }
}
