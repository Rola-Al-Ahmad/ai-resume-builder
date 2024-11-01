/* eslint-disable react/prop-types */

function Education({ resumeInfo }) {
    return (
        <div className='my-6'>
            <h2 className='text-center font-bold text-sm mb-2'>Education</h2>
            <hr />

            {resumeInfo?.education.map((education, index) => (
                <div key={index} className='my-5'>
                    <h2 className='text-sm font-bold'>{education.universityName}</h2>
                    <h2 className='text-xs flex justify-between'>{education?.degree} in {education?.major}
                        <span className="font-bold">{education?.startDate} - {education?.currentlyStudying ? 'Present' : education.endDate} </span>
                    </h2>
                    <p className='text-xs my-2'>{education?.description}</p>
                </div>
            ))}

        </div>
    )
}

export default Education