import React, { FC, useEffect, useState } from 'react';
import './DefinitionsPage.scss';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Tab, Tabs } from '@mui/material';
import { GiChemicalDrop } from "react-icons/gi";
import { FaMoneyBillWave, FaTags, FaWallet } from "react-icons/fa";
import { GiStonePile } from "react-icons/gi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { FiMapPin } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import Definition_Bankaccount from '../Definition_Bankaccount/Definition_Bankaccount';
import { BsBox } from 'react-icons/bs';
import { CiBank } from 'react-icons/ci';
import { MdAttachMoney } from 'react-icons/md';
import Definition_CustomerType from '../Definition_CustomerType/Definition_CustomerType';
import Definition_Zone from '../Definition_Zone/Definition_Zone';
import Definition_Stone from '../Definition_Stone/Definition_Stone';
import Definition_CurrencyType from '../Definition_Currency/Definition_Currency';
import Definition_Storage from '../Definition_Storage/Definition_Storage';
import Definition_Income from '../Definition_Income/Definition_Income';
import Definition_Costtype from '../Definition_Costtype/Definition_Costtype';
import Definition_Cost from '../Definition_Cost/Definition_Cost';
import Definition_Cost_Income from '../Definition_Cost_Income/Definition_Cost_Income';

function DefinitionsPage(){
  const { page } = useParams<{ page: string }>();
  useEffect(() => {
    console.log(page);
    setTabValue(page)
  }, []);
  const [TabValue, setTabValue] :any = React.useState('');
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    navigate(`/definitions/${newValue}`)
    setTabValue(newValue);
  };
  const navigate = useNavigate();
  return(
    <div className="DefinitionsPage">
      <Tabs 
            className='Tabs_Custom'
            value={TabValue}
            onChange={handleChangeTab}
            // variant="scrollable"
            // scrollButtons
            // allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
          >
          {/* <Tab label={<><span>نوع مشتری</span> <FaUsers /></>} value={'CustomerType'} /> */}
          <Tab label={<><span>منطقه</span> <FiMapPin /></>} value={'Zone'} />
          {/* <Tab label={<><span>شعبه</span> <HiOutlineOfficeBuilding /></>} value={'BankBranch'} /> */}
          <Tab label={<><span>سنگ</span> <GiStonePile /></>} value={'Stone'} />
          <Tab label={<><span>ارز</span> <FaMoneyBillWave /></>} value={'Currency'} />
          <Tab label={<><span>بانک</span> <CiBank /></>} value={'Bankaccount'} />
          <Tab label={<><span>صندوق</span> <BsBox /></>} value={'Storage'} />
          {/* <Tab label={<><span>نوع درآمد</span> <FaMoneyBillWave /></>} value={'Incometype'} /> */}
          <Tab label={<><span>هزینه و درآمد</span> <MdAttachMoney /></>} value={'CostIncome'} />
          {/* <Tab label={<><span>نوع هزینه</span> <FaTags /></>} value={'Costtype'} /> */}
          {/* <Tab label={<><span>هزینه</span> <FaWallet /></>} value={'Cost'} /> */}
          {/* <Tab label={<><span>آزمایشگاه</span> <GiChemicalDrop /></>} value={'Laboratory'} /> */}
          </Tabs>
      <div>
        {/* {TabValue == 'CustomerType' && <Definition_CustomerType/>} */}
        {TabValue == 'Zone' && <Definition_Zone/>}
        {TabValue == 'Stone' && <Definition_Stone/>}
        {TabValue == 'Currency' && <Definition_CurrencyType/>}
        {TabValue == 'Bankaccount' && <Definition_Bankaccount/>}
        {TabValue == 'Storage' && <Definition_Storage/>}
        {TabValue == 'Income' && <Definition_Income/>}
        {TabValue == 'Costtype' && <Definition_Costtype/>}
        {TabValue == 'Cost' && <Definition_Cost/>}
        {TabValue == 'CostIncome' && <Definition_Cost_Income/>}


      </div>
  </div>
  )
}
export default DefinitionsPage;
