/* eslint-disable react/prop-types */

function Skills({ resumeInfo }) {
    return (
        <div className='my-6'>
            <h2 className='text-center font-bold text-sm mb-2'>Skills</h2>
            <hr/>

            <div className='grid grid-cols-1 gap-x-[5rem] my-4 md:grid-cols-2' id="skills">
                {resumeInfo?.skills.map((skill, index) => (
                    <div key={index} className='flex items-center justify-between'>
                        <h2 className='text-xs'>{skill.name}</h2>
                        <div className='h-2 bg-gray-200 w-[120px]'>
                            <div className='h-2'
                                style={{
                                    backgroundColor: '#212126ed',
                                    width: skill?.rating + '%',
                                }}
                            >
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Skills