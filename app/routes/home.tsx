import { useState, useMemo, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import CourseForm from "~/components/home/CourseForm";
export const scoreOption = {
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.4,
  'B': 3.0,
  'C+': 2.4,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.4,
  'D': 1.0,
  'D-': 0.7,
  'F': 0.0
} as const;
export type Grade = keyof typeof scoreOption;
export const classList = [
  { code: "ACCT", name: "Accounting" },
  { code: "ASL", name: "American Sign Language" },
  { code: "ANTH", name: "Anthropology" },
  { code: "ART", name: "Art" },
  { code: "BIOL", name: "Biological Science" },
  { code: "BUSM", name: "Business Mgt" },
  { code: "CRDEV", name: "Career Development" },
  { code: "CHEM", name: "Chemistry" },
  { code: "CHIN", name: "Chinese" },
  { code: "COMM", name: "Communication Studies" },
  { code: "CIS", name: "Computer & Information Sciences" },
  { code: "CS", name: "Computer Science" },
  { code: "CRMJ", name: "Criminal Justice" },
  { code: "ECON", name: "Economics" },
  { code: "EDU", name: "Education" },
  { code: "ELED", name: "Elementary Education" },
  { code: "EMGT", name: "Emergency Management" },
  { code: "ENGL", name: "English" },
  { code: "EIL", name: "English as Int'l Language" },
  { code: "ENTR", name: "Entrepreneurship" },
  { code: "EXS", name: "Exercise Sport Science" },
  { code: "FILM", name: "Film" },
  { code: "FIN", name: "Finance" },
  { code: "FORS", name: "Forensic Science" },
  { code: "FREN", name: "French" },
  { code: "GEOG", name: "Geography" },
  { code: "HAWN", name: "Hawaiian" },
  { code: "HWST", name: "Hawaiian Studies" },
  { code: "HLTH", name: "Health" },
  { code: "HIST", name: "History" },
  { code: "HEC", name: "Home Economics" },
  { code: "HTM", name: "Hospitality Tourism Mgt" },
  { code: "HUM", name: "Humanities" },
  { code: "IS", name: "Information System" },
  { code: "IT", name: "Information Technology" },
  { code: "ICS", name: "International Cultural Studies" },
  { code: "IPB", name: "Intercultural Peacebuilding" },
  { code: "JPN", name: "Japanese" },
  { code: "LING", name: "Linguistics" },
  { code: "AMOR", name: "Maori" },
  { code: "MATH", name: "Mathematics" },
  { code: "MUSC", name: "Music" },
  { code: "OCEN", name: "Oceanography" },
  { code: "PAIS", name: "Pacific Island Studies" },
  { code: "PHSC", name: "Physical Science" },
  { code: "POSC", name: "Political Science" },
  { code: "PSYC", name: "Psychology" },
  { code: "PMGT", name: "Public Management" },
  { code: "REL", name: "Religion" },
  { code: "SCI", name: "Science" },
  { code: "SAMN", name: "Samoan" },
  { code: "SCED", name: "Secondary Education" },
  { code: "SOCW", name: "Social Work" },
  { code: "SPAN", name: "Spanish" },
  { code: "SPED", name: "Special Education" },
  { code: "STDEV", name: "Student Development" },
  { code: "TESOL", name: "TESOL" },
  { code: "THEA", name: "Theatre" },
  { code: "TONG", name: "Tongan" },
  { code: "WLNG", name: "World Language" }
] as const;
export type Category = typeof classList[number]['code'];

export type Course = {
  id: number,
  category: Category | '',
  classNumber: number | '',
  credit: number | '',
  grade: Grade | '',
  isRemoving: boolean,
  isCreating: boolean,
}

const defaultForm: Course[] = [
  { id: 0, category: '', classNumber: '', credit: '', grade: '', isRemoving: false, isCreating: false },
  { id: 1, category: '', classNumber: '', credit: '', grade: '', isRemoving: false, isCreating: false },
  { id: 2, category: '', classNumber: '', credit: '', grade: '', isRemoving: false, isCreating: false },
]

export default function Home() {
  const [course, setCourse] = useState<Course[]>(defaultForm)
  const courseIdRef = useRef(3);

  const gpa = useMemo(() => {
    console.log('render get gpaKey')
    let sum = 0;
    let creditSum = 0;

    course.forEach(item => {
      if (item.grade !== "" && item.credit !== "") {
        const credit = Number(item.credit);
        const grade = Number(item.grade);

        creditSum += credit;
        sum += credit * grade;
      }
    })
    return creditSum === 0 ? 0 : sum / creditSum;
  }, [course])

  const onCourseChange = useCallback((field: keyof Course, id: number, value: string) => {
    setCourse(prevCourse => {
      const newCourse = [...prevCourse];
      const _index = newCourse.findIndex(course => course.id === id)
      if (_index !== -1) {
        newCourse[_index] = {
          ...newCourse[_index],
          [field]: value
        }
      }
      return newCourse;
    });
  }, [])

  const removeForm = useCallback((id: number) => {
    // 觸發移除動畫
    setCourse(prevCourse => {
      const newCourse = [...prevCourse];
      const _index = newCourse.findIndex(i => i.id === id);
      if (_index !== -1) {
        newCourse[_index] = {
          ...newCourse[_index],
          isRemoving: true,
        }
      }
      return newCourse
    });

    // 動畫結束後移除該 course
    setTimeout(() => {
      setCourse(prev => prev.filter((i) => i.id !== id))
    }, 500)
  }, [])

  const onAddForm = () => {
    setCourse(prevCourse => {
      const newCourse = [...prevCourse];
      newCourse.push({ id: courseIdRef.current++, category: '', classNumber: '', credit: '', grade: '', isRemoving: false, isCreating: true });
      return newCourse;
    });

    setTimeout(() => {
      setCourse(prevCourse => {
        const newCourse = [...prevCourse];
        newCourse[newCourse.length - 1] = {
          ...newCourse[newCourse.length - 1],
          isCreating: false
        }
        return newCourse
      });
    }, 500)
  }


  return <main>
    <section className="flex p-4 flex-col text-center items-center">
      <h1 className="text-5xl">Grade Input Form</h1>

      {/* 排序功能暫無實作 */}
      <div>
        <button type="button" className="btn">降序排序</button>
        <button type="button" className="btn">升序排序</button>
      </div>
      <section>
        {
          course.map((item) =>
            <CourseForm
              key={`courseFrom${item.id}`}
              item={item}
              onCourseChange={onCourseChange}
              removeForm={removeForm}
            />
          )
        }
      </section>

      <button type="button" onClick={onAddForm} className="bg-[#272727] border-none w-10 my-12 mx-0 cursor-pointer">
        <FontAwesomeIcon icon={faPlusSquare} className="text-[2.5rem] text-white" />
      </button>

      <div className="w-[200px] h-[200px] border-[3px] border-solid border-red-500 rounded-full text-center animate-border-color">
        <p className="mt-[15px]">
          Your semester <br />
          GPA is
        </p>
        <h2 className="text-[3.5rem] font-bold">{gpa.toFixed(2)}</h2>
      </div>
    </section>


    <datalist id="classOpt">
      {classList.map((option, index) => <option key={`classOpt${index}`} value={option.code}>{option.name}</option>)}
    </datalist>
  </main>;
}