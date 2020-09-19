import React from 'react';
import MaterialTable from 'material-table';

const columns = [
    {field:'fromCustomerName', title:'Khách Hàng gửi'},
    {field:'fromAddress', title: 'Địa chỉ'},
    {field:'fromPhoneNum', title: 'Điện thoại'},
    {field:'toCustomerName', title: 'Khách Hàng nhận'},
    {field:'toAddress', title: 'Địa chỉ'},
    {field:'toPhoneNum', title: 'Điện thoại'},
    {field:'packageName', title: 'Tên bưu kiện'},
    {field:'packageWeight', title: 'Cân nặng'},
    {field:'PickupDate', title: 'Ngày nhận'},
]

function ListOrder(props) {

    return (
        <MaterialTable
        options={{search: true}} title={"Danh Sách Đơn Hàng"}
        columns={columns}
    />
    )
}

export default ListOrder;