const defaultContent = { content: 'f(x) = ... ' };

const getTexBlock = () => {
   return {
     type:'LATEX' ,
     mutability:'Immutable',
     content: defaultContent
   };
}

export default getTexBlock;
