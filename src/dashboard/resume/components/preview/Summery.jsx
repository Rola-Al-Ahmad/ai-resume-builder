/* eslint-disable react/prop-types */

function Summery({ resumeInfo }) {
    return (
        <p className='text-xs'>
            {resumeInfo?.summery}
        </p>
    )
}

export default Summery