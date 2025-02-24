const Spinner: React.FC = () => {
  return (
    <div className="w-full h-full flex justify-center ">
      <div className=" flex justify-center items-center">
        <div
          className="spinner-border animate-spin  inline-block w-8 h-8 border-2  border-colorTextSidbar rounded-full"
          role="status"
        >
          <span className="visually-hidden"></span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
