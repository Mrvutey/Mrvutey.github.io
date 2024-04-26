import { Card, Spin } from "antd"
import { useEffect } from "react"
const MainPage = ({title,children,loading=false}) => {
    useEffect(()=>{
        document.title = (title || "NIT")  
    },[])
    return (
        <div>
            <Spin spinning={loading} >
                <Card style={{minHeight:"calc(100vh - 80px)"}}>
                    {children}
                </Card>
            </Spin>
        </div>
    )
}
export default MainPage