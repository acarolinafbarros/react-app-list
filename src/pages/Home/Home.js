import React, { useEffect, useState } from 'react';

import { Item } from '../../components/Item/Item';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Pagination } from "../../components/Pagination/Pagination";
import data from './../../data/apps.json';
import './Home.css';

const getListOfAppsOrderBySumOfPlans = () => {
  data.forEach(item => {
    const totalPrice = item.subscriptions.reduce((acc, subs) => acc + subs.price, 0);
    Object.assign(item, { totalPrice: totalPrice });
  })
  return data.sort((item1, item2) => item1.totalPrice - item2.totalPrice);
};

export default function Home() {
  const appsPerPage = 4;
  const categories = [...new Set(data.flatMap(item => item.categories))].sort();

  const [searchValue, setSearchValue] = useState();
  const [totalApps, setTotalApps] = useState(getListOfAppsOrderBySumOfPlans());
  const [appsPaginate, setAppsPaginate] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if(totalApps.length <= appsPerPage) {
      setCurrentPage(1);
    }

    const indexOfLastApp = currentPage * appsPerPage;
    const indexOfFirstApp = indexOfLastApp - appsPerPage;

    setAppsPaginate(totalApps.slice(indexOfFirstApp, indexOfLastApp));
  }, [currentPage, totalApps, searchValue]);

  const onChange = (value) => {
    setSearchValue(value)
    setTotalApps(data.filter(item => item.name.toLowerCase().includes(value.toLowerCase())));
 }

  const onClickCategory = (category) => {
    setSearchValue("");
    setTotalApps(data.filter(item => item.categories.includes(category)));
  };

  const onClickReset = () => {
    setSearchValue("");
    setTotalApps(data);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return(
    <div className="home">
      <div className="categoriesContainer">
        <span className="title">Categories</span>
        <div className="categoriesList">
          { categories && (
            <>
              {categories.map(item => (
                <button
                  key={item}
                  className="buttonCategory"
                  onClick={() => onClickCategory(item)}
                >
                  {item}
                </button>
              ))}
              <button 
                className="reset"
                onClick={() => onClickReset()}>
                  Reset
              </button>
            </>
          )}
         
        </div>
      </div>
      <div className="listContainer">
        <SearchBar searchValue={searchValue} onChange={onChange} />
        {appsPaginate && appsPaginate.map(item => (
          <Item
            key={item.id}
            name={item.name} 
            description={item.description} 
            categories={item.categories} 
            subscriptions={item.subscriptions}>
          </Item>
        ))}
        <Pagination
          currentPage={currentPage}
          appsPerPage={appsPerPage}
          totalApps={totalApps.length}
          paginate={paginate}
        />      
      </div>
    </div>
  );
}