import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase';
import { useNavigate } from 'react-router-dom';

function ReportList({selectedFilters, searchQuery = ''}) {
  const [reports, setAllReports] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const q = query(collection(db, 'reports'), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc, index) => {
        const data = doc.data();

        let formattedDate = '-';
        if (data.timestamp?.toDate) {
          const dateObj = data.timestamp.toDate();
          formattedDate = dateObj.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
        }

        return {
          id: doc.id,
          no: index + 1,
          category: data.category || '-',
          status: data.status || '-',
          location: data.location || '-',
          date: formattedDate,
          reportType: data.reportType || '-',
          raw: data,
        };
      });
      setAllReports(fetched);
    });

    return () => unsubscribe();
  }, []);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredReports = reports.filter((report) => {
    const matchesFilters = selectedFilters.length === 0 || selectedFilters.some((filter) =>
      [report.category, report.status, report.reportType].includes(filter)
    );

    const matchesSearch = !searchQuery || Object.values(report).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return matchesFilters && matchesSearch;
  });

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedReports = filteredReports.slice(startIdx, endIdx);
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  return (
    <div className="ReportList-container">
      <table className="ReportList-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Category</th>
            <th>Status</th>
            <th>Report Date</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {paginatedReports.map((report) => (
            <tr
              key={report.id}
              className="ReportList-row"
              onClick={() => navigate(`/report/${report.id}`)}
            >
              <td>{report.no}</td>
              <td>{report.category}</td>
              <td>{report.status}</td>
              <td> {report.date} </td>
              <td> {report.reportType} </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ‹
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default ReportList;