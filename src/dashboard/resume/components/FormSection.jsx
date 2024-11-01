/* eslint-disable react-hooks/exhaustive-deps */
import { Link, Navigate, useParams } from "react-router-dom"
import PersonalDetails from "./forms/PersonalDetails"
import { Button } from "../../../components/ui/button"
import { ArrowLeft, ArrowRight, Home } from "lucide-react"
import { useEffect, useState } from "react";
import Summery from "./forms/Summery";
import Skills from "./forms/Skills";
import Education from "./forms/Education";
import Experience from "./forms/Experience";

function FormSection() {

  const [enableNext, setEnableNext] = useState(true);
  const { resumeId } = useParams();
  // const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [activeFormIndex, setActiveFormIndex] = useState(() => {
    return parseInt(localStorage.getItem('activeFormIndex')) || 1;
  });

  useEffect(() => {
    console.log("activeFormIndex", activeFormIndex);
    const handleBeforeUnload = () => {
      // Reset activeFormIndex in local storage
      localStorage.setItem('activeFormIndex', activeFormIndex);
    };

    // Set the activeFormIndex to 1 on component unmount
    return () => {
      if (activeFormIndex > 5) {
        setActiveFormIndex(activeFormIndex);
        localStorage.setItem('activeFormIndex', activeFormIndex);
      }
      else {
        setActiveFormIndex(1);
        localStorage.setItem('activeFormIndex', 1);
      }
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };

  }, []);

  useEffect(() => {
    if (activeFormIndex > 5) {
      setActiveFormIndex(5);
      localStorage.setItem('activeFormIndex', 5);
    }
    else {
      setActiveFormIndex(activeFormIndex);
      localStorage.setItem('activeFormIndex', activeFormIndex);
    }
    console.log("activeFormIndex", activeFormIndex);
  }, [activeFormIndex]);

  const handleNavigateToView = () => {
    console.log("activeFormIndex", activeFormIndex);
    setActiveFormIndex(5);
    localStorage.setItem('activeFormIndex', 5); // Set activeFormIndex to 5 in local storage
  };

  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-5'>
          <Link to={"/dashboard"}>
            <Button onClick={() => setActiveFormIndex(1)}><Home /></Button>
          </Link>

        </div>
        <div className='flex gap-2'>
          {activeFormIndex > 1
            && <Button size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}> <ArrowLeft /> </Button>}
          <Button
            disabled={!enableNext}
            className="flex gap-2" size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          > Next
            <ArrowRight /> </Button>
        </div>
      </div>

      {activeFormIndex == 1 ?
        <PersonalDetails enabledNext={(v) => setEnableNext(v)} />
        : activeFormIndex == 2 ?
          <Summery enabledNext={(v) => setEnableNext(v)} />
          : activeFormIndex == 3 ?
            <Experience />
            : activeFormIndex == 4 ?
              <Education />
              : activeFormIndex == 5 ?
                <Skills />
                :
                <Navigate to={`/my-resume/${resumeId}/view`}
                  replace={true} // Prevents adding a new entry in the history stack
                  onClick={handleNavigateToView} // Call to set index to 5
                />

      }
    </div>
  )
}

export default FormSection