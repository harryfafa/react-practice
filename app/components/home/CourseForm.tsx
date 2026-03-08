import React from 'react'
import { scoreOption, type Course } from '~/routes/home'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

type CourseFormProps = {
    item: Course,
    onCourseChange: (
        field: keyof Course,
        id: number,
        value: string
    ) => void,
    removeForm: (id: number) => void
}

function CourseForm({ item, onCourseChange, removeForm }: CourseFormProps) {
    console.log(`render CourseForm`, item.id)
    return (
        <form key={`form${item.id}`} onSubmit={e => e.preventDefault()} className={`flex ${item.isCreating ? 'form-scaleUp' : ''} ${item.isRemoving ? 'form-remove' : ''}`}>
            <input type="text" placeholder="class category" className="form-input" list="classOpt" value={item.category} onChange={(event) => onCourseChange('category', item.id, event.target.value)} />
            <input type="text" placeholder="class number" className="form-input" value={item.classNumber} onChange={(event) => onCourseChange('classNumber', item.id, event.target.value)} />
            <input type="number" placeholder="credits" min={0} max={6} className="form-input w-[15%]" value={item.credit} onChange={(event) => onCourseChange('credit', item.id, event.target.value)} />
            <select name="grade" id="" className="form-input" value={item.grade} onChange={(event) => onCourseChange('grade', item.id, event.target.value)}>
                <option value=""></option>
                {Object.entries(scoreOption).map(([key, value]) => <option key={`gradeOpt${key}`} value={value}>{key}</option>)}
            </select>
            <button type="button" className="border-0 cursor-pointer bg-[#272727]" onClick={() => removeForm(item.id)}>
                <FontAwesomeIcon icon={faTrash} className="text-[1.25rem] pointer-events-none text-white" />
            </button>
        </form>
    )
}

export default React.memo(CourseForm)