import { useEffect, useState, useRef } from "react";
import { request } from "../config/request";
import { Table, Button, Space, Modal, Input, Form, Select, message, Tag, DatePicker, Row, Col, InputNumber } from "antd"
import { formartDateClient, formartDateServer } from "../config/helper";
import MainPage from "../component/page/MainPage";
import dayjs from "dayjs";

const EmployeePage = () => {
    const [list, setList] = useState([]);
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
        const res = await request("employee/getlist", "get", param);
        setLoading(false)
        if (res) {
            setList(res.list)
            setRole(res.role)
        }
    }
    const onClickBtnEdit = (item) => {
        formCat.setFieldsValue({
            ...item,
            Dob:dayjs(item.Dob),
            Gender:item.Gender+"",
            Status:item.Status+"",
        })
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
                const res = await request("employee/delete", "delete", data);
                if (res) {
                    message.success(res.message)
                    getList();
                }
            }
        })

    }
    const onFinish = async (item) => {
        var Id = formCat.getFieldValue("Id")
        var data = {
            ...item,
            Id:Id,
            Dob:formartDateServer(item.Dob)
        }
        var method = (Id == null ? "post" : "put")
        const url = (Id == null ? "employee/create" : "employee/update")
        const res = await request(url, method, data);
        if (res) {
            message.success(res.message)
            getList();
            onCloseModal();
        }
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
        setOpen(false)
    }

    const onSelectRole = (value) => {
        filterRef.current.role_id = value
        getList();
    }

    return (
        <MainPage loading={loading}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10 }}>
                <Space>
                    <div className="txt_title">Employee</div>
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

                <Button onClick={() => { setOpen(true) }} type="primary">New</Button>
            </div>
            <Table
                dataSource={list}
                pagination={{
                    pageSize: 5,
                }}
                columns={[
                    {
                        key: "No",
                        title: "No",
                        dataIndex: "Name",
                        render: (value, item, index) => (index + 1)
                    },
                    {
                        key: "Firstname",
                        title: "Firstname",
                        dataIndex: "Firstname",
                    },
                    {
                        key: "Lastname",
                        title: "Lastname",
                        dataIndex: "Lastname",
                    },
                    {
                        key: "Gender",
                        title: "Gender",
                        dataIndex: "Gender",
                        render: (value) => value == 1 ? "Male" : "Female"
                    },
                    {
                        key: "Dob",
                        title: "Dob",
                        dataIndex: "Dob",
                        render: (value) => formartDateClient(value)
                    },
                    {
                        key: "Tel",
                        title: "Tel",
                        dataIndex: "Tel",
                    },
                    {
                        key: "RoleName",
                        title: "Role",
                        dataIndex: "RoleName",
                    },
                    {
                        key: "Status",
                        title: "Status",
                        dataIndex: "Status",
                        render: (value) => (value == 1 ? <Tag color="green" >Actived</Tag> : <Tag color="red">InActived</Tag>)
                    },
                    {
                        key: "CreateAt",
                        title: "CreateAt",
                        dataIndex: "CreateAt",
                        render: (value) => formartDateClient(value)
                    },
                    {
                        key: "Action",
                        title: "Action",
                        dataIndex: "Status",
                        align:'right',
                        width:120,
                        render: (value, item, index) => (
                            <Space>
                                <Button onClick={() => onClickBtnEdit(item)} type="primary">Edit</Button>
                                <Button onClick={() => onClickBtnDelete(item)} type="primary" danger>Delete</Button>
                            </Space>
                        )
                    }
                ]}
            />
            <Modal
                title={(formCat.getFieldValue("Id") == null) ? "New Employee" : "Update Employee"}
                open={open}
                onCancel={onCloseModal}
                footer={null}
                width={600}
                maskClosable={false}
            >
                {/* aaaa */}
                {/* RoleId, Firstname, Lastname, Gender, Dob, Tel, Email, Address, Status, Image, Salary */}
                <Form
                    form={formCat}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Row gutter={5}>
                        <Col span={12}>
                            <Form.Item
                                label="Firstname"
                                name={"Firstname"}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Firstname!',
                                    },
                                ]}
                            >
                                <Input placeholder="Firstname" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Lastname"
                                name={"Lastname"}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Lastname!',
                                    },
                                ]}
                            >
                                <Input placeholder="Lastname" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={5}>
                        <Col span={12}>
                            <Form.Item
                                label="Gender"
                                name={"Gender"}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Gender!',
                                    },
                                ]}
                            >
                                <Select placeholder="Select Gender">
                                    <Select.Option value="1">Male</Select.Option>
                                    <Select.Option value="0">Female</Select.Option>
                                    <Select.Option value="2">Other</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Dob"
                                name={"Dob"}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Dob!',
                                    },
                                ]}
                            >
                                <DatePicker 
                                    style={{width:"100%"}}
                                    format={"DD/MM/YYYY"}
                                    placeholder="Dob"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={5}>
                        <Col span={12}>
                            <Form.Item
                                label="Tel"
                                name={"Tel"}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Tel!',
                                    },
                                ]}
                            >
                                <Input placeholder="Tel" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Email"
                                name={"Email"}
                            >
                                <Input placeholder="Email" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={5}>
                        <Col span={12}>
                            <Form.Item
                                label="Status"
                                name={"Status"}
                            >
                                <Select defaultValue={"1"} >
                                    <Select.Option value="1">Actived</Select.Option>
                                    <Select.Option value="0">InActived</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Salary"
                                name={"Salary"}
                            >
                                <InputNumber style={{width:'100%'}} placeholder="Salary" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={5}>
                        <Col span={12}>
                            <Form.Item
                                label="Role"
                                name={"RoleId"}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select role',
                                    },
                                ]}
                            >
                                <Select 
                                    placeholder="Select role"
                                    showSearch 
                                    optionFilterProp="label"
                                >
                                    {role.map((item,index)=>(
                                        <Select.Option label={item.Name} key={index} value={item.Id}>{item.Name}</Select.Option>
                                    ))}
                                </Select>

                                {/* <Select 
                                    placeholder="Select role"
                                    showSearch 
                                    optionFilterProp="label"
                                    options={role.map((item)=>(
                                        {
                                            label : item.Name,
                                            value : item.value,
                                        }
                                    ))}
                                >
                                </Select> */}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
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

export default EmployeePage