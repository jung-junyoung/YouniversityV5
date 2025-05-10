import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase';
import { useNavigate } from 'react-router-dom';

function ReportList() {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'reports'));
        const data = querySnapshot.docs.map((doc, index) => {
          const report = doc.data();

          let formattedDate = '-';
          if (report.timestamp && typeof report.timestamp.toDate === 'function') {
            const dateObj = report.timestamp.toDate();
            formattedDate = dateObj.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            });
          }

          return {
            id: doc.id,
            no: index + 1,
            category: report.category || '-',
            status: report.status || '-',
            date: formattedDate,
          };
        });
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  useEffect(() => {
    console.log("Fetched reports:", reports);
  }, [reports]);

  return (
    <div className="ReportList-container">
      <table className="ReportList-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Category</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr
              key={report.id}
              className="ReportList-row"
              onClick={() => navigate(`/report/${report.id}`)}
            >
              <td>{report.no}</td>
              <td>{report.category}</td>
              <td> {report.date} </td>
              <td>{report.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportList;