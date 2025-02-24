
import axios from 'axios';
import { redirect } from 'react-router-dom';
// const BASE_URL = process.env.REACT_APP_BASE_URL; 
const BASE_URL = 'https://api.aryazar.ir/' + 'api/v1';;


const getHeaders = (isFile = false) => {
  const token = localStorage.getItem('token');
  if (isFile) {
    return {
      'Authorization': `Bearer ${token}`
    };
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Accept-Language': 'fa-IR'
  };
};
const getBASE_URL = () => {
  // const BASE_URL = process.env.REACT_APP_BASE_URL + 'api/v1';
  return BASE_URL
};
export function Get_fileUrl(code: string) {
  if (code.includes('http')) {
    return code
  }
  return BASE_URL + '/client/datafile/downloadfile?Code=' + decodeURIComponent(code);
}
const apiService = {

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Person ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  Get_allPerson: (query: any) => axios.get(`${getBASE_URL()}/client/person/getallperson${query}`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Get_personorderby: (query: any) => axios.get(`${getBASE_URL()}/client/person/personorderby${query}`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Edit_person: (data: any) => axios.post(`${getBASE_URL()}/client/person/updateperson/`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Create_person: (data: any) => axios.post(`${getBASE_URL()}/client/person/addperson`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Delete_person: (data: any) => axios.post(`${getBASE_URL()}/client/person/deleteperson/`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Get_PersonDetail: (Id: any) => axios.get(`${getBASE_URL()}/client/person/getpersondetail?PersonId=${Id}`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Get_PersonGetById: (Id: any) => axios.get(`${getBASE_URL()}/client/person/getbyidperson?PersonId=${Id}`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Get_Person_generatedcode: () => axios.get(`${getBASE_URL()}/client/person/generatedcode`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ CustomerType ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  Get_allCustomerType: (query = '') => axios.get(`${getBASE_URL()}/client/customertype/getallcustomertype${query}`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Edit_CustomerType: (data: any) => axios.post(`${getBASE_URL()}/client/customertype/updatecustomertype/`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Create_CustomerType: (data: any) => axios.post(`${getBASE_URL()}/client/customertype/addcustomertype`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Delete_CustomerType: (data: any) => axios.post(`${getBASE_URL()}/client/customertype/deletecustomertype/`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  GeneratedCode_CustomerType: () => axios.get(`${getBASE_URL()}/client/generatecode/customertypecode`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Zone ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  Get_allZone: (query = '') => axios.get(`${getBASE_URL()}/client/zone/getallzone${query}`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Edit_Zone: (data: any) => axios.post(`${getBASE_URL()}/client/zone/updatezone/`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Create_Zone: (data: any) => axios.post(`${getBASE_URL()}/client/zone/addzone`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Delete_Zone: (data: any) => axios.post(`${getBASE_URL()}/client/zone/deletezone/`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  GeneratedCode_Zone: () => axios.get(`${getBASE_URL()}/client/generatecode/zonecode`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Bankbranch ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  Get_allBankbranch: (query = '') => axios.get(`${getBASE_URL()}/client/bankbranch/getallbankbranch${query}`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Edit_Bankbranch: (data: any) => axios.post(`${getBASE_URL()}/client/bankbranch/updatebankbranch/`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Create_Bankbranch: (data: any) => axios.post(`${getBASE_URL()}/client/bankbranch/addbankbranch`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Delete_Bankbranch: (data: any) => axios.post(`${getBASE_URL()}/client/bankbranch/deletebankbranch/`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  // GeneratedCode:() => axios.get(`${getBASE_URL()}/client/customertype/generatedcodecustomertype`, { headers: getHeaders() })
  //   .catch(error => {ErrorHandling(error);}),

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ StoneType ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  Get_allStoneType: (query = '') => axios.get(`${getBASE_URL()}/client/stonetype/getallstonetype${query}`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Edit_StoneType: (data: any) => axios.post(`${getBASE_URL()}/client/stonetype/updatestonetype/`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Create_StoneType: (data: any) => axios.post(`${getBASE_URL()}/client/stonetype/addstonetype`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Delete_StoneType: (data: any) => axios.post(`${getBASE_URL()}/client/stonetype/deletestonetype/`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  GeneratedCode_stonetype: () => axios.get(`${getBASE_URL()}/client/generatecode/stonetypecode`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ CurrencyType ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  Get_allCurrencyType: (query = '') => axios.get(`${getBASE_URL()}/client/currencytype/getallcurrencytype${query}`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Edit_CurrencyType: (data: any) => axios.post(`${getBASE_URL()}/client/currencytype/updatecurrencytype/`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Create_CurrencyType: (data: any) => axios.post(`${getBASE_URL()}/client/currencytype/addcurrencytype`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Delete_CurrencyType: (data: any) => axios.post(`${getBASE_URL()}/client/currencytype/deletecurrencytype/`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  GeneratedCode_currencytype: () => axios.get(`${getBASE_URL()}/client/generatecode/currencytypecode`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Laboratory ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  Get_allLaboratory: (query = '') => axios.get(`${getBASE_URL()}/client/laboratory/getalllaboratory${query}`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Edit_Laboratory: (data: any) => axios.post(`${getBASE_URL()}/client/laboratory/updatelaboratory/`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Create_Laboratory: (data: any) => axios.post(`${getBASE_URL()}/client/laboratory/addlaboratory`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Delete_Laboratory: (data: any) => axios.post(`${getBASE_URL()}/client/laboratory/deletelaboratory/`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  GeneratedCode_Laboratory: () => axios.get(`${getBASE_URL()}/client/laboratory/generatedcodelaboratory`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),

    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ bankaccount ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    Get_allBankaccount:(query = '') => axios.get(`${getBASE_URL()}/client/bankaccount/getallbankdefinition${query}`, { headers: getHeaders() })
      .catch(error => {ErrorHandling(error);}),
    Edit_Bankaccount:(data:any) => axios.post(`${getBASE_URL()}/client/bankaccount/updatebankdefinition/`, data ,{ headers: getHeaders() })
      .catch(error => {ErrorHandling(error);}),
    Create_Bankaccount:(data:any) => axios.post(`${getBASE_URL()}/client/bankaccount/addbankdefinition`,data, { headers: getHeaders() })
      .catch(error => {ErrorHandling(error);}),
    Delete_Bankaccount:(data:any) => axios.post(`${getBASE_URL()}/client/bankaccount/deletebankaccount/` ,data,{ headers: getHeaders() })
      .catch(error => {ErrorHandling(error);}),
    // GeneratedCode_Bankaccount:() => axios.get(`${getBASE_URL()}/client/bankaccount/generatedcodelaboratory`, { headers: getHeaders() })
    //   .catch(error => {ErrorHandling(error);}),
    
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Storage ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    Get_allStorage:(query = '') => axios.get(`${getBASE_URL()}/client/storage/getallstorage${query}`, { headers: getHeaders() })
      .catch(error => {ErrorHandling(error);}),
    Edit_Storage:(data:any) => axios.post(`${getBASE_URL()}/client/storage/updatestorage/`, data ,{ headers: getHeaders() })
      .catch(error => {ErrorHandling(error);}),
    Create_Storage:(data:any) => axios.post(`${getBASE_URL()}/client/storage/addstorage`,data, { headers: getHeaders() })
      .catch(error => {ErrorHandling(error);}),
    Delete_Storage:(data:any) => axios.post(`${getBASE_URL()}/client/storage/deletestorage/` ,data,{ headers: getHeaders() })
      .catch(error => {ErrorHandling(error);}),
    GeneratedCode_Storage:() => axios.get(`${getBASE_URL()}/client/generatecode/storagecode`, { headers: getHeaders() })
      .catch(error => {ErrorHandling(error);}),

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Income ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  Get_allIncome: (query = '') => axios.get(`${getBASE_URL()}/client/income/getallincome${query}`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Edit_Income: (data: any) => axios.post(`${getBASE_URL()}/client/income/editincome/`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Create_Income: (data: any) => axios.post(`${getBASE_URL()}/client/income/addincome`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Delete_Income: (data: any) => axios.post(`${getBASE_URL()}/client/income/deleteincome/`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  // GeneratedCode_Income:() => axios.get(`${getBASE_URL()}/client/bankaccount/generatedcodelaboratory`, { headers: getHeaders() })
  //   .catch(error => {ErrorHandling(error);}),

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Costtypes ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  Get_allCosttypes: (query = '') => axios.get(`${getBASE_URL()}/client/costtypes/getallcosttype${query}`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Edit_Costtypes: (data: any) => axios.post(`${getBASE_URL()}/client/costtypes/updatecosttype/`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Create_Costtypes: (data: any) => axios.post(`${getBASE_URL()}/client/costtypes/addcosttype`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  Delete_Costtypes: (data: any) => axios.post(`${getBASE_URL()}/client/costtypes/deletecosttype/`, data, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  GeneratedCode_Costtypes: () => axios.get(`${getBASE_URL()}/client/generatecode/costtypecode`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),

    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Costtypes ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    Get_allcostincometypes:(query = '') => axios.get(`${getBASE_URL()}/client/costtypes/getallcostincometypes${query}`, { headers: getHeaders() })
      .catch(error => {ErrorHandling(error);}),
      
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Costtypes ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    Get_allIncometype:(query = '') => axios.get(`${getBASE_URL()}/client/incometype/getallincometype${query}`, { headers: getHeaders() })
    .catch(error => {ErrorHandling(error);}),
    Edit_Incometype:(data:any) => axios.post(`${getBASE_URL()}/client/incometype/updateincometype/`, data ,{ headers: getHeaders() })
      .catch(error => {ErrorHandling(error);}),
    Create_Incometype:(data:any) => axios.post(`${getBASE_URL()}/client/incometype/addincometype`,data, { headers: getHeaders() })
      .catch(error => {ErrorHandling(error);}),
    Delete_Incometype:(data:any) => axios.post(`${getBASE_URL()}/client/incometype/deleteincometype/` ,data,{ headers: getHeaders() })
      .catch(error => {ErrorHandling(error);}),
    GeneratedCode_Incometype:() => axios.get(`${getBASE_URL()}/client/generatecode/incometype`, { headers: getHeaders() })
      .catch(error => {ErrorHandling(error);}),

    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ cost ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    Get_allCost:(query = '') => axios.get(`${getBASE_URL()}/client/cost/getallcost${query}`, { headers: getHeaders() })
      .catch(error => {ErrorHandling(error);}),
    Edit_Cost:(data:any) => axios.post(`${getBASE_URL()}/client/cost/updatecost/`, data ,{ headers: getHeaders() })
      .catch(error => {ErrorHandling(error);}),
    Create_Cost:(data:any) => axios.post(`${getBASE_URL()}/client/cost/addcost`,data, { headers: getHeaders() })
      .catch(error => {ErrorHandling(error);}),
    Delete_Cost:(data:any) => axios.post(`${getBASE_URL()}/client/cost/deletecost/` ,data,{ headers: getHeaders() })
      .catch(error => {ErrorHandling(error);}),
    // GeneratedCode_Cost:() => axios.get(`${getBASE_URL()}/client/cost/generatedcodelaboratory`, { headers: getHeaders() })
    //   .catch(error => {ErrorHandling(error);}),

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Zone ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  Get_zoneList: () => axios.get(`${getBASE_URL()}/client/zone/getzonelist/`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Bank ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  Get_allBank: () => axios.get(`${getBASE_URL()}/client/bank/getallbank/`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Uploadfile ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  Uploadfile: (data: any) => axios.post(`${getBASE_URL()}/client/datafile/uploadfile/`, data, { headers: getHeaders(true) }),
  // .catch(error => {ErrorHandling(error);}),
  multiUploadfile: (data: any) => axios.post(`${getBASE_URL()}/client/datafile/multiuploadfile/`, data, { headers: getHeaders(true) }),
  // .catch(error => {ErrorHandling(error);}),

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ downloadfile ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  // downloadfile:(code:any) => axios.get(`${getBASE_URL()}/client/datafile/downloadfile?Code=${encodeURIComponent(code)}`, { headers: getHeaders(false) })
  //   .catch(error => {ErrorHandling(error);}),

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ bankbranch ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  Get_getallbankbranchByBankId: (Id: any) => axios.get(`${getBASE_URL()}/client/bankbranch/getallbankbranch?BankId=` + Id, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ addresstype ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  Get_addresstype: () => axios.get(`${getBASE_URL()}/client/type/addresstype/`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ appdatetype ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  Get_appdatetype: () => axios.get(`${getBASE_URL()}/client/type/appdatetype/`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ bankaccounttype ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  Get_bankaccounttype: () => axios.get(`${getBASE_URL()}/client/type/bankaccounttype/`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ customertype ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  Get_customertype: () => axios.get(`${getBASE_URL()}/client/type/customertype/`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ phonenumbertype ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  Get_phonenumbertype: () => axios.get(`${getBASE_URL()}/client/type/phonenumbertype/`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ roletype ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  Get_roletype: () => axios.get(`${getBASE_URL()}/client/type/roletype/`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ guaranteetype ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  Get_guaranteetype: () => axios.get(`${getBASE_URL()}/client/type/guaranteetype/`, { headers: getHeaders() })
    .catch(error => { ErrorHandling(error); }),
};


export default apiService;

function ErrorHandling(error: any) {

  // Check if `error.response` exists before accessing `status`
  if (error.response) {
    const statusCode = error.response.status;

    switch (statusCode) {
      case 400:
        console.log('status = 400: Bad Request');
        console.error('Error details:', error.response.data); // console.log details to troubleshoot
        throw error;
        break;
      case 500:
        console.log('status = 500: Internal Server Error');
        console.error('Error details:', error.response.data);
        throw error;
        break;
      case 401:
        console.log('status = 401: Unauthorized');
        // localStorage.removeItem('token');
        // window.location.href = "/Login";
        break;

      case 403:
        console.log('status = 403: Forbidden');
        throw error;
        break;
      case 404:
        console.log('status = 404: Forbidden');
        throw error;
        return
        break;

      default:
        console.log(`status = ${statusCode}: Unhandled status code`);
        break;
    }
  }
}
