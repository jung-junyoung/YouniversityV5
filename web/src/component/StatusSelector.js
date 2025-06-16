import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';

const statusList = ['New', 'In Progress', 'Completed'];

function StatusSelector({ reportId, currentStatus, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(currentStatus);

  const handleChange = async (newStatus) => {
    try {
      const docRef = doc(db, 'reports', reportId);
      await updateDoc(docRef, { status: newStatus });

      setSelected(newStatus);
      setOpen(false);
      onUpdate?.(newStatus); // 외부 업데이트 필요 시
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  return (
    <div className="StatusSelector">
      <div
        className={`Detail-badge status ${selected.toLowerCase().replace(' ', '')}`}
        onClick={() => setOpen(!open)}
      >
        {selected}
      </div>

      {open && (
        <div className="StatusDropdown">
          {statusList.map((status) => (
            <div
              key={status}
              className={`StatusItem ${status === selected ? 'selected' : ''}`}
              onClick={() => handleChange(status)}
            >
              <input
                type="radio"
                checked={status === selected}
                readOnly
              />
              <span>{status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StatusSelector;