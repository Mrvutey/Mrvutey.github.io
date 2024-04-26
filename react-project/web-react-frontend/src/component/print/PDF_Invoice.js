import ReactPDF, { StyleSheet,Document,Page,View,Text,Line,Image,PDFDownloadLink,PDFViewer } from "@react-pdf/renderer";
import Logo from "../../assets/image/nit.jpeg"
import { forwardRef } from "react";


// call 1
{/* <PDFDownloadLink
    document={ <PDF_Invoice />}
    fileName='somename.pdf'
>
    {({ blob, url, loading, error }) => {
        if (!loading && url) {
            // urlDownload.current = url;
            return loading ? <Button>Loading</Button> :  <Button>Dwoload</Button>
        }
    }}
</PDFDownloadLink> */}

// call 2
{/* <PDFDownloadLink
document={ <PDF_Invoice />}
fileName='somename.pdf'
>
{({ blob, url, loading, error }) => {
    if (!loading && url) {
        urlDownload.current = url;
    }
}}
</PDFDownloadLink>

<Button onClick={()=>{
 const tmpA = document.createElement("a");
 tmpA.href = urlDownload.current;
 tmpA.download = "Product-code";
 tmpA.click();
}}>Dwoload PDF</Button> */}


const PDF_Invoice = forwardRef((props,ref) => {
    const data = [
        {
            barcode : "STD020324",
            name : "men jean",
            styles : "STY0994854"
        },
        {
            barcode : "STD020326",
            name : "men jean",
            styles : "STY0994856"
        },
        {
            barcode : "STD020327",
            name : "men jean",
            styles : "STY0994857"
        },
        {
            barcode : "STD020328",
            name : "men jean",
            styles : "STY0994858"
        }
    ]

    const labale1 = {
        ...styles.txtMain,width:90,textAlign:"right"
    }
    const labale2 = {
        ...styles.txtNormal,width:100,paddingLeft:10
    }
    const labale3 = {
        ...styles.txtMain,width:90
    }
    const labale4= {
        ...styles.txtNormal,width:100
    }
    return (
        <Document ref={ref}>
            <Page size={"A4"} orientation="landscape" style={{padding:20}}>
                <View style={styles.rowHeader}>
                    <View style={styles.rowHeaderG1}>
                        <Image 
                            src={Logo}
                            style={{width:60,height:60}}
                        />
                        
                        <Text style={styles.txtMain}>ZANDO Cambodia Co., Ltd</Text>
                        <Text style={styles.txtMain}>MAIN WAREHOUSE</Text>
                        <Text style={{...styles.txtNormal,width:200}}>#St 336, Sangkat Vealvong, Khan 7 Makara,Phnom Penh, Cambodia</Text>
                        <Text style={styles.txtNormal}>(+855) 85 357006</Text>

                        <Text style={{...styles.txtMain,marginTop:5}}>To </Text>
                        <View style={styles.rowLabel}>
                            <Text style={labale3}>Supplier name</Text>
                            <Text style={labale4}>: S&H Vietnam</Text>
                        </View>
                        <View style={styles.rowLabel}>
                            <Text style={labale3}>Address</Text>
                            <Text style={labale4}>: No 123, Lane 34,...</Text>
                        </View>
                        <View style={styles.rowLabel}>
                            <Text style={labale3}>Catact</Text>
                            <Text style={labale4}>: (+84) 986 8544.</Text>
                        </View>
                        <View style={styles.rowLabel}>
                            <Text style={labale3}>Email</Text>
                            <Text style={labale4}>: N/A</Text>
                        </View>
                        

                    </View>
                    <View style={styles.rowHeaderG2}>
                        <Image 
                            src={Logo}
                            style={{width:60,height:60}}
                        />
                        <View style={styles.rowLabel}>
                            <Text style={labale1}>Reference Number : </Text>
                            <Text style={labale2}>WH2024020011</Text>
                        </View>
                        <View style={{...styles.rowLabel,paddingBottom:5}}>
                            <Text style={labale1}>Disclosed Date : </Text>
                            <Text style={labale2}>February 17 2024</Text>
                        </View>

                        <View style={styles.rowLabel}>
                            <Text style={labale1}>Invoice Number : </Text>
                            <Text style={labale2}>Inv.38 ZM16400</Text>
                        </View>
                        <View style={styles.rowLabel}>
                            <Text style={labale1}>Invoice Date : </Text>
                            <Text style={labale2}>February 02 2024</Text>
                        </View>
                        <View style={styles.rowLabel}>
                            <Text style={labale1}>Carrier : </Text>
                            <Text style={labale2}>Phyphy Transport</Text>
                        </View>
                        <View style={styles.rowLabel}>
                            <Text style={labale1}>Delivery Date : </Text>
                            <Text style={labale2}>February 02 2024</Text>
                        </View>
                        <View style={styles.rowLabel}>
                            <Text style={labale1}>Received Date : </Text>
                            <Text style={labale2}>February 05 2024</Text>
                        </View>
                        <View style={styles.rowLabel}>
                            <Text style={labale1}>Total Quantity : </Text>
                            <Text style={labale2}>390</Text>
                        </View>
                        <View style={styles.rowLabel}>
                            <Text style={labale1}>Total Package : </Text>
                            <Text style={labale2}>4</Text>
                        </View>
                        <View style={styles.rowLabel}>
                            <Text style={labale1}>Currency : </Text>
                            <Text style={labale2}>VND</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.txtBig}>GOODS RECEIVE NOTE</Text>
                <View style={styles.bodyContainer}>
                    {data.map((item,index)=>(
                        <View style={styles.rowItem}>
                            <View style={styles.rowItemG1}>
                                <Image 
                                    src={Logo}
                                    style={{width:60,height:60,marginRight:5}}
                                />
                                <View>
                                    <Text style={styles.txtMain}>STY499495-Black</Text>
                                    <Text style={styles.txtNormal}>Ref. WH030494</Text>
                                    <Text style={styles.txtNormal}>TEN11</Text>
                                </View>
                            </View>
                            <View style={styles.rowItemG1}>
                                <View>
                                    <Text style={styles.txtMain}>250000 VND | 250000 VND</Text>
                                    <Text style={styles.txtNormal}>Ord. 100</Text>
                                    <Text style={styles.txtNormal}>Ship. 196 | -0.2%</Text>
                                </View>
                            </View>
                            <View style={{...styles.rowItemG1,justifyContent:'flex-end',alignItems:'flex-end'}}>
                                <View style={{justifyContent:'flex-end',alignItems:'flex-end'}}>
                                    <Text style={styles.txtMain}>250000 VND</Text>
                                    <Text style={styles.txtNormal}>Ref. 100 | Def. 0</Text>
                                    <Text style={styles.txtNormal}>Dif. 100 | 0</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
                
                <View style={styles.rowFooter}>
                    <View>
                        <View style={styles.rowLabelFooter}>
                            <Text style={{...styles.txtMain,width:140}}>Goods Received By </Text>
                            <Text style={styles.txtNormal}>: Chhum Rathany</Text>
                        </View>
                        <View style={styles.rowLabelFooter}>
                            <Text style={{...styles.txtMain,width:140}}>Date</Text>
                            <Text style={styles.txtNormal}>: February 17 2024</Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.rowLabelFooter}>
                            <Text style={{...styles.txtMain,width:140}}>Goods Verify By </Text>
                            <Text style={styles.txtNormal}>: Sea Socheat</Text>
                        </View>
                        <View style={styles.rowLabelFooter}>
                            <Text style={{...styles.txtMain,width:140}}>Date</Text>
                            <Text style={styles.txtNormal}>: February 17 2024</Text>
                        </View>
                    </View>
                </View>

            </Page>
        </Document>
    )
})

export default (PDF_Invoice);

const styles = StyleSheet.create({
    rowHeader:{
        display:"flex",
        flexDirection:'row',
        justifyContent:'space-between'
    },
    rowFooter:{
        marginTop:60,
        display:"flex",
        flexDirection:'row',
        justifyContent:'space-between'
    },
    rowLabelFooter:{
        display:"flex",
        flexDirection:'row',
    },
    rowHeaderG1 : {
        width:"50%"
    },
    rowHeaderG2 : {
        width:"50%",
        alignContent:'flex-end',
        alignItems:'flex-end'
    },
    bodyContainer : {
        marginTop:10
    },
    rowItem:{
        display:"flex",
        flexDirection:"row",
        justifyContent : 'space-between',
        borderBottomWidth:0.5,
        borderBottomColor:"#eee",
        paddingVertical:10
    },
    rowItemG1 : {
        width:"20%",
        display:"flex",
        flexDirection:"row"
    },
    txtNormal : {
        paddingVertical:2,
        fontSize:8,
        color:"#888"
    }, 
    txtMain : {
        paddingVertical:2,
        fontSize:8,
        color:"#000",
        fontWeight:"bold"
    }, 
    txtBig :{
        textAlign:'center',
        marginVertical:10,
        position:"absolute",
        top:30,
        left:0,
        right:0
    },
    rowLabel : {
        flexDirection:'row',
        alignItems:'center'
    }
})