/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../components/FormSection";
import PreviewSection from "../../components/PreviewSection";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
// import dummy from "../../../../data/dummy";
import GlobalApi from './../../../../../service/GlobalApi';

function Edit() {
    const {resumeId} = useParams();
    // const params = useParams();
    const [resumeInfo, setResumeInfo] = useState();

    useEffect(() => {
        // console.log(params.resumeId);
        // setResumeInfo(dummy);

        GetResumeInfo();
    }, []);

    const GetResumeInfo=()=>{
        GlobalApi.GetResumeById(resumeId).then(resp=>{
          console.log(resp.data.data);
          setResumeInfo(resp.data.data);
        })
    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 p-10 gap-10">
                {/* Form Section */}
                <FormSection />

                {/* Preview Section */}
                <PreviewSection />
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default Edit