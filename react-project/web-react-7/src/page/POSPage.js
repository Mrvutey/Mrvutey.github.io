import { useEffect, useState, useRef } from "react";
import { request } from "../config/request";
import { Table, Button, Space, Modal, Input, Form, Select, message, Tag, DatePicker, Row, Col, InputNumber, Image, Alert, notification, Card } from "antd"
import { Config, formartDateClient, formartDateServer, isEmptyOrNull } from "../config/helper";
import MainPage from "../component/page/MainPage";
import dayjs from "dayjs";
import { CloseOutlined, DeleteFilled, UploadOutlined } from "@ant-design/icons";


const POSPage = () => {
    const [list, setList] = useState([]);
    const [role, setRole] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [paymentMethod, setPaymentMetod] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [formCat] = Form.useForm();
    const [fileSelected, setFileSelected] = useState(null); // past to api
    const [filePreview, setFilePreview] = useState(null); // preview in client
    const [subTotal,setSubTotal] = useState(0)
    const [totalDiscout,setTotalDiscount] = useState(0)
    const [totalToPay,setTotalToPay] = useState(0)

    useEffect(() => {
        formCat.setFieldsValue({
            Status: "1"
        })
        initInfo()
    }, [])

    const filterRef = useRef({
        txt_search: null,
        status: null,
        category_id: null
    })

    const fileRef = useRef(null);


    const initInfo = async () => {
        setLoading(true)
        const res = await request("pos/initInfo", "get", {});
        setLoading(false)
        if (res) {
            setCustomer(res.customer)
            setPaymentMetod(res.payment_method)
        }
    }

    const getList = async () => {
        if(isEmptyOrNull(filterRef.current.txt_search)){
            return;
        }
        var param = {
            txt_search: filterRef.current.txt_search
        }
        setLoading(true)
        const res = await request("pos/searchProduct", "get", param);
        setLoading(false)
        if (res) {
            if(res.list.length == 0){
                // message.error("Product not found!")
                // message.open({
                //     content: <Alert message={"Product not found!"} type="success" showIcon />
                // });
                notification.error({
                    message: "Error",
                    description: "Product not found!",
                    placement: "top",
                    style: {
                        backgroundColor: "hsl(359,100%,98%)",
                        outline: "1px solid #ff4d4f"
                    }
                })
            }else{
                var listTmp = res.list;
                listTmp[0]["QtyOrder"] = 1 // create new key "QtyOrder" 
                // check is exist => true => QtyOrder + 1
                var indexFind = list.findIndex((item)=>item.Id == listTmp[0].Id) // return index
                if(indexFind >= 0){
                    // update Old QtyOrder + 1
                    listTmp = list;
                    listTmp[indexFind].QtyOrder = (listTmp[indexFind].QtyOrder +1)
                }else{
                    listTmp = [...list,...listTmp] // concat array
                }
                // find subTotal
                // find totalDiscout
                // find totalToPay
                var findSubTotal = 0,findTotalDiscountPrice = 0, findTotalToPay = 0;
                listTmp.map((item,index)=>{
                    findSubTotal += (Number(item.QtyOrder) * Number(item.Price))
                    var Dis = item.Discount == null ? 0 : Number(item.Discount)
                    findTotalDiscountPrice = ( (Number(item.QtyOrder) * Number(item.Price)) * Dis/100);
                    findTotalToPay += ((Number(item.QtyOrder) * Number(item.Price))-findTotalDiscountPrice)
                })
                setSubTotal(findSubTotal)
                setTotalDiscount(findSubTotal - findTotalToPay)
                setTotalToPay(findTotalToPay)
                setList(listTmp);
            }
        }
    }
    const onClickBtnEdit = (item) => {
        formCat.setFieldsValue({
            ...item,
            Status: item.Status === null ? "0" : item.Status + "",
            "Image": item.Image
        })
        setFilePreview(Config.image_path + item.Image)
        setOpen(true)

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
                const res = await request("product/delete", "delete", data);
                if (res) {
                    message.success(res.message)
                    getList();
                }
            }
        })

    }
    const onFinish = async (item) => {
        var param = {
            "CustomerId": item.CustomerId,
            "PaymentMethodId": item.PaymentMethodId,
            "TotalPaid": item.PaidAmount,
            "Product": list
        }
        const res = await request("pos/checkout", "post", param);
        if (res) {
            if (res.message) {
                message.success(res.message)
                setList([])
                setTotalToPay(0)
                setTotalDiscount(0)
                setSubTotal(0)
                formCat.resetFields();
            }else{
                message.error("Something Wrong!")
            }
            // message.success(res.message)
            // getList();
            // onCloseModal();
        }
    }
    const onTextSearch = (value) => {
        filterRef.current.txt_search = (value)
        getList();
    }

    const onCloseModal = () => {
        formCat.resetFields();
        formCat.setFieldsValue({
            Status: "1"
        })
        setOpen(false)
        onRemoveFileSelected();
    }

    const onSelectCategory = (value) => {
        filterRef.current.category_id = value
        getList();
    }

    const onChnageFile = (e) => {
        var file = e.target.files[0];
        var filePreview = URL.createObjectURL(file);
        setFileSelected(file);
        setFilePreview(filePreview);
    }

    const onRemoveFileSelected = () => {
        fileRef.current.value = null;
        setFileSelected(null)
        setFilePreview(null)
    }

    return (
        <MainPage loading={loading}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10 }}>
                <Space>
                    <div className="txt_title">Pont Of Sale (POS)</div>
                    <Input.Search allowClear  placeholder="Name or Code" onSearch={onTextSearch} />
                    <Button type="primary" onClick={onCloseModal}>Clear</Button>
                </Space>
            </div>
            <Row gutter={16} style={{paddingTop:10,paddingBottom:10,backgroundColor:"#EEE",minHeight:"85vh",borderRadius:10}}>
                <Col span={16} >
                    <Card>
                        <Table
                            bordered
                            dataSource={list}
                            pagination={false}

                            // pagination={{
                            //     pageSize: 5,
                            // }}

                            columns={[
                                {
                                    key: "Name",
                                    title: "Name",
                                    dataIndex: "Name",
                                    render: (value, item, index) => {
                                        return (
                                            <div>
                                                <div style={{ fontWeight: "bold" }}>{index + 1}. {item.Name}</div>
                                                <div>Fin <Tag style={{ width: 50, textAlign: "center" }} color={(item.Qty > 5) ? "green" : "red"}>{item.Qty}</Tag></div>
                                                <div style={{ fontSize: 12, color: "#888" }}>{item.Description}</div>
                                            </div>
                                        )
                                    }
                                },
                                {
                                    key: "QtyOrder",
                                    title: "Qty",
                                    dataIndex: "QtyOrder"
                                },
                                {
                                    key: "Price",
                                    title: "Price",
                                    dataIndex: "Price"
                                },
                                {
                                    key: "Dis",
                                    title: "Dis",
                                    dataIndex: "Discount",
                                },
                                {
                                    key: "Total",
                                    title: "Total",
                                    render : (value,items,index) => {
                                        var QtyOrder = items.QtyOrder;
                                        var Price = items.Price;
                                        var Dis = (items.Discount == null ? 0 : items.Discount); // 10,20
                                        var DisouctPrice = (QtyOrder * Price) * Dis/100;
                                        var Total = (QtyOrder * Price) - DisouctPrice;
                                        return Total;

                                    }
                                },
                                {
                                    key: "Image",
                                    title: "Image",
                                    dataIndex: "Image",
                                    render: (value) => {
                                        if (value != null && value != "") {
                                            return (
                                                <Image
                                                    src={Config.image_path + value}
                                                    alt=""
                                                    width={60}
                                                />
                                            )
                                        } else {
                                            return (
                                                <div style={{ height: 40, width: 60, backgroundColor: "#888" }} />
                                            )

                                        }

                                    }
                                },
                                {
                                    key: "Action",
                                    title: "Action",
                                    dataIndex: "Status",
                                    align: 'right',
                                    width: 120,
                                    render: (value, item, index) => (
                                        <Space>
                                            <Button onClick={() => onClickBtnDelete(item)} type="primary" danger>
                                                <DeleteFilled />
                                            </Button>
                                        </Space>
                                    )
                                }
                            ]}
                        />
                    </Card>
                </Col>
                
                <Col span={8}>
                    <Card>
                        <Form
                            form={formCat}
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Customer"
                                name={"CustomerId"}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Customer!',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select Category"
                                    showSearch
                                    optionFilterProp="label"
                                    style={{ width: "100%" }}
                                    allowClear
                                >
                                    {customer.map((item, index) => (
                                        <Select.Option label={item.Name} key={index} value={item.Id}>{item.Name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Payment Method"
                                name={"PaymentMethodId"}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Payment Method!',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select Category"
                                    showSearch
                                    optionFilterProp="label"
                                    style={{ width: "100%" }}
                                    allowClear
                                >
                                    {paymentMethod.map((item, index) => (
                                        <Select.Option label={item.Name} key={index} value={item.Id}>{item.Name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 10 }}>
                                <div>Sub Total</div>
                                <div>{subTotal}$</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 10 }}>
                                <div>Dicount</div>
                                <div>{totalDiscout}$</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 10 }}>
                                <div>Total</div>
                                <div>{totalToPay}$</div>
                            </div>

                            <Form.Item name={"PaidAmount"} style={{ textAlign: "right" }}>
                                <Space>
                                    <InputNumber placeholder="Amount to pay" style={{width:"100%"}} />
                                </Space>
                            </Form.Item>


                            <Form.Item style={{ textAlign: "right" }}>
                                <Space>
                                    <Button type="primary" htmlType="submit">Checkout</Button>
                                </Space>
                            </Form.Item>

                        </Form>
                    </Card>
                </Col>
            </Row>

            <Modal
                title={(formCat.getFieldValue("Id") == null) ? "New Product" : "Update Product"}
                open={open}
                onCancel={onCloseModal}
                footer={null}
                width={600}
                maskClosable={false}
            >
                <Form
                    form={formCat}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Row gutter={15}>
                        <Col span={12}>
                            <Form.Item
                                label="Qty"
                                name={"Qty"}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Qty!',
                                    },
                                ]}
                            >
                                <InputNumber placeholder="Qty" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Price"
                                name={"Price"}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Price!',
                                    },
                                ]}
                            >
                                <InputNumber placeholder="Price" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item style={{ textAlign: "right" }}>
                        <Space>
                            <Button onClick={onCloseModal}>Cancel</Button>
                            <Button type="primary" htmlType="submit">{formCat.getFieldValue("Id") == null ? "Save" : "Update"}</Button>
                        </Space>
                    </Form.Item>

                </Form>

            </Modal>
        </MainPage>
    )
}

export default POSPage