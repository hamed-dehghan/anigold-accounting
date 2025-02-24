import React, { FC } from 'react';
import { useContextMenu } from 'mantine-contextmenu';
import { ActionIcon, Button, Center, Flex, Group, Image, MantineTheme, Text, TextInput, rem } from '@mantine/core';
import { closeAllModals, openModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
// import { IconClick, IconMessage, IconTrash } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { DataTableColumn, DataTableProps } from 'mantine-datatable';
import dayjs from 'dayjs';
import { useCallback } from 'react';
import { DataTable, type DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { useEffect, useState } from 'react';
// import { IconChevronUp, IconEdit, IconSelector, IconTrashX } from '@tabler/icons-react';
import ModalComponent from '../ModalComponent/ModalComponent';
import './Test.scss';
const PAGE_SIZE = 100;
function Test(){
  
  // function handleSortChange(sort:any){
  //   console.log(sort);
    
  // }
  // const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
  //   columnAccessor: 'firstname',
  //   direction: 'asc',
  // });
  // const [records, setRecords] :any= useState(
  //  dataTable
  // );
  // // sortBy(companies, 'firstname')
  // useEffect(() => {
  //   const data = sortBy(records, sortStatus.columnAccessor);
  //   setRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
  //   handleKeyDown
  // }, [sortStatus]);

  // const [focusedRowId, setFocusedRowId] = useState(null);
  // const handleRowClick = (event:any) => {
  //   console.log(event.target);
    
  //   // setFocusedRowId(id);
  // };
  // const handleKeyDown = (e:any) => {
  //   if (focusedRowId === null) return;

  //   const currentIndex = records.findIndex((record:any) => record.id === focusedRowId);
  //   let newIndex :any = currentIndex;

  //   if (e.key === 'ArrowDown') {
  //     newIndex = Math.min(currentIndex + 1, records.length - 1);
  //   } else if (e.key === 'ArrowUp') {
  //     newIndex = Math.max(currentIndex - 1, 0);
  //   }

  //   if (newIndex !== currentIndex) {
  //     setFocusedRowId(records[newIndex]?.id);
  //   }
  // };
  

  // const { showContextMenu, hideContextMenu } = useContextMenu();

  // const [page, setPage] = useState(1);

  // const [selectedRecords, setSelectedRecords] = useState<any[]>([]);

  // const handleSortStatusChange = (status: DataTableSortStatus<any>) => {
  //   setPage(1);
  //   setSortStatus(status);
  // };

  // const editRecord = useCallback(({ firstName, lastName }: any) => {
  //   showNotification({
  //     withBorder: true,
  //     title: 'Editing record',
  //     message: `In a real application we could show a popup to edit ${firstName} ${lastName}, but this is just a demo, so we're not going to do that`,
  //   });
  // }, []);

  // const deleteRecord = useCallback(({ firstName, lastName }: any) => {
  //   showNotification({
  //     withBorder: true,
  //     color: 'red',
  //     title: 'Deleting record',
  //     message: `Should delete ${firstName} ${lastName}, but we're not going to, because this is just a demo`,
  //   });
  // }, []);

  // const deleteSelectedRecords = useCallback(() => {
  //   showNotification({
  //     withBorder: true,
  //     color: 'red',
  //     title: 'Deleting multiple records',
  //     message: `Should delete ${selectedRecords.length} records, but we're not going to do that because deleting data is bad... and this is just a demo anyway`,
  //   });
  // }, [selectedRecords.length]);

  // const sendMessage = useCallback(({ firstName, lastName }: any) => {
  //   showNotification({
  //     withBorder: true,
  //     title: 'Sending message',
  //     message: `A real application could send a message to ${firstName} ${lastName}, but this is just a demo and we're not going to do that because we don't have a backend`,
  //     color: 'green',
  //   });
  // }, []);

  // const renderActions: DataTableColumn<any>['render'] = (record) => (
  //   <Group gap={4} justify="right" wrap="nowrap">
  //     <ActionIcon
  //       size="sm"
  //       variant="transparent"
  //       color="green"
  //       onClick={(e) => {
  //         e.stopPropagation(); // 👈 prevent triggering the row click function
  //         openModal({
  //           title: `Send message to ${record.firstName} ${record.lastName}`,
  //           // classNames: { header: classes.modalHeader, title: classes.modalTitle },
  //           children: (
  //             <>
  //               <TextInput mt="md" placeholder="Your message..." />
  //               <Group mt="md" gap="sm" justify="flex-end">
  //                 <Button variant="transparent" c="dimmed" onClick={() => closeAllModals()}>
  //                   Cancel
  //                 </Button>
  //                 <Button
  //                   color="green"
  //                   onClick={() => {
  //                     sendMessage(record);
  //                     closeAllModals();
  //                   }}
  //                 >
  //                   Send
  //                 </Button>
  //               </Group>
  //             </>
  //           ),
  //         });
  //       }}
  //     >
  //       <IconMessage size={16} />
  //     </ActionIcon>
  //     <ActionIcon
  //       size="sm"
  //       variant="transparent"
  //       onClick={(e) => {
  //         e.stopPropagation(); // 👈 prevent triggering the row click function
  //         editRecord(record);
  //       }}
  //     >
  //       <IconEdit size={16} />
  //     </ActionIcon>
  //   </Group>
  // );

  // const rowExpansion: DataTableProps<any>['rowExpansion'] = {
  //   allowMultiple: true,
  //   content: ({ record: { id, sex, firstName, lastName, birthDate, department } }) => (
  //     <Flex p="xs" pl={rem(50)} gap="md" align="center">
  //       <Image
  //         radius="sm"
  //         w={50}
  //         h={50}
  //         alt={`${firstName} ${lastName}`}
  //         src={`https://xsgames.co/randomusers/avatar.php?g=${sex}&q=${id}`}
  //       />
  //       <Text size="sm" fs="italic">
  //         {firstName} {lastName}, born on {dayjs(birthDate).format('MMM D YYYY')}, works in {department.name} department
  //         at {department.company.name}.
  //         <br />
  //         His office address is {department.company.streetAddress}, {department.company.city},{' '}
  //         {department.company.state}.
  //       </Text>
  //     </Flex>
  //   ),
  // };

  // const handleContextMenu: DataTableProps<any>['onRowContextMenu'] = ({ record, event }) =>
  //   showContextMenu([
  //     {
  //       key: 'edit',
  //       icon: <IconEdit size={14} />,
  //       title: `Edit ${record.firstName} ${record.lastName}`,
  //       onClick: () => editRecord(record),
  //     },
  //     {
  //       key: 'delete',
  //       title: `Delete ${record.firstName} ${record.lastName}`,
  //       icon: <IconTrashX size={14} />,
  //       color: 'red',
  //       onClick: () => deleteRecord(record),
  //     },
  //     { key: 'divider' },
  //     {
  //       key: 'deleteMany',
  //       hidden: selectedRecords.length <= 1 || !selectedRecords.map((r) => r.id).includes(record.id),
  //       title: `Delete ${selectedRecords.length} selected records`,
  //       icon: <IconTrash size={14} />,
  //       color: 'red',
  //       onClick: deleteSelectedRecords,
  //     },
  //   ])(event);

  // const now = dayjs();
  // const aboveXs = (theme: MantineTheme) => `(min-width: ${theme.breakpoints.xs})`;

  return(
    <div className="Test">
      Test Component

      {/* <DataTable
          className='mantine-datatable'
          // withTableBorder
          withColumnBorders
          records={records}
          columns={[
            { accessor: 'name', width: '80%' },
            { accessor: 'fullName', width: '40%', sortable: true },
            { accessor: 'code', width: '40%', sortable: true },
            { accessor: 'referral', width: '60%' },
            // { accessor: 'phoneNumbers?.number', width: 160, sortable: false },
            // { accessor: 'state', textAlign: 'right', sortable: false },
          ]}
          // sortStatus={sortStatus}
          // onSortStatusChange={handleSortChange}
          // noRecordsText="No records found"
          // sortIcons={{
          //   sorted: <IconChevronUp size={14} />,
          //   unsorted: <IconSelector size={14} />,
          // }}
          rowClassName={(record:any) =>
            record.id === focusedRowId ? 'focused-row' : '' // Add a class for the focused row
          }
          onRowClick={(record:any) => handleRowClick(record)} // Set focus on row click
          // styles={{
          //     curser : 'pointer', // Make rows clickable
          // }}
          onScroll={hideContextMenu}
          height="70dvh"
          minHeight={400}
          maxHeight={1000}
          withTableBorder
          highlightOnHover
          borderRadius="sm"
          // withColumnBorders
          striped
          verticalAlign="top"
          pinLastColumn
          // columns={columns}
          // fetching={isFetching}
          // records={data?.employees}
          page={page}
          onPageChange={setPage}
          totalRecords={300}
          recordsPerPage={PAGE_SIZE}
          sortStatus={sortStatus}
          onSortStatusChange={handleSortStatusChange}
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={setSelectedRecords}
          rowExpansion={rowExpansion}
          onRowContextMenu={handleContextMenu}

        /> */}
    </div>
  )
}

export default Test;
let dataTable = [
  {
    "name":"ali",
    "customerTypeId": 1,
    "zoneId": 101,
    "fullName": "علی رضایی",
    "nationalId": "۰۰۳۲۴۵۶۷۸۹",
    "code": 12345,
    "referral": "کد_معرف_۱۲۳",
    "image": {
      "fileDetails": "تصویر_پروفایل_علی_رضایی.jpg",
      "fileType": 1
    },
    "roles": [2],
    "addresses": [
      {
        "addressTypeId": 201,
        "addressLine": "تهران، خیابان انقلاب، کوچه ۱۲، پلاک ۵",
        "zipCode": "۱۱۱۳۴۵۶۷۸۹"
      }
    ],
    "phoneNumbers": [
      {
        "phoneNumberTypeId": 301,
        "number": "۰۹۱۲۱۲۳۴۵۶۷"
      }
    ],
    "appDates": [
      {
        "appDateTypeId": 401,
        "date": "2024-12-19T06:02:26.273Z"
      }
    ],
    "bankAccounts": [
      {
        "branchId": 501,
        "cardNumber": "۶۰۳۷۹۹۷۱۲۳۴۵۶۷۸۹",
        "accountNumber": "۱۲۳۴۵۶۷۸۹۰۱۱",
        "shabaNumber": "IR۱۲۳۴۵۰۰۰۱۰۰۰۱۲۳۴۵۶۷۸۹۰۱",
        "isCurrency": true
      }
    ],
    "guarantees": [
      {
        "guaranteeTypeId": 601,
        "name": "چک_حسن_انجام_کار",
        "amount": "۵۰۰۰۰۰۰"
      }
    ]
  },
  {
    "name":"amir",
    "customerTypeId": 2,
    "zoneId": 102,
    "fullName": "محمد احمدی",
    "nationalId": "۰۰۴۵۶۷۸۹۰۱",
    "code": 12346,
    "referral": "کد_معرف_۱۲۴",
    "image": {
      "fileDetails": "تصویر_پروفایل_محمد_احمدی.png",
      "fileType": 2
    },
    "roles": [1],
    "addresses": [
      {
        "addressTypeId": 202,
        "addressLine": "مشهد، خیابان آزادی، پلاک ۱۰",
        "zipCode": "۹۳۴۵۶۷۸۹۰۱"
      }
    ],
    "phoneNumbers": [
      {
        "phoneNumberTypeId": 302,
        "number": "۰۹۱۳۲۱۴۵۶۷۸"
      }
    ],
    "appDates": [
      {
        "appDateTypeId": 402,
        "date": "2024-12-18T08:00:00.000Z"
      }
    ],
    "bankAccounts": [
      {
        "branchId": 502,
        "cardNumber": "۶۰۳۷۹۹۷۶۵۴۳۲۱۸۹۰",
        "accountNumber": "۹۸۷۶۵۴۳۲۱۰۱۱",
        "shabaNumber": "IR۶۵۴۳۲۱۰۰۱۰۰۰۹۸۷۶۵۴۳۲۱۰۱۱",
        "isCurrency": false
      }
    ],
    "guarantees": [
      {
        "guaranteeTypeId": 602,
        "name": "سفته",
        "amount": "۷۰۰۰۰۰۰"
      }
    ]
  },
  {
    "name":"amir",
    "customerTypeId": 3,
    "zoneId": 103,
    "fullName": "زهرا مرادی",
    "nationalId": "۰۰۵۶۷۸۹۰۱۲",
    "code": 12347,
    "referral": "کد_معرف_۱۲۵",
    "image": {
      "fileDetails": "تصویر_پروفایل_زهرا_مرادی.jpg",
      "fileType": 1
    },
    "roles": [3],
    "addresses": [
      {
        "addressTypeId": 203,
        "addressLine": "شیراز، خیابان ملاصدرا، کوچه ۴",
        "zipCode": "۸۶۷۸۹۰۱۲۳۴"
      }
    ],
    "phoneNumbers": [
      {
        "phoneNumberTypeId": 303,
        "number": "۰۹۱۴۱۲۳۴۵۶۷"
      }
    ],
    "appDates": [
      {
        "appDateTypeId": 403,
        "date": "2024-12-17T14:30:00.000Z"
      }
    ],
    "bankAccounts": [
      {
        "branchId": 503,
        "cardNumber": "۶۰۳۷۹۹۷۶۸۹۰۱۲۳۴۵",
        "accountNumber": "۷۶۵۴۳۲۱۰۱۱۱",
        "shabaNumber": "IR۷۶۵۴۳۲۱۰۱۰۰۰۷۶۵۴۳۲۱۰۱۱۱",
        "isCurrency": true
      }
    ],
    "guarantees": [
      {
        "guaranteeTypeId": 603,
        "name": "چک تضمینی",
        "amount": "۹۰۰۰۰۰۰"
      }
    ]
  },

]