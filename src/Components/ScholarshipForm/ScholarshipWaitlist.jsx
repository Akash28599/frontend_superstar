import "./ScholarshipWaitlist.css";

const ScholarshipWaitlist = ({data }) => {
    return (
        <section style={{
            backgroundImage: `url('${data?.waitlistBackground.url}')`
        }}>
            <div className="sub-stars">
                <img src={data?.waitlistImage.url} alt="stars decoration" />
            </div>
            <div className="sub-container">
                <div className="sub-content">
                    <div className="sub-form">
                        <h1>{data?.waitlistTitle}</h1>

                        <input type="text" placeholder="Name" />
                        <input type="text" placeholder="Contact Number" />
                        <input type="email" placeholder="Email" />
                        <div className="sub-submit-btn">
                            <button className="sub-submit">
                                {data?.waitlistButtonText}
                            </button>
                            <div><img src={data?.groupKellogs?.url} alt="group" /></div>

                        </div>
                    </div>

                </div>

            </div>

        </section >
    );
};

export default ScholarshipWaitlist;
