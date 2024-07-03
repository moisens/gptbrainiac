import { SiOpenaigym } from "react-icons/si";
import { TbCircuitChangeover } from "react-icons/tb";
import ThemeToggle from "./ThemeToggle";

const SidebarHeader = () => {
  return (
    <div className="flex items-center mb-4 gap-4 px-4">
      <TbCircuitChangeover className="w-10 h-10 text-primary rotate-90" />
      <h2 className="text-xl font-extrabold text-primary">brainiac</h2>
      <ThemeToggle />
    </div>
  );
};

export default SidebarHeader;
