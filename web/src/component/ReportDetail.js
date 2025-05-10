import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase';

function ReportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const docRef = doc(db, 'reports', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setReport(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching report:', error);
      }
    };
    fetchReport();
  }, [id]);

  const handleBack = () => {
    navigate('/Report');
  };

  if (!report) return <div style={{ padding: '4rem' }}>Loading...</div>;

  // 날짜 변환
  let formattedDate = 'To be continued...';
  if (report.timestamp?.toDate) {
    const dateObj = report.timestamp.toDate();
    formattedDate = new Intl.DateTimeFormat('ko-KR', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Seoul',
    }).format(dateObj);
  }

  return (
    <div className="ReportDetail-container">
      <div className="Detail-header">
        <button className="Detail-back" onClick={() => navigate(-1)}>← Report</button>
        <div className="Detail-tags">
            <span className="Detail-tag blue">Outdoor</span>
            <span className="Detail-tag status">{report.status || 'To be continued...'}</span>
        </div>
    </div>

      <h1 className="Detail-title">To be continued...</h1>
      <p className="Detail-description">
        {report.description || 'To be continued...'}
      </p>

      <div className="Detail-section-title">Attachments</div>
      <div className="Detail-images">
        {report.imageUrls?.map((url, idx) => (
          <img key={idx} src={url} alt={`Attachment ${idx + 1}`} />
        ))}
      </div>

      <div className="Detail-info">
        <div className="Detail-info-block">
          <div className="Detail-info-label">Category</div>
          <div className="Detail-info-value">{report.category}</div>
        </div>
        <div className="Detail-info-block">
          <div className="Detail-info-label">Status</div>
          <div className="Detail-info-value">{report.status}</div>
        </div>
        <div className="Detail-info-block">
          <div className="Detail-info-label">Date</div>
          <div className="Detail-info-value">{formattedDate}</div>
        </div>
        <div className="Detail-info-block">
          <div className="Detail-info-label">Location</div>
          <div className="Detail-info-value">
            {Array.isArray(report.location)
              ? report.location.join(', ')
              : 'To be continued...'}
          </div>
        </div>
        <div className="Detail-info-block">
          <div className="Detail-info-label">User</div>
          <div className="Detail-info-value">{report.userId}</div>
        </div>
      </div>
    </div>
  );
}

export default ReportDetail;