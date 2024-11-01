import { Loader2 } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { v4 as uuidv4 } from 'uuid';
import GlobalApi from "./../../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";



function AddResume() {

    const [openDialog, setOpenDialog] = useState(false);
    const [jobTitle, setjobTitle] = useState("");
    const { user } = useUser();

    const [loading, setLoading] = useState(false);

    const navigation = useNavigate();

    const onCreate = async () => {

        setLoading(true);

        const uuid = uuidv4();

        const data = {
            data: {
                jobTitle: jobTitle,
                resumeID: uuid,
                UserEmail: user?.primaryEmailAddress?.emailAddress,
                UserName: user?.fullName
            }
        }

        GlobalApi.CreateNewResume(data).then(res => {
            console.log(res);
            if (res) {
                setLoading(false);
                navigation(`/dashboard/resume/${res.data.data.documentId}/edit`);
            }
        }, (err) => {
            console.log(err);
            console.log(data);
            setLoading(false);
        });
    }

    return (
        <div>
            <div className="flex w-[calc(50vw_-_25px)] cursor-pointer items-center justify-center rounded-lg border border-dashed border-slate-400 p-4 xs:h-48 sm:h-[290px] md:w-60"
                onClick={() => setOpenDialog(true)}
            >
                <div className="relative flex items-center justify-center h-full md:w-60">
                    <div className="line-clamp-3 break-all text-center text-base font-semibold text-gray-500">Create new resume</div>
                </div>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>
                        <DialogDescription>
                            Add a title for your new resume
                            <Input className="my-2" placeholder="Ex. Full Stack Developer"
                                onChange={(e) => setjobTitle(e.target.value)} />
                        </DialogDescription>
                        <div className="flex justify-end gap-5">
                            <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                            <Button onClick={() => onCreate()}
                                disabled={!jobTitle || loading}
                            >
                                {
                                    loading ?
                                        <Loader2 className="animate-spin" /> : 'Create'
                                }
                            </Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddResume