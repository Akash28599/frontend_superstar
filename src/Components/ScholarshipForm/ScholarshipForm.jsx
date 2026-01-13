import { useRef, useState } from "react";
import "./ScholarshipForm.css";
import { intArrayBuilder } from "../../Utils/Array";
import KelloggIcon from "../KelloggIcon/KelloggIcon";

const ScholarshipForm = ({ data }) => {
    const fileRef = useRef(null);
    const [wordCount, setWordCount] = useState(100)
    const [showTooltip, setShowTooltip] = useState(false)

    const [fileName, setFileName] = useState("");
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleWordCount = (e) => {
        const text = e.target.value
        const words = text.trim() === "" ? [] : text.trim().split(/\s+/)

        if (words.length <= 100) {
            setWordCount(100 - words.length)
        } else {
            e.target.value = words.slice(0, 100).join(" ")
            setWordCount(0)
        }
    }


    return (
        <section className="scholarship">
            <div className="container">
                <div className="hang-monkey"><img src={data.hangingMonkey.url} alt='' /></div>
                {/* LEFT BRAND COLUMN */}
                <KelloggIcon IconImage={data.IconImage.url} />

                {/* FORM + CONTENT */}
                <div className="content">

                    {/* LEFT FORM */}
                    <div className="form">
                        <h1>Submit your <br /> entries here</h1>

                        <input type="text" placeholder="Name" />
                        <input type="text" placeholder="School" />

                        <div className="row">
                            <input type="text" placeholder="City/Location" />
                            <select  style={{paddingLeft:'8px'}}>
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
                            onMouseMove={(e) => {
                                setMousePos({ x: e.clientX, y: e.clientY })
                            }}
                            onMouseOver={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            onClick={() => {
                                setShowTooltip(false)
                                fileRef.current.click()
                            }}
                            style={{ position: "relative" }}
                        >
                            <input
                                type="file"
                                ref={fileRef}
                                hidden
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0]

                                    if (file && file.type.startsWith("image/")) {
                                        setFileName(file.name)
                                    } else {
                                        alert("Please select an image file only")
                                        e.target.value = ""
                                    }
                                }}
                            />


                            Snap and upload photos of 5 packs of your favorite Kellogg’s cereal along with your essay.

                            {showTooltip && (
                                <div
                                    className="file-tooltip"
                                    style={{
                                        top: mousePos.y + 12,
                                        left: mousePos.x + 12
                                    }}
                                >
                                    {fileName || "No file selected"}
                                </div>
                            )}
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
