import "./ScholarshipWishlist.css";

const ScholarshipWishlist = ({ groupKellogs }) => {
    return (
        <section style={{
            backgroundImage: "url('/assetss/cloud.png')"
        }}>
            <div className="sub-stars">
                <img src="/assetss/stars.png" alt="stars decoration" />
            </div>
            <div className="sub-container">
                <div className="sub-content">
                    <div className="sub-form">
                        <h1>Join the Wishlist</h1>

                        <input type="text" placeholder="Name" />
                        <input type="text" placeholder="Contact Number" />
                        <input type="email" placeholder="Email" />
                        <div className="sub-submit-btn">
                            <button className="sub-submit">
                                Submit
                            </button>
                            <div><img src={groupKellogs?.url} alt="group" /></div>

                        </div>
                    </div>

                </div>

            </div>

        </section >
    );
};

export default ScholarshipWishlist;
