import React from 'react';
import get from 'lodash.get';
import { Link } from 'react-router-dom';
import moment from 'moment';
import BulkChangeCollaborator from './modals/BulkChangeCollaborator';
import BulkChangeLocation from './modals/BulkChangeLocation';
import BulkChangeStatus from './modals/BulkChangeStatus';
import BulkChangeConfirm from './modals/BulkChangeConfirm';
import BulkDelete from './modals/BulkDelete';

export const COLUMNS_ATTRS: IColumnAttrs = {
  public_id: {
    label: 'Id',
    widthWeight: 6.5,
  },
  description: {
    label: 'Description',
    widthWeight: 6.5,
  },
  comment: {
    label: 'Comment',
    widthWeight: 6.5,
  },
  name: {
    label: 'Name',
    sortable: true,
    widthWeight: 6.5,
    selector: (item) => (
      <Link to={`/items/${item.public_id}`} className="d-block link-none">
        {item.name}
      </Link>
    ),
  },
  barcode: {
    label: 'Barcode',
    sortable: true,
    widthWeight: 4.5,
  },
  serial_number: {
    label: 'Serial Number',
    sortable: true,
    widthWeight: 5.5,
  },
  location: {
    label: 'Location',
    sortable: true,
    widthWeight: 4,
    selector: (item) => get(item, 'location.name'),
  },
  collaborator: {
    label: 'Collaborator',
    sortable: true,
    widthWeight: 6,
    selector: (item) => get(item, 'collaborator.name'),
  },
  updated_by: {
    label: 'Updated by',
    widthWeight: 6.5,
    selector: (item) => get(item, 'updated_by.username'),
  },
  status: {
    label: 'Status',
    sortable: true,
    widthWeight: 4,
    selector: (item) => get(item, 'status.name'),
  },
  count: {
    label: 'Total count',
    sortable: true,
    widthWeight: 4.5,
    style: { textAlign: 'center' },
  },
  created_at: {
    label: 'Date Created',
    sortable: true,
    widthWeight: 5,
    selector: (item) =>
      item.created_at && moment(item.created_at).format('DD/MM/YYYY'),
  },
  updated_at: {
    label: 'Date',
    sortable: true,
    widthWeight: 3,
    selector: (item) =>
      item.updated_at && moment(item.updated_at).format('DD/MM/YYYY'),
  },
  photos: {
    label: 'Photos',
    widthWeight: 3,
    selector: (item) => (item.photos ? item.photos.length : 0),
  },
};

export const BULK_CHANGE_MODALS_MODES = Object.freeze({
  collaborator: 'collaborator',
  status: 'status',
  location: 'location',
  archive: 'archive',
  unarchive: 'unarchive',
  delete: 'delete',
});

export const BULK_CHANGE_MODALS: any = Object.freeze({
  [BULK_CHANGE_MODALS_MODES.collaborator]: BulkChangeCollaborator,
  [BULK_CHANGE_MODALS_MODES.status]: BulkChangeStatus,
  [BULK_CHANGE_MODALS_MODES.location]: BulkChangeLocation,
  [BULK_CHANGE_MODALS_MODES.archive]: BulkChangeConfirm('archive'),
  [BULK_CHANGE_MODALS_MODES.unarchive]: BulkChangeConfirm('unarchive'),
  [BULK_CHANGE_MODALS_MODES.delete]: BulkDelete,
  default: {
    title: () => null,
    actions: () => null,
    content: () => null,
  },
});
