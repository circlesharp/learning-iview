import React from 'react';
import { withRouter } from 'react-router-dom';
import withContext from '../WithContext';
import PriceForm from '../components/PriceForm';
import CategorySelect from '../components/CategorySelect';
import { Tabs, Tab } from '../components/Tabs';
import { TYPE_INCOME, TYPE_OUTCOME } from '../utility';

const tabsText = [TYPE_OUTCOME, TYPE_INCOME];

class Create extends React.Component {
  constructor(props) {
    super(props);

    const { items, categories } = this.props.data;
    const { id } = this.props.match.params;

    this.state = {
      selectedTab: (id && items[id]) ? categories[items[id].cid].type : TYPE_OUTCOME,
      selectedCategory: (id && items[id]) ? categories[items[id].cid] : null,
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const { editItem, categories } = await this.props.actions.getEditData(id);
    this.setState({
      selectedTab: (id && editItem) ? categories[editItem.cid].type : TYPE_OUTCOME,
      selectedCategory: (id && editItem) ? categories[editItem.cid] : null,
    });
  }

  onTabChange = index => {
    this.setState({ selectedTab: tabsText[index] });
  };

  selectCategory = category => {
    this.setState({ selectedCategory: category });
  };

  onCancelSubmit = () => {
    this.props.history.push('/');
  };

  submitForm = async (data, isEditMode) => {
    if (this.state.selectedCategory == null) {
      alert('please select category');
      return;
    }

    if (!isEditMode) {
      // create
      await this.props.actions.createItem(data, this.state.selectedCategory.id);
    } else {
      // update
      await this.props.actions.updateItem(data, this.state.selectedCategory.id);
    }

    this.props.history.push('/');
  };

  render() {
    const { items, categories } = this.props.data;
    const { selectedTab, selectedCategory } = this.state;
    const { id } = this.props.match.params;
    const editItem = (id && items[id]) ? items[id] : {};

    const filterCategories = Object.keys(categories)
      .filter(id => categories[id].type === selectedTab)
      .map(id => categories[id]);

    return (
      <div
        className="create-page py-3 px-3 rounded mt-3"
        style={{ background: '#fff' }}
      >
        {/* 1 Tabs */}
        <Tabs
          activeIndex={tabsText.indexOf(selectedTab)} // 可用 findIndex 代替
          onTabChange={this.onTabChange}
        >
          <Tab>支出</Tab>
          <Tab>收入</Tab>
        </Tabs>

        {/* 2 CategorySelect */}
        <CategorySelect
          categories={filterCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={this.selectCategory}
        />

        {/* 3 PriceForm */}
        <PriceForm
          item={editItem}
          onFormSubmit={this.submitForm}
          onCancelSubmit={this.onCancelSubmit}
        />
      </div>
    );
  }
}

export default withRouter(withContext(Create));
