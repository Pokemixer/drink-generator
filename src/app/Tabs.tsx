import React, { useState } from 'react';

const Tabs = ({ children } : {children: any}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-4">
          {children.map((child:any, index:number) => (
            <button
              key={index}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === index
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
                focus:outline-none`}
              onClick={() => handleTabClick(index)}
            >
              {child.props.title}
            </button>
          ))}
        </nav>
      </div>
      <div>
        {children.map((child:any, index:number) => (
          <div key={index} className={activeTab === index ? '' : 'hidden'}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

const Tab = ({ children } : {children: any}) => {
  return <>{children}</>;
};

export { Tabs, Tab };