import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="page-container">
      <main className="dashboard">
        <div className="dashboard-inner">
          <span className="overline">Seoul Climate</span>
          <h1 className="title">기후 분석 플랫폼</h1>

          <div className="hero-section">
            <h2 className="subtitle">
              실시간 기후 데이터와 변화 패턴을 시각화하여 제공합니다
            </h2>
          </div>

          <div className="card-container">
            <Link to="/seoul-weather" className="card">
              <div className="card-content">
                <span className="card-label">실시간</span>
                <h3 className="card-title">Seoul Weather</h3>
                <p className="card-description">현재 기온, 강수량, 구름량 등</p>
              </div>
            </Link>

            <Link to="/climate-analysis" className="card">
              <div className="card-content">
                <span className="card-label">분석</span>
                <h3 className="card-title">Climate Analysis</h3>
                <p className="card-description">기후 변화 패턴과 상세 분석</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
