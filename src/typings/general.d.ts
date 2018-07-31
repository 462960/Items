declare module '*.json' {
  const value: any;
  export default value;
}

declare var API_URL: string;

interface IWithIntl {
  intl: InjectedIntl;
}
interface IntlMessage {
  id: string;
  values?: object;
}

interface IPromiseCallback {
  resolve(value?: any): any;
  reject(value?: any): any;
}

interface IAction {
  meta?: any;
  type: string;
  payload?: any;
  promise?: IPromiseCallback;
  requestOptions?: object;
  id?: string;
  options?: any;
}
interface IFetchOptions {
  data?: any;
  headers?: object;
  partUrl: string;
  method?: string;
}

interface IMenuOption {
  disabled?: boolean;
  label: string;
  onClick?: any;
}

interface IStatus {
  public_id: string;
  name: string;
}
