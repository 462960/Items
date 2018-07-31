interface IMatch {
  url: string;
  params: any;
}

interface ILocation {
  pathname: string;
  search: string;
}

interface IHistory {
  goBack(): void;
  replace(route: string): any;
  push(route: string): any;
}

interface IWithRouter {
  match: IMatch;
  location: ILocation;
  history: IHistory;
}
