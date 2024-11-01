/* eslint-disable react-hooks/exhaustive-deps */
import Header from '../../../components/custom/Header'
import { Button } from '../../../components/ui/button'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import ResumePreview from '../../../dashboard/resume/components/ResumePreview'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import GlobalApi from '../../../../service/GlobalApi'
import { RWebShare } from 'react-web-share'
import { ArrowLeft } from 'lucide-react'

function View() {

    console.log("activeFormIndex", localStorage.getItem('activeFormIndex'));
    const [resumeInfo, setResumeInfo] = useState();
    const { resumeId } = useParams();
    const navigation = useNavigate();

    useEffect(() => {
        GetResumeInfo();
        localStorage.setItem('activeFormIndex', 5);
    }, [])
    const GetResumeInfo = () => {
        GlobalApi.GetResumeById(resumeId).then(resp => {
            console.log(resp.data.data);
            setResumeInfo(resp.data.data);
        })
    }

    const HandleDownload = () => {
        const originalTitle = document.title;
        const newTitle = `${resumeInfo?.firstName || ''}_${resumeInfo?.lastName || ''}_resume_${resumeInfo?.jobTitle || ''}`;

        // Set the new title
        document.title = newTitle;

        // Trigger print
        window.print();

        // Restore the original title (optional, for usability after printing)
        window.onafterprint = () => {
            document.title = originalTitle;
        };
        // End the print

    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }} >
            <div id="no-print">
                <Header />
                <Button className='my-5 mx-10 md:mx-20 lg:mx-36' variant='outline' onClick={() => navigation('/dashboard/resume/' + resumeId + "/edit")}><ArrowLeft />Back</Button>
                <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                    <h2 className='text-center text-2xl font-medium'>
                        Congrats! Your Ultimate AI generates Resume is ready ! </h2>
                    <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share unique
                        resume url with your friends and family </p>
                    <div className='flex justify-between px-44 my-10'>

                        <Button onClick={HandleDownload}>Download</Button>

                        <RWebShare
                            data={{
                                text: "Hello Everyone, This is my resume please open url to see it",
                                url: import.meta.env.VITE_BASE_URL + "/my-resume/" + resumeId + "/view",
                                title: resumeInfo?.firstName + " " + resumeInfo?.lastName + " resume",
                            }}
                            onClick={() => console.log("shared successfully!")}
                        > <Button>Share</Button>
                        </RWebShare>
                    </div>
                </div>

            </div>
            <div id='print' className='my-10 mx-10 md:mx-20 lg:mx-36 flex justify-center align-center'>
                <div id="print-area" className='w-[50vw]'>
                    <ResumePreview />
                </div>
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default View