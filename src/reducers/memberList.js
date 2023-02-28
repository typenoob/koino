export default function memberList(state = {}, action) {
  switch (action.type) {
    case "SERVER_LOADED":
      return {
        ...state,
        members: action.members,
      };
    case "SERVER_UNLOADED":
      return {};
    default:
      return state;
  }
}
