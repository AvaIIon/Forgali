import { useState } from "react";

const tabs = [
  { id: "deals", label: "smart deals", active: true },
  { id: "bestsellers", label: "best sellers" },
  { id: "bunkbeds", label: "bunk beds" },
  { id: "loftbeds", label: "loft beds" },
];

export const CategoryTabs = () => {
  const [activeTab, setActiveTab] = useState("holiday");
  
  return (
    <div className="flex justify-center gap-4 py-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors
            ${activeTab === tab.id 
              ? 'bg-foreground text-background' 
              : 'border border-border text-foreground hover:border-foreground'
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
