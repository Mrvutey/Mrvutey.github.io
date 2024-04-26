import {useEffect,useRef,useState} from "react";
import axios from "axios"
import { request } from "../config/request";
import {Button,Checkbox,DatePicker,Flex,Input, InputNumber, QRCode, Radio, Select, Space, Spin,Modal} from "antd";
import {DeleteFilled,SaveFilled} from "@ant-design/icons";
import { BlobProvider, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PDF_Invoice from "../component/print/PDF_Invoice";
import { useReactToPrint } from 'react-to-print'
import { Prinft_Invoice } from "../component/print/Prinft_Invoice";
// import { html2pdf } from "js-html2pdf"
import html2pdf from "html2pdf.js"
const HomePage = () => {
    const {Option}  = Select
    const [open,seOpen] = useState(false);
    const [list,setList] = useState([]);
    const [message,setMessage] = useState("")
    const [role,setRole] = useState("")
    const [a,setA] = useState(undefined)
    useEffect(()=>{
        getListCategory();
    },[])

    const getListCategory = async () => {
        const res = await request("product/getlist","get",{});
        if(res){
            setList(res.list);
        }
        // axios({
        //     url : "http://localhost:8081/api/customer/getlist",
        //     method : "get",
        //     data : {
        //         // Fistname:"Dara",
        //         // Gender:"Dara",
        //     }
        // }).then(res=>{
        //     console.log(res.data)
        //     setList(res.data.list)
        //     setMessage(res.data.message)
        //     setRole(res.data.role) // 
        // }).catch(error=>{
        //     console.log(error)
        // })
    }

    const options = [];
    for (let i = 10; i < 36; i++) {
        options.push({
            value: i.toString(36) + i,
            label: i.toString(36) + i,
        });
    }

    const onOpenModal = () => {
        seOpen(true)
    }

    const handleOk = () => {
        seOpen(false)
    }

    const handleCancel = () => {
        seOpen(false)
    }
    const urlDownload = useRef("")
    const pdfRef = useRef("")

    const handlePrint = useReactToPrint({
        content: () => pdfRef.current,
        onAfterPrint : () => {},
        onBeforePrint : () => {},
        onPrintError : () => {},
        onBeforeGetContent : () => {},
        removeAfterPrint: true,

        print: async (printIframe) => {
            const document = printIframe.contentDocument;
            if (document) {
              const html = document.getElementById("element-to-download-as-pdf");
              console.log(html)
              const options = {
                margin: 0,
                filename: "the-joys-of-buying-over-building.pdf",
                jdPDF: { 
                    unit: "mm",
                    format: "a3",
                    orientation: "portrait" 
                }
              };
            //   const exporter = new html2pdf(html, options);
            //   await exporter.get(options);
            //   await html2pdf(html, options);

            html2pdf().from(html).set(options).save();
            
            // Old monolithic-style usage:
            // html2pdf(html, options);
            }
        },
    });

    return (
        <div>
            <div className="txt_big">CSS</div>
            <h1></h1>
            <h1 className=""></h1>
            {/* <PDFDownloadLink
                document={ <PDF_Invoice />}
                fileName='somename.pdf'
            >
                {({ blob, url, loading, error }) => {
                    if (!loading && url) {
                        urlDownload.current = url;
                    }
                }}
            </PDFDownloadLink> */}

            <Button onClick={()=>{
                 const tmpA = document.createElement("a");
                 tmpA.href = urlDownload.current;
                 tmpA.download = "Product-code";
                 tmpA.click();
            }}>Dwoload PDF</Button>


             {/* <BlobProvider
                ref={pdfRef}
                document={ <PDF_Invoice />}
                fileName='somename.pdf'
            >
                {({ url, blob }) => (
                    <a href={url} target="_blank">
                        <span>Print</span>
                    </a>
                )}
            </BlobProvider> */}
            <div style={{display:'none'}}>
                <Prinft_Invoice ref={pdfRef} />
            </div>

            <Button 
                onClick={handlePrint}
            >
                Printf
            </Button>


        
            <Flex gap={"small"}>
                <Button disabled={true}>Save1</Button>
                <Button loading={true} type="primary">Save1</Button>
                <Button size="small" type="dashed">Save2</Button>
                <Button style={{width:200,marginTop:10}} danger={true} type="primary">Save2</Button>
            </Flex>
            <div style={{width:300,backgroundColor:"lightgray",marginTop:10}}>
                <Button block={true}>AAAA</Button>
            </div>

            <Button icon={<DeleteFilled />}>Delete</Button>
            <Button danger={true} icon={<DeleteFilled />} />
            <SaveFilled style={{fontSize:35,margin:20}}/>

            <Space>
                <Input placeholder="username" /> <br/>
                <Input placeholder="Lastname" />
                <Input.TextArea placeholder="Des" />
                <InputNumber />
                <Checkbox />
                <Radio />
                <Select style={{width: 200}}>
                    <Option value="1">Active </Option>
                    <Option value="0">InActive </Option>
                </Select>
                <DatePicker />

                <Select
                    mode="tags"
                    style={{
                        width: 300,
                    }}
                    placeholder="Tags Mode"
                    // onChange={handleChange}
                    options={options}
                />
                <QRCode value={"https://"} />
                <Spin spinning={true} />
            </Space>

            <br/>
            <Button onClick={onOpenModal}>Open Modal</Button>
            <Modal 
                title="Basic Modal" 
                open={open} 
                onOk={handleOk} 
                onCancel={handleCancel}
            >
                <Input placeholder="A" />
                <Input placeholder="A" />
            </Modal>

        </div>
    )
  
    // return (
    //     <div>
    //         <h1>HomePage</h1>
    //         <h1>message : {message}</h1>
    //         <h1>role : {role+""}</h1>
    //         <h1>List : {list.length}</h1>
    //         {a && <h1>a : {a.name}</h1>}
    //         <h1>a : {a?.name}</h1>
    //         {(list.length > 0) && <h1>Username : {list[0].Lastname}-{list[0].Lastname}</h1>}
    //         <div>
    //             {list.map((item,index)=>(
    //                 <div style={{padding:10,backgroundColor:'green',marginTop:10}}>
    //                     <div>{index+1}. {item.Firstname}-{item.Lastname}</div>
    //                     <div>Gender : {item.Name}</div>
    //                     <div>Gender : {item.Tel}</div>
    //                     <div>Gender : {item.Email}</div>
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // )
}

export default HomePage;