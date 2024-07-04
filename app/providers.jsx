import { Toaster } from "react-hot-toast";

const Providers = ({ children }) => {
  return (
    <>
      <Toaster position="bottom-right" />
      {children}
    </>
  );
};

export default Providers;
