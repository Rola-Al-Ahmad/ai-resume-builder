/* eslint-disable no-unused-vars */

import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import { useContext } from 'react'
import Education from './preview/Education'
import Skills from './preview/Skills'
import ProffessionalExperience from './preview/ProffessionalExperience'
import PersonalDetail from './preview/PersonalDetail'
import Summery from './preview/Summery'

function ResumePreview() {

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    return (
        <div className='shadow-lg h-full p-14 border-t-[4px] resume-preview-class' id='resume-preview-class'>
            {/* Personal Detail  */}
            <PersonalDetail resumeInfo={resumeInfo} />
            {/* Summery  */}
            <Summery resumeInfo={resumeInfo} />
            {/* Professional Experience  */}
            {resumeInfo?.experience?.length > 0 && <ProffessionalExperience resumeInfo={resumeInfo} />}
            {/* Educational  */}
            {resumeInfo?.education?.length > 0 && <Education resumeInfo={resumeInfo} />}
            {/* Skilss  */}
            {resumeInfo?.skills?.length > 0 && <Skills resumeInfo={resumeInfo} />}
        </div>
    )
}

export default ResumePreview