import { useState } from 'react';
import Header from './Header';
import Nav from './Nav';
import Article from './Article';
import Create from './Create';
import Update from './Update';

function App() {
  const [mode, setMode]= useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, title:'html', body: 'html is ...'},
    {id:2, title:'css', body: 'css is ...'},
    {id:3, title:'js', body: 'javascript is ...'}
  ]);

  let content = null;
  let contextControl = null;
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, Web"/>
  } else if (mode === 'READ') {
    let title,body = null;
    for(let i=0; i<topics.length; i++) {
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}/>
    contextControl = <>
      <li>
        <a href={'/update/' + id} onClick={event => {
            event.preventDefault();
            setMode('UPDATE');
          }}>Update
        </a>
      </li>
      <li>
        <input type="button" value="Delete" onClick={() => {
          const newTopics = []
          for(let i=0; i<topics.length; i++) {
            if (topics[i].id !== id) {
              newTopics.push(topics[i]);
            }
          }
          setTopics(newTopics);
          setMode('WELCOME');
        }} />
      </li>
    </>
  } else if (mode === 'CREATE') {
    content = <Create onCreate={(_title, _body) => {
      const newTopics = [...topics]
      newTopics.push({id: nextId, title: _title, body: _body});
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);  
    }}/>
  } else if (mode === 'UPDATE') {
    let title,body = null;
    for(let i=0; i<topics.length; i++) {
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body) => {
      const newTopics = [...topics];
      const updatedTopic = {id: id, title:title, body:body};
      for(let i=0; i<newTopics.length; i++) {
        if(newTopics[i].id === id) {
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');
      setId(id);
    }} />
  }

  return (
    <div>
      <Header title="WEB" onChangeMode={() => {
        setMode('WELCOME')
      }}/>
      <Nav topics={topics} onChangeMode={((_id) => {
        setMode('READ')
        setId(_id)
      })}/>
      {content}
      <ul>
        <li>
          <a href="/create" onClick={event => {
              event.preventDefault();
              setMode('CREATE');
            }}>
            Create
          </a>
        </li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
