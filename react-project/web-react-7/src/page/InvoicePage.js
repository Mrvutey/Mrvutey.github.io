import { useEffect, useState, useRef } from "react";
import { request } from "../config/request";
import { Table, Button, Space, Modal, Input, Form, Select, message, Tag, DatePicker, Row, Col, InputNumber, Image } from "antd"
import { Config, formartDateClient, formartDateServer } from "../config/helper";
import MainPage from "../component/page/MainPage";
import dayjs from "dayjs";

const InvoicePage = () => {
    const [list, setList] = useState([]);
    const [invoiceDetails,setInvoiceDetails] = useState([]);
    const [role, setRole] = useState([]);
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [formCat] = Form.useForm();

    useEffect(() => {
        formCat.setFieldsValue({
            Status: "1"
        })
        getList();
    }, [])

    const filterRef = useRef({
        txt_search: null,
        status: null,
        role_id : null
    })

    const getList = async () => {
        setLoading(true)
        var param = {
            txt_search: filterRef.current.txt_search,
            status: filterRef.current.status,
            role_id : filterRef.current.role_id,
        }
        const res = await request("invoice", "get", param);
        setLoading(false)
        if (res) {
            setList(res.list)
        }
    }
    const onClickBtnEdit = (item) => {
        formCat.setFieldsValue({
            ...item,
            Dob:dayjs(item.Dob),
            Gender:item.Gender+"",
            Status:item.Status+"",
        })

    }
    const onClickBtnDelete = async (item) => {
        Modal.confirm({
            title: "Delete",
            content: "Are you sure you want to delete ?",
            okText: "Yes",
            cancelText: "No",
            okType: "danger",
            centered: true,
            onOk: async () => {
                var data = {
                    Id: item.Id
                }
                const res = await request("employee/delete", "delete", data);
                if (res) {
                    message.success(res.message)
                    getList();
                }
            }
        })

    }
    
    const onTextSearch = (value) => {

    }
    const onChangeSearch = (e) => {
        filterRef.current.txt_search = (e.target.value)
        getList();
    }
    const onChangeStatus = (value) => {
        filterRef.current.status = value
        getList();
    }
    const onCloseModal = () => {
        formCat.resetFields();
        formCat.setFieldsValue({
            Status: "1"
        })
    }

    const onSelectRole = (value) => {
        filterRef.current.role_id = value
        getList();
    }

    const onViewDetails = async (Id) => {
        setLoading(true)
        const res = await request("invoice_details/"+Id, "get", {});
        setLoading(false)
        if (res) {
            setInvoiceDetails(res.list)
            setOpen(true)
        }
    }

    return (
        <MainPage loading={loading}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10 }}>
                <Space>
                    <div className="txt_title">Invoice</div>
                    <Input.Search allowClear onChange={onChangeSearch} placeholder="Name or Code" onSearch={onTextSearch} />
                    <Select onChange={onChangeStatus} placeholder="Status" allowClear style={{ width: 120 }} >
                        <Select.Option value={"1"}>Active</Select.Option>
                        <Select.Option value={"0"}>InActive</Select.Option>
                    </Select>
                    <Select 
                        placeholder="Select role"
                        showSearch 
                        optionFilterProp="label"
                        onChange={onSelectRole}
                        style={{width:120}}
                        allowClear
                    >
                        {role.map((item,index)=>(
                            <Select.Option label={item.Name} key={index} value={item.Id}>{item.Name}</Select.Option>
                        ))}
                    </Select>
                </Space>
            </div>
            <Table
                dataSource={list}
                pagination={{
                    pageSize: 5,
                }}

                
                PaymentMathod
                OrderStatus

                columns={[
                    {
                        key: "No",
                        title: "No",
                        dataIndex: "Name",
                        render: (value, item, index) => (index + 1)
                    },
                    {
                        key: "Id",
                        title: "Id",
                        dataIndex: "Id",
                    },
                    {
                        key: "CustomerName",
                        title: "Customer",
                        dataIndex: "CustomerName",
                    },
                    {
                        key: "EmployeeName",
                        title: "Employee",
                        dataIndex: "EmployeeName",
                    },
                    {
                        key: "TotalQty",
                        title: "TotalQty",
                        dataIndex: "TotalQty",
                    },
                    {
                        key: "TotalAmount",
                        title: "TotalAmount",
                        dataIndex: "TotalAmount",
                    },
                    {
                        key: "TotalPaid",
                        title: "TotalPaid",
                        dataIndex: "TotalPaid",
                    },
                    {
                        key: "PaymentMathod",
                        title: "PaymentMathod",
                        dataIndex: "PaymentMathod",
                    },
                    {
                        key: "OrderStatus",
                        title: "OrderStatus",
                        dataIndex: "OrderStatus",
                    },
                    {
                        key: "CreateAt",
                        title: "CreateAt",
                        dataIndex: "CreateAt",
                        render: (value) => formartDateClient(value)
                    },
                    {
                        key: "Item Details",
                        title: "Item Details",
                        dataIndex: "Id",
                        render: (value) => {
                            return (
                                <Button onClick={()=>onViewDetails(value)} type="link">Item Details</Button>
                            )
                        }
                    },
                    // {
                    //     key: "Action",
                    //     title: "Action",
                    //     dataIndex: "Status",
                    //     align:'right',
                    //     width:120,
                    //     render: (value, item, index) => (
                    //         <Space>
                    //             <Button onClick={() => onClickBtnEdit(item)} type="primary">Edit</Button>
                    //             <Button onClick={() => onClickBtnDelete(item)} type="primary" danger>Delete</Button>
                    //         </Space>
                    //     )
                    // }
                ]}
            />
            <Modal 
                open={open}
                onCancel={() => {setOpen(false)}}
                title="Invoice Details"
            >
                {invoiceDetails.map((item,index)=>{
                    return (
                        <Row style={{paddingTop:10,paddingBottom:10,borderBottomWidth:1,borderBottomColor:"#eee"}}>
                            <Col span={12}>
                                <Row>
                                    <Col>
                                        <Image width={80} src={Config.image_path + item.Image}/>
                                    </Col>
                                    <Col style={{paddingLeft:10}}>
                                        <div>{item.Name}</div>
                                        <div>{item.Descrition}</div>
                                    </Col>
                                </Row>
                               
                            </Col>
                            <Col span={12} style={{textAlign:"right"}}>
                                <div>{item.Price}$</div>
                                <div>{item.Qty}PCS</div>
                                <div>{item.Discount || 0}%</div>
                            </Col>
                        </Row>
                    )
                })}
            </Modal>
        </MainPage>
    )
}

export default InvoicePage