import React, { useEffect, useRef, useState } from "react";
import "./ScholarshipForm.css";
import { intArrayBuilder } from "../../Utils/Array";
import KelloggIcon from "../KelloggIcon/KelloggIcon";

const ScholarshipForm = ({ data }) => {
    const fileRef = useRef(null);
    const [wordCount, setWordCount] = useState(100)

    const handleWordCount = (e) => {
        const text = e.target.value.trim()
        const words = text === "" ? 0 : text.split(/\s+/).length
        setWordCount(100 - words)
    }

    return (
        <section className="scholarship">
            <div className="container">
                <div className="hang-monkey"><img src={data.hangingMonkey.url}/></div>
                {/* LEFT BRAND COLUMN */}
                <KelloggIcon IconImage={data.IconImage} />

                {/* FORM + CONTENT */}
                <div className="content">

                    {/* LEFT FORM */}
                    <div className="form">
                        <h1>Submit your entries here</h1>

                        <input type="text" placeholder="Name" />
                        <input type="text" placeholder="School" />

                        <div className="row">
                            <input type="text" placeholder="City/Location" />
                            <select>
                                <option value="">Age</option>
                                {intArrayBuilder(5, 18).map(age => (
                                    <option key={age} value={age}>{age}</option>
                                ))}
                            </select>
                        </div>

                        <input type="text" placeholder="Contact Number" />
                        <input type="email" placeholder="Email" />
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="right">

                        <div
                            className="upload"
                            onClick={() => fileRef.current.click()}
                        >
                            <input type="file" ref={fileRef} hidden />
                            Snap and upload photos of 5 packs of your favorite Kellogg’s cereal along with your essay.
                        </div>

                        <div className="essay">
                            <div className="counter">{wordCount} words remaining</div>
                            <textarea rows="12" onChange={(e) => handleWordCount(e)}></textarea>
                        </div>

                        <div class="submit-btn">
                            <button className="submit">
                                Submit
                            </button>
                            <img src={data.groupKellogs?.url} alt="group" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ScholarshipForm;
