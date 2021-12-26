import { useState } from 'react';
import './ListsPanel.scss';

export default function ListsPanel({ sidebarIsVisible, data }) {
  const [newListTitle, setNewListTitle] = useState('');

  function handleAddNewList(e) {
    if (e.key !== 'Enter') return;

    console.log('Add new list:', newListTitle);
    setNewListTitle('');
  }

  return (
    <div className={`ListsPanel${!sidebarIsVisible ? ' ListsPanel--hide' : ''}`}>
      <div className='ListsPanel__wrapper'>
        <h2>Lists:</h2>
        <ul>
          {data.map((list) => (
            <li id={list.id} key={list.id}>
              {list.title}
            </li>
          ))}
        </ul>

        <div className='ListsPanel__add-new-input-container'>
          <input
            type='text'
            placeholder='+ Add new list...'
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            onKeyDown={handleAddNewList}
          />
        </div>
      </div>
    </div>
  );
}
