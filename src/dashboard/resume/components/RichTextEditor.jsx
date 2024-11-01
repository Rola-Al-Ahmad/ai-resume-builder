/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { AIChatSession } from './../../../../service/AIModel';
import { Brain, LoaderCircle } from 'lucide-react';
import { useContext, useState } from 'react'
import {
    BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList,
    BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar
}
    from 'react-simple-wysiwyg'
import { toast } from 'sonner';

const PROMPT = 'Depends on {positionTitle} give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , '
    + 'give me result in HTML tags with <li> </li> tags in array format please do not show any thing with the li elements'
    + 'without any bracekets and commas or semicolon in between and without quotation.';
function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {

    const [value, setValue] = useState(defaultValue);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [loading, setLoading] = useState(false);

    const GenerateSummeryFromAI = async () => {

        if (!resumeInfo?.experience[index]?.title) {
            toast('Please Add Position Title');
            return;
        }
        setLoading(true)
        const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);

        const result = await AIChatSession.sendMessage(prompt);
        console.log(result.response.text());
        const resp = result.response.text().replace('"', '').replace('"', '').replace(`{"experience": ["`, '').replace(`"]}`, '');

        console.log("resumeInfo", resumeInfo);
        
        setValue(resp);
        setLoading(false);
    }

    return (
        <div>
            <div className='flex justify-between my-2'>
                <label className='text-xs'>Summery</label>
                <Button variant="outline" size="sm"
                    onClick={GenerateSummeryFromAI}
                    disabled={loading}
                    className="flex gap-2 border-primary text-primary">
                    {loading ?
                        <LoaderCircle className='animate-spin' /> :
                        <>
                            <Brain className='h-4 w-4' /> Generate from AI
                        </>
                    }
                </Button>
            </div>
            <EditorProvider>
                <Editor value={value} onChange={(e) => {
                    setValue(e.target.value);
                    onRichTextEditorChange(e)
                }}>
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    )
}

export default RichTextEditor