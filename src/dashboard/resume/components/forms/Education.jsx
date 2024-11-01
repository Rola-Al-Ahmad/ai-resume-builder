/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Button } from '../../../../components/ui/button'
import { Input } from '../../../../components/ui/input'
import { Textarea } from '../../../../components/ui/textarea'
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { LoaderCircle } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from "../../../../../service/GlobalApi";
import { toast } from 'sonner'

function Education() {

  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  const [educationalList, setEducationalList] = useState([]);
  const [removedItems, setRemovedItems] = useState([]); // Stack to keep track of removed items
  const userEmail = resumeInfo?.email;

  // const [educationalList, setEducationalList] = useState([
  //   {
  //     universityName: '',
  //     degree: '',
  //     major: '',
  //     startDate: '',
  //     endDate: '',
  //     description: ''
  //   }
  // ])
  //====
  // useEffect(() => {
  //   resumeInfo && setEducationalList(resumeInfo?.education)
  // }, [])
  //=====
  // useEffect(() => {
  //   setResumeInfo({
  //     ...resumeInfo,
  //     education: educationalList
  //   })
  // }, [educationalList]);

  // useEffect(() => {
  //   const savedEducation = JSON.parse(localStorage.getItem('educationalList')) || [];
  //   if (savedEducation.length > 0) {
  //     setEducationalList(savedEducation);
  //     setResumeInfo((prevInfo) => ({ ...prevInfo, education: savedEducation }));
  //   } else if (resumeInfo?.education?.length > 0) {
  //     setEducationalList(resumeInfo?.education);
  //   }
  //   console.log("educationalList", resumeInfo?.education);
  //   console.log("savedEducation", savedEducation);
  // }, []);

  useEffect(() => {
    const savedEducation = loadEducationForEmail(userEmail);
    if (savedEducation.length > 0) {
      setEducationalList(savedEducation);
      setResumeInfo((prevInfo) => ({ ...prevInfo, education: savedEducation }));
    } else if (resumeInfo?.education?.length > 0) {
      setEducationalList(resumeInfo.education);
    }
  }, [resumeInfo]);

  useEffect(() => {
    setResumeInfo((prevInfo) => ({
      ...prevInfo,
      education: educationalList,
    }));
    localStorage.setItem('educationalList', JSON.stringify(educationalList));
    console.log("updated resumeInfo", resumeInfo);
  }, [educationalList]);

  const saveEducationForEmail = (email, educationalList) => {
    const savedData = JSON.parse(localStorage.getItem('educationalList')) || {};
    savedData[email] = educationalList;
    localStorage.setItem('educationalList', JSON.stringify(savedData));
  };
  const loadEducationForEmail = (email) => {
    const savedData = JSON.parse(localStorage.getItem('educationalList')) || {};
    return savedData[email] || [];
  };

  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        education: educationalList.map(({ id, ...rest }) => rest)
      }
    }

    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(resp => {
      console.log(resp);
      setLoading(false)
      toast('Details updated !')
      localStorage.setItem('educationalList', JSON.stringify(educationalList));
    }, (error) => {
      setLoading(false);
      toast('Server Error, Please try again!')
    })

  }

  const handleChange = (event, index) => {
    const newEntries = educationalList.slice();
    const { name, value } = event.target;

    if (name === 'startDate' || name === 'endDate') {
      if (educationalList[index].endDate === '') {
        newEntries[index][name] = new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      }
      else {
        newEntries[index][name] = new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      }
      educationalList[index].currentlyStudying = false;
    }
    else {
      newEntries[index][name] = value;
    }

    console.log(newEntries)
    setEducationalList(newEntries);
  }

  const AddNewEducation = () => {
    setEducationalList([...educationalList,
    {
      universityName: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      description: ''
    }
    ])
  }

  // const RemoveEducation = () => {
  //   setEducationalList(educationalList => educationalList.slice(0, -1))
  // }

  const RemoveEducation = (indexToRemove) => {
    const itemToRemove = educationalList[indexToRemove];
    setEducationalList(educationalList =>
      educationalList.filter((_, index) => index !== indexToRemove)
    );
    localStorage.setItem('educationalList', JSON.stringify(educationalList));
    setRemovedItems([...removedItems, itemToRemove]); // Push the removed item onto the stack
    toast('Education removed!')
  };

  const handleRedo = () => {
    if (removedItems.length > 0) {
      // Get the last removed item
      const lastRemovedItem = removedItems[removedItems.length - 1];

      // Add it back to the experience list
      setEducationalList([...educationalList, lastRemovedItem]);

      // Remove it from the removed items stack
      setRemovedItems(removedItems.slice(0, -1)); // Remove the last item
    }
  };

  const handleCurrentlyStudyingChange = (event, index) => {
    const { checked } = event.target;

    console.log("checked", checked);
    console.log("experinceList", educationalList);

    // Create a copy of the education list
    const updatedEducationList = [...educationalList];

    // Update the specific item at the given index
    updatedEducationList[index] = {
      ...updatedEducationList[index],
      currentlyStudying: checked,
      endDate: checked ? "Present" : ""  // Set endDate to "Present" if checked, otherwise clear it
    };

    console.log("currentlyStudying", updatedEducationList[index].currentlyStudying);

    // Update the state with the modified education list
    setEducationalList(updatedEducationList);
  };

  const today = new Date();
  const maxDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;

  const formatDateForInput = (dateStr) => {
    const [monthStr, year] = dateStr.split(" ");
    const month = new Date(`${monthStr} 1, 2000`).getMonth() + 1; // Get month as number
    return `${year}-${String(month).padStart(2, '0')}`; // Format to YYYY-MM
  };

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <div className="bg-gray-100 p-4 rounded-md border border-gray-300 mb-4">
        <span className="text-sm text-gray-700">
          Just a quick note: The current data in the preview will stay as it is until you click <strong>&ldquo;Save&ldquo;</strong>
          to make it permanent or <strong>&ldquo;Redo&ldquo;</strong> to discard any changes.
        </span>
      </div>
      <h2 className='font-bold text-lg'>Education</h2>
      <p>Add Your educational details</p>

      <div>
        {educationalList?.map((item, index) => (
          <div key={index}>
            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
              <div className='col-span-2'>
                <label className='text-xs'>University Name</label>
                <Input name="universityName"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.universityName}
                />
              </div>
              <div>
                <label className='text-xs'>Degree</label>
                <Input name="degree"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.degree} />
              </div>
              <div>
                <label className='text-xs'>Major</label>
                <Input name="major"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.major} />
              </div>
              <div>
                <label className='text-xs'>Start Date</label>
                <Input type="month" name="startDate"
                  onChange={(e) => handleChange(e, index)}
                  max={maxDate}  // Limits selection to the current month and year
                  defaultValue={item?.startDate ? formatDateForInput(item.startDate) : ""} // Convert to YYYY-MM
                />
              </div>
              <div>
                <label className='text-xs'>End Date</label>
                <Input type="month" name="endDate"
                  onChange={(e) => handleChange(e, index)}
                  max={maxDate}  // Limits selection to the current month and year
                  defaultValue={item?.endDate ? formatDateForInput(item.endDate) : ""} // Convert to YYYY-MM
                />
              </div>
              <div className="col-span-2 flex items-center justify-end">
                <input
                  type="checkbox"
                  name="currentlyStudying"
                  checked={item?.currentlyStudying || false}
                  onChange={(e) => handleCurrentlyStudyingChange(e, index)}
                  className="mr-2"
                />
                <label className="text-xs">I&apos;m currently studying</label>
              </div>
              <div className='col-span-2'>
                <label>Description</label>
                <Textarea name="description"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.description} />
              </div>
              <div className='flex justify-end col-span-2'>
                <Button variant="outline" onClick={() => RemoveEducation(index)} className="text-primary"> - Remove</Button>
              </div>
            </div>

          </div>
        ))}
      </div>
      <div className='flex justify-between'>

        <Button variant="outline" onClick={AddNewEducation} className="text-primary"> + Add More Education</Button>
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
  )
}

export default Education