/* eslint-disable react/prop-types */

// import { useEffect, useState } from "react";

function ProffessionalExperience({ resumeInfo }) {

    // const [experienceList] = useState([]);
    // useEffect(() => {
    //     const savedExperiences = JSON.parse(localStorage.getItem('experienceList')) || [];
    //     if (savedExperiences.length > 0) {
    //         console.log("savedExperiences", savedExperiences);
    //         experienceList.push(...savedExperiences);
    //         console.log("experienceList", experienceList);
    //     } else {
    //         if (resumeInfo?.experience?.length > 0) {
    //             experienceList.push(...resumeInfo.experience);
    //         }
    //     }

    // }, []);
    return (
        <div className='my-6'>
            <h2 className='text-center font-bold text-sm mb-2'>Professional Experience</h2>
            <hr />

            {resumeInfo?.experience?.map((experience, index) => (
                <div key={index} className='my-5'>
                    <h2 className='text-sm font-bold'>{experience?.title}</h2>
                    <h2 className='text-xs font-bold'>{experience?.companyName}</h2>
                    <h2 className='text-xs flex justify-between'>
                        {experience?.city},
                        {experience?.state}
                        <span className="font-bold">{experience?.startDate} - {experience?.currentlyWorking ? 'Present' : experience.endDate} </span>
                    </h2>
                    {/* Render workSummery as bullet points */}
                    {/* <ul className='list-disc ml-5 text-xs my-2'>
                        {experience?.workSummery.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul> */}
                    <div className='text-xs my-2' dangerouslySetInnerHTML={{ __html: experience?.workSummery }} />
                </div>
            ))}
        </div>
    )
}

export default ProffessionalExperience