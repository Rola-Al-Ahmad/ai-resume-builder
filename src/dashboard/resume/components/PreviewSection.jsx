/* eslint-disable no-unused-vars */
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import { useContext } from "react";
import PersonalDetail from "./preview/PersonalDetail";
import Summary from "./preview/Summery";
import ProffessionalExperience from "./preview/ProffessionalExperience";
import Education from "./preview/Education";
import Skills from "./preview/Skills";


function PreviewSection() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  return (
    <div className="shadow-lg h-full p-14 border-t-[4px]">
      {/* Personal Detail */}

      <PersonalDetail resumeInfo={resumeInfo} />

      {/* Summery */}

      <Summary resumeInfo={resumeInfo} />

      {/* Proffessional Experience */}
      {resumeInfo?.experience?.length > 0 && <ProffessionalExperience resumeInfo={resumeInfo} />}

      {/* Education */}

      {resumeInfo?.education?.length > 0 && <Education resumeInfo={resumeInfo} />}

      {/* Skills */}

      {resumeInfo?.skills?.length > 0 && <Skills resumeInfo={resumeInfo} />}
    </div>
  )
}

export default PreviewSection