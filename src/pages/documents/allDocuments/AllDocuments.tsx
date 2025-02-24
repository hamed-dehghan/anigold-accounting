import  { useMemo } from 'react';
import { DataTable } from '../../../components/table/Table';
import { getColumns } from './column'; // Import the column definitions
import ProfileInfo from './ProfileInfo';


import './allDocuments.css';
// Define and export the userModel type
export type userModel = {
  typeDoc: string;
  typeProduct: string;
  number: number;
  weight: number;
  ang: number;
  ayar: number;
  feeDarsad: number;
  feeGram: number;
};

// Props for the AllDocuments component
interface AllDocumentsProps {
  data: userModel[];
}

const AllDocuments = ({ data }: AllDocumentsProps) => {
  // Memoize columns to prevent unnecessary re-renders
  const columns = useMemo(() => getColumns(), []);

  return (
    <div
      className="bg-content h-full  flex flex-col  gap-2  rounded-[9px]">
      <ProfileInfo />
      {/* m-5 mt-10 */}
      <div className=' font-Poppins mt-5'>
        {/* <DataTable columns={columns} data={data} /> */}
      </div>
    </div>
  );
};

export default AllDocuments;