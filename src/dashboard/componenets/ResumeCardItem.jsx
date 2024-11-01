/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { ResumeInfoContext } from "../../context/ResumeInfoContext";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../../components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import GlobalApi from "./../../../service/GlobalApi";
import { Loader2Icon, MoreVertical } from "lucide-react"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner";
import ResumePreview from "../resume/components/ResumePreview";


function ResumeCardItem({ resume, refreshData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  // const onMenuClick=(url)=>{
  //   navigation(url)
  // }
  const [resumeInfo, setResumeInfo] = useState();

  useEffect(() => {
    GlobalApi.GetResumeById(resume.documentId).then(resp => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    })
  }, []);

  useEffect(() => {
    GlobalApi.GetResumeById(resume.documentId).then(resp => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    })
  }, [refreshData]);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(resp => {
      console.log(resp);
      refreshData();
      toast('Resume Deleted!');
      setLoading(false);
      setOpenAlert(false);
    }, (error) => {
      setLoading(false);
    })
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }} >
      <div className='relative'>
        <div className='relative w-[calc(50vw_-_25px)] xs:h-48 sm:h-[290px] md:w-60'>
          <div className='bg-surface-2 rounded-lg border border-surface-2-stroke 
          relative w-[calc(50vw_-_25px)] xs:h-48 sm:h-[290px] md:w-60'>
            <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
              <div className='relative h-[calc(100%-50px)] cursor-pointer overflow-hidden'>
                <div className="relative h-full">
                  <div className="h-full w-full overflow-hidden rounded-lg rounded-b-none border-b-0 p-0">
                    <div>
                      <div id="resume-print">
                        <div className='flex items-center justify-center'>
                          <ResumePreview />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <div className='relative flex h-[50px] flex-row items-center justify-between rounded-lg rounded-t-none bg-surface-2 py-2'>
              <div className='flex max-w-[calc(100%-3rem)] flex-row items-center pl-4'>
                <h2 className='text-sm text-black font-bold'>{resume.jobTitle}</h2>
              </div>
              <div className='text-gray-900 h-12 min-w-12 relative flex cursor-pointer items-center justify-center'>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical className='h-4 w-4 cursor-pointer text-black' />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>

                    <DropdownMenuItem onClick={() => navigation('/dashboard/resume/' + resume.documentId + "/edit")}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigation('/my-resume/' + resume.documentId + "/view")}>View</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpenAlert(true)}>Delete</DropdownMenuItem>

                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <AlertDialog open={openAlert}>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account
                      and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}
                      disabled={loading}>
                      {loading ? <Loader2Icon className='animate-spin' /> : 'Delete'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

            </div>
          </div>
        </div>
      </div>

    </ResumeInfoContext.Provider >
  )
}

export default ResumeCardItem