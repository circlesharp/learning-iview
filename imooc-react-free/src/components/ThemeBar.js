import React from 'react';
import ThemeContext from '../theme-context';

const ThemeBar = () => {
  return (
    /* ThemeContext.Consumer 接受一个函数 */
    <ThemeContext.Consumer>
      {
        theme => (
          <div
            className="alart mt-5"
            style={ { background: theme.bgColor, color: theme.color } }
          >
            样式区域
            <button className={ theme.className }>
              样式按钮
            </button>
          </div>
        )
      }
    </ThemeContext.Consumer>
  );
};

export default ThemeBar;
