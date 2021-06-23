import React from 'react';
import './TodoTemplate.scss';

const TodoTemplate = ({ children }) => {
  return (
    <div className="TodoTemplate">
      <div className="app-title">yts.mx 영화 정보</div>
      <div className="content">{children}</div>
    </div>
  );
};





export default TodoTemplate;
