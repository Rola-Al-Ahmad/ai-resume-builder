/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { Input } from "../../../../components/ui/input";
import GlobalApi from "../../../../../service/GlobalApi";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../../../components/ui/button";
import { LoaderCircle } from "lucide-react";
import RichTextEditor from "../RichTextEditor";


const formField = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummery: '',
}

function Experience() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [experienceList, setExperienceList] = useState([]);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const userEmail = resumeInfo?.email;

  const [removedItems, setRemovedItems] = useState([]); // Stack to keep track of removed items

  // useEffect(() => {
  //   resumeInfo?.experience.length > 0 && setExperienceList(resumeInfo?.experience)
  // }, [])
  // ====
  // useEffect(() => {
  //   setResumeInfo({
  //     ...resumeInfo,
  //     experience: experienceList
  //   });
  // }, [experienceList]);
  // useEffect(() => {
  //   const savedExperiences = JSON.parse(localStorage.getItem('experienceList')) || [];
  //   if (savedExperiences.length > 0) {
  //     setExperienceList(savedExperiences);
  //     setResumeInfo((prevInfo) => ({ ...prevInfo, experience: savedExperiences }));
  //   } else if (resumeInfo?.experience?.length > 0) {
  //     setExperienceList(resumeInfo.experience);
  //   }
  // }, []);
  
  useEffect(() => {
    const savedExperiences = loadExperienceForEmail(userEmail);
    if (savedExperiences.length > 0) {
      setExperienceList(savedExperiences);
      setResumeInfo((prevInfo) => ({ ...prevInfo, experience: savedExperiences }));
    } else if (resumeInfo?.experience?.length > 0) {
      setExperienceList(resumeInfo.experience);
    }
  }, [resumeInfo]);

  useEffect(() => {
    setResumeInfo((prevInfo) => ({
      ...prevInfo,
      experience: experienceList,
    }));
    saveExperienceForEmail(userEmail, experienceList);
  }, [experienceList]);

  const saveExperienceForEmail = (email, experienceList) => {
    const savedData = JSON.parse(localStorage.getItem('experienceList')) || {};
    savedData[email] = experienceList;
    localStorage.setItem('experienceList', JSON.stringify(savedData));
  };
  const loadExperienceForEmail = (email) => {
    const savedData = JSON.parse(localStorage.getItem('experienceList')) || {};
    return savedData[email] || [];
  };

  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        experience: experienceList.map(({ id, ...rest }) => rest)
      }
    }

    console.log(experienceList)

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(res => {
      console.log(res);
      setLoading(false);
      toast('Details updated !')
      localStorage.setItem('experienceList', JSON.stringify(experienceList));
    }, (error) => {
      setLoading(false);
    })

  }

  const handleChange = (index, event) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;

    if (name === 'startDate' || name === 'endDate') {
      if (experienceList[index].endDate === '') {
        newEntries[index][name] = new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      }
      else {
        newEntries[index][name] = new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      }
      experienceList[index].currentlyWorking = false;
    }
    else {
      newEntries[index][name] = value;
    }

    console.log(newEntries)
    setExperienceList(newEntries);
  }

  const AddNewExperience = () => {

    setExperienceList([...experienceList, {
      title: '',
      companyName: '',
      city: '',
      state: '',
      startDate: '',
      endDate: '',
      workSummery: '',
    }])
  }

  // const RemoveExperience = () => {
  //   setExperienceList(experienceList => experienceList.slice(0, -1))
  // }

  const RemoveExperience = (indexToRemove) => {
    const itemToRemove = experienceList[indexToRemove];
    setExperienceList(experienceList =>
      experienceList.filter((_, index) => index !== indexToRemove)
    );
    localStorage.setItem('experienceList', JSON.stringify(experienceList));
    setRemovedItems([...removedItems, itemToRemove]); // Push the removed item onto the stack
    toast('Experience removed!');
  };

  const handleRedo = () => {
    if (removedItems.length > 0) {
      // Get the last removed item
      const lastRemovedItem = removedItems[removedItems.length - 1];

      // Add it back to the experience list
      setExperienceList([...experienceList, lastRemovedItem]);

      // Remove it from the removed items stack
      setRemovedItems(removedItems.slice(0, -1)); // Remove the last item
    }
  };

  const handleRichTextEditor = (e, name, index) => {
    // console.log("experienceList", experienceList);

    const newEntries = experienceList.slice();

    // console.log("newEntries", newEntries);
    newEntries[index][name] = e.target.value;

    setExperienceList(newEntries);
    console.log("newEntries after change", newEntries);
  }

  const handleCurrentlyWorkingChange = (index, event) => {
    const { checked } = event.target;

    // Create a copy of the experience list
    const updatedExperienceList = [...experienceList];

    // Update the specific item at the given index
    updatedExperienceList[index] = {
      ...updatedExperienceList[index],
      currentlyWorking: checked,
      endDate: checked ? "Present" : ""  // Set endDate to "Present" if checked, otherwise clear it
    };

    // Update the state with the modified experience list
    setExperienceList(updatedExperienceList);
  };

  const today = new Date();
  const maxDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;

  const formatDateForInput = (dateStr) => {
    const [monthStr, year] = dateStr.split(" ");
    const month = new Date(`${monthStr} 1, 2000`).getMonth() + 1; // Get month as number
    return `${year}-${String(month).padStart(2, '0')}`; // Format to YYYY-MM
  };

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <div className="bg-gray-100 p-4 rounded-md border border-gray-300 mb-4">
          <span className="text-sm text-gray-700">
            Just a quick note: The current data in the preview will stay as it is until you click <strong>&ldquo;Save&ldquo;</strong>
            to make it permanent <br />
            or <strong>&ldquo;Redo&ldquo;</strong> to discard any changes.
            <br />
            Plus, any AI-generated summary will appear once you&lsquo;ve made a few edits.
          </span>
        </div>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
          {
            experienceList?.map((item, index) => (
              <div key={index}>
                <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                  <div>
                    <label className='text-xs'>Position Title</label>
                    <Input name="title"
                      onChange={(event) => handleChange(index, event)}
                      defaultValue={item?.title}
                    />
                  </div>
                  <div>
                    <label className='text-xs'>Company Name</label>
                    <Input name="companyName"
                      onChange={(event) => handleChange(index, event)}
                      defaultValue={item?.companyName} />
                  </div>
                  <div>
                    <label className='text-xs'>City</label>
                    <Input name="city"
                      onChange={(event) => handleChange(index, event)}
                      defaultValue={item?.city} />
                  </div>
                  <div>
                    <label className='text-xs'>State</label>
                    <Input name="state"
                      onChange={(event) => handleChange(index, event)}
                      defaultValue={item?.state}
                    />
                  </div>
                  <div>
                    <label className='text-xs'>Start Date</label>
                    <Input type="month"
                      name="startDate"
                      onChange={(event) => handleChange(index, event)}
                      max={maxDate}  // Limits selection to the current month and year
                      defaultValue={item?.startDate ? formatDateForInput(item.startDate) : ""} // Convert to YYYY-MM
                    />
                  </div>
                  <div>
                    <label className='text-xs'>End Date</label>
                    <Input type="month" name="endDate"
                      onChange={(event) => handleChange(index, event)}
                      max={maxDate}  // Limits selection to the current month and year
                      defaultValue={item?.endDate ? formatDateForInput(item.endDate) : ""} // Convert to YYYY-MM
                    />
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <input
                      type="checkbox"
                      name="currentlyWorking"
                      checked={item?.currentlyWorking || false}
                      onChange={(event) => handleCurrentlyWorkingChange(index, event)}
                      className="mr-2"
                    />
                    <label className="text-xs">I&apos;m currently working in this role</label>
                  </div>
                  <div className='col-span-2'>
                    {/* Work Summery  */}
                    <RichTextEditor
                      index={index}
                      defaultValue={item?.workSummery}
                      onRichTextEditorChange={(event) => handleRichTextEditor(event, 'workSummery', index)} />
                  </div>
                  <div className='flex justify-end col-span-2'>
                    <Button variant="outline" onClick={() => RemoveExperience(index)} className="text-primary"> - Remove</Button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div className='flex justify-between'>

          <Button variant="outline" onClick={AddNewExperience} className="text-primary"> + Add More Experience</Button>
          {/* <Button variant="outline" onClick={RemoveEducation} className="text-primary"> - Remove</Button> */}
          <div className='flex gap-2'>
            <Button variant="outline" onClick={() => handleRedo()}>
              Redo
            </Button>
            <Button disabled={loading} onClick={() => onSave()}>
              {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Experience