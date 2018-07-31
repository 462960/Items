interface IItemData {
  name: string;
  barcode: string;
  count: string;
  status: string;
  public_id?: string;
  description?: string;
  serial_number?: string;
  comment?: string;
  location?: string;
  collaborator?: string;
  photos?: any;
}

interface IGetItemOptions extends IGetOptions {
  tab: string;
}

interface IItemStatus {
  name: string;
  public_id: string;
}
