import React from 'react'
import { Button } from '../../../components/ui/button'
import doesTextFitInContainer from '../../../lib/doestTextFitIncontainer'
import TooltipProviede from '../../../common/Tooltips'

const ProfileInfo = () => {
    const name = 'حامد دهقان '
    const number = '445512321'

    const nameFits = doesTextFitInContainer(
        name,
        100,
        'Poppins', // Font type
        '400',     // Font weight
        '14px'     // Font size
    );
    const numberFit = doesTextFitInContainer(
        number,
        100,
        'Poppins', // Font type
        '400',     // Font weight
        '14px'     // Font size
    );
    return (
        <div
            className='flex flex-col  md:flex-row justify-start  md:justify-between gap-5 md:gap-2 items-start md:items-center pr-5 flex-wrap  py-6'
        >
            <>
                <TooltipProviede content={name} isShowTooltip={nameFits}>
                    <div className="subject">
                        <span className="title font-Poppins ">نام:</span>
                        <span className="title w-[100px]  h-[42px] bg-gray_40 rounded-[50px] p-3 font-Poppins  truncate">{name}</span>
                    </div>
                </TooltipProviede>
                <TooltipProviede content={number} isShowTooltip={numberFit}>
                    <div className="subject">
                        <span className="title font-Poppins">شماره فاکتور:</span>
                        <span className="title w-[100px] h-[42px] bg-gray_40 rounded-[50px] p-3 font-Poppins truncate">{number}</span>
                    </div>
                </TooltipProviede>

                <TooltipProviede content={number} isShowTooltip={numberFit}>
                    <div className="subject">
                        <span className="title font-Poppins">شماره قبض:</span>
                        <span className="title w-[100px] h-[42px] bg-gray_40 rounded-[50px] p-3 font-Poppins truncate">{number}</span>
                    </div>
                </TooltipProviede>
                <TooltipProviede content={name} isShowTooltip={nameFits}>
                    <div className="subject">
                        <span className="title font-Poppins">توسط:</span>
                        <span className="title w-[100px] h-[42px] bg-gray_40 rounded-[50px] p-3 font-Poppins truncate">{name}</span>
                    </div>
                </TooltipProviede>
            </>
            <Button className=' ml-[23px] self-center  w-[97px] h-[41px] flex justify-center items-end flex-shrink-0 bg-blue_5 hover:bg-blue_5 rounded-none'>
                <div >
                    <span className='text-white text-[14px] font-[400] leading-[21px] h-[30px] w-[69px] '>+ سند جدید</span>
                </div>
            </Button>
        </div>
    )
}

export default ProfileInfo