import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Schooling</h4>
                <h5>J.B. &amp; KARP Vidhya Sankul, Surat</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Completed my schooling in May 2023 before starting my B.Tech journey.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>
                  AI Agent Developer{" "}
                  <span className="career-tag">(Internship)</span>
                </h4>
                <h5>We3Vision Private Limited</h5>
              </div>
              <h3>6 MOS</h3>
            </div>
            <p>
              Worked as an AI Agent Developer for 6 months at We3Vision Private Limited, building AI agents and an AI-powered resource allocation and skill matching platform with FastAPI, Supabase and React.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech CSE (AI &amp; ML)</h4>
                <h5>P. P. Savani University, Surat</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Pursuing my degree with a CGPA of 7.25 and an SGPA of 7.96, and earning AWS Academy Cloud Foundations, Gen AI Study Jams and Data Analytics &amp; Visualization certifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
