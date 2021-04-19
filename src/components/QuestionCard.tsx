import React, { useState } from 'react';
import { questionPropsType } from '../types/quiz_types';


const QuestionCard: React.FC<questionPropsType> = ({ question, options, callBack }) => {
    //console.log(question, options)
    let [selectedAns, setselectedAns] = useState("");

    const handleSelection = (ev: any) => {
        //console.log(ev.target.value);
        setselectedAns(ev.target.value);
    }
    return (
        <div className="question-container">
            <div className="question">
                {question}
            </div>
            <form onSubmit={(e: React.FormEvent<EventTarget>) => callBack(e, selectedAns)}
                className="question-form"
            >
                {
                    options.map((opt: string, ind: number) => {
                        return (
                            <div key={ind}>
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name="opt"
                                        required
                                        value={opt}
                                        checked={selectedAns === opt}
                                        onChange={handleSelection}
                                    />
                                    {opt}

                                </label>
                            </div>
                        )
                    })
                }
                <input type="submit" className="submit" />
            </form>
        </div>
    )
}

export default QuestionCard;