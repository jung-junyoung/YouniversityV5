import React from "react";
import kyle from '../assets/kyle.webp';
import SideNav from './SideNav';
import SearchBar from './SearchBar';

const Report = () => {
  const handleSearch = (query) => {
    console.log('검색어:', query);
    // 나중에 검색 로직 연결 가능 (ex: API 요청 or 필터링)
  };

  return (
    <div className="Report-page">
      <SideNav />
      <div className="Report-content">
        <SearchBar onSearch={handleSearch} />
        {/* 여기에 Location, Type 체크박스나 테이블이 이어질 예정 */}
      </div>
    </div>
  );
};

export default Report;