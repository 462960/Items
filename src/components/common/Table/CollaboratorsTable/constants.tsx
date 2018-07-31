import React from 'react';
import get from 'lodash.get';
import { Link } from 'react-router-dom';
import moment from 'moment';
import BulkChangeLocation from './modals/BulkChangeLocation';
import BulkDelete from './modals/BulkDelete';

export const COLUMNS_ATTRS: IColumnAttrs = {
  public_id: {
    label: 'Id',
    widthWeight: 6.5,
  },
  phone_number: {
    label: 'Phone',
    widthWeight: 7.5,
  },
  email: {
    label: 'Email',
    widthWeight: 13,
  },
  birthday: {
    label: 'Birthday',
    widthWeight: 6.5,
    selector: (item) =>
      item.birthday ? moment(item.birthday).format('DD/MM/YYYY') : '-',
  },
  name: {
    label: 'Name',
    sortable: true,
    widthWeight: 13,
    selector: (item) => (
      <Link
        to={`/structure/collaborators/${item.public_id}`}
        className="d-block link-none"
      >
        <div className="photo-table">
          <img
            src={item.photo_url ? item.photo_url : '/images/face.png'}
            alt="collaborator-photo"
            className="face"
          />
        </div>
        {item.name}
      </Link>
    ),
  },
  location: {
    label: 'Location',
    sortable: true,
    widthWeight: 6.5,
    selector: (item) => get(item, 'location.name'),
  },
  items_count: {
    label: 'Items',
    sortable: true,
    widthWeight: 6.5,
    selector: (item) => get(item, 'items_count') + ' Items',
  },
  department: {
    label: 'Department',
    sortable: true,
    widthWeight: 6.5,
  },
  position: {
    label: 'Position',
    widthWeight: 6.5,
  },
};

export const BULK_CHANGE_MODALS_MODES: any = Object.freeze({
  location: 'location',
  delete: 'delete',
});

export const BULK_CHANGE_MODALS: any = Object.freeze({
  [BULK_CHANGE_MODALS_MODES.location]: BulkChangeLocation,
  [BULK_CHANGE_MODALS_MODES.delete]: BulkDelete,
  default: {
    title: () => null,
    actions: () => null,
    content: () => null,
  },
});
