import React from "react";

function Title({ title }) {
    return (
        <div className="text-center py-12 bg-gray-100">
            <h1 className="uppercase text-4xl md:text-5xl font-bold text-[#563996] mb-8 tracking-tight leading-tight px-4">
                {title}
            </h1>
            <div className="w-24 h-1 mx-auto bg-[#563996]/20 rounded-full"></div>
        </div>
    );
}

export default Title;