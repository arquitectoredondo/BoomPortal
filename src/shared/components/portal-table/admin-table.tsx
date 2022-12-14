import React, { useState } from 'react';
import './admin-table.scss';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { LabeValue } from '../../models/labelValue.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faEye,
  faEyeSlash,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import ConfirmActionDialog from '../confirm-action-dialog/confirm-action-dialog';

export interface AdminTableProps {
  headers: LabeValue[];
  data: any[];
  onRowClicked: (row: any) => void;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (value: number) => void;
  canLock?: boolean;
  userName?: string;
}

export default function AdminTable(props: AdminTableProps): JSX.Element {
  const { t } = useTranslation();
  const [lockedName, setLockedName] = useState<string>('');
  const [showLockedDialog, setShowLockedDialog] = useState<boolean>(false);

  return (
    <>
      <ConfirmActionDialog
        open={showLockedDialog}
        onClose={setShowLockedDialog}
        title={t('tableHeaders.dialog.title')}
        description={`${t('tableHeaders.dialog.desc1')}${lockedName}${t(
          'tableHeaders.dialog.desc2'
        )}`}
        descriptionIcon={faLock}
      />
      <TableContainer component={Paper}>
        <Table className="admin-table">
          <TableHead>
            <TableRow>
              {props.headers.map((header: LabeValue) => (
                <TableCell id="admin-table-header" key={header.label}>
                  {header.label}
                </TableCell>
              ))}
              <TableCell>{t('tableHeaders.status')}</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row) => (
              <TableRow
                id="admin-table-row"
                className={`${
                  row.lockedBy && row.lockedBy !== props.userName
                    ? 'admin-table-row-locked'
                    : 'admin-table-row'
                }`}
                key={row.uuid || row.id}
                onClick={() => {
                  if (row.lockedBy && row.lockedBy !== props.userName) {
                    setLockedName(row.lockedBy);
                    setShowLockedDialog(true);
                  } else {
                    props.onRowClicked(row);
                  }
                }}
              >
                {props.headers.map((header: LabeValue, i: number) => (
                  <TableCell key={i}>{row[header.value]}</TableCell>
                ))}
                <TableCell>
                  {props.canLock ? (
                    row.lockedBy && row.lockedBy !== props.userName ? (
                      <span>{t('tableHeaders.locked')}</span>
                    ) : !row.canRevert && row.publishDate ? (
                      <span>{t('tableHeaders.published')}</span>
                    ) : (
                      <span>{t('tableHeaders.draft')}</span>
                    )
                  ) : !row.canRevert && row.publishDate ? (
                    <span>{t('tableHeaders.published')}</span>
                  ) : (
                    <span>{t('tableHeaders.modified')}</span>
                  )}
                </TableCell>
                <TableCell>
                  <span>
                    <FontAwesomeIcon
                      icon={row.visibility ? faEye : faEyeSlash}
                    />
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                id="pagination"
                count={props.totalItems}
                rowsPerPage={props.itemsPerPage}
                page={props.currentPage}
                rowsPerPageOptions={[]}
                onChangePage={(e: any, page: number) =>
                  props.onPageChange(page)
                }
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
