/* eslint-disable react-hooks/exhaustive-deps */
import { useUser } from "@clerk/clerk-react";
import AddResume from "./componenets/AddResume"
import GlobalApi from "./../../service/GlobalApi";
import { useEffect, useState } from "react";
import ResumeCardItem from "./componenets/ResumeCardItem";

const Dashboard = () => {

    const { user } = useUser();
    const [resumeList, setResumeList] = useState([]);
    
    useEffect(() => {
        user && GetResumesList();
        localStorage.setItem('activeFormIndex', 1);
    }, [user])

    /**
     * Used to Get Users Resume List
     */
    const GetResumesList = () => {
        GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
            .then(resp => {
                console.log(resp.data.data)
                setResumeList(resp.data.data);
            })
    }
    return (
        <div className='p-10 md:px-20 lg:px-32'>
            <h2 className='font-bold text-3xl'>My Resume</h2>
            <p>Start Creating AI resume to your next Job role</p>
            <div>
                <div className="flex mt-10 gap-5">
                    <div>
                        <div className="mb-4 flex flex-row flex-wrap gap-4 md:gap-6 justify-center items-center">
                            <AddResume />
                            {resumeList.length > 0 ? resumeList.map((resume, index) => (
                                <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
                            )) :
                                [1, 2, 3, 4].map((item, index) => (
                                    <div className='h-[280px] rounded-lg bg-slate-200 animate-pulse' key={index}>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard