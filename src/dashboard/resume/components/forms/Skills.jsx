/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Input } from "../../../../components/ui/input";
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { Button } from "../../../../components/ui/button";
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
function Skills() {

  const [skillsList, setSkillsList] = useState([]);

  const { resumeId } = useParams();

  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const userEmail = resumeInfo?.email;
  const [removedItems, setRemovedItems] = useState([]); // Stack to keep track of removed items

  // const [skillsList, setSkillsList] = useState([{
  //   name: '',
  //   rating: 0
  // }])
  //======
  // useEffect(() => {
  //   resumeInfo && setSkillsList(resumeInfo?.skills)
  // }, [])
  //=========
  // useEffect(() => {
  //   setResumeInfo({
  //     ...resumeInfo,
  //     skills: skillsList
  //   })
  // }, [skillsList])

  // useEffect(() => {
  //   const savedSkills = JSON.parse(localStorage.getItem('skillsList')) || [];
  //   if (savedSkills.length > 0) {
  //     setSkillsList(savedSkills);
  //     setResumeInfo((prevInfo) => ({ ...prevInfo, skills: savedSkills }));
  //   } else if (resumeInfo?.skills?.length > 0) {
  //     setSkillsList(resumeInfo.skills);
  //   }
  // }, []);

  useEffect(() => {
    const savedSkills = loadSkillForEmail(userEmail);
    if (savedSkills.length > 0) {
      setSkillsList(savedSkills);
      setResumeInfo((prevInfo) => ({ ...prevInfo, skills: savedSkills }));
    } else if (resumeInfo?.skills?.length > 0) {
      setSkillsList(resumeInfo.skills);
    }
  }, [resumeInfo]);

  useEffect(() => {
    setResumeInfo((prevInfo) => ({
      ...prevInfo,
      skills: skillsList,
    }));
    localStorage.setItem('skillsList', JSON.stringify(skillsList));
  }, [skillsList]);

  const saveSkillForEmail = (email, skillsList) => {
    const savedData = JSON.parse(localStorage.getItem('skillsList')) || {};
    savedData[email] = skillsList;
    localStorage.setItem('skillsList', JSON.stringify(savedData));
  };
  const loadSkillForEmail = (email) => {
    const savedData = JSON.parse(localStorage.getItem('skillsList')) || {};
    return savedData[email] || [];
  };

  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();

    if (name === 'rating') {
      newEntries[index].rating = value * 20;
    } else {
      newEntries[index][name] = value;
    }
    console.log("newEntries,", newEntries)
    setSkillsList(newEntries);
  }

  const AddNewSkills = () => {
    setSkillsList([...skillsList, {
      name: '',
      rating: 0
    }])
  }
  // const RemoveSkills = () => {
  //   setSkillsList(skillsList => skillsList.slice(0, -1))
  // }

  const RemoveSkills = (indexToRemove) => {
    const itemToRemove = skillsList[indexToRemove];
    setSkillsList(skillsList =>
      skillsList.filter((_, index) => index !== indexToRemove)
    );
    localStorage.setItem('skillsList', JSON.stringify(skillsList));
    setRemovedItems([...removedItems, itemToRemove]); // Push the removed item onto the stack
    toast('Skills removed!');
  }

  const handleRedo = () => {
    if (removedItems.length > 0) {
      // Get the last removed item
      const lastRemovedItem = removedItems[removedItems.length - 1];

      // Add it back to the experience list
      setSkillsList([...skillsList, lastRemovedItem]);

      // Remove it from the removed items stack
      setRemovedItems(removedItems.slice(0, -1)); // Remove the last item
    }
  };

  const onSave = () => {

    setLoading(true);
    const data = {
      data: {
        skills: skillsList.map(({ id, ...rest }) => rest)
      }
    }

    GlobalApi.UpdateResumeDetail(resumeId, data)
      .then(resp => {
        console.log(resp);
        setLoading(false);
        toast('Details updated !')
        localStorage.setItem('skillsList', JSON.stringify(skillsList));
      }, (error) => {
        setLoading(false);
        toast('Server Error, Try again!')
      })
  }


  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Skills</h2>
      <p>Add Your top professional key skills</p>

      <div>
        {skillsList?.map((item, index) => (
          <div className='flex justify-between mb-2 border rounded-lg p-3 ' key={index}>
            <div>
              <label className='text-xs'>Name</label>
              <Input className="w-full"
                defaultValue={item.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)} />
            </div>
            <Rating style={{ maxWidth: 120 }} value={item.rating / 20}
              onChange={(v) => handleChange(index, 'rating', v)} />
            <div className='flex justify-end col-span-2'>
              <Button variant="outline" onClick={() => RemoveSkills(index)} className="text-primary"> - Remove</Button>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-between'>

        <Button variant="outline" onClick={AddNewSkills} className="text-primary"> + Add More Skill</Button>
        {/* <Button variant="outline" onClick={RemoveSkills} className="text-primary"> - Remove</Button> */}

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

export default Skills