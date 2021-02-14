import React from 'react';
import Ionicon from 'react-ionicons';

class CategorySelect extends React.Component {
  selectCategory(event, category) {
    event.preventDefault();
    this.setState({
      selectedCategoryId: category.id,
    });
    this.props.onSelectCategory(category);
  }

  render() {
    const { categories, selectedCategory } = this.props;
    const selectedCategoryId = selectedCategory && selectedCategory.id;

    return (
      <div className="category-select-component">
        <div className="row">
          {
            categories.map((category, index) => {
              const iconColor = category.id === selectedCategoryId ? '#fff' : '#555';
              const backColor = category.id === selectedCategoryId ? '#347eff' : '#efefef';
              const activeClassName = selectedCategoryId === category.id
                ? 'category-item col-3 active'
                : 'category-item col-3';

              return (
                <div
                  className={activeClassName}
                  key={index}
                  onClick={event => { this.selectCategory(event, category); }}
                >
                  <Ionicon
                    className="rounded-circle"
                    style={{ backgroundColor: backColor, padding: '5px' }}
                    fontSize="50px"
                    color={iconColor}
                    icon={category.iconName}
                  />
                  <p>{category.name}</p>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default CategorySelect;
