import { useEffect, useState, useRef } from "react";
import { request } from "../config/request";
import { Table, Button, Space, Modal, Input, Form, Select, message, Tag, DatePicker, Row, Col, InputNumber, Image } from "antd"
import { Config, formartDateClient, formartDateServer,isEmptyOrNull } from "../config/helper";
import MainPage from "../component/page/MainPage";
import dayjs from "dayjs";
import { CloseOutlined, DeleteFilled, UploadOutlined } from "@ant-design/icons";


const ProductPage = () => {
    const [list, setList] = useState([]);
    const [role, setRole] = useState([]);
    const [category,setCategory] = useState([]);
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [formCat] = Form.useForm();
    const [fileSelected,setFileSelected] = useState(null); // past to api
    const [filePreview,setFilePreview] = useState(null); // preview in client

    useEffect(() => {
        formCat.setFieldsValue({
            Status: "1"
        })
        getList();
    }, [])

    const filterRef = useRef({
        txt_search: null,
        status: null,
        category_id : null
    })

    const fileRef = useRef(null);

    const getList = async () => {
        var param = {
            txt_search: filterRef.current.txt_search,
            status: filterRef.current.status,
            category_id : filterRef.current.category_id,
        }
        setLoading(true)
        const res = await request("product/getlist", "get", param);
        setLoading(false)
        if (res) {
            setList(res.list)
            setCategory(res.category)
        }
    }
    const onClickBtnEdit = (item) => {
        formCat.setFieldsValue({
            ...item,
            Status: item.Status === null ? "0" : item.Status+"",
            "Image":item.Image
        })
        setFilePreview(Config.image_path+item.Image)
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
        var Id = formCat.getFieldValue("Id")
        var form = new FormData();
        form.append("Id",Id);
        form.append("Name",item.Name);
        form.append("Description",item.Description);
        form.append("Qty",item.Qty);
        form.append("Price",item.Price);
        form.append("Status",item.Status);
        form.append("Discount",item.Discount);
        form.append("CategoryId",item.CategoryId);
        form.append("PreImage",formCat.getFieldValue("Image"));
        if(fileSelected != null){
            form.append("image",fileSelected);
        }
        var method = (Id == null ? "post" : "put")
        const url = (Id == null ? "product/create" : "product/update")
        const res = await request(url, method, form);
        if (res) {
            if(res.error){
                var mgs = ""
                Object.keys(res.message).map((key,index)=>{
                    mgs += res.message[key]
                })
                message.error(mgs)
                return false
            }
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
                    <div className="txt_title">Product</div>
                    <Input.Search allowClear onChange={onChangeSearch} placeholder="Name or Code" onSearch={onTextSearch} />
                    <Select onChange={onChangeStatus} placeholder="Status" allowClear style={{ width: 120 }} >
                        <Select.Option value={"1"}>Active</Select.Option>
                        <Select.Option value={"0"}>InActive</Select.Option>
                    </Select>
                    <Select 
                        placeholder="Select Category"
                        showSearch 
                        optionFilterProp="label"
                        onChange={onSelectCategory}
                        style={{width:120}}
                        allowClear
                    >
                        {category.map((item,index)=>(
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
                        key: "Name",
                        title: "Name",
                        dataIndex: "Name",
                    },
                    {
                        key: "Description",
                        title: "Description",
                        dataIndex: "Description",
                    },
                    {
                        key: "Qty",
                        title: "Qty",
                        dataIndex: "Qty"
                    },
                    {
                        key: "Price",
                        title: "Price",
                        dataIndex: "Price"
                    },
                    {
                        key: "Discount",
                        title: "Discount",
                        dataIndex: "Discount",
                    },
                    {
                        key: "Image",
                        title: "Image",
                        dataIndex: "Image",
                        render : (value) => {
                            if(value != null && value != ""){
                                return (
                                    <Image 
                                        src={Config.image_path+value}
                                        alt=""
                                        width={60}
                                    />
                                )
                            }else{
                                return (
                                    <div style={{height:40,width:60,backgroundColor:"#888"}}/>
                                )
                               
                            }
                                
                        }
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
                title={(formCat.getFieldValue("Id") == null) ? "New Product" : "Update Product"}
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
                    <Row gutter={15}>
                        <Col span={12}>
                            <Form.Item
                                label="Product Name"
                                name={"Name"}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input product name!',
                                    },
                                ]}
                            >
                                <Input placeholder="Product Name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Description"
                                name={"Description"}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Description!',
                                    },
                                ]}
                            >
                                <Input placeholder="Description" />
                            </Form.Item>
                        </Col>
                    </Row>

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
                                <InputNumber placeholder="Qty"  style={{width: '100%'}}/>
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
                                <InputNumber  placeholder="Price" style={{width: '100%'}}/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={15}>
                        <Col span={12}>
                            <Form.Item
                                label="Discount"
                                name={"Discount"}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Discount!',
                                    },
                                ]}
                            >
                                <Input placeholder="Discount" />
                            </Form.Item>
                        </Col>
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
                    </Row>

                    <Row gutter={15}>
                        <Col span={12}>
                            <Form.Item
                                label="Category"
                                name={"CategoryId"}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select category',
                                    },
                                ]}
                            >
                                <Select 
                                    placeholder="Select Category"
                                    showSearch 
                                    optionFilterProp="label"
                                >
                                    {category.map((item,index)=>(
                                        <Select.Option label={item.Name} key={index} value={item.Id}>{item.Name}</Select.Option>
                                    ))}
                                </Select>

                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Upload Image"
                            >
                                <>
                                    <div style={{width:70,position:'relative'}}>
                                        {!isEmptyOrNull(filePreview) && 
                                            <CloseOutlined 
                                                onClick={onRemoveFileSelected} 
                                                style={{color:"red",fontSize:18,position:'absolute',top:-6,right:-6,backgroundColor:"#EEE",padding:3}} />
                                        }
                                        {!isEmptyOrNull(filePreview) ? 
                                            <img 
                                                src={filePreview}
                                                width={70}
                                                alt=""
                                            />
                                            :
                                            <div style={{width:70,height:70,backgroundColor:'#EEE'  }}></div>
                                        }
                                    </div>
                                    {/* <input onChange={onChnageFile} ref={fileRef} type="file"  /> */}
                                    <input onChange={onChnageFile} ref={fileRef} type="file" id="selectedFile" style={{display:"none"}} />
                                    <button 
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            document.getElementById('selectedFile').click();
                                        }} 
                                        style={{marginTop:10,marginLeft:3}}
                                    >
                                        Brows...
                                    </button>

                                    {/* <div 
                                        onClick={()=>{
                                            document.getElementById('selectedFile').click();
                                        }} 
                                        style={{width:70,height:70,backgroundColor:'#aaa',display:'flex',alignItems:'center',justifyContent:"center"}}
                                    >
                                        <UploadOutlined style={{margin:'auto'}} />
                                    </div> */}
                                </>
                                
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

export default ProductPage