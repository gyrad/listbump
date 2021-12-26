import { useState } from 'react';
import { useSelector } from 'react-redux';

import Header from './components/Header/Header';
import ListsPanel from './components/ListsPanel/ListsPanel';
import SingleListPanel from './components/SingleListPanel/SingleListPanel';
import './App.scss';

function App() {
  const [sidebarIsVisible, setSidebarIsVisible] = useState(true);
  const lists = useSelector((state) => state.lists);

  console.log(lists);

  return (
    <div className='App'>
      <Header sidebarIsVisible={sidebarIsVisible} setSidebarIsVisible={setSidebarIsVisible} />
      <div className='panels-wrapper'>
        <ListsPanel sidebarIsVisible={sidebarIsVisible} data={lists} />
        <SingleListPanel data={lists} />
      </div>
    </div>
  );
}

export default App;
