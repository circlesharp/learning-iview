import React from 'react';
import Ionicon from 'react-ionicons';

const CreateBtn = ({onCreateBtnClick}) => {
  return (
    <div className="d-grid">
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => {onCreateBtnClick()}}
      >
        <Ionicon
          className="rounded-circle"
          fontSize="30px"
          color="#fff"
          icon="ios-add-circle"
        />
        创建一条新的记账记录
      </button>
    </div>
  )
};

export default CreateBtn;