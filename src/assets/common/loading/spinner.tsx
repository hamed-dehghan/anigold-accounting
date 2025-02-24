const Spinner: React.FC = () => {
  return (
    <div className="w-full h-full center">
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-2 border-dotted border-red-500 rounded-full"
        role="status"
      >
        <span className="visually-hidden"></span>
      </div>
    </div>
  );
};

export default Spinner;
