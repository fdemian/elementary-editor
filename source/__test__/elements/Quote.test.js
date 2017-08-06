import React from 'react';
import ReactDOM from 'react-dom';
import Quote from '../../Editor/TextElements/QuoteBlock/QuoteBlock';

const content = "{\"entityMap\":{},\"blocks\":[{\"key\":\"2in19\",\"text\":\" REACT \",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":1,\"length\":1,\"style\":\"BOLD\"},{\"offset\":4,\"length\":1,\"style\":\"BOLD\"},{\"offset\":7,\"length\":1,\"style\":\"BOLD\"},{\"offset\":10,\"length\":1,\"style\":\"BOLD\"}],\"entityRanges\":[],\"data\":{}},{\"key\":\"fqepc\",\"text\":\" Rastartl.\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}]}";

it('renders empty quote without crashing', () => {
  const div = document.createElement('div');  
  const comment = { content: null };
  ReactDOM.render(<Quote comment={comment} />, div);
});

it('renders with content without crashing', () => {
  const div = document.createElement('div');  
  const comment = { content: content };
  ReactDOM.render(<Quote comment={comment} />, div);
});