import React from 'react';
import withContext from '../WithContext';
import PriceForm from '../components/PriceForm';
import CategorySelect from '../components/CategorySelect';
import { Tabs, Tab } from '../components/Tabs';
import { TYPE_INCOME, TYPE_OUTCOME } from '../utility';
import { testCategories } from '../testData';

class Create extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { data } = this.props;
    const filterCategories = testCategories.filter(category => category.type === TYPE_OUTCOME);
    return (
      <div
        className="create-page py-3 px-3 rounded mt-3"
        style={{ background: '#fff' }}
      >
        {/* 1 Tabs */}
        <Tabs
          activeIndex={0}
          onTabChange={() => { }}
        >
          <Tab>支出</Tab>
          <Tab>收入</Tab>
        </Tabs>

        {/* 2 CategorySelect */}
        <CategorySelect
          categories={filterCategories}
          onSelectCategory={() => { }}
        />

        {/* 3 PriceForm */}
        <PriceForm
          onFormSubmit={() => { }}
          onCancelSubmit={() => { }}
        />
      </div>
    );
  }
}

export default withContext(Create);
