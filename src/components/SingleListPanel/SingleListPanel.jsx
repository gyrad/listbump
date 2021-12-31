import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import './SingleListPanel.scss';

export default function SingleListPanel() {
  const [title, setTitle] = useState('Groceries');
  const [list, setList] = useState([
    {
      id: uuidv4(),
      content: 'Carrots',
      isCompleted: false,
    },
    {
      id: uuidv4(),
      content: 'Spinach',
      isCompleted: false,
    },
    {
      id: uuidv4(),
      content: 'Eggs',
      isCompleted: false,
    },
  ]);
  const [activeList, setActiveList] = useState([...list]);
  const [completedList, setCompletedList] = useState([]);
  const [newItemContent, setNewItemContent] = useState('');
  const [percentComplete, setPercentComplete] = useState(0);
  const [currentlyEditingId, setCurrentlyEditingId] = useState(null);
  const [currentlyEditingContent, setCurrentlyEditingContent] = useState('');

  useEffect(() => {
    setPercentComplete(() => {
      const completedCount = list.filter((item) => item.isCompleted).length;
      return (completedCount / list.length) * 100;
    });
  }, [list]);

  useEffect(() => {
    setActiveList(() => list.filter((item) => !item.isCompleted));
    setCompletedList(() => list.filter((item) => item.isCompleted));
  }, [list]);

  function handleCheckbox(e) {
    setList((oldList) => {
      return oldList.map((item) => {
        if (item.id === e.target.id) {
          item.isCompleted = e.target.checked;
        }
        return item;
      });
    });
  }

  function handleAddNewItem(e) {
    if (e.key !== 'Enter') return;

    const newItem = {
      id: uuidv4(),
      content: newItemContent,
      isCompleted: false,
    };
    setList((oldList) => [...oldList, newItem]);
    setNewItemContent('');
  }

  function handleDelete(id) {
    const isConfirmed = confirm('Are you sure you want to delete this entry?');
    if (!isConfirmed) return;

    setList((oldList) => oldList.filter((listItem) => listItem.id !== id));
  }

  function handleEdit(id) {
    const content = document.querySelector(`label[for='${id}'] .SingleListPanel__content`);
    let isDiscarded = false;

    if (!content.hasAttribute('contentEditable') || content.contentEditable === 'false') {
      setCurrentlyEditingId(id);
      content.contentEditable = 'true';
      setCurrentlyEditingContent(content.innerText);
      content.focus();
      // select all the content in the element
      document.execCommand('selectAll', false, null);
      // collapse selection to the end
      document.getSelection().collapseToEnd();

      content.addEventListener('keydown', keydownHandler);
      content.addEventListener('input', inputHandler);
      content.addEventListener('blur', blurHandler);

      function keydownHandler(e) {
        if (!['Enter', 'Escape'].includes(e.key)) return;
        if (e.key === 'Escape') isDiscarded = true;
        content.blur();
      }

      function inputHandler(e) {
        setCurrentlyEditingContent(e.target.innerText);
      }

      function blurHandler(e) {
        content.contentEditable = 'false';

        if (isDiscarded) {
          const prevContent = list.find((item) => item.id === id).content;
          content.innerText = prevContent;
        } else {
          setList(
            list.map((item) => {
              if (item.id === id) {
                item.content = e.target.innerText;
              }
              return item;
            })
          );
        }
        content.removeEventListener('keydown', keydownHandler);
        content.removeEventListener('input', inputHandler);
        content.removeEventListener('blur', blurHandler);
      }
    }
  }

  return (
    <div className='SingleListPanel'>
      <div className='SingleListPanel__container'>
        <div className='SingleListPanel__heading'>
          <h2>{title}</h2>
        </div>
        <div className='SingleListPanel__progressbar-container'>
          <div className='SingleListPanel__progressbar' style={{ width: `${percentComplete}%` }}></div>
        </div>
        <ul className='SingleListPanel__list'>
          {activeList.map((listItem) => (
            <li key={listItem.id}>
              <input type='checkbox' id={listItem.id} checked={listItem.isCompleted} onChange={handleCheckbox} />
              <label htmlFor={listItem.id}>
                <div className='SingleListPanel__content' contentEditable={false} suppressContentEditableWarning={true}>
                  {listItem.content}
                </div>
                <div className='SingleListPanel__controls'>
                  <button onClick={() => handleEdit(listItem.id)}>
                    <i className='fas fa-edit'></i>
                  </button>{' '}
                  <button onClick={() => handleDelete(listItem.id)}>
                    <i className='fas fa-trash-alt'></i>
                  </button>
                </div>
              </label>
            </li>
          ))}
        </ul>

        <div className='SingleListPanel__add-new-input-container'>
          <input
            type='text'
            placeholder='+ Add new item...'
            value={newItemContent}
            onChange={(e) => setNewItemContent(e.target.value)}
            onKeyDown={handleAddNewItem}
          />
        </div>

        {!!completedList.length && <div className='SingleListPanel__list-heading'>Completed items:</div>}

        <ul className='SingleListPanel__list'>
          {completedList.map((listItem) => (
            <li key={listItem.id}>
              <input type='checkbox' id={listItem.id} checked={listItem.isCompleted} onChange={handleCheckbox} />
              <label htmlFor={listItem.id}>
                <div className='SingleListPanel__content'>{listItem.content}</div>
                <div className='SingleListPanel__controls'>
                  <button onClick={() => handleEdit(listItem.id)}>
                    <i className='fas fa-edit'></i>
                  </button>{' '}
                  <button onClick={() => handleDelete(listItem.id)}>
                    <i className='fas fa-trash-alt'></i>
                  </button>
                </div>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
