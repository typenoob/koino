export default function groupList(state = {}, action) {
  switch (action.type) {
    case "SERVER_LOADED":
      return {
        ...state,
        groups: action.groups,
      };
    case "SERVER_UNLOADED":
      return {};
    case "ADD_GROUP":
      return {
        ...state,
        groups: state.groups.concat(action.group),
      };
    case "DEL_GROUP":
      return {
        ...state,
        groups: state.groups.filter((group) => group.id !== action.groupId),
      };
    default:
      return state;
  }
}
