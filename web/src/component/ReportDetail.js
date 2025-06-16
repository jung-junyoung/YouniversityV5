import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import MapSection from './MapSection';
import StatusSelector from './StatusSelector';

function ReportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);

  const statusToClass = (status) => {
    if (!status) return 'gray';
    const lower = status.toLowerCase().replace(/\s+/g, '-');
    switch (lower) {
      case 'new':
      case 'submitted':
        return 'status-new';
      case 'in-progress':
        return 'status-in-progress';
      case 'completed':
        return 'status-completed';
      default:
        return 'gray';
    }
  };

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

  let formattedDate = 'To be continued...';
  if (report.timestamp?.toDate) {
    const dateObj = report.timestamp.toDate();
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');

    formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  return (
    <div className="ReportDetail-container">
      <div className="Detail-header">
        <button className="Detail-back" onClick={() => navigate(-1)}>← Report</button>
        <div className="Detail-tags">
            <span className="Detail-tag blue">{report.reportType ?? 'Null'}</span>
            <span className={`Detail-tag status ${statusToClass(report.status)}`}>
              {report.status}
            </span>
        </div>
      </div>

      <h1 className="Detail-title">
        {report.title?.trim() ? report.title : report.category}
      </h1>
      <p className="Detail-description">
        {report.description?.trim() ? report.description : report.category}
      </p>

      <p className='Detail-time'>
        {formattedDate || 'Not Founc'}
      </p>
      <p className='Detail-user'>
        {report.userDisplayName || 'Unknown user'}
      </p>

      <div className="Detail-section-title">Attachments</div>
      <div className="Detail-images" >
        {report.photoUrls?.map((url, idx) => (
          <img key={idx} src={url} alt={`Attachment ${idx + 1}`} />
        ))}
      </div>

      <div className="Detail-info-horizontal">
        <div className="Detail-info-pair">
          <div className="Detail-section-title">Category</div>
          <div className="Detail-badge gray">{report.category}</div>
        </div>
        <div className="Detail-info-pair">
          <div className="Detail-section-title">Status</div>
          <StatusSelector
            reportId={id}
            currentStatus={report.status}
            onUpdate={(newStatus) =>
              setReport((prev) => ({ ...prev, status: newStatus }))
            }
          />
        </div>
      </div>

      {report.reportType === 'Indoor' ? (
        <div className="Detail-info-horizontal">
          <div className="Detail-info-pair">
            <div className="Detail-section-title">Location</div>
            <div>
              <div className="Detail-badge gray">{report.buildingName || '-'}</div>
              <div className="Detail-badge gray">{report.buildingFloor || '-'}</div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="Detail-section-title">Location</div>
          <div className="Detail-map-container">
            {report.location && report.location.latitude && report.location.longitude && (
              <MapSection lat={report.location.latitude} lng={report.location.longitude} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportDetail;