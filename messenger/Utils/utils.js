export const activityTextTemplateString = (activityType, body) => {
  let mapString = {};
  switch (activityType) {
    case "ADD":
      mapString.activity = "added";
      mapString.preposition = "to";
      break;
    case "DELETE":
      mapString.activity = "deleted";
      mapString.preposition = "from";
      break;
    case "UPDATE":
      mapString.activity = "updated";
      mapString.preposition = "at";
      break;
    case "RESTORE":
      mapString.activity = "restored";
      mapString.preposition = "for";
      break;
    default:
      break;
  }

  if (body.module == "category") {
    switch (body.subModule.toLowerCase()) {
      case "article":
        mapString.table = "articleCategory";
        mapString.column = "name";
        break;
      default:
        break;
    }
  }

  if (body.module == "postFeed") {
    switch (body.subModule.toLowerCase()) {
      case "article":
        mapString.table = "posts";
        mapString.column = "caption";
        break;
      case "marketplace":
        mapString.table = "marketPlace";
        mapString.column = "title";
        break;
      case "businessPages":
        mapString.table = "businessPages";
        mapString.column = "name";
        break;
      case "grpGroups":
        mapString.table = "grpGroups";
        mapString.column = "name";
        break;
      default:
      break;
    }
  }
  return mapString;
}

export const convertDateToString = (dte) => {
  let year = dte.getFullYear();
  let month = dte.getMonth() + 1;
  let date = dte.getDate();

  return `${year}/${month}/${date}`;
}