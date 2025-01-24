import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Seoul Climate Analysis</h3>
          <p>서울 기후 데이터 시각화 및 분석 프로젝트</p>
          <p>실시간 기후 데이터와 기후 변화 패턴 분석</p>
        </div>

        <div className="footer-section">
          <h3>Technology Stack</h3>
          <div className="tech-stack">
            <span className="tech-item">React</span>
            <span className="tech-item">TypeScript</span>
            <span className="tech-item">Recharts</span>
          </div>
        </div>

        <div className="footer-section">
          <h3>Data Source</h3>
          <p>Open-Meteo Weather API</p>
          <p>Climate Data Analysis</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Seoul Climate Analysis Project. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
